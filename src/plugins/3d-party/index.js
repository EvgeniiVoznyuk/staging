import Vue from 'vue';
import numeral from 'numeral';
import uuid from 'uuid4';
import querystring from 'query-string';
import moment from 'moment';
import colorScheme from 'color-scheme';

Vue.prototype.$numeral = numeral;
Vue.prototype.$uuid = uuid;
Vue.prototype.$querystring = querystring;
Vue.prototype.$moment = moment;
Vue.prototype.$colorScheme = colorScheme;
