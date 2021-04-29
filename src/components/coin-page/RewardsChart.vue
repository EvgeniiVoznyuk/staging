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
      <LineChart chartId="main-chart-01"
                 class="chart-wrapper"
                 style="height:300px; margin-top:40px;"
                 v-else
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

export default {
  name: 'RewardsChart',
  components: {
    LineChart,
  },
  props: {
    currentCoin: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      selectedRewardsPeriod: 'month',
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
      availableAddresses: 'addressService/availableAddresses',
      isRewardsByPeriodLoading: 'rewardsService/isRewardsByPeriodLoading',
      rewardsChartLabels: 'rewardsService/rewardsChartLabels',
      rewardsChartDatasets: 'rewardsService/rewardsChartDatasets',
    }),
  },
  watch: {
    selectedRewardsPeriod: {
      immediate: true,
      handler(val) {
        if (this.isUserLoggedIn) {
          this.requestRewardsByPeriod({
            addresses: this.availableAddresses,
            aggregate_by: val.toLowerCase(),
            count_values: constants.MAX_CHART_FIELDS,
            currency: this.currentCoin,
            // offset_timestamp: null,
          });
        }
      },
    },
  },
  methods: {
    ...mapActions({
      requestRewardsByPeriod: 'rewardsService/requestRewardsByPeriod',
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>
