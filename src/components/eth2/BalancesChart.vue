<template>
  <b-card class="min-rewards-chart-height" no-body>
  <b-card-body class="d-flex flex-column">
    <b-row>
      <b-col sm="5">
        <h4 id="rewards" class="card-title mb-0">{{ $t('common.balance') }}</h4>
      </b-col>
    </b-row>

    <div v-if="isBalancesChartLoading" class="flex-grow-1 align-items-center d-flex">
      <CircleSpinner></CircleSpinner>
    </div>
    <div v-else-if="!balancesChartDatasets || !balancesChartDatasets.length"
         class="text-warning justify-content-center flex-grow-1 align-items-center d-flex">
      {{ $t('common.noChartData') }}
    </div>
    <LineChart chartId="main-chart-02"
               class="chart-wrapper"
               v-else
               style="height:300px; margin-top:40px;"
               :yAxesOptions="yAxesOptions"
               :datasets="balancesChartDatasets"
               :labels="balancesChartLabels"
               height="300">
    </LineChart>
  </b-card-body>
  </b-card>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import LineChart from '@/components/LineChart.vue';

export default {
  name: 'BalancesChart',
  components: {
    LineChart,
  },
  props: {
    coinCode: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      rangeDates: {
        from: this.$moment(this.$moment()
          .utc()
          .startOf('day')
          .subtract(60, 'days'))
          .unix(),
        to: this.$moment(this.$moment()
          .utc()
          .endOf('day'))
          .unix(),
      },
    };
  },
  computed: {
    ...mapState('ethService', ['address', 'isBalancesChartLoading']),
    ...mapGetters({
      balancesChartDatasets: 'ethService/balancesChartDatasets',
      balancesChartLabels: 'ethService/balancesChartLabels',
    }),
    yAxesOptions() {
      return [{
        type: 'linear',
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
          callback: (label) => {
            if (label > 1000000) {
              return `${label / 1000 / 1000}M`;
            }
            if (label > 1000) {
              return `${label / 1000}K`;
            }
            if (`${label}`.split('.')[1] > 5) {
              return Number(this.$numeral(label).format('0[.][000000]'));
            }

            return label;
          },
          beginAtZero: false,
        },
        gridLines: {
          color: '#1a1d1f',
          display: true,
        },
      }];
    },
  },
  watch: {
    address(val) {
      this.requestBalancesChart({
        by: 'day',
        public_keys: [val],
      });
    },
  },
  created() {
    this.requestBalancesChart({
      by: 'day',
      public_keys: [this.address],
    });
  },
  methods: {
    ...mapActions({
      requestBalancesChart: 'ethService/requestBalancesChart',
    }),
  },
};
</script>

<style scoped>

</style>
