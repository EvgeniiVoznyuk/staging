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
            Stake with Everstake: <a href="https://explorer.mainnet.near.org/accounts/everstake.poolv1.near" target="_blank"  rel="noopener noreferrer">everstake.poolv1.near</a>
          </template>
          <template slot="main-subtitle">
            your trusted staking provider
          </template>
          <template slot="address-card-footer">
            <!--            <a href="https://rex.atticlab.net/" rel="noopener noreferrer" target="_blank"></a>-->
            <div>
              <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-3">
                {{ $t('common.ourFee') }} {{ fee }}
              </div>
              <div class="d-block d-md-inline-block mb-2 mb-md-0">
                {{ $t('common.yield') }} {{ yearlyEarning }}%
              </div>
            </div>
          </template>
        </AddressCard>
      </b-col>
    </b-row>

    <Calculator />

    <Faqs :faq="faqs" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Near from '@/assets/img/coins-presentation/near.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import Calculator from '@/components/near-sections/Calculator.vue';
import Faqs from '@/components/coin-page/Faqs.vue';

export default {
  name: 'Near',
  metaInfo: {
    title: 'Near staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake Near to grow your balance and yield. Start staking with Everstake PoS validation service provider today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Near staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake Near to grow your balance and yield. Start staking with Everstake PoS validation service provider today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Near staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake Near to grow your balance and yield. Start staking with Everstake PoS validation service provider today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    Calculator,
    AddressCard,
    Faqs,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.near.name,
      coinIcon: Near,
      delegationAddress: constants.COINS_MAP.near.delegationAddress,
      fee: constants.COINS_MAP.near.fee,
      yearlyEarning: constants.COINS_MAP.near.yearlyEarning,
      faqs: [
        {
          question: 'What is Near?',
          answer: `
            <p>NEAR is a decentralized application platform that is secure enough to manage high value assets like money or identity and performant enough to make them useful for everyday people, putting the power of the Open Web in their hands.</p>
            <p><b><a href="https://near.org/blog/the-beginners-guide-to-the-near-blockchain/" target="_blank"  rel="noopener noreferrer">The Beginner’s Guide to the NEAR Blockchain</a></b></p>
            <p><b><a href="https://medium.com/everstake/what-is-near-and-how-it-makes-developing-blockchain-applications-simple-and-efficient-bab3653aa34f" target="_blank"  rel="noopener noreferrer">What is Near and how it makes developing blockchain applications simple and efficient</a></b></p>
          `,
        },
        {
          question: 'How do I get started?',
          answer: `
            <ul>
              <li>Set up an <a href="https://wallet.near.org/" target="_blank" rel="noopener noreferrer">account</a>.</li>
              <li>Read <a href="https://medium.com/everstake/how-to-stake-near-2df7048668f8" target="_blank" rel="noopener noreferrer">how to stake your NEARs</a>,  and follow the intructions.</li>
              <li>Check out the <a href="http://explorer.testnet.near.org/" target="_blank" rel="noopener noreferrer">network status</a> (and any changes you made while playing in step 2). The block explorer provides you with insights on nodes, transactions, and blocks. You can look for your account ID used in step 2.</li>
              <li>Dive head first <a href="http://docs.near.org/" target="_blank" rel="noopener noreferrer">into the docs</a>.</li>
              <li>Let us know if you need anything.</li>
            </ul>
          `,
        },
        {
          question: 'How to stake?',
          answer: `
            <p>If you want staking rewards, but you don't want to run your own validating node, spend anyway some time to know NEAR economics. Good starting points are:</p>
            <p><a href="https://medium.com/everstake/how-to-stake-near-using-the-near-wallet-a-beginners-guide-7b089b0e9c19" target="_blank" rel="noopener noreferrer">How to stake NEAR using the Near Wallet</a></p>
            <p><a href="https://medium.com/everstake/how-to-stake-near-near-protocol-in-math-wallet-a-detailed-guide-for-beginners-f5daebd5f502" target="_blank" rel="noopener noreferrer">How to stake NEAR in Math Wallet </a></p>
            <p><a href="https://medium.com/everstake/how-to-stake-near-near-protocol-in-moonlet-mobile-wallet-a-simple-guide-for-newbies-646a1e155c7f" target="_blank" rel="noopener noreferrer">How to Stake NEAR in Moonlet Mobile Wallet </a></p>
            <p><a href="https://medium.com/everstake/how-to-stake-near-at-dokia-capital-a-detailed-guide-63a83faf54f9" target="_blank" rel="noopener noreferrer">How to stake NEAR at Dokia Capital</a></p>
            <ul>
              <li>Understand the <a href="https://docs.near.org/docs/validator/economics" target="_blank" rel="noopener noreferrer">Economics of a Validator</a></li>
              <li>Look at the current Validators on the <a href="https://explorer.near.org/nodes/validators" target="_blank" rel="noopener noreferrer">block explorer</a>. Gather information on their reliability, fees and current stake.</li>
              <li>Properly plan your tokens custody, starting from the <a href="https://docs.near.org/docs/tokens/token-custody" target="_blank" rel="noopener noreferrer">available custody options</a>.</li>
              <li>Verify what Validators offer to you, asking if they use the <a href="https://github.com/near/core-contracts" target="_blank" rel="noopener noreferrer">staking pool</a> from NEAR Core Contracts, or their own smart contracts.</li>
              <li>If you are proficient with command-line interface, look at the <a href="https://docs.near.org/docs/validator/delegation" target="_blank" rel="noopener noreferrer">delegation page</a> for a list of low-level commands you can use to stake.</li>
              <li>Join the Validators channels on <a href="https://near.chat/" target="_blank" rel="noopener noreferrer">Discord</a> to ask questions and meet NEAR staking community.</li>
            </ul>
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
  created() {
    const { coinCode = null } = this.$route.meta;

    if (!coinCode) {
      console.log('no');
      this.$router.push({ name: 'Page404' });
    }
    console.log(this.coinCode);
    this.coinData = this.coinsMap[coinCode];
    this.coinCode = coinCode;
    this.coinName = this.coinData.name;

    this.requestRates({
      base_currencies: [coinCode],
      quote_currencies: [this.$_getCoinCode('usd')],
    });
  },
  methods: {
    ...mapActions({
      requestRates: 'ratesService/requestRates',
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
