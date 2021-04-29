<template>
  <div class="basic-layout">
    <Header :isInternal="true"></Header>
    <main :class="{ 'basic-layout__main': true,
                    'basic-layout__main--white-bg': isWhiteBg}">
      <div class="basic-layout__main-info">
        <b-container class="container--custom">
          <slot name="content"></slot>
        </b-container>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'BasicLayout',
  components: {
    Header,
    Footer,
  },
  props: {
    isWhiteBg: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
  .basic-layout {
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: 'Roboto Mono', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &__main {
      flex: 1 0 auto;

      &--white-bg {
        background-color: $white;
      }
    }
  }
</style>
