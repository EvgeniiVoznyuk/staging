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
            Nominate Everstake:
          </template>
          <template slot="main-subtitle">
            your trusted staking provider
          </template>
          <template slot="address-card-footer">
            <div class="d-block d-md-inline-block mb-2 mb-md-0">
              {{ $t('common.yield') }} {{ yearlyEarning }}%.
              Nominate Everstake and get a 0% fee for 3 month after we will be evected to the validators list
            </div>
          </template>
        </AddressCard>
      </b-col>
    </b-row>

    <Calculator />

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">
          How to nominate a Polkadot validator?
        </h2>
        <p>
          Delegators in Polkadot are called Nominators. Anyone can nominate up to 16 validators, who share rewards if they are elected into the active validators set.
          Please note that you must manually claim your rewards via the Polkadot Explorer. Staking rewards are kept available available for 21 days only.
          If you do not claim your staking rewards by this time, then you will not be able to claim them and some of your staking rewards will be lost.
        </p>
        <p><a href="https://medium.com/everstake/how-to-claim-polkadot-tokens-ce01e600454" target="_blank">How to claim Polkadot tokens</a></p>
        <p class="mb-0"><a href="https://medium.com/everstake/how-to-nominate-a-polkadot-validator-d7e7bc5b57b2" target="_blank">How to nominate a Polkadot validator</a></p>
      </template>
    </DelegationInstructions>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Polkadot from '@/assets/img/coins-presentation/polkadot.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import Calculator from '@/components/polkadot-sections/Calculator.vue';

export default {
  name: 'Polkadot',
  metaInfo: {
    title: 'Polkadot staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake Polkadot to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Polkadot staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake Polkadot to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Polkadot staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake Polkadot to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
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
      coinName: constants.COINS_MAP.dot.name,
      coinIcon: Polkadot,
      delegationAddress: constants.COINS_MAP.dot.delegationAddress,
      yearlyEarning: constants.COINS_MAP.dot.yearlyEarning,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
    coinCode() {
      return this.$_getCoinCode('dot').toUpperCase();
    },
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
