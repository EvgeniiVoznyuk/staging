<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import cookieUuid from '@/plugins/mixins/cookieUuid';
import userEnv from '@/plugins/mixins/userEnv';
import metaInfoAndAnalytics from '@/plugins/mixins/metaInfoAndAnalytics';

export default {
  name: 'app',
  mixins: [cookieUuid, userEnv, metaInfoAndAnalytics],
  mounted() {
    this.$_generateCookieUuid();
    this.$_setUserEnv();
  },
};
</script>

<style lang="scss">
  // CoreUI Icons Set
  @import '~@coreui/icons/css/coreui-icons.min.css';
  /* Import Font Awesome Icons Set */
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome.scss';
  /* Import Simple Line Icons Set */
  $simple-line-font-path: '~simple-line-icons/fonts/';
  @import '~simple-line-icons/scss/simple-line-icons.scss';
  /* Import Flag Icons Set */
  @import '~flag-icon-css/css/flag-icon.min.css';
  /* Import Bootstrap Vue Styles */
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  /* Default multiselect styles */
  @import "~vue-multiselect/dist/vue-multiselect.min.css";
  /* Default calendar styles*/
  @import '~v-calendar/lib/v-calendar.min.css';
  // Import Main styles for this application
  @import 'assets/scss/style';

</style>
