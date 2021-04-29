<template>
  <div class="coin" data-view>
    <b-row>
      <b-col>
        <AddressCard
          :name="coinName"
          :address="delegationAddress"
          :coinIcon="coinIcon"
          :isAddAddressDisabled="true">
          <template slot="main-title">
            {{ $t('coinPages.coinStaking', {coinName}) }}:
          </template>
          <template slot="main-subtitle">
            {{ $t('coinPages.stakeCoinCode', {coinCode}) }}
          </template>
          <template slot="address-card-footer">
            <div>
              <!-- <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-4">
                {{ $t('common.ourFee') }} {{ fee }}
              </div> -->
              <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-4">
                {{ $t('common.yield') }} {{ yearlyEarning }}%
              </div>
            </div>
          </template>
        </AddressCard>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" class="d-flex">
        <IncomeCalculation
          class="align-items-stretch min-sm-card-height"
          :stakeProp="'aion'">
        </IncomeCalculation>
      </b-col>
    </b-row>

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">
          {{ $t('aion.whatIs') }}
        </h2>
        <p>
          {{ $t('aion.whatIsParagraph') }}
        </p>

        <h2 class="fs-20">
          {{ $t('aion.whyDelegate') }}
        </h2>
        <p>
          {{ $t('aion.whyDelegateParagraph') }}
        </p>
        <p class="mb-0">
          <a href="https://medium.com/everstake/aion-staking-guide-via-the-oan-native-wallet-51ffb9a5ae1b" target="_blank" rel="noopener noreferrer">AION Staking Guide Via the OAN Native Wallet</a>
        </p>
      </template>
    </DelegationInstructions>
  </div>
</template>

<script>
import Aion from '@/assets/img/coins-presentation/aion.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import IncomeCalculation from '@/components/coin-page/IncomeCalculation.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';

export default {
  name: 'Aion',
  metaInfo: {
    title: 'Aion staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake Aion to grow your Aion stake and yield.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Aion staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake Aion to grow your Aion stake and yield.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Aion staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake Aion to grow your Aion stake and yield.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    AddressCard,
    IncomeCalculation,
    DelegationInstructions,
  },
  data() {
    return {
      coinName: this.$helpers.capitalize(constants.COINS_MAP.aion.name),
      coinIcon: Aion,
      delegationAddress: constants.COINS_MAP.aion.delegationAddress,
      yearlyEarning: constants.COINS_MAP.aion.yearlyEarning,
      fee: constants.COINS_MAP.aion.fee,
    };
  },
  computed: {
    coinCode() {
      return this.$_getCoinCode('aion').toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
