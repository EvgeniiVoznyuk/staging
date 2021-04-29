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
            Delegate to Everstake
          </template>
          <template slot="main-subtitle">
            Identity: EvnRmnMrd69kFdbLMxWkTn1icZ7DCceRhvmb2SJXqDo4
          </template>
          <template slot="address-card-footer">
            <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-3">
              {{ $t('common.ourFee') }} {{ fee }},
            </div>
            <div class="d-block d-md-inline-block mb-2 mb-md-0">
              APR ~ {{yearlyEarning}}%
            </div>
          </template>
        </AddressCard>
      </b-col>
    </b-row>

    <Calculator />

    <DelegationInstructions>
      <template slot="instructions">
        <p><a href="https://medium.com/everstake/how-to-stake-solana-sol-in-the-solflare-web-wallet-a-comprehensive-guide-b9080c48d885" target="_blank">How to stake SOL via SolFlare Web Wallet</a></p>
        <p><a href="https://docs.solana.com/cli/delegate-stake" target="_blank">How to stake SOL via Solana command line tool</a></p>
        <p><a href="https://medium.com/everstake/how-to-stake-solana-in-the-solflare-wallet-using-ledger-b6dc1e6e7513" target="_blank">How to stake SOL via Ledger</a></p>
        <p><a href="https://docs.solana.com/wallet-guide/ledger-live" target="_blank">How to set up Ledger</a></p>
      </template>
    </DelegationInstructions>

    <Faqs
      :faq="faq"
    />

<!--    <FAQ :accordionOneTitle="$t('sol.faq.1.question', { coinName })"-->
<!--         :accordionOneTxt="$t('sol.faq.1.answer')"-->
<!--         :accordionTwoTitle="$t('sol.faq.2.question', {coinName})"-->
<!--         :accordionTwoTxt="$t('sol.faq.2.answer')"-->
<!--         :accordionThreeTitle="$t('.isItSecureToDelegateCoin', {coinName})"-->
<!--         :accordionThreeTxt="$t('coinPages.absolutelySecure', {coinName})"-->
<!--    >-->
<!--      <template slot="botLink">-->
<!--        <a href="https://t.me/everstake_bot" target="_blank" rel="noopener noreferrer">https://t.me/everstake_bot</a>-->
<!--      </template>-->
<!--    </FAQ>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Solana from '@/assets/img/coins-presentation/solana.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import Calculator from '@/components/solana-sections/Calculator.vue';
// import FAQ from '@/components/coin-page/FAQ';
import Faqs from '@/components/coin-page/Faqs.vue';

export default {
  name: 'Solana',
  metaInfo: {
    title: 'Solana staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake Solana to grow your SOL stake and yield. Start delegating SOL tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Solana staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake Solana to grow your SOL stake and yield. Start delegating SOL tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Solana staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake Solana to grow your SOL stake and yield. Start delegating SOL tokens with Everstake delegate today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    Calculator,
    AddressCard,
    DelegationInstructions,
    Faqs,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.sol.name,
      coinIcon: Solana,
      delegationAddress: constants.COINS_MAP.sol.delegationAddress,
      fee: constants.COINS_MAP.sol.fee,
      yearlyEarning: constants.COINS_MAP.sol.yearlyEarning,
      faq: [
        {
          question: 'What is Solana?',
          answer: `
            Solana is an open source project implementing a new, high-performance, permissionless blockchain. The Solana Foundation is based in Geneva, Switzerland and maintains the open source project.
            More - <a href="https://docs.solana.com/introduction" rel="noopener noreferrer">https://docs.solana.com/introduction</a>
          `,
        },
        {
          question: 'How do I stake my SOL tokens?',
          answer: 'In order to stake tokens on Solana, you first will need to transfer some SOL into a wallet that supports staking, then follow the steps or instructions provided by the wallet to create a stake account and delegate your stake. Different wallets will vary slightly in their process for this but the general description is below.',
        },
        {
          question: 'Supported Wallets',
          answer: `
            Staking operations are supported by the following wallet solutions:
            <ul>
              <li>SolFlare.com in conjunction with a keystore file or a Ledger Nano S. Check out our <a href="https://docs.solana.com/wallet-guide/solflare" target="_blank" rel="noopener noreferrer">guide to using SolFlare</a> for details.</li>
              <li>Solana command line tools can perform all stake operations in conjunction with a CLI-generated keypair file wallet, a paper wallet, or with a connected Ledger Nano S. <a href="https://docs.solana.com/cli/delegate-stake" target="_blank" rel="noopener noreferrer">Staking commands using the Solana Command Line Tools.</a></li>
            </ul>
          `,
        },
        {
          question: 'How to create a Stake Account',
          answer: `
           A stake account is a different type of account from a wallet address that is used to simply send and receive SOL tokens to other addresses.
           If you have received SOL in a wallet address you control, you can use some of these tokens to create and fund a new stake account, which will have a different address than the wallet you used to create it.
           Depending on which wallet you are using the steps to create a stake account may vary slightly. Not all wallets support stake accounts, see <a href="https://docs.solana.com/staking#supported-wallets" target="_blank" rel="noopener noreferrer">Supported Wallets.</a>
          `,
        },
        {
          question: 'How to Select a Validator',
          answer: `
            <p>After a stake account is created, you will likely want to delegate the SOL to a validator node.</p>
            <strong>Everstake</strong>
            <p>Vote Account: 9QU2QSxhb24FUX3Tu2FpczXjpK3VYrvRudywSZaM29mF</p>
            <p>Identity: EvnRmnMrd69kFdbLMxWkTn1icZ7DCceRhvmb2SJXqDo4</p>
          `,
        },
        {
          question: 'How to delegate',
          answer: `
            <p><a href="https://docs.solana.com/wallet-guide/solflare" target="_blank" rel="noopener noreferrer">How to stake SOL via SolFlare Web Wallet</a></p>
            <p><a href="https://docs.solana.com/cli/delegate-stake" target="_blank" rel="noopener noreferrer">How to stake SOL via Solana command line tool</a></p>
            <p><a href="https://docs.solana.com/cli/delegate-stake" target="_blank" rel="noopener noreferrer">How to stake SOL via Ledger</a></p>
            <p><a href="https://docs.solana.com/wallet-guide/ledger-live" target="_blank" rel="noopener noreferrer">How to set up Ledger</a></p>
          `,
        },
      ],
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
