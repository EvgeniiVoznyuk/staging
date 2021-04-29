<template>
  <section class="mb-5">
    <h2 class="title text-white title--lap mb-sm-5">
      {{ $t('icx.spendRewardsToSupport') }}
    </h2>

    <ul class="list list-style-none pl-0">
      <li
        v-for="(text, index) in rewardPercentsTexts"
        :key="index"
        class="mb-2"
      >
        {{ text }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'BlockProduction',
  data() {
    return {
      rewardPercents: {
        devCosts: 45,
        infra: 10,
        marketing: 10,
        design: 12,
        education: 8,
        savings: 10,
        emergency: 5,
      },
    };
  },
  computed: {
    rewardPercentsTexts() {
      return [
        this.$t('icx.rewardPercents.devCosts', { percent: this.rewardPercents.devCosts }),
        this.$t('icx.rewardPercents.infra', { percent: this.rewardPercents.infra }),
        this.$t('icx.rewardPercents.marketing', { percent: this.rewardPercents.marketing }),
        this.$t('icx.rewardPercents.design', { percent: this.rewardPercents.design }),
        this.$t('icx.rewardPercents.education', { percent: this.rewardPercents.education }),
        this.$t('icx.rewardPercents.savings', { percent: this.rewardPercents.savings }),
        this.$t('icx.rewardPercents.emergency', { percent: this.rewardPercents.emergency }),
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
