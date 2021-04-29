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

    <Faqs :faq="faq" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Edgeware from '@/assets/img/coins-presentation/edgeware.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import Calculator from '@/components/edgeware-sections/Calculator.vue';
import Faqs from '@/components/coin-page/Faqs.vue';

export default {
  name: 'Edgeware',
  metaInfo: {
    title: 'Edgeware staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake Edgeware to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Edgeware staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake Edgeware to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Edgeware staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake Edgeware to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    AddressCard,
    Calculator,
    Faqs,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.edg.name,
      coinIcon: Edgeware,
      delegationAddress: constants.COINS_MAP.edg.delegationAddress,
      yearlyEarning: constants.COINS_MAP.edg.yearlyEarning,
      fee: constants.COINS_MAP.edg.fee,
      faq: [
        {
          question: 'What is Edgeware?',
          answer: `
            <p><a href="https://edgewa.re/" target="_blank" rel="noopener noreferrer">​Edgeware</a> is an:</p>
            <ul>
              <li>On-chain Governed</li>
              <li>Nominated Proof-of-Stake (PoS) Blockchain</li>
              <li>Smart Contract Platform</li>
              <li>with a WASM (WebAssembly) Runtime through Parity Substrate</li>
              <li></li>
            </ul>
            <p>
              It is designed to apply decision-making process to the runtime of the blockchain, but also to the decision-making processes themselves, in an effort to rapidly generate more effective governance solutions for blockchain platforms.
            </p>
            <p>
              Participants can vote, delegate, and fund improvements and upgrades through DAOs, economic mechanisms, cryptographic voting systems, and more.
            </p>
          `,
        },
        {
          question: 'What is staking?',
          answer: `
            <p>Staking allows EDG holders to participate in the security and availability of Edgeware by leveraging their tokens to validate.</p>
            <p>Validators who stake EDG, have an operational validator node, and behave honestly will get rewarded with EDG.</p>
            <p>Actors who misbehave or who are unavailable/offline will have a portion of their stake slashed as a penalty.</p>
          `,
        },
        {
          question: 'What are the annual returns for staking?',
          answer: `
            <p>0-20%</p>
          `,
        },
        {
          question: 'What do I need to stake?',
          answer: `
            <p>To become a nominator, you only need to have some EDG to stake.</p>
          `,
        },
        {
          question: 'What is nominating?',
          answer: `
            <p>A nominator publishes a list of validator candidates that they trust, and puts down an amount of EDG at stake to support them with.</p>
            <p>If some of these candidates are elected as validators, they share with them the payments, or the sanctions, on a per-staked-EDG basis.</p>
            <p>Unlike validators, an unlimited number of parties can participate as nominators. As long as a nominator is diligent in their choice and only supports validator candidates with good security practices, their role carries low risk and provides a continuous source of revenue.</p>
          `,
        },
        {
          question: 'Can I nominate multiple validators?',
          answer: `
            <p>Yes. Validators are selected via the Phragmen Method. You can think of this is a version of "approval voting" - you can approve zero, one, or multiple validators (although of course, if you do not nominate any validators, you are not nominating and thus will not receive any rewards).</p>
            <p>For a more in-depth explanation of Phragmen, please see the <a href="https://wiki.polkadot.network/en/latest/polkadot/learn/phragmen/" target="_blank" rel="noopener noreferrer">Polkadot Wiki Phragmen</a> page.</p>
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
