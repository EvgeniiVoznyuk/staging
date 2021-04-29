<template>
  <b-dropdown id="coinsDropdown"
              class="custom-dropdown"
              variant="link"
              right
              :text="$t('home.coins')">
    <PerfectScrollbar class="scroll-area p-0">
      <!--        @click="navigate(routeName)-->
      <b-dropdown-item v-for="(routeName, index) in coinsLinks"
                       :key="index"
                       :to="{ name: routeName }">
        {{ `0${index + 1}. ${routeName}` }}
      </b-dropdown-item>
    </PerfectScrollbar>
  </b-dropdown>
</template>

<script>
import constants from '@/constants';

export default {
  name: 'CoinsDropdown',
  data() {
    return {
      scrollbarSettings: {
        wheelPropagation: true,
        wheelSpeed: 0.5,
        scrollingThreshold: 0,
      },
    };
  },
  computed: {
    coinsLinks() {
      return Object.keys(constants.COINS_MAP)
        .filter(coinCode => coinCode !== 'usd')
        .map(coinCode => this.$helpers.capitalize(constants.COINS_MAP[coinCode].name));
    },
  },
  methods: {
    navigate(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style lang="scss" scoped>
  .scroll-area {
    max-height: 230px;
    padding: 1.25rem 0;
  }
</style>
