<template>
  <b-card class="min-rewards-chart-height" no-body>
    <b-card-body class="d-flex flex-column">
      <b-row>
        <b-col sm="5">
          <h4 id="rewards" class="card-title mb-0">{{ $t('common.totalRewards') }}</h4>
        </b-col>

        <b-col sm="7" class="d-none d-md-block">
          <b-button-toolbar class="float-right"
                            v-if="rewardsChartDatasets.length !== 0"
                            aria-label="Toolbar with buttons group">
            <b-form-radio-group id="radiosBtn"
                                buttons
                                v-model="selectedRewardsPeriod"
                                name="radiosBtn">
              <b-form-radio class="btn--black mx-0" value="day">
                {{ $t('common.day') }}
              </b-form-radio>
              <b-form-radio class="btn--black mx-0" value="week">
                {{ $t('common.week') }}
              </b-form-radio>
              <b-form-radio class="btn--black mx-0" value="month">
                {{ $t('common.month') }}
              </b-form-radio>
            </b-form-radio-group>
          </b-button-toolbar>
        </b-col>
      </b-row>

      <div v-if="isRewardsByPeriodLoading" class="flex-grow-1 align-items-center d-flex">
        <CircleSpinner></CircleSpinner>
      </div>
      <div v-else-if="rewardsChartDatasets.length === 0"
           class="text-warning justify-content-center flex-grow-1 align-items-center d-flex">
        {{ $t('common.noChartData') }}
      </div>
      <LineChart chartId="main-chart-03"
                 class="chart-wrapper"
                 style="height:300px; margin-top:40px;"
                 v-else
                 :yAxesOptions="yAxesOptions"
                 :datasets="rewardsChartDatasets"
                 :labels="rewardsChartLabels"
                 height="300">
      </LineChart>
    </b-card-body>
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LineChart from '@/components/LineChart.vue';
import constants from '@/constants';
import coinGetter from '@/plugins/mixins/coinGetter';

export default {
  name: 'RewardsChartNew',
  mixins: [coinGetter],
  components: {
    LineChart,
  },
  props: {
    currentCoinName: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      selectedRewardsPeriod: 'month',
      // standard range for 30 points in the chart
      dateTo: this.$moment(this.$moment().endOf('day')).utc().unix(),
    };
  },
  computed: {
    ...mapGetters({
      isRewardsByPeriodLoading: 'rewardsServiceNew/isRewardsByPeriodLoading',
      isUserLoggedIn: 'userService/isUserLoggedIn',
      availableAddresses: 'addressService/availableAddresses',
      rewardsChartLabels: 'rewardsServiceNew/rewardsChartLabels',
      rewardsChartDatasets: 'rewardsServiceNew/rewardsChartDatasets',
    }),
    coinCode() {
      return this.$_getCoinCodeByName(this.currentCoinName);
    },
    // standard range for 30 points in the chart
    dateFrom() {
      switch (this.selectedRewardsPeriod) {
        case 'day':
          return this.$moment(this.$moment().startOf('day').subtract(30, 'days')).utc().unix();
        case 'week':
          return this.$moment(this.$moment().startOf('day').subtract(30, 'weeks')).utc().unix();
        default:
          return this.$moment(this.$moment().startOf('day').subtract(30, 'months')).utc().unix();
      }
    },
    yAxesOptions() {
      return [{
        type: 'logarithmic',
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          callback(label) {
            if (label > 1000000) {
              return `${label / 1000 / 1000}M`;
            }
            if (label > 1000) {
              return `${label / 1000}K`;
            }
            if (`${label}`.split('.')[1] > 5) {
              return `${Math.round(label.toFixed(8))}`;
            }

            return label;
          },
          beginAtZero: true,
        },
        gridLines: {
          color: '#1a1d1f',
          display: true,
        },
      }];
    },
  },
  watch: {
    selectedRewardsPeriod: {
      // immediate: true,
      handler(val) {
        if (this.isUserLoggedIn) {
          this.requestRewardsByPeriod({
            coinName: this.currentCoinName.toLowerCase(),
            params: {
              by: val.toLowerCase(),
              to: this.dateTo,
              from: this.dateFrom,
              delegators: this.availableAddresses,
              validators: [constants.COINS_MAP[`${this.coinCode}`].delegationAddress],
            },
          });
        }
      },
    },
  },
  methods: {
    ...mapActions({
      requestRewardsByPeriod: 'rewardsServiceNew/requestRewardsByPeriod',
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
