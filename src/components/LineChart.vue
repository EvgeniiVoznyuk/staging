<script>
import { Line } from 'vue-chartjs';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

export default {
  extends: Line,
  props: ['height', 'datasets', 'labels', 'yAxesOptions'],
  mounted() {
    // eslint-disable-next-line prefer-destructuring
    let yAxesOptions = this.yAxesOptions;
    if (typeof yAxesOptions === 'undefined') {
      yAxesOptions = [{
        ticks: {
          beginAtZero: true,
        },
        gridLines: {
          display: true,
          color: '#1a1d1f',
        },
      }];
    }

    this.renderChart({
      labels: this.labels,
      datasets: this.datasets,
    }, {
      tooltips: {
        enabled: false,
        custom: CustomTooltips,
        intersect: false,
        mode: 'index',
        position: 'nearest',
        callbacks: {
          labelColor(tooltipItem, chart) {
            return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
          },
        },
      },
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false,
          },
        }],
        yAxes: yAxesOptions,
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    });
  },
};
</script>
