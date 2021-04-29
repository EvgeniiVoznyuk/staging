import Vue from 'vue';

Vue.filter('formatUsd', value => Vue.prototype.$numeral(value).format('0,0.00'));
Vue.filter('formatCrypto', value => Vue.prototype.$numeral(value).format('0,0.00000000'));
