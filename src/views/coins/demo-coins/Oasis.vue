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
            Stake with Everstake:
          </template>
          <template slot="main-subtitle">
            your trusted staking provider
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
import Oasis from '@/assets/img/coins-presentation/oasis.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import Calculator from '@/components/oasis-sections/Calculator.vue';
import Faqs from '@/components/coin-page/Faqs.vue';

export default {
  name: 'Oasis',
  metaInfo: {
    title: 'Rose staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake Oasis to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Rose staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake Oasis to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Rose staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake Rose.',
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
      coinName: constants.COINS_MAP.rose.name,
      coinIcon: Oasis,
      delegationAddress: constants.COINS_MAP.rose.delegationAddress,
      yearlyEarning: constants.COINS_MAP.rose.yearlyEarning,
      faq: [
        {
          question: 'What is Oasis?',
          answer: `
            <p>Oasis is a decentralized privacy-preserving platform for cloud computing that allows safe data sharing and ownership enabling computationally complex applications.</p>
            <p><a href="https://docs.oasis.dev/oasis-network-primer/#why-the-oasis-network" target="_blank" rel="noopener noreferrer">More info</a></p>
          `,
        },
      ],
      fee: constants.COINS_MAP.rose.fee,
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
