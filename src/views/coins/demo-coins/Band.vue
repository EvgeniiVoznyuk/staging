<template>
  <div class="coin" data-view>
    <b-row>
      <b-col>
        <AddressCard
          :name="coinName"
          :address="delegationAddress"
          :coinIcon="coinIcon"
          :isAddAddressDisabled="true"
        >
          <template slot="main-title"> Delegate to Everstake: </template>
          <template slot="main-subtitle">
            Your trusted staking provider
          </template>
          <template slot="address-card-footer">
            <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-3">
              {{ $t("common.ourFee") }} {{ fee }}
            </div>
            <div class="d-block d-md-inline-block mb-2 mb-md-0">
              {{ $t("common.yield") }} {{ yearlyEarning }}%
            </div>
          </template>
        </AddressCard>
      </b-col>
    </b-row>

    <Calculator />

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">How to stake Band?</h2>
        <p>
          BAND can be staked from a Ledger hardware wallet using CosmoScan — the
          official block explorer compatible with the latest version of the
          Cosmos-SDK.
        </p>
        <p>
          Additionally, BAND can be staked through various third-party wallet
          partners such as IBC Wallet, Atomic Wallet, Math Wallet and more!
        </p>
        <p>
          Don't forget to use everstake address -
          <a
            href="https://cosmoscan.io/validator/bandvaloper1jyze35artdzs5nhvalt6jnatzhg5z88rfpmv27#proposed-blocks"
            target="_blank"
            rel="noopener noreferrer"
            >bandvaloper1jyze35artdzs5nhvalt6jnatzhg5z88rfpmv27</a
          >
        </p>
        <ul>
          <li>
            <a
              href="https://link.medium.com/e7jgyPi4Deb"
              target="_blank"
              rel="noopener noreferrer"
            >
              How to stake BAND via Ledger Wallet
            </a>
          </li>
          <li>
            <a
              href="https://link.medium.com/Kr5gLpm4Deb"
              target="_blank"
              rel="noopener noreferrer"
            >
              How to stake BAND via IBC/Cosmostation Wallet
            </a>
          </li>
          <li>
            <a
              href="https://link.medium.com/0XV2DZo4Deb"
              target="_blank"
              rel="noopener noreferrer"
            >
              How to stake BAND via Atomic Wallet
            </a>
          </li>
          <li>
            <a
              href="http://blog.mathwallet.org/?p=1778"
              target="_blank"
              rel="noopener noreferrer"
            >
              How to stake BAND via Math Wallet
            </a>
          </li>
          <li>
            <a
              href="https://link.medium.com/oQ5dbrR4Deb"
              target="_blank"
              rel="noopener noreferrer"
            >
              How to stake BAND via Frontier mobile wallet
            </a>
          </li>
        </ul>
      </template>
    </DelegationInstructions>

    <Faqs :faq="faq" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Band from '@/assets/img/coins-presentation/band.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import Calculator from '@/components/band-sections/Calculator.vue';
import Faqs from '@/components/coin-page/Faqs.vue';

export default {
  name: 'Band',
  metaInfo: {
    title: 'Band staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content:
          'Learn how to stake Band to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Band staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content:
          'Learn how to stake Band to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Band staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Learn how to stake Band to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    AddressCard,
    DelegationInstructions,
    Calculator,
    Faqs,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.band.name,
      coinIcon: Band,
      delegationAddress: constants.COINS_MAP.band.delegationAddress,
      yearlyEarning: constants.COINS_MAP.band.yearlyEarning,
      faq: [
        {
          question: 'What is Band Protocol?',
          answer: `
            <p>Band Protocol is a cross-chain data oracle platform that aggregates and connects real-world data and APIs to smart contracts.</p>
            <p>Band Protocol launched in June 2020. To learn more, please see their <a href="https://github.com/bandprotocol/bandchain/wiki" target="_blank" rel="noopener noreferrer">whitepaper</a>.</p>
          `,
        },
        {
          question: 'What is delegation?',
          answer: `
            <p>New blocks on Band Protocol are proposed by validators. To enable Band Protocol to run seamlessly, validators need the technical capabilities to offer a secure, always on infrastructure.</p>
            <p>Not everyone is able to do this. Some token holders participate indirectly by delegating the tokens they have to a validator. Validators are running a service for delegators. They typically charge a fee to cover their operational costs.</p>
          `,
        },
        {
          question: 'How to stake BAND?',
          answer: `
            <p>BAND can be staked from a Ledger hardware wallet using CosmoScan — the official block explorer compatible with the latest version of the Cosmos-SDK.</p>
            <p>Additionally, BAND can be staked through various third-party wallet partners such as IBC Wallet, Atomic Wallet, Math Wallet and more!</p>
          `,
        },
        {
          question: 'Who or what controls my staked token?',
          answer: `
            <p>You are not giving away ownership of BAND by delegating. As a validator, Everstake will never have the ability to move your BAND.</p>
          `,
        },
        {
          question: 'Is there any risk to stake BAND?',
          answer: `
            <p>Band Protocol penalizes any validator that misses too many blocks or double signs a block by slashing the staked amount on that validator. Delegators must be aware that this slashing risk will always exist.</p>
          `,
        },
      ],
      fee: constants.COINS_MAP.band.fee,
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
