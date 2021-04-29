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
          <template slot="main-title">
            {{ $t("coinPages.coinStaking", { coinName }) }}
          </template>
          <template slot="main-subtitle">
            {{ $t("coinPages.stakeCoinCode", { coinCode }) }}
          </template>
          <template slot="address-card-footer">
            <div>
              <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-3">
                {{ $t("common.ourFee") }} {{ fee }}
              </div>
              <div class="d-block d-md-inline-block mb-2 mb-md-0">
                {{ $t("common.yield") }} {{ yearlyEarning }}%
              </div>
            </div>
          </template>
        </AddressCard>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" lg="6" class="d-flex">
        <LoadingCard v-if="!isStakingInfoReady" class="min-sm-card-height" />
        <CoinStats
          v-else
          class="align-items-stretch min-sm-card-height"
          :coinName="coinName"
          :statsTableData="coinStats"
        >
        </CoinStats>
      </b-col>

      <b-col cols="12" lg="6" class="d-flex">
        <IncomeCalculation
          class="align-items-stretch min-sm-card-height"
          :stakeProp="'one'"
        >
        </IncomeCalculation>
      </b-col>
    </b-row>

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">
          {{ $t("harmony.whyDelegate") }}
        </h2>
        <p>
          {{ $t("harmony.whyDelegateParagraph") }}
        </p>

        <p>
          <a
            target="_blank"
            href="https://staking.harmony.one/validators/mainnet/one1aagrkq9vg49jm5xx22fvm4leg0lt48qeupexvu"
            >Everstake validator on Harmony Portal</a
          >
        </p>

        <h2 class="fs-20">
          {{ $t("harmony.howDelegate") }}
        </h2>
        <p>
          We've got you covered! Our team has released a few step-by-step guides
          to make your staking process effortless. One of the most common ways
          to stake Harmony is via a Google Chrome extension – Harmony One
          Wallet. Make sure that you are using the latest version of the
          original extension. For those who used it before and haven't updated
          in time, please delete a deprecated extension and follow our Guide
          steps for account recovery.
        </p>

        <p>
          <a target="_blank" href="https://stake.is/Iq/"
            >Staking Harmony (ONE) via a Chrome extension</a
          >
        </p>
        <p>
          Feel free to give a try to other wallets if you prefer staking on
          mobile. <br />
          Staking was never easier with these walk-through guides:
        </p>
        <p>
          <a target="_blank" href="https://stake.is/jn/">
            Stake ONE in Trust Wallet through Frontier
          </a>
        </p>
        <p>
          <a target="_blank" href="https://stake.is/j7/">
            Harmony Staking Guide via Math Wallet
          </a>
        </p>
        <p>
          <a target="_blank" href="https://stake.is/bn/">
            How to Stake ONE via Guarda Wallet
          </a>
        </p>

        <p>
          There is also an alternative (and not that popular :)) way to stake,
          which requires a bit of coding from a user:
        </p>
        <p>
          <a
            target="_blank"
            href="https://medium.com/everstake/harmony-network-staking-guide-via-hmy-4a39b859f7d3"
          >
            Stake Harmony via HMY
          </a>
        </p>

        <p>
          <b>Token (code): ONE</b> <br />
          <b>Block rate: ≈2 sec.</b> <br />
          <b>Epoch time: ≈18h</b> <br />
          <b>Percent of the supply staked: >41% (in March 2021)</b>
        </p>

        <h2 class="fs-">Why to stake Harmony with Everstake?</h2>
        <p>
          "Everstake is built by professionals who have been enthusiasts in
          blockchain and cryptocurrencies for several years so far. We have
          great hands-on experience in building blockchain products of all
          kinds, ranging from small developer tools and comfortable mobile
          wallets to exchanges and sophisticated enterprise-level blockchain
          tools for businesses. We have experienced software and hardware
          specialists who built us staking machines for all best DPoS
          blockchains. We offer continuity and care about the loyalty of our
          customers, who can stake any coin with us, with the same level of
          transparency, stability of rewards, and comfort."
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

        <p>Got issues? We’re here to help</p>
        <p>
           <a
            target="_blank"
            href="https://t.me/everstake_chat"
          >
            Whenever there’s a problem, don’t hesitate to contact our friendly support team!
          </a>
        </p>

        <p>
          <a
            target="_blank"
            href="https://everstake.one/learn-about-staking-wiki/harmony"
          > Check our Learning Center
          </a>
          for more information on Harmony</p>
      </template>
    </DelegationInstructions>

    <Faqs :faq="faq" />

    <!--    <b-card class="text-center" :header="$t('common.subscribe')" v-if="!isUserLoggedIn">-->
    <!--      <p class="mb-0">-->
    <!--        {{ $t('coinPages.subscribeToNewsletter', {coinName}) }}-->
    <!--      </p>-->
    <!--    </b-card>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Harmony from '@/assets/img/coins-presentation/harmony.svg';
import LoadingCard from '@/components/LoadingCard.vue';
import AddressCard from '@/components/address/AddressCard.vue';
import CoinStats from '@/components/coin-page/CoinStats.vue';
import IncomeCalculation from '@/components/coin-page/IncomeCalculation.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import stakingInfoGenerator from '@/plugins/mixins/stakingInfoGenerator';
import Faqs from '@/components/coin-page/Faqs.vue';

