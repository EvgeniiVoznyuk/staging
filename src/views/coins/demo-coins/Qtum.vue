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
            Delegate to Everstake super staker:
          </template>
          <template slot="main-subtitle">
            {{ $t('coinPages.delegateCoinWithEverstake', {coinCode}) }}
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

    <DelegationInstructions>
      <template slot="instructions">
        <p>
          At the end of August, Qtum developers released a large-scale update that allowed all holders to stake and delegate QTUM coins.
          The platform launches offline betting, with which the user can delegate the address of a non-staking wallet to a Superstaker – this is the name of validators in the Qtum network.
          At the same time, the user retains full control over their coins and private keys, which is the main feature of Qtum offline staking.
          In other words, users only delegate addresses, not the coins themselves, which greatly improves security.
        </p>

        <p>
          <a href="https://medium.com/everstake/how-to-stake-qtum-qtum-complete-guide-b015a3facd28" target="_blank">How to stake QTUM via Qtum Core wallet</a>
        </p>

        <p>
          <a href="https://medium.com/everstake/how-to-stake-qtum-qtum-with-qtum-web-wallet-a-simple-guide-for-beginners-5ec345862cef" target="_blank" rel="noopener noreferrer">How to stake QTUM via Web Qtum wallet</a>
        </p>
      </template>
    </DelegationInstructions>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Qtum from '@/assets/img/coins-presentation/qtum.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import Calculator from '@/components/qtum-sections/Calculator.vue';

export default {
  name: 'Qtum',
  metaInfo: {
    title: 'QTUM staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake QTUM to grow your balance and yield. Start staking with Everstake PoS validation service provider today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'QTUM staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake QTUM to grow your balance and yield. Start staking with Everstake PoS validation service provider today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'QTUM staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake QTUM to grow your balance and yield. Start staking with Everstake PoS validation service provider today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    Calculator,
    AddressCard,
    DelegationInstructions,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.qtum.name,
      coinIcon: Qtum,
      delegationAddress: constants.COINS_MAP.qtum.delegationAddress,
      fee: constants.COINS_MAP.qtum.fee,
      yearlyEarning: constants.COINS_MAP.qtum.yearlyEarning,
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
