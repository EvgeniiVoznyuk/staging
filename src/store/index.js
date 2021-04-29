import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import userService from './modules/userService';
import addressService from './modules/addressService';
import ratesService from './modules/ratesService';
import stakingService from './modules/stakingService';
import rewardsService from './modules/rewardsService';
import dashService from './modules/dashService';
import blogService from './modules/blogService';
import rewardsServiceNew from './modules/rewardsServiceNew';
import ethService from './modules/ethService';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    userService,
    addressService,
    ratesService,
    stakingService,
    rewardsService,
    dashService,
    blogService,
    rewardsServiceNew,
    ethService,
  },

  state: {

  },

  getters: {
    isAddressesReady: (state, getters, rootState, rootGetters) => !(rootGetters['addressService/isAddressesDataLoading']
        || rootGetters['ratesService/isRatesLoading']),
    isStakingInfoReady: (state, getters, rootState, rootGetters) => !(rootGetters['stakingService/isStakingInfoLoading']
        || rootGetters['ratesService/isRatesLoading']),
    isRewardsHistoryReady: (state, getters, rootState, rootGetters) => !(rootGetters['rewardsService/isRewardsHistoryLoading']
        || rootGetters['ratesService/isRatesLoading']),
    isRewardsHistoryReadyNew: (state, getters, rootState, rootGetters) => !(rootGetters['rewardsServiceNew/isRewardsHistoryLoading']
      || rootGetters['ratesService/isRatesLoading']),
  },

  mutations: {

  },

  actions: {

  },
});

Vue.prototype.$store = store;

export default store;
