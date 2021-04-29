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
            Vote for Attic Lab: atticlabtlbp
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
import Telos from '@/assets/img/coins-presentation/telos.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import Calculator from '@/components/telos-sections/Calculator.vue';
import Faqs from '@/components/coin-page/Faqs.vue';

export default {
  name: 'Telos',
  metaInfo: {
    title: 'Telos staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake Telos to grow your balance and yield. Start staking with Everstake PoS validation service provider today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Telos staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake Telos to grow your balance and yield. Start staking with Everstake PoS validation service provider today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Telos staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake Telos to grow your balance and yield. Start staking with Everstake PoS validation service provider today in just a few steps.',
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
      coinName: constants.COINS_MAP.tlos.name,
      coinIcon: Telos,
      delegationAddress: constants.COINS_MAP.tlos.delegationAddress,
      fee: constants.COINS_MAP.tlos.fee,
      yearlyEarning: constants.COINS_MAP.tlos.yearlyEarning,
      faqs: [
        {
          question: 'How to stake Telos (TLOS)?',
          answer: `
            <p>​Staking Telos is done in three easy steps through the Telos SQRL Wallet.</p>
            <ul>
             <li>Vote for <b>Attic Lab</b>: atticlabtlbp and at least 21 Block Producer inside the official wallet</li>
             <li>Follow the TREX tab and deposit the desired amount of Telos using the ‘Deposit TLOS for Lending’ button.</li>
             <li>Select ‘Lend Deposited Telos’ and lend the amount Telos you wish to stake.</li>
            </ul>
            <p>That is it, good luck and congratulations on your returns!</p>
          `,
        },
        {
          question: 'How much can I earn staking Telos?',
          answer: `
            <p>The individual TLOS rewards depends on the Total Staked %.</p>
            <p>Every 30 minutes a reward of 685 TLOS is distributed between all participants.</p>
            <p>In our Staking Calculator you can play with the Total Staked to see the reward under certain assumptions.</p>
          `,
        },
        {
          question: 'What are the requirements to stake Telos?',
          answer: `
            <p>In order to get the staking rewards, users must either vote block producers or proxy their vote.</p>
          `,
        },
        {
          question: 'Is there any risk to stake Telos?',
          answer: `
            <p>Staking Telos is safe as long you protect your private keys. There is no risk of slashing.</p>
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
