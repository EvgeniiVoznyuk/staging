<template>
  <b-card class="card--alt">
    <div class="h4 text-uppercase">{{ currency }}</div>
    <div>
      {{ $t('balance.amount') }}:
      <strong class="text-uppercase">
        {{ amount }}
        {{ currency }}
      </strong>
    </div>
    <div>
      {{ $t('balance.equivalentInUsd') }}:
      <strong>
        {{ amountInUsd }} $
      </strong>
    </div>
    <div>
      {{ $t('common.yield') }}:
      <strong>
        {{ yearlyEarning }}%
      </strong>
    </div>
    <div>
      {{ $t('balance.tokenPrice') }}:
      <strong>
        {{ tokenPrice }} $
      </strong>
    </div>
    <div class="mb-3">
      {{ $t('balance.coinShareInUsd') }}:
      <strong>
        {{ coinShare }}%
      </strong>
    </div>
    <b-progress height={}
                class="progress-xs mt-2"
                :precision="1"
                :variant="variant"
                :value="coinShare">
    </b-progress>
  </b-card>
</template>

<script>
export default {
  name: 'AssetWidget',
  props: {
    currency: {

    },
    amount: {

    },
    amountInUsd: {

    },
    yearlyEarning: {

    },
    tokenPrice: {

    },
    coinShare: {

    },
    variant: {

    },
  },
};
</script>

<style lang="scss" scoped>
</style>
