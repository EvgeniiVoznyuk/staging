<template>
  <div class="coin" data-view>
    <b-row>
      <b-col>
        <AddressCard
          :name="coinName"
          :coinIcon="coinIcon"
          :isAddAddressDisabled="true"
        >
          <template slot="main-title">
            Everstake - Your trusted staking provider
          </template>
          <template slot="main-subtitle"> We support two nodes </template>
        </AddressCard>
      </b-col>
    </b-row>

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">Staking TON Crystal</h2>
        <p>
          Staking is available for the community in the light version (without a
          possibility to choose a DePool) via the Ton Surf Wallet. TON team is
          planning to present an option of selecting DePools in the future
          versions of the TON Surf. Another option available is staking via the
          Extra TON Chrome extension. The APY shown on the graph is the same for
          every DePool, hence the Delegator must choose a DePool with the less
          fees, more assurance and fully blue stability.
        </p>

        <h2 class="fs-20">Development operations</h2>
        <p>
          Everstake's team strives to maintain the decentralization and
          stability of the TON blockchain. By supporting the TON ecosystem, we
          can create a better environment for the network growth and common
          benefit. Everstake is one of the initial network members, and we
          strive to get involved in TON ecosystem improvement at all levels. We
          vote, take part in contests and support the blockchain when it comes
          to important updates and developments.
        </p>

        <h2 class="fs-20">Community growth</h2>
        <p>
          Everstake cares about the community and aims it to get more familiar
          with TON technology and innovations. Free TON brings new concepts into
          a wide range of industries, from serving government systems to
          financial and IT projects. We, at Everstake, frequently get involved
          in forum and chat interaction, aiming to provide our users with
          up-to-date information.
        </p>

        <h2 class="fs-20">Follow Everstake on social media for the latest updates:</h2>
         <p>
          <a
            target="_blank"
            href="https://twitter.com/everstake_pool"
          >
            Twitter
          </a>
        </p>
        <p>
          <a
            target="_blank"
            href="https://www.reddit.com/r/Everstake/"
          >
            Reddit
          </a>
        </p>
        <h2 class="fs-20">Community links:</h2>
         <p>
          <a
            target="_blank"
            href="https://t.me/freeton_ukraine"
          >
            Free TON Ukraine | ТОН Україна
          </a>
        </p>
        <p>
          <a
            target="_blank"
            href="https://t.me/ton_crystal_news"
          >
            Free TON Global Community
          </a>
        </p>
      </template>
    </DelegationInstructions>

    <Faqs :faq="faq" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import Ton from '@/assets/img/coins-presentation/freeTon.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import Faqs from '@/components/coin-page/Faqs.vue';

export default {
  name: 'Free Ton',
  metaInfo: {
    title: 'Free Ton staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content:
          'Learn how to stake Free Ton to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Free Ton staking with Everstake',
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
        content: 'Free Ton staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Learn how to stake Free Ton to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    AddressCard,
    Faqs,
    DelegationInstructions,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.band.name,
      coinIcon: Ton,
      delegationAddress: constants.COINS_MAP.band.delegationAddress,
      yearlyEarning: constants.COINS_MAP.band.yearlyEarning,
      faq: [
        {
          question: 'About Free TON',
          answer: `
           Free TON is a fast, secure and scalable blockchain and network project, capable of    handling millions
           of transactions per second if necessary, and both user-friendly and service provider-friendly. 
           The Free TON ecosystem is based on blockchain technology and has no controlling authority or governing 
           body like a board of directors.
           Free TON is a combination of people, decentralized network, program code and smart contracts. It is developed 
           as a community product, not a property of any company. It is distributed and published free of charge.
          `,
        },
        {
          question: 'What is TON Crystal (TON)?',
          answer: `
           • The main token of the Free TON Blockchain is formally called the TON Crystal, 
            however, casually it is referred to as the Ton. <br/>
            • Rubies and other coins associated with Free TON blockchain are simply test coins with no value, 
            made available for testing purposes while the network undergoes its testing phase. <br/>
            • There is no Gram!
          `,
        },
        {
          question: 'How do I get tokens?',
          answer: `
           Currently, TON Crystal tokens (Tons) and other tokens of Free TON blockchain are not available for sale 
            or exchange to other crypto assets in Surf. Free TON Community did not hold token sales, preferring 
            instead to distribute tokens in exchange for contributions to the network. Throughout 2020, the project 
            distributed TON Crystal tokens in more than a hundred contests and collaboration initiatives.

            Nevertheless, TON Crystals are available for sale and exchange out of Surf.
          `,
        },
        {
          question: 'What is Staking?',
          answer: `
           To put in simpler terms, essentially staking is a lot like an interest bearing account; in this case a staking pool. 
            You deposit your coins into the staking pool along with others. The smart contract distributes them to validators. 
            When the validators complete their tasks they get rewards. Part of those rewards are then deposited into your 
            account and the accounts of everyone who participated.
          `,
        },
        {
          question: 'Do I have a control over my staked TONs at Extra TON or TON Surf Wallet?',
          answer: `
           During the staking of TON, tokens actually travel to DePool contract and futher, every 18 hours half of them then goes 
            to another elector contract. Still, the tokens sent to depool are staying under full control of the Delegator. <br/> <br/>

            Be aware of the “slashing” mechanism once it will be implemented in freeton. In case of the slashing, the tokens at 
            Validator's DePool may be lost. Choose the Validator with the highest assurance that would cover the loss in 
            case of slashing.
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
