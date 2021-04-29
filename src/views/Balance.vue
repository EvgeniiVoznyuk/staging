<template>
  <div class="animated fadeIn">
    <AddAddress :isSingleCoin="false"
                :coinsOptions="coinsOptions">
    </AddAddress>

    <b-card class="min-rewards-chart-height" no-body>
      <b-card-body class="d-flex flex-column">
        <b-row>
          <b-col sm="5">
            <h4 id="traffic" class="card-title mb-0">{{ $t('balance.stakingBalance') }}</h4>
          </b-col>
        </b-row>
        <div v-if="isBalanceHistoryLoading || !isAddressesReady" class="flex-grow-1 align-items-center d-flex">
          <CircleSpinner></CircleSpinner>
        </div>
        <div v-else-if="Object.keys(balanceHistory).length === 0"
             class="text-warning justify-content-center flex-grow-1 align-items-center d-flex">
          {{ $t('common.noChartData') }}
        </div>
        <LineChart chartId="main-chart-02"
                   class="chart-wrapper"
                   v-else
                   :datasets="balanceHistoryChartData"
                   :labels="balanceHistoryLabels"
                   style="height:300px; margin-top:40px;"
                   height="300">
        </LineChart>
      </b-card-body>
    </b-card>

    <b-card class="min-total-staking-height" no-body>
      <template v-slot:header>
        <h2 class="title title--small title--white mb-0">
          {{ $t('balance.totalStakingBalance') }}
        </h2>
      </template>
      <b-card-body class="d-flex flex-column">
        <b-row class="flex-grow-1 align-items-center d-flex">
          <CircleSpinner v-if="!isAddressesReady"></CircleSpinner>
          <b-col v-else-if="balancesByAddresses.length === 0">
            <div class="text-warning text-center">
              {{ $t('common.noData') }}
            </div>
          </b-col>
          <template v-else>
            <b-col cols="12"
                   md="6"
                   xl="3">
              <b-card class="card--alt mb-md-0">
                <div class="h4 text-uppercase">
                  {{ totalStakingAmountInUsd | formatUsd }} $
                </div>
                <div>
                  {{ $t('balance.stakedInBlockchains') }}
                </div>
              </b-card>
            </b-col>
            <b-col cols="12"
                   md="6"
                   xl="3">
              <b-card class="card--alt mb-0">
                <div class="h4 text-uppercase">
                  {{ totalStakingAmountInBtc | formatCrypto }} BTC
                </div>
                <div>
                  {{ $t('balance.stakedInBlockchains') }}
                </div>
              </b-card>
            </b-col>
          </template>
        </b-row>
      </b-card-body>
    </b-card>

    <b-card class="min-assets-height" no-body>
      <template v-slot:header>
        <h2 class="title title--small title--white mb-0">
          {{ $t('balance.allAssets') }}
        </h2>
      </template>
      <b-card-body class="d-flex flex-column">
        <b-row class="flex-grow-1 d-flex">
          <CircleSpinner v-if="!isAddressesReady" class="align-self-center"></CircleSpinner>
          <b-col v-else-if="balancesByAddresses.length === 0" class="flex-grow-1 d-flex align-items-center justify-content-center">
            <div class="text-warning text-center">
              {{ $t('common.noData') }}
            </div>
          </b-col>
          <b-col v-else
                 v-for="(coin, index) in balancesByAddresses"
                 :key="index"
                 class="flex-grow-1 d-flex"
                 cols="12"
                 md="6"
                 xl="3">
            <AssetWidget
              :currency="coin.currency"
              :amount="coin.amount"
              :amountInUsd="coin.amountInUsd"
              :yearlyEarning="coin.yearlyEarning"
              :tokenPrice="coin.tokenPrice"
              :variant="coin.variant"
              class="w-100 flex-grow-1"
              :coinShare="coin.coinShare">
            </AssetWidget>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LineChart from '@/components/LineChart.vue';
import AddAddress from '@/components/address/AddAddress.vue';
import AssetWidget from '@/components/AssetWidget.vue';
import constants from '@/constants';

export default {
  name: 'Balance',
  components: {
    LineChart,
    AddAddress,
    AssetWidget,
  },
  data() {
    return {
      selected: 'Month',
      coinsOptions: constants.AVAILABLE_COINS,
      balanceHistory: {},
      isBalanceHistoryLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
      balancesByAddresses: 'addressService/balancesByAddresses',
      isAddressesReady: 'isAddressesReady',
    }),
    balanceHistoryLabels() {
      if (!this.balanceHistory || Object.keys(this.balanceHistory).length === 0) return [];

      return this.balanceHistory[Object.keys(this.balanceHistory)[0]].map(point => this.$moment.utc(point.date
        * 1000).format('DD.MM.YYYY')).concat(this.$moment.utc().startOf('day').format('DD.MM.YYYY'));
    },
    balanceHistoryChartData() {
      if (!this.balanceHistory || Object.keys(this.balanceHistory).length === 0) return [];

      const colors = this.$helpers.generateNColors(141, 43, 196, 360, 60, 246, 111);

      return Object.keys(this.balanceHistory).map((currencyCode, index) => {
        const indexBy3StepsAhead = index + 3;
        const currentRGBColor = this.$helpers.hexToRgb(colors[indexBy3StepsAhead]);
        const { r, g, b } = currentRGBColor;

        const balanceByCurrencyCode = this.balancesByAddresses
          && this.balancesByAddresses.find(item => item.currency === currencyCode);

        return {
          label: currencyCode.toUpperCase(),
          backgroundColor: `rgba(${r}, ${g}, ${b}, 0.07)`,
          borderColor: colors[indexBy3StepsAhead],
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: this.balanceHistory[currencyCode]
            .map(point => ({
              x: point.date,
              y: `${point.amount}`,
            }))
            .concat({
              x: this.$moment.utc().startOf('day').unix(),
              y: balanceByCurrencyCode ? balanceByCurrencyCode.amount.toString() : '0',
            }),
        };
      });
    },
    totalStakingAmountInUsd() {
      if (!this.balancesByAddresses || this.balancesByAddresses === 0) return '-----';

      return this.balancesByAddresses.reduce((acc, currentCoin) => {
        acc += currentCoin.stakingAmountInUsd;
        return this.$helpers.roundWithPrecision(acc, constants.USD_PRECISION);
      }, 0);
    },
    totalStakingAmountInBtc() {
      if (!this.balancesByAddresses || this.balancesByAddresses === 0) return '-----';

      return this.balancesByAddresses.reduce((acc, currentCoin) => {
        acc += currentCoin.stakingAmountInBtc;
        return this.$helpers.roundWithPrecision(acc, constants.CRYPTO_MAX_PRECISION);
      }, 0);
    },
  },
  methods: {
    ...mapActions({
      getAddressesData: 'addressService/getAddressesData',
      requestRates: 'ratesService/requestRates',
    }),
    async requestBalanceHistory(currencies, isUserLoggedIn) {
      try {
        this.isBalanceHistoryLoading = true;
        const response = await this.$balanceServiceApi.requestBalanceHistory(currencies, isUserLoggedIn);
        if (response) {
          this.balanceHistory = response.data;
        }
      } catch (err) {
        this.$errors.handleErrors(err);
      } finally {
        this.isBalanceHistoryLoading = false;
      }
    },
  },
  mounted() {
    this.requestRates({});
    (async () => {
      if (this.isUserLoggedIn) {
        await this.getAddressesData([]);
      }
      this.requestBalanceHistory({ currencies: [] }, this.isUserLoggedIn);
    })();
  },
};
</script>

<style lang="scss" scoped>
</style>
