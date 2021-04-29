// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './polyfill';
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue';

// Plugins
import helpers from './plugins/helpers';
import errorsHandler from './plugins/errorsHandler';
import './plugins/vue-plugins';
import './plugins/global-components';
import './plugins/3d-party';
import injectInitialState from './plugins/injectInitialState';
import './plugins/filters';

import App from './App.vue';
import router from './router/index';
import i18n from './i18n';
import store from './store';

// Axios api
import UserServiceApi from './api/userService';
import AddressServiceApi from './api/addressService';
import RatesServiceApi from './api/ratesService';
import StakingServiceApi from './api/stakingService';
import RewardsServiceApi from './api/rewardsService';
import IndexServiceApi from './api/indexService';
import DashServiceApi from './api/dashService';
import BalanceServiceApi from './api/balanceService';
import blogService from './api/blogService';
import analyticsServiceApi from './api/analyticsService';
import RewardsServiceApiNew from './api/rewardsServiceNew';
// Axios api ethereum 2.0
import EthServiceApi from './api/ethService';

// todo
// cssVars()

// Use plugins
Vue.use(helpers);
Vue.use(errorsHandler);

// Global variables
Vue.prototype.$userServiceApi = UserServiceApi;
Vue.prototype.$addressServiceApi = AddressServiceApi;
Vue.prototype.$ratesServiceApi = RatesServiceApi;
Vue.prototype.$stakingServiceApi = StakingServiceApi;
Vue.prototype.$rewardsServiceApi = RewardsServiceApi;
Vue.prototype.$indexServiceApi = IndexServiceApi;
Vue.prototype.$dashServiceApi = DashServiceApi;
Vue.prototype.$balanceServiceApi = BalanceServiceApi;
Vue.prototype.$blogApi = blogService;
Vue.prototype.$analyticsApi = analyticsServiceApi;
Vue.prototype.$rewardsServiceApiNew = RewardsServiceApiNew;
// variables Ethereum 2.0
Vue.prototype.$ethService = EthServiceApi;

Vue.config.productionTip = false;

// Try to get JWTs before initializing the app
let app;
store.dispatch('userService/restoreJWT')
  .then(() => {
    // During pre-rendering the initial state is
    // injected into the global scope, here we
    // fill the store with the initial state.
    if (window.__INITIAL_STATE__) store.replaceState(window.__INITIAL_STATE__);

    router.beforeResolve(async (to, from, next) => {
      try {
        const components = router.getMatchedComponents(to);
        const slug = to.path.split('/')[2];

        // By using `await` we make sure to wait
        // for the API request made by the `fetch()`
        // method to resolve before rendering the view.
        await Promise.all(components.map(x => x.fetch
          && x.fetch({ store }, slug || '')));

        // The `injectInitialState()` function injects
        // the current state as a global variable
        // `__INITIAL_STATE__` if the page is currently
        // pre-rendered.
        // Breaks the pages state when a logged in user reloads a prerendered page
        // Seems like logout
        // if (window.__PRERENDER_INJECTED) injectInitialState(store.state);
      } catch (err) {
        // This is the place for error handling in
        // case the API request fails for example.
        console.log(err);
        process.exit(-5);
      }

      return next();
    });
  })
  .then(() => {
    /* eslint-disable no-new */
    app = new Vue({
      // el: '#app',
      router,
      i18n,
      store,
      render: h => h(App),
      // mounted: () => document.dispatchEvent(new Event('x-app-rendered')),
    });
  })
  .then(() => {
    app.$mount('#app');
  });
