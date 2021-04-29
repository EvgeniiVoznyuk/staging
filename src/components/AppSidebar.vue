<template>
  <Sidebar fixed>
    <SidebarHeader/>
    <SidebarForm/>
    <SidebarNav :navItems="navHandled"></SidebarNav>
    <SidebarFooter/>
    <SidebarMinimizer/>
  </Sidebar>
</template>

<script>
import { mapGetters } from 'vuex';
import {
  Sidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
} from '@coreui/vue';
import nav from '@/constants/_nav';

export default {
  name: 'AppSidebar',
  components: {
    Sidebar,
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNav,
  },
  data() {
    return {
      nav: nav.items,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
    navHandled() {
      return this.nav.filter((currentNavItem) => {
        if (this.isUserLoggedIn) {
          return currentNavItem !== this.nav[this.nav.length - 1]
            && currentNavItem !== this.nav[this.nav.length - 2];
        }
        return currentNavItem;
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
