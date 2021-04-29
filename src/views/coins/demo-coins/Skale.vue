<template>
  <div class="coin" data-view>
    <b-row>
      <b-col>
        <AddressCard
          :name="coinName"
          :coinIcon="coinIcon"
          :isAddAddressDisabled="true">
          <template slot="main-title">
            Delegate to Everstake:
            <a
              href="https://skale-analytics.skalelabs.com/#/validator/61"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ delegationAddress }}
            </a>
          </template>
          <template slot="main-subtitle">
            Your trusted staking provider
          </template>
          <template slot="address-card-footer">
            <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-3">
              {{ $t('common.ourFee') }} {{ fee }}
            </div>
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
          What is the scale Network?
        </h2>
        <p>
          SKALE is an elastic blockchain network that gives developers the ability to easily provision highly configurable fully decentralized chains that are instantly compatible with Ethereum. SKALE chains can execute sub-second block times, run up to 2,000 tps per chain, and run full-state smart contracts in addition to decentralized storage, execute Rollups, and machine learning in EVM. The SKALE Network is an open source project with many contributors including SKALE Labs, Inc.
        </p>
        <p>Here are other SKALE resources for more technical depth:</p>
        <ul>
          <li>
            <a
              href="https://skale.network/whitepaper"
              target="_blank"
              rel="noopener noreferrer"
            >
              SKALE Whitepaper
            </a>
          </li>
          <li>
            <a
              href="https://skale.network/primer"
              target="_blank"
              rel="noopener noreferrer"
            >
              SKALE Network Primer
            </a>
          </li>
          <li>
            <a
              href="https://skale.network/attributes"
              target="_blank"
              rel="noopener noreferrer"
            >
              SKALE Network Key Attributes
            </a>
          </li>
          <li>
            <a
              href="https://skale.network/highlights"
              target="_blank"
              rel="noopener noreferrer"
            >
              SKALE Network Technical Highlights
            </a>
          </li>
          <li>
            <a
              href="https://skale.network/docs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SKALE Developers Portal
            </a>
          </li>
        </ul>
      </template>
    </DelegationInstructions>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Skale from '@/assets/img/coins-presentation/skale.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import Calculator from '@/components/skale-sections/Calculator.vue';

export default {
  name: 'Skale',
  metaInfo: {
    title: 'Skale staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake Skale to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Skale staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake Skale to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Skale staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake Skale to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    AddressCard,
    DelegationInstructions,
    Calculator,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.skale.name,
      coinIcon: Skale,
      delegationAddress: constants.COINS_MAP.skale.delegationAddress,
      yearlyEarning: constants.COINS_MAP.skale.yearlyEarning,
      fee: constants.COINS_MAP.skale.fee,
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
