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
            <a href="https://node.nebulas.io/detail/everstake" target="_blank">Vote for Everstake: Everstake Node</a>
          </template>
          <template slot="main-subtitle">
            Your trusted staking partner
          </template>
          <template slot="address-card-footer">
            <div class="d-block d-md-inline-block mb-2 mb-md-0">
              {{ $t('common.yield') }} {{ yearlyEarning }}%
              We share 85% of rewards. Payouts every Monday
            </div>
          </template>
        </AddressCard>
      </b-col>
    </b-row>

    <Calculator />

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">
          {{ $t('coinPages.getReady', {coinName} )}}
        </h2>
        <p>
          At the moment there are many cryptocurrency wallets that support holding, sending and receiving Nebulas(NAS) tokens,
          and you can find them following this <a href="https://nebulas.io/wallets.html" target="_blank">link</a>
        </p>
        <p>
          NAS nano pro wallet that we’ll be using for staking is available for download both on the <a href="https://apps.apple.com/us/app/nas-nano-pro/id1441776793%26mt%3D8" target="_blank">iOS</a> and
          <a href="https://play.google.com/store/apps/details?id=io.nebulas.wallet.android&hl=en_US" target="_blank">Android</a> platforms.
        </p>
        <p>
          <a href="https://medium.com/everstake/nebulas-staking-guide-via-nas-nano-pro-ac69357e299d" target="_blank">Nebulas Staking Guide Via NAS nano pro</a>
        </p>
      </template>
    </DelegationInstructions>

    <FAQ :accordionOneTitle="$t('harmony.faq.1.question')"
         :accordionOneTxt="$t('harmony.faq.1.answer')"
         :accordionTwoTitle="$t('harmony.faq.2.question')"
         :accordionTwoTxt="$t('harmony.faq.2.answer')"
         class="mb-4"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Nebulas from '@/assets/img/coins-presentation/nebulas.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import FAQ from '@/components/coin-page/FAQ.vue';
import Calculator from '@/components/nebulas-sections/Calculator.vue';

export default {
  name: 'Nebulas',
  metaInfo: {
    title: 'Nebulas staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake Nebulas to grow your NAS stake and yield. Start delegating NAS tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Nebulas staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake Nebulas to grow your NAS stake and yield. Start delegating NAS tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Nebulas staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake Nebulas to grow your NAS stake and yield. Start delegating NAS tokens with Everstake delegate today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    Calculator,
    AddressCard,
    DelegationInstructions,
    FAQ,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.nas.name,
      coinIcon: Nebulas,
      delegationAddress: constants.COINS_MAP.nas.delegationAddress,
      yearlyEarning: constants.COINS_MAP.nas.yearlyEarning,
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
