<template>
<!--  animated fadeIn-->
  <div class="app" data-view>
    <AppHeader />

    <div class="app-body">
      <AppSidebar />

      <main class="main">
        <Breadcrumb :list="list" class="c-breadcrumb"/>

        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import { Breadcrumb } from '@coreui/vue';
import AppHeader from '@/components/AppHeader.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'DefaultContainer',
  components: {
    AppHeader,
    AppSidebar,
    AppFooter,
    Breadcrumb,
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(route => route.name || route.meta.label);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
