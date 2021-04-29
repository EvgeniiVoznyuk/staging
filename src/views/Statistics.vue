<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col
        v-if="!isAllStakingInfoReady"
        cols="12"
        lg="6"
        class="d-flex">
        <LoadingCard></LoadingCard>
      </b-col>

      <b-col
        v-else
        cols="12"
        lg="6"
        class="d-flex"
        v-for="(coin, index) in coinsStats"
        :key="index">
        <CoinStats
          class="align-items-stretch"
          :coinName="$helpers.capitalize(index)"
          :statsTableData="coin">
        </CoinStats>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CoinStats from '@/components/coin-page/CoinStats';
import stakingInfoGenerator from '@/plugins/mixins/stakingInfoGenerator';
import LoadingCard from '@/components/LoadingCard';

export default {
  name: 'Statistics',
  mixins: [stakingInfoGenerator],
  components: {
    CoinStats,
    LoadingCard,
  },
  data() {
    return {
      xtzStakingInfo: {},
      iostStakingInfo: {},
      atomStakingInfo: {},
      // irisStakingInfo: {},
      // dashStakingInfo: {},
      // iotxStakingInfo: {},
      icxStakingInfo: {},
      oneStakingInfo: {},
      isAllAddressesLoading: false,
      coinCodes: [
        'xtz',
        'iost',
        'atom',
        // 'iris',
        // 'dash',
        // 'iotx',
        'icx',
        'one',
      ],
    };
  },
  computed: {
    ...mapGetters({
      rates: 'ratesService/rates',
      isRatesLoading: 'ratesService/isRatesLoading',
    }),
    coinsStats() {
      if (!this.isAllStakingInfoReady) return {};

      return {
        tezos: this.$_generateStakingInfo('xtz', this.xtzStakingInfo, this.rates),
        iost: this.$_generateStakingInfo('iost', this.iostStakingInfo, this.rates),
        cosmos: this.$_generateStakingInfo('atom', this.atomStakingInfo, this.rates),
        // irisnet: this.$_generateStakingInfo('iris', this.irisStakingInfo, this.rates),
        // dash: this.$_generateStakingInfo('dash', this.dashStakingInfo, this.rates),
        // iotx: this.$_generateStakingInfo('iotx', this.iotxStakingInfo, this.rates),
        icon: this.$_generateStakingInfo('icx', this.icxStakingInfo, this.rates),
        harmony: this.$_generateStakingInfo('one', this.oneStakingInfo, this.rates),
      };
    },
    isAllStakingInfoReady() {
      return !this.isAllAddressesLoading && !this.isRatesLoading;
    },
  },
  methods: {
    ...mapActions({
      requestRates: 'ratesService/requestRates',
      getStakingInfo: 'stakingService/getStakingInfo',
    }),
    async getAllStakingStats() {
      try {
        this.isAllAddressesLoading = true;

        await Promise.all(this.coinCodes.map(async (coinCode) => {
          const stakingInfoResp = await this.$stakingServiceApi.getStakingInfo(coinCode);
          if (stakingInfoResp) {
            this[`${coinCode}StakingInfo`] = stakingInfoResp.data;
          }
        }));
        // await this.requestRates({});
      } catch (err) {
        this.$errors.handleErrors(err);
      } finally {
        this.isAllAddressesLoading = false;
      }
    },
  },
  mounted() {
    this.getAllStakingStats();
    this.requestRates({});
  },
};
</script>

<style lang="scss" scoped>

</style>
