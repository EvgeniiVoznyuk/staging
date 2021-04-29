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
            {{ $t('coinPages.coinStaking', {coinName}) }}
          </template>
          <template slot="main-subtitle">
            {{ $t('coinPages.stakeCoinCode', {coinCode}) }}
          </template>
          <template slot="address-card-footer">
            <div class="d-block d-md-inline-block mb-2 mb-md-0">
              {{ $t('common.yield') }} {{ yearlyEarning }}%
            </div>
          </template>
        </AddressCard>
      </b-col>
    </b-row>

    <Calculator />

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">
          {{ $t('coinPages.getReady', {coinName} )}}
        </h2>
        <p>
          Kusama is a separate Polkadot-like project with a native staking token KSM that is created for experimenting with network parameters,
          parachains and various other activities.
        </p>
        <p>
          <a href="https://medium.com/everstake/kusama-staking-guide-via-polkadot-browser-extension-743cdc6e01bc" target="_blank">Kusama Staking Guide Via Polkadot Browser Extension</a>
        </p>
      </template>
    </DelegationInstructions>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Kusama from '@/assets/img/coins-presentation/kusama.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import Calculator from '@/components/kusama-sections/Calculator.vue';

export default {
  name: 'Kusama',
  metaInfo: {
    title: 'Kusama staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake Kusama to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Kusama staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake Kusama to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Kusama staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake Kusama to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    Calculator,
    AddressCard,
    DelegationInstructions,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.ksm.name,
      coinIcon: Kusama,
      delegationAddress: constants.COINS_MAP.ksm.delegationAddress,
      yearlyEarning: constants.COINS_MAP.ksm.yearlyEarning,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
  },
  methods: {
    ...mapActions({
      requestRates: 'ratesService/requestRates',
    }),
  },
  created() {
    const { coinCode = null } = this.$route.meta;

    if (!coinCode) {
      this.$router.push({ name: 'Page404' });
    }
    this.coinData = this.coinsMap[coinCode];
    this.coinCode = coinCode;
    this.coinName = this.coinData.name;

    this.requestRates({
      base_currencies: [coinCode],
      quote_currencies: [this.$_getCoinCode('usd')],
    });
  },
};
</script>

<style scoped>

</style>
