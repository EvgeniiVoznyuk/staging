import Vue from 'vue';
import PerfectScrollbar from 'vue2-perfect-scrollbar';
import CircleSpinner from '../../components/CircleSpinner.vue';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';

Vue.use(PerfectScrollbar);
Vue.component('CircleSpinner', CircleSpinner);
