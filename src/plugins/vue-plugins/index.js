import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueScrollTo from 'vue-scrollto';
import VueCookie from 'vue-cookie';
import VueNotifications from 'vue-notifications';
import VueMeta from 'vue-meta';
import VueClipboard from 'vue-clipboard2';
import vClickOutside from 'v-click-outside';

// Include mini-toastr (or any other UI-notification library)
import miniToastr from 'mini-toastr';

// We shall setup types of the messages. ('error' type - red and 'success' - green in mini-toastr)
const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn',
};

// This step requires only for mini-toastr, just an initialization
miniToastr.init({ types: toastTypes });

// Here we are seting up messages output to `mini-toastr`
// This mean that in case of 'success' message we will call miniToastr.success(message, title, timeout, cb)
// In case of 'error' we will call miniToastr.error(message, title, timeout, cb)
// and etc.
function toast({
  title, message, type, timeout, cb,
}) {
  return miniToastr[type](message, title, timeout, cb);
}

// Here we map vue-notifications method to function abowe (to mini-toastr)
// By default vue-notifications can have 4 methods: 'success', 'error', 'info' and 'warn'
// But you can specify whatever methods you want.
// If you won't specify some method here, output would be sent to the browser's console
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast,
};

Vue.use(BootstrapVue);
Vue.use(VueCookie);
Vue.use(VueNotifications, options);
Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true,
});
Vue.use(VueMeta);
Vue.use(VueClipboard);
Vue.use(vClickOutside);
