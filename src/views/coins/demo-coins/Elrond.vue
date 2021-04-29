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
            Delegate to
            <a
              href="https://explorer.elrond.com/validators/everstake"
              target="_blank"
              rel="noopener noreferrer"
              >Everstake Company Validator</a
            >
          </template>
          <template slot="main-subtitle">
            your trusted staking provider
          </template>
          <template slot="address-card-footer">
            <!--            <a href="https://rex.atticlab.net/" rel="noopener noreferrer" target="_blank"></a>-->
            <div>
              <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-3">
                {{ $t("common.ourFee") }} {{ fee }}
              </div>
              <!-- <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-3">
                {{ $t('common.yield') }} {{ yearlyEarning }}%
              </div> -->
            </div>
          </template>
        </AddressCard>
      </b-col>
    </b-row>

    <!-- <Calculator /> -->

    <DelegationInstructions>
      <template slot="instructions">
        <p><b>How to stake Elrond</b></p>
        <p>
          Currently, <b>Elrond</b> is working on the implementation staking
          process in its blockchain.
        </p>
        <p>
          Everstake is taking part in the testnet and is supporting the
          development. We will add the Elrond staking once it is operational.
        </p>
        <p>
          TENTATIVE date for Delegation Manager activation: 22 March. This means
          Staking Providers can create staking pools. Delegating to them however
          will yield no rewards until the Max Nodes increase.
        </p>
        <p>
          TENTATIVE date for Max Nodes increase: 05 April. This means staking
          pools will be able to bring their nodes online and start earning
          rewards.
         </p>

        <p><b>Stay tuned</b></p>
        <p>
          Once implemented, Elrond staking will be a profitable process of
          verification of new transactions.
        </p>
        <p>
         Currently,
          <a
            href="https://explorer.elrond.com/identities/everstake"
            target="_blank"
          >
            we have launched 20 nodes
          </a>
          in mainnet and are ready to launch more nodes in the future. If you
          are interested, please contact us via
           <a href="mailto:inbox@everstake.one">inbox@everstake.one</a>.
        </p>
      </template>
    </DelegationInstructions>

    <Faqs :faq="faq" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Elrond from '@/assets/img/coins-presentation/elrond.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import Calculator from '@/components/elrond-sections/Calculator.vue';
import Faqs from '@/components/coin-page/Faqs.vue';

export default {
  name: 'Elrond',
  metaInfo: {
    title: 'Elrond staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content:
          'Learn how to stake Elrond to grow your balance and yield. Start staking with Everstake PoS validation service provider today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Elrond staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content:
          'Learn how to stake Elrond to grow your balance and yield. Start staking with Everstake PoS validation service provider today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Elrond staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Learn how to stake Elrond to grow your balance and yield. Start staking with Everstake PoS validation service provider today in just a few steps.',
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
      coinName: constants.COINS_MAP.egld.name,
      coinIcon: Elrond,
      delegationAddress: constants.COINS_MAP.egld.delegationAddress,
      fee: constants.COINS_MAP.egld.fee,
      yearlyEarning: constants.COINS_MAP.egld.yearlyEarning,
      faq: [
        {
          question: 'What is Elrond?',
          answer: `
            <p>Elrond is a distributed transactional computation protocol which relies on a sharded state architecture and a secure Proof of Stake consensus mechanism.</p>
            <p>While most other blockchain networks require custom hardware and high energy consumption, Elrond runs on average computers.</p>
            <p>By employing sharding, a method of parallelizing data & transactions processing, Elrond’s performance will scale up with the number of computers joining the network, reaching more than 100.000 transactions per second while growing increasingly decentralized.</p>
            <p><a href="https://medium.com/everstake/what-is-elrond-and-how-important-is-this-project-for-the-blockchain-industry-940d40286e69" target="_blank" rel="noopener noreferrer">What is Elrond and how important is this project for the blockchain industry</a></p>
            <p><a href="https://medium.com/everstake/elrond-how-the-platform-works-and-what-beginners-need-to-know-62030817707c" target="_blank" rel="noopener noreferrer">How the platform works and what beginners need to know</a></p>
          `,
        },
        {
          question: 'Why stake on Elrond?',
          answer: `
            <p>All EGLD holders are incentivized to support the Elrond network, by locking their EGLD into a smart contract, contributing to reach the necessary economic security threshold, and earning rewards while delegating or running a validator node.</p>
          `,
        },
        {
          question: 'How is Elrond different?',
          answer: `
            <p>The Elrond network is the first to present a viable solution where all the three aspects of sharding - state, network and transactions - have been implemented at once.</p>
            <p>Combined with its “Adaptive” component, this novel architecture allows for dynamic network configuration to maintain a high level of security while scaling with demand.</p>
            <p>In addition to scaling through sharding, Elrond also approaches the consensus problem with a mechanism called Secure Proof of Stake, which mitigates potential attack vectors when compared to Proof of Work, while also enabling large throughput and fast execution.</p>
            <p>By solving some of the hardest consensus and sharding problems in the blockchain space, Elrond is able to provide a very high level of performance on a network made of inexpensive computers, resulting in a very low cost per transaction.</p>
            <p>In addition to performance and cost, Elrond also stands out through the quality of the developer experience and the resulting boost in usability on the end-user side.</p>
            <p><a href="https://medium.com/everstake/elrond-builds-the-internet-of-blockchains-right-now-724b03772c7f" target="_blank" rel="noopener noreferrer">Elrond builds the internet-scale blockchain right now</a></p>
            <p><a href="https://medium.com/everstake/opportunities-that-elrond-opens-up-for-defi-22a64d466c19" target="_blank" rel="noopener noreferrer">Opportunities that Elrond opens up for DeFi</a></p>
            <p><a href="https://medium.com/everstake/what-is-esdt-in-the-elrond-blockchain-a-simple-explanation-6b2efcdadd8f" target="_blank" rel="noopener noreferrer">What is ESDT in the Elrond blockchain</a></p>
            <p><a href="https://medium.com/everstake/maiar-elronds-mobile-wallet-1b774aada252" target="_blank" rel="noopener noreferrer">Maiar: Elrond’s mobile wallet</a></p>
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

<style lang="scss" scoped>
</style>