export default {
  name: 'Harmony',
  metaInfo: {
    title: 'Harmony staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content:
          'Learn how to stake Harmony to grow your ONE stake and yield. Start delegating ONE tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Harmony staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content:
          'Learn how to stake Harmony to grow your ONE stake and yield. Start delegating ONE tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Harmony staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Learn how to stake Harmony to grow your ONE stake and yield. Start delegating ONE tokens with Everstake delegate today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter, stakingInfoGenerator],
  components: {
    LoadingCard,
    AddressCard,
    CoinStats,
    IncomeCalculation,
    DelegationInstructions,
    Faqs,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.one.name,
      coinIcon: Harmony,
      delegationAddress: constants.COINS_MAP.one.delegationAddress,
      fee: constants.COINS_MAP.one.fee,
      yearlyEarning: constants.COINS_MAP.one.yearlyEarning,
      faq: [
        {
          question: 'What is Harmony staking?',
          answer: `
           In simple words, Harmony staking can be compared to a bank deposit, where you delegate (delegation means 
            bonding with the smart contract, not actual transferring in this case) your Harmony tokens to a particular network 
            validator to empower the network decentralization, security, and performance. 
            For this initiative, the network rewards individuals that staked their ONE tokens.
          `,
        },
        {
          question:
            'Why to Stake? – Stake to secure the network and to earn reward!',
          answer: `
           Harmony Protocol is a Proof-of-Stake blockchain which means the security of the network is protected by staked tokens. 
            ONE token is the native token that’s accepted for staking. Potential node runners need to stake a certain amount 
            of ONE token to be elected as a validator. ONE token holders are also able to delegate their ONE tokens to 
            existing validators to participate in the staking process. The more ONE token staked, the more secure the 
            network becomes. Elected validators who successfully sign blocks will receive block rewards in ONE tokens 
            as compensation for their services.
          `,
        },
        {
          question: 'What is the staking reward?',
          answer: `
           Staking in the mainnet brings you about 11-12% APY minus validator fee, which is calculated as percentage 
            of the block reward. For our delegators convenience, we have developed a Staking Rewards Calculator to 
            estimate potential benefits.

            The calculation of rewards is based on multiple factors such as: uptime, amount staked, keys used, vps reliability. 
            The validator takes their fee for running the software and its maintenance, which results in a percentage of the 
            block rewards. When you find that validator's fee is higher than average, this may be explained by a higher level of 
            service and responsibility, as well as safety and security measures taken.
          `,
        },
        {
          question: 'Is there a minimum amount to stake?',
          answer: `
           1000 ONE.
          `,
        },
        {
          question: 'What is the unstaking period?',
          answer: `
           7 epochs. Please be aware that during unstaking period you won't be receiving rewards.
          `,
        },
        {
          question: 'How do I keep a track of my rewards?',
          answer: `
           You can keep a track of rewards within a wallet. Currently, few wallets support ONE staking feature.
            Amongst them, Harmony One Wallet Chrome extension (desktop), Trust Wallet through Frontier (iOS), 
            Math Wallet and Frontier Wallet (both Android and iOS), Guarda Wallet (both mobile and desktop), Blits Wallet. 
            Please check our step-by-step Guides for more information.
          `,
        },
        {
          question: 'How can I compound my rewards?',
          answer: `
           To compound (add to a current stake), you have to claim your rewards first. You can claim rewards at 
            the end of each epoch. Once you've collected a minimum amount to stake (1000 ONE), you are able to compound those.
          `,
        },
        {
          question: 'Is it secure to delegate my Harmony tokens?',
          answer: `
           It’s very important to mention that staking doesn’t mean that you actually send your tokens to another 
            address, instead your Harmony gets locked up by the network until you decide to unfreeze it later on. 
            Once it’s locked, the cryptocurrency can’t be used for any other purpose, except staking that you 
            will be getting rewards for.
          `,
        },
        {
          question: 'Do I have a control over my staked ONE tokens?',
          answer: `
           Yes, you do have a full control of your tokens, it is just locked up by the network. Feel free to use 
            your tokens once you have unstaked them. Please be aware of the unstaking period.
          `,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
      isStakingInfoReady: 'isStakingInfoReady',
      stakingInfo: 'stakingService/stakingInfo',
      rates: 'ratesService/rates',
    }),
    coinCode() {
      return this.$_getCoinCode('one').toUpperCase();
    },
    currentCoin() {
      return this.$_getCoinCode('one');
    },
    coinStats() {
      if (
        Object.keys(this.stakingInfo).length === 0
        && Object.keys(this.rates).length === 0
      ) return [];
      return this.$_generateStakingInfo(
        this.currentCoin,
        this.stakingInfo,
        this.rates,
      );
    },
  },
  methods: {
    ...mapActions({
      requestRates: 'ratesService/requestRates',
      getStakingInfo: 'stakingService/getStakingInfo',
    }),
  },
  created() {
    this.getStakingInfo(this.currentCoin);
    this.requestRates({
      base_currencies: [this.currentCoin],
      quote_currencies: [this.$_getCoinCode('usd')],
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
