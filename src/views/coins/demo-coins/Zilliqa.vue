<template>
  <div class="coin" data-view>
    <b-row>
      <b-col>
        <AddressCard
          :name="coinName"
          :coinIcon="coinIcon"
          :address="delegationAddress"
          :isAddAddressDisabled="true"
        >
          <template slot="main-title">
            Delegate to Everstake:
          </template>
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

    <Faqs :faq="faq" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AddressCard from '@/components/address/AddressCard.vue';
import constants from '@/constants';
import coinGetter from '@/plugins/mixins/coinGetter';
import Calculator from '@/components/zilliqa-sections/Calculator.vue';
import Faqs from '@/components/coin-page/Faqs.vue';

export default {
  name: 'Zilliqa',
  metaInfo: {
    title: 'Zilliqa Delegation with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content:
          'Learn how to Delegate Zilliqa to grow your Zilliqa stake and yield. Start delegating Ethereum2 with Everstake baker today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Zilliqa Delegation with Everstake baker',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content:
          'Learn how to Delegate Zilliqa to grow your Polygon stake and yield. Start delegating Zilliqa with Everstake baker today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Zilliqa Delegation with Everstake baker',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Learn how to Delegate ETH2 to grow your Zilliqa stake and yield. Start delegating Zilliqa with Everstake baker today in just a few steps.',
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
      coinName: constants.COINS_MAP.zilliqa.name,
      coinIcon: constants.COINS_MAP.zilliqa.img,
      delegationAddress: constants.COINS_MAP.zilliqa.delegationAddress,
      fee: constants.COINS_MAP.zilliqa.fee,
      yearlyEarning: constants.COINS_MAP.zilliqa.yearlyEarning,
      faq: [
        {
          question: 'What is staking? How will it help me?',
          answer: `
           Staking tokens is a great way to earn passive income - just as you might do via a bank's savings and interest account. Staking will push Zilliqa's network's decentralisation to a new level while bringing more benefits to our wider community.

          The APY for non-custodial staking on Zilliqa will depend on the total amount of $ZIL in circulation being staked - e.g., if 80% of the total amount of $ZIL in circulation is staked, users can expect an APY of approximately 6%.
          `,
        },
        {
          question: 'Are any Seed Node Operators (SSN) supporting Zilliqa`s non-custodial staking project?',
          answer: `
           Yes, we have five confirmed SSN providers so far, who are reputed and trusted within our ecosystem. These include Moonlet.io, Shardpool.io, ViewBlock, Zillacracy and Zilliqa's own hosted node. Each charges a different commission rate, which is subject to changes. We recommend users check rates from their chosen provider prior to staking.

          We'll continue to reveal new SSN additions as the non-custodial staking project progresses.
          `,
        },
        {
          question: 'How many rewards will I get if I delegate??',
          answer: `
           Please use the Staking Rewards Calculator to determine your estimates. https://wallet.matic.network/staking-rewards
          `,
        },
        {
          question: 'What is an active vs. an inactive node?',
          answer: `
           An active node is one that has fully staked the minimum stipulated tokens to begin the staking cycle - in this case, our SSN providers must have min 10 million $ZIL to be "active." Until that point, they remain "inactive" and do use the tokens as security.
          `,
        },
        {
          question: 'What are governance ZIL (gZIL)? How do I earn it and what can I use it for?',
          answer: `
           gZIL are new ZRC-2 compliant fungible tokens that can be earned alongside staking rewards. gZIL will only be issued when a user withdraws their $ZIL stakings rewards from the designated SSN operator. For every 1,000 $ZIL earned as staking reward, 1 gZIL will be issued (i.e. 0.001 gZIL will be issued for every 1 $ZIL staking reward).

            gZIL is essentially a governance token, which empowers long-term token holders and frequent engagers to become a decision-maker in the Zilliqa ecosystem. This can be compared to a DAO- like structure where gZIL holders can vote and make decisions on community and partner projects powered by $ZIL.

            gZIL derives part of its value from scarcity. Hence, it will only be issued for 1 year starting from the launch of non-custodial $ZIL staking (14 October 2020), with the objective of incentivising early birds. Zilliqa will control minting and distribution of gZIL, capping it at 722,700.
          `,
        },
        {
          question: 'If I don`t want to use my gZIL to be a decision-maker on the Zilliqa network, can I exchange them?',
          answer: `
          Yes, users can swap gZIL for other ZRC-2 tokens via our newly launched decentralised exchange ZilSwap, or contribute to its liquidity pool(s) in return for rewards.
          `,
        },
        {
          question: 'What is this "unbonding period" for my staked $ZIL? Can I withdraw my staked $ZIL at any point of time?',
          answer: `
           That will be decided by our staking partners. They will set the prerequisites such that they can meet the minimum stake amount (10 million $ZIL per staked seed node) in order to continue serving as staked seed node operators. However, at the contract-level, a seed node operator can withdraw its stake at any point in time.
          `,
        },
        {
          question:
            'Is there a minimum amount of ZILs needed to stake?',
          answer: `
          Yes. You need at least 10 ZIL to be able to participate in staking.
          `,
        },
        {
          question: 'What is uncapped staking?',
          answer: `
           Uncapped means there is no upper limit on the amount of ZIL that can be staked into an SSN (capped staking, proposed in ZIP-3 was not financially viable for stakers, and would have resulted in lower yields).
          `,
        },
        {
          question: 'What does it mean when my rewards are buffering?',
          answer: `
           "Buffering" means your ZIL is in line to be staked during the next reward cycle. One reward cycle is processed in around a day or 1800 DS blocks.
          `,
        },
        {
          question:
            'What kind of "ecosystem decisions" can gZIL holders make in the long term?',
          answer: `
           gZIL will be used for broader ecosystem governance. We will create a DAO-like structure through which gZIL holders can invest in community projects, with the longer-term goal of moving all ecosystem funding to the DAO and empowering the community to be decision-makers of the funded projects. The community holding gZILs will be able to vote on proposals alongside Zilliqa Research on making decisions. More on this will be released as a separate ZIP.
          `,
        },
        {
          question:
            'What gives gZIL its value?',
          answer: `
           gZIL derives its value from scarcity. Its minting and distribution will be capped at 722,700 for a period of 1 year. We encourage you to stake as early as possible to increase your chances of earning gZIL!.
          `,
        },
        {
          question: 'Is there a minimum amount of ZILs needed to stake?',
          answer: `
           As a delegator, you must stake a minimum of 10 ZIL. This to ensure that the gas needed to withdraw the reward does not outweigh the reward itself.
            Quick tip: This also applies to staking back rewards for compounded returns, i.e., we recommend you wait until you have earned at least 10 ZIL to re-stake. Gas required to stake your initial $ZIL or stake back your rewards will be roughly 1 ZIL.
          `,
        },
        {
          question: 'If a node goes down, do I lose my money?',
          answer: `
           In the current model, if a node goes down, your stake does not get impacted. You will not earn the reward but your stake is intact.
          `,
        },
      ],
    };
  },
  computed: {
    coinCode() {
      return this.currentCoin.toUpperCase();
    },
    currentCoin() {
      return this.$_getCoinCode('zilliqa');
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
