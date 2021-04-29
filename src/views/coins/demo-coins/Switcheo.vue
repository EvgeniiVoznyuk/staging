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
            Stake now
          </template>
          <template slot="address-card-footer">
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

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">
          1. Select a trusted validator - Everstake
        </h2>
        <p>
          Stake your SWTH with validators that are available for staking tokens with.
        </p>
        <h2 class="fs-20">
          2. Stake SWTH
        </h2>
        <p>
          Enter the amount of <a href="https://stake.switcheo.org/stake" target="_blank" rel="noopener noreferrer">SWTH tokens you want to stake</a>
        </p>
        <h2 class="fs-20">
          3. Start earning rewards
        </h2>
        <p>
          You will receive new rewards every second.
        </p>
        <p>
          <a
            href="https://link.medium.com/cSx619JyFeb"
            target="_blank"
          >
            How to stake Switcheo (SWTH) with Ledger
          </a>
        </p>
        <p>
          <a
            href="https://link.medium.com/cd1Wb9QyFeb"
            target="_blank"
          >
            How to Buy and Stake $SWTH on Demex via MetaMask Wallet
          </a>
        </p>
       <p>
          <a
            href="https://link.medium.com/cUoNfnXyFeb"
            target="_blank"
          >
            How to stake Switcheo (SWTH) on TradeHub
          </a>
        </p>
      </template>
    </DelegationInstructions>

    <Faqs :faq="faq" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Switcheo from '@/assets/img/coins-presentation/switcheo.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import Calculator from '@/components/switcheo-sections/Calculator.vue';
import Faqs from '@/components/coin-page/Faqs.vue';

export default {
  name: 'Switcheo',
  metaInfo: {
    title: 'Switcheo staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake Switcheo to grow your stake and yield. Start delegating Switcheo with Everstake delegate today in just a few steps.',
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
      coinName: constants.COINS_MAP.swth.name,
      coinIcon: Switcheo,
      delegationAddress: constants.COINS_MAP.swth.delegationAddress,
      yearlyEarning: constants.COINS_MAP.swth.yearlyEarning,
      fee: constants.COINS_MAP.swth.fee,
      faq: [
        {
          question: 'What is Switcheo?',
          answer: `
            <p>
              Switcheo Network is the first decentralized cryptocurrency exchange on the NEO blockchain which now allows trading of EOS, Ethereum and NEO tokens.
            </p>
            <p>
              Our focus is on building an open and decentralized financial network with a world-class trading experience, where users are able to trade freely and securely with one another.
            </p>
            <img src="https://pbs.twimg.com/media/EgLfviVUYAEh2KR?format=png&name=medium" alt="Switcheo TradeHub">
          `,
        },
        {
          question: 'What does it mean by staking my SWTH?',
          answer: `
            <p>Staking SWTH is the process of locking your Switcheo Tokens to
             support the security and operations of Switcheo TradeHub.
            While locking your SWTH, you also assign the intrinsic voting power
            of these tokens to one or more validators of your choice,
            who will act on your behalf.</p>
            <p>Since not everyone can run their own hardware, only validators run a full
             node and participate in consensus by voting on and committing
              new blocks to the Switcheo TradeHub side-chain.</p>
            <p>This process is known is sometimes also called bonding or delegating.</p>
          `,
        },
        {
          question: 'What are the rewards for staking?',
          answer: `
            <p>Staking rewards consist:</p>
            <ul>
              <li>
                “Block Rewards”, which are SWTH tokens generated by the network with each block through an inflation curve.
              </li>
              <li>
                “Fee Rewards”, which are the fees that traders and other network participants pay for using the network.
              </li>
            </ul>
            <p>
              More details can be found <a href="https://blog.switcheo.network/enhancing-the-switcheo-token/" target="_blank" rel="noopener noreferrer">here</a>.
            </p>
            <p>
              All rewards are distributed in proportion to the amount staked.
            </p>
            <p>
              For example, if 100,000 tokens are set to be distributed through block rewards,
               and 50% of SWTH tokens are bonded, all 100,000 tokens will go to the 50% of stakers evenly.
            </p>
            <p>
              In the simplest case where you are the only staker, all 100,000 tokens will go to you.
            </p>
          `
        },
        {
          question: 'Is there a minimum staking period?',
          answer: `
            <p>There is no minimum staking period. However, there is a 30 day unbonding duration should you wish to unstake your tokens.</p>
            <p>During this period, rewards will not be accrued by you.</p>
            <p>Furthermore, during phase 0 of Switcheo TradeHub launch, tokens cannot be withdrawn back to the Neo blockchain, and trading will not be activated.</p>
          `
        },
        {
          question: 'What are the risks of staking?',
          answer: `
            <p>Validators have no control over your staked SWTH tokens and your SWTH tokens remains in your wallet.</p>
            <p>However, your staked tokens can be slashed (burnt) in the event the validator you delegated tokens to commits a "Byzantine fault".</p>
            <p>This can happen if the validator goes down for too long (>10% of blocks missed in 36000 blocks), or double-signs a block (signs and broadcasts two different blocks with the same height). The penalty is 0.1% and 5% respectively.</p>
            <p>Validators should therefore be chosen with care based on their validation history that can be viewed from the TradeHub's chain explorer and the Switcheo staking interface.</p>
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
  methods: {
    ...mapActions({
      requestRates: 'ratesService/requestRates',
    }),
  },
};
</script>

<style scoped>

</style>
