<template>
  <Footer>
    <div>
      <router-link :to="{ name: 'Home' }" class="link link--yellow">Everstake Dashboard</router-link>
      <span class="ml-1">&copy; {{ currentYear }} AtticLab.</span>
    </div>
  </Footer>
</template>

<script>
import { Footer } from '@coreui/vue';

export default {
  name: 'AppFooter',
  components: {
    Footer,
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
.app-footer {
  background: $black;
  border-top: $border-yellow--2px;
}

@media(max-width: 575px) {
  .app-footer {
    flex-direction: column;
    justify-content: center;
  }
}

</style>
