<template>
  <div class="app">
    <Header />
    <div class="app-body">
      <AppSidebar />
      <main class="main">
        <div class="container-fluid p-0">
          <slot name="content"></slot>
        </div>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'MainContainer',
  components: {
    Header,
    AppSidebar,
    Footer,
  },
};
</script>

<style scoped>

</style>
