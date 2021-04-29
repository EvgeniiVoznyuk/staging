<template>
  <section class="mb-5">
    <AddressCard
      :name="coinName"
      :address="delegationAddress"
      :coinIcon="img">
      <template slot="main-title">
        {{ $t('icx.mainTitle') }}:
      </template>
      <template slot="main-subtitle">
        {{ $t('icx.mainSubtitle') }}
      </template>
      <template slot="address-card-footer">
        <div>
          <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-4">
            <i18n path="icx.voteAndGet">
              <template #percent>
                {{ yearlyEarning }}%
              </template>
            </i18n>
          </div>
        </div>
      </template>
    </AddressCard>

    <Calculator />

    <template v-if="isUserAddressAvailable">
      <b-row>
        <b-col cols="12"
             lg="6"
             class="d-flex"
             v-for="(addressData, index) in addressesData"
             :key="index">
          <UserAddressStats
            class="align-items-stretch min-sm-card-height"
            :coinName="coinName"
            :userAddressTableData="addressData">
          </UserAddressStats>
        </b-col>
      </b-row>
      <RewardsChartNew  :currentCoinName="coinName"></RewardsChartNew>
      <RewardsHistoryTableNew :currentCoinName="coinName"></RewardsHistoryTableNew>
    </template>

    <div class="d-flex justify-content-between flex-column flex-lg-row">
<!--      href="#whyStakeIcon"-->
      <b-btn
        tag="a"
        v-scroll-to="'#whyStakeIcon'"
        variant="warning"
        size="lg"
        class="mb-3 mb-lg-0 mr-lg-3 w-100"
      >
        {{ $t('icx.clickToKnowIcon') }}
      </b-btn>
<!--      href="#whyVoteForEverstake"-->
      <b-btn
        tag="a"
        v-scroll-to="'#whyVoteForEverstake'"
        variant="outline-warning"
        size="lg"
        class="w-100"
      >
        {{ $t('icx.clickToKnowEverstake') }}
      </b-btn>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddressCard from '@/components/address/AddressCard.vue';
import Calculator from '@/components/icon-sections/Calculator.vue';
import UserAddressStats from '@/components/coin-page/UserAddressStats.vue';
import RewardsChartNew from '@/components/coin-page/RewardsChartNew.vue';
import RewardsHistoryTableNew from '@/components/coin-page/RewardsHistoryTableNew.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import stakingInfoGenerator from '@/plugins/mixins/stakingInfoGenerator';
import constants from '@/constants';

export default {
  name: 'TopSection',
  mixins: [coinGetter, stakingInfoGenerator],
  components: {
    AddressCard,
    Calculator,
    UserAddressStats,
    RewardsChartNew,
    RewardsHistoryTableNew,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.icx.name,
      delegationAddress: constants.COINS_MAP.icx.delegationAddress,
      img: constants.COINS_MAP.icx.img,
      fee: constants.COINS_MAP.icx.fee,
      yearlyEarning: constants.COINS_MAP.icx.yearlyEarning,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
      addressesData: 'addressService/addressesData',
      rates: 'ratesService/rates',
      stakingInfo: 'stakingService/stakingInfo',
      isUserAddressAvailable: 'addressService/isUserAddressAvailable',
      availableAddresses: 'addressService/availableAddresses',
      isAddressesReady: 'isAddressesReady',
      isStakingInfoReady: 'isStakingInfoReady',
    }),
    coinCode() {
      return this.currentCoin.toUpperCase();
    },
    currentCoin() {
      return this.$_getCoinCode('icx');
    },
    coinStats() {
      if (Object.keys(this.stakingInfo).length === 0
          && Object.keys(this.rates).length === 0) return [];
      return this.$_generateStakingInfo(this.currentCoin, this.stakingInfo, this.rates);
    },
  },
  methods: {
    ...mapActions({
      getAddressesData: 'addressService/getAddressesData',
      requestRates: 'ratesService/requestRates',
      getStakingInfo: 'stakingService/getStakingInfo',
      requestRewardsByPeriod: 'rewardsServiceNew/requestRewardsByPeriod',
      requestDailyTotalRewards: 'rewardsService/requestDailyTotalRewards',
    }),
  },
  mounted() {
    this.getStakingInfo(this.currentCoin);
    this.requestRates({
      base_currencies: [this.currentCoin],
      quote_currencies: [this.$_getCoinCode('usd')],
    });
    if (this.isUserLoggedIn) {
      // Needed for addresses stats
      (async () => {
        await this.getAddressesData([this.currentCoin]);
        this.requestDailyTotalRewards({ addresses: this.availableAddresses, currency: this.currentCoin });
        if (this.isUserAddressAvailable) {
          this.requestRewardsByPeriod({
            coinName: this.coinName.toLowerCase(),
            params: {
              by: 'month',
              to: this.$moment(this.$moment().endOf('day')).utc().unix(),
              from: this.$moment(this.$moment().startOf('day').subtract(30, 'months')).utc().unix(),
              delegators: this.availableAddresses,
              validators: [constants.COINS_MAP[`${this.currentCoin}`].delegationAddress],
            },
          });
        }
      })();
    }
  },
};
</script>

<style scoped>

</style>
