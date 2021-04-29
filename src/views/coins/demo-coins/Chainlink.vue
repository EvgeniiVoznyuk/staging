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
            Chainlink Node Operator Account: Everstake
          </template>
          <template slot="main-subtitle">
            Your trusted staking provider
          </template>
          <template slot="address-card-footer">
            <div v-if="fee" class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-3">
              {{ $t('common.ourFee') }} {{ fee }}
            </div>
            <div v-if="yearlyEarning" class="d-block d-md-inline-block mb-2 mb-md-0">
              {{ $t('common.yield') }} {{ yearlyEarning }}%
            </div>
          </template>
        </AddressCard>
      </b-col>
    </b-row>

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">
          More about Chainlink and Everstake
        </h2>
        <p>
          Everstake deployed its own Oracle node within the Chainlink infrastructure. The more nodes involved in supporting the network, the more secure it is, and the information processed becomes more accurate.
        </p>
        <p>
          Thus, the Everstake team contributes to the development of the ecosystem and together with Chainlink creates a secure environment for financial transactions on the blockchain.
        </p>
        <p>
          We are happy to inform you that Oracle Everstake has successfully processed <a href="https://stake.is/M/" target="_blank" rel="noopener noreferrer">more than 35 thousand transactions</a> for the Chainlink blockchain network. We are not going to stop there and will continue to support and help the project’s infrastructure to improve.
        </p>
        <p><a href="https://medium.com/everstake/what-is-chainlink-and-why-is-this-blockchain-platform-so-interesting-7456d2771569" target="_blank" rel="noopener noreferrer">More info</a></p>
      </template>
    </DelegationInstructions>

    <Faqs :faq="faq" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Chainlink from '@/assets/img/coins-presentation/chainlink.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import Faqs from '@/components/coin-page/Faqs.vue';

export default {
  name: 'Chainlink',
  metaInfo: {
    title: 'Chainlink staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake Chainlink to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Chainlink staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake Chainlink to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Chainlink staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake Chainlink to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    AddressCard,
    DelegationInstructions,
    Faqs,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.link.name,
      coinIcon: Chainlink,
      delegationAddress: constants.COINS_MAP.link.delegationAddress,
      yearlyEarning: constants.COINS_MAP.link.yearlyEarning,
      faq: [
        {
          question: 'What is Chainlink?',
          answer: `
            <p>Chainlink connects smart contracts to real world data, events and payments. In order to prevent a single point of failure, Chainlink is operated by a decentralized oracle network. To learn more, please see Chainlink's <a href="https://link.smartcontract.com/whitepaper" target="_blank" rel="noopener noreferrer">whitepaper</a>.</p>
          `,
        },
        {
          question: 'What are nore operators?',
          answer: `
            <p>Chainlink node operators bring external data directly to smart contracts. Since some smart contracts, in particular for DeFi, manage a lot of value, the external data they rely on must be accurate and reliable. Node operators need to bring industry best practices to managing their infrastructure.</p>
          `,
        },
        {
          question: 'How to stake Chainlink?',
          answer: `
            <p>THERE IS NO WAY! <a href="https://medium.com/everstake/how-to-stake-chainlink-link-664567ba4481" target="_blank" rel="noopener noreferrer">Take a look here</a></p>
          `,
        },
      ],
      fee: constants.COINS_MAP.link.fee,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
    coinCode() {
      return this.$_getCoinCode('link').toUpperCase();
    },
  },
};
</script>

<style scoped>

</style>
