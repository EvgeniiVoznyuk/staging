<template>
  <b-card class="min-rewards-chart-height" no-body>
    <b-card-body class="d-flex flex-column">
      <b-row>
        <b-col sm="5">
          <h4 id="rewards" class="card-title mb-0">{{ $t('common.totalIncome') }}</h4>
        </b-col>
      </b-row>

      <div v-if="isLoadingChartTotalHistory" class="flex-grow-1 align-items-center d-flex">
        <CircleSpinner></CircleSpinner>
      </div>
      <div v-else-if="!incomesChartDatasets || !incomesChartDatasets.length"
           class="text-warning justify-content-center flex-grow-1 align-items-center d-flex">
        {{ $t('common.noChartData') }}
      </div>
      <LineChart chartId="main-chart-01"
                 class="chart-wrapper"
                 v-else
                 style="height:300px; margin-top:40px;"
                 :yAxesOptions="yAxesOptions"
                 :datasets="incomesChartDatasets"
                 :labels="incomesChartLabels"
                 height="300">
      </LineChart>
    </b-card-body>
  </b-card>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import LineChart from '@/components/LineChart.vue';

export default {
  name: 'IncomesChart',
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
    ...mapState('ethService', ['address', 'isLoadingChartTotalHistory']),
    ...mapGetters({
      incomesChartDatasets: 'ethService/incomesChartDatasets',
      incomesChartLabels: 'ethService/incomesChartLabels',
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
    address(val) {
      this.requestChartDataset({
        by: 'day',
        public_keys: [val],
      });
    },
  },
  created() {
    this.requestChartDataset({
      by: 'day',
      public_keys: [this.address],
    });
  },
  methods: {
    ...mapActions({
      requestChartDataset: 'ethService/requestChartDataset',
    }),
  },
};
</script>
