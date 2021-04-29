<template>
  <section class="analytics">
    <b-card>
      <h1 class="mb-5">{{ $t('analytics.title') }}</h1>
      <b-row>
        <b-col xl="3">
          <b-card v-if="isConfigLoading" class="mb-xl-0" >
            <LoadingCard></LoadingCard>
          </b-card>
          <b-card v-else class="bg-grey--dark-secondary mb-xl-0" show-footer>
            <template v-if="isConfigLoadedWithError">
              {{$t('analytics.configLoadWithError')}}
            </template>
            <template v-else>
              <b-form-group>
                <label for="blockchain">{{ $t('analytics.selectBlockchain') }}:</label>
                <b-form-select
                  id="blockchain"
                  v-model.trim="$v.selectedChain.$model"
                  :class="{ 'is-invalid': $v.selectedChain.$error,
                            'is-valid': !$v.selectedChain.$invalid }">
                  <option v-for="(chain, index) in config.chains"
                          :key="index"
                          :value="chain.code">
                    {{ chain.title }}
                  </option>
                  <option disabled hidden :value=null>
                    {{ $t('analytics.selectPreferredBlockchain') }}
                  </option>
                </b-form-select>
                <b-form-invalid-feedback>
                  {{ $t('notifications.fieldRequired') }}
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group v-if="metrics.length > 0">
                <label for="charts">{{ $t('analytics.selectMetrics') }}:</label>
                <multiselect v-model="$v.selectedMetrics.$model"
                             id="charts"
                             :options="metrics"
                             :multiple="true"
                             label="name"
                             :searchable="false"
                             track-by="name"
                             :close-on-select="false"
                             :custom-label="translateLabel"
                             :placeholder="$t('analytics.selectPreferredMetrics')"
                             :class="{ 'is-invalid': $v.selectedMetrics.$error,
                                       'is-valid': !$v.selectedMetrics.$invalid }">
                </multiselect>
                <b-form-invalid-feedback :class="{'d-block': $v.selectedMetrics.$error}">
                  {{ $t('notifications.fieldRequired') }}
                </b-form-invalid-feedback>
              </b-form-group>

              <template v-if="filters.length > 0">
                <b-form-group v-for="(filter, index) in filters" :key="index">
                  <template v-if="filter.type === 'select'">
                    <label for="timespan">{{ $t(filter.title) }}:</label>
                    <b-form-select
                      id="timespan"
                      v-model.trim="filtersData[filter.name]">
                      <option v-for="(selValue, index) in filter.values"
                              :key="index"
                              :value="selValue.code">
                        {{ $t(selValue.title) }}
                      </option>
                      <option disabled hidden :value=null>
                        {{ $t(filter.placeholderTitle) }}
                      </option>
                    </b-form-select>
                  </template>
                  <template v-else-if="filter.type === 'daterange'">
                    <label :for="'dateRange' + index"
                           title="MM/DD/YYYY">{{ $t(filter.title) }} (UTC):</label>
                    <v-date-picker
                      :id="'dateRange' + index"
                      mode='range'
                      :max-date='$moment().toDate()'
                      :attributes="filter.attributes"
                      v-model="filtersData[filter.name]"
                      show-caps>
                      <b-form-input
                        slot-scope="props"
                        readonly
                        :value='props.inputValue'
                        @change.native='props.updateValue($event.target.value)'
                        autocomplete="off"
                        :placeholder="$t(filter.placeholderTitle)">
                      </b-form-input>
                    </v-date-picker>
                  </template>
                  <template v-else-if="filter.type === 'multiselect'">
                    <label :for="'multiselect' + index">{{ $t(filter.title) }}</label>
                    <multiselect v-model="filtersData[filter.name]"
                                 :id="'multiselect' + index"
                                 :options="filter.values"
                                 :max="filter.max"
                                 :placeholder="$t(filter.placeholderTitle)"
                                 :multiple="true"
                                 :searchable="false"
                                 :close-on-select="false"
                                 label="title"
                                 track-by="code"
                      >
                    </multiselect>
                  </template>
                </b-form-group>
              </template>

              <div slot="footer">
                <b-button block
                          variant="warning"
                          @click="loadData"
                          :disabled="selectedMetrics.length === 0 || isChartsLoading">
                  {{ $t('analytics.apply') }}
                </b-button>
              </div>
            </template>
          </b-card>
        </b-col>

        <b-col xl="9" class="d-flex">
          <LoadingCard v-if="isChartsLoading"></LoadingCard>
          <template v-else>
            <div v-if="charts.length > 0" class="w-100">
              <b-card :class="{ 'mb-0': index === charts.length - 1 }"
                      v-for="(chart, index) in charts"
                      :key="index">
                <h4 class="mb-5">{{ $t('analytics.' + chart.name) }}</h4>
                <p v-if="chart.hasError"
                   class="text-warning">{{ $t('common.analyticsChartError') }}</p>
                <p v-else-if="chart.labels.length === 0"
                   class="text-warning">{{ $t('common.analyticsNoChartData') }}</p>
                <LineChart v-else
                           :datasets="chart.datasets"
                           :labels="chart.labels"
                           :yAxesOptions="chart.yAxesOptions"
                           class="chart-wrapper"
                           style="height:400px;"
                           :chartId="'chart' + index">
                </LineChart>
              </b-card>
            </div>
            <b-card class="bg-grey--dark-secondary w-100 mb-0"
                    no-body
                    v-else>
              <b-card-body class="d-flex flex-column">
                <div class="choose-block">
                  <div class="choose-block__img-wrap">
                    <div class="w-100">
                      <span class="icon-magnifier text-warning fs-50"></span>
                    </div>
                  </div>
                  <h4 class="choose-block__title">
                    {{ $t('analytics.chooseBlockchainAndTimePeriod') }}
                  </h4>
                </div>
              </b-card-body>
            </b-card>
          </template>
        </b-col>
      </b-row>
    </b-card>
  </section>
</template>


<script>
import { setupCalendar, DatePicker } from 'v-calendar';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import Multiselect from 'vue-multiselect';
import LineChart from '@/components/LineChart.vue';
import LoadingCard from '@/components/LoadingCard.vue';
import GoogleForm from '@/components/GoogleForm.vue';

setupCalendar({
  firstDayOfWeek: 2, // Monday
  datePickerShowDayPopover: false,
  popoverVisibility: 'focus',
  datePickerTintColor: '#ffc107',
});

export default {
  name: 'Analytics',
  mixins: [validationMixin],
  validations: {
    selectedChain: {
      required,
    },
    selectedMetrics: {
      required,
    },
  },
  notifications: {
    showErrorMsg: {
      type: 'error',
    },
  },
  components: {
    LineChart,
    Multiselect,
    'v-date-picker': DatePicker,
    LoadingCard,
    GoogleForm,
  },
  data() {
    return {
      config_filters: {
        linear: [
          {
            name: 'period',
            title: 'analytics.selectTimespan',
            placeholderTitle: 'analytics.selectPreferredTimespan',
            type: 'select',
            values: [
              {
                code: 'hour',
                title: 'analytics.selectTimespanHour',
                default: false,
              },
              {
                code: 'day',
                title: 'analytics.selectTimespanDay',
                default: true,
              },
              {
                code: 'week',
                title: 'analytics.selectTimespanWeek',
                default: false,
              },
              {
                code: 'month',
                title: 'analytics.selectTimespanMonth',
                default: false,
              },
              {
                code: 'year',
                title: 'analytics.selectTimespanYear',
                default: false,
              },
            ],
          },
          {
            name: 'daterange',
            type: 'daterange',
            title: 'analytics.dateRange',
            placeholderTitle: 'analytics.selectDateRange',
            attributes: [{
              contentStyle: {
                color: '#ff4d4d', // Red
                fontWeight: 600,
                fontSize: '10px',
              },
              popover: { color: 'yellow' },
              highlight: {
                backgroundColor: 'purple',
              },
            }],
          },
        ],
        coins: [
          {
            name: 'coins',
            title: 'analytics.coins',
            placeholderTitle: 'analytics.selectCoins',
            type: 'multiselect',
            max: 10,
          },
        ],
      },
      config: null,
      metrics: [],
      filters: [],
      filtersData: {},
      selectedChain: null,
      selectedMetrics: [],
      isChartsLoading: false,
      isConfigLoading: true,
      isConfigLoadedWithError: false,
      charts: [],
    };
  },
  mounted() {
    const self = this;
    self.$analyticsApi.config()
      .then((resp) => {
        self.config = resp.data;
      })
      .catch((err) => {
        self.isConfigLoadedWithError = true;
        console.log(err);
      })
      .then(() => {
        self.isConfigLoading = false;
      });
  },
  methods: {
    loadData() {
      const self = this;
      if (self.selectedChain == null || self.selectedMetrics.length === 0) {
        return;
      }

      const filters = self.prepareFilters();
      const promises = [];

      self.selectedMetrics.forEach((metric) => {
        // eslint-disable-next-line max-len
        promises.push(self.$analyticsApi.exec(self.selectedChain, metric.url, filters)
          .then(resp => ({
            name: metric.name,
            hasError: false,
            values: resp.data,
          }))
          .catch((e) => {
            console.error(self.selectedChain, metric.url, filters, e);
            return {
              name: metric.name,
              hasError: true,
              values: null,
            };
          }));
      });

      self.isChartsLoading = true;
      self.charts = [];

      Promise.all(promises)
        .then((resps) => {
          resps.forEach((resp) => {
            self.charts.push(self.buildChartData(resp));
          });
        })
        .catch((e) => {
          console.error(e);
        })
        .then(() => {
          self.isChartsLoading = false;
        });
    },
    buildLabelsFromResponse(resp) {
      const self = this;

      let labels = resp.values.map(item => self.$moment.unix(item.timestamp).utc().format('MM/DD/YYYY HH:mm:ss'));

      // remove hours if all timestamp has 00:00:00 time
      const hours = resp.values.map(item => self.$moment.unix(item.timestamp).utc().format('HH:mm:ss'));
      const uniqHours = [...new Set(hours)];
      if (uniqHours.length === 1 && uniqHours[0] === '00:00:00') {
        labels = resp.values.map(item => self.$moment.unix(item.timestamp).utc().format('MM/DD/YYYY'));
      }

      return labels;
    },
    buildDatasetForSingleMode(metric, resp) {
      const self = this;
      const datasets = [];
      const dataFields = metric.fields.filter(f => f.type === 'data');

      dataFields.forEach((df) => {
        datasets.push({
          label: self.translateLabel(df),
          pointHoverBackgroundColor: '#fff',
          borderWidth: 2,
          data: resp.values.map(item => item[df.field]),
        });
      });

      return datasets;
    },
    prepareDataForMultipleMode(metric, resp) {
      const data = {};

      const mulField = metric.multiple_field;
      const nameField = metric.fields.find(f => f.type === 'name');
      const dataFields = metric.fields.filter(f => f.type === 'data');

      // collect all fields with type 'name'
      let names = [];
      resp.values.forEach((value) => {
        value[mulField].forEach((insideField) => {
          names.push(insideField[nameField.field]);
        });
      });
      // make uniq array
      names = [...new Set(names)];

      // prepare all possible datasets (for each multiple filed with all data fields inside)
      names.forEach((name) => {
        dataFields.forEach((df) => {
          // init object if not exists yet
          if (typeof data[name] === 'undefined') {
            data[name] = {};
          }
          // prepare empty array
          data[name][df.field] = [];
        });
      });

      resp.values.forEach((value, index) => {
        value[mulField].forEach((insideField) => {
          dataFields.forEach((df) => {
            if (insideField[df.field] !== 'undefined') {
              // eslint-disable-next-line max-len
              data[insideField[nameField.field]][df.field].push(parseFloat(insideField[df.field]));
            }
          });
        });

        // check if data not exists in response, set zero value for each data field
        names.forEach((name) => {
          dataFields.forEach((df) => {
            if (data[name][df.field].length < (index + 1)) {
              data[name][df.field].push(0);
            }
          });
        });
      });

      /*
      data struct example (example based on coins filter)

      resp example:
      [
        {
          timestamp: 1234567,
          coins: [
            {
              name: "EOS",
              count: 5,
              volume: 10,
            },
            {
              name: "BOS",
              count: 5,
              volume: 10,
            }
          ]
        },
        {
          timestamp: 2345678,
          coins: [
            {
              name: "EOS",
              count: 5,
              volume: 10,
            }
          ]
        },
        {
          timestamp: 3456789,
          coins: [
            {
              name: "BOS",
              count: 5,
              volume: 10,
            }
          ]
        }
      }

        in data we will get:

        data["EOS"]["count"] = [5, 5, 0]
        data["EOS"]["volume"] = [10, 10, 0]

        data["BOS"]["count"] = [5, 0, 5]
        data["BOS"]["volume"] = [10, 0, 10]

       */

      return data;
    },
    buildDatasetForMultipleMode(metric, resp) {
      const self = this;
      const datasets = [];
      const dataFields = metric.fields.filter(f => f.type === 'data');
      const data = self.prepareDataForMultipleMode(metric, resp);

      Object.keys(data).forEach((key) => {
        const datasetPrefix = `${key} `;
        Object.keys(data[key]).forEach((dkey) => {
          // get field name
          const fieldName = dataFields.find(f => f.field === dkey);

          // add dataset
          datasets.push({
            label: `${datasetPrefix} ${self.translateLabel(fieldName)}`,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: data[key][dkey],
          });
        });
      });

      return datasets;
    },
    buildDatasetsFromResponse(resp) {
      const self = this;

      const metric = self.getMetric(resp.name);
      if (metric == null) {
        return null;
      }

      const datasets = [];
      if (metric.mode === 'single') {
        datasets.push(...self.buildDatasetForSingleMode(metric, resp));
      }

      if (metric.mode === 'multiple') {
        datasets.push(...self.buildDatasetForMultipleMode(metric, resp));
      }

      self.setColorsForDatasets(datasets);

      return datasets;
    },
    setColorsForDatasets(datasets) {
      const self = this;
      let cIndex;
      let res;
      const colors = self.$helpers.generateNColors(141, 43, 196, 360, 60, 246, 111);
      // set default colors for first and second datasets
      datasets.forEach((dataset, index, obj) => {
        switch (index) {
          case 0:
            // eslint-disable-next-line no-param-reassign
            obj[index].backgroundColor = 'rgba(245, 190, 55, 0.1)';
            // eslint-disable-next-line no-param-reassign
            obj[index].borderColor = '#f5be37';
            break;
          case 1:
            // eslint-disable-next-line no-param-reassign
            obj[index].backgroundColor = 'rgba(220, 135, 30, 0.1)';
            // eslint-disable-next-line no-param-reassign
            obj[index].borderColor = '#f19018';
            break;
          default:
            cIndex = index % colors.length;
            res = this.$helpers.hexToRgb(colors[cIndex]);
            // eslint-disable-next-line no-param-reassign
            obj[index].backgroundColor = `rgba(${res.r}, ${res.g}, ${res.b}, 0.07)`;
            // eslint-disable-next-line no-param-reassign
            obj[index].borderColor = colors[cIndex];
        }
      });

      return datasets;
    },
    buildChartData(resp) {
      const self = this;
      const chartData = {
        name: resp.name,
        hasError: resp.hasError,
      };

      if (resp.hasError) {
        return chartData;
      }

      const labels = self.buildLabelsFromResponse(resp);
      const datasets = self.buildDatasetsFromResponse(resp);
      if (labels === null || datasets === null) {
        return chartData;
      }

      chartData.labels = labels;
      chartData.datasets = datasets;

      // build y axes for chart
      let yAxesType = 'linear';
      if (chartData.datasets.length > 1) {
        yAxesType = 'logarithmic';
      }
      chartData.yAxesOptions = self.yAxesOptions(yAxesType);

      return chartData;
    },
    yAxesOptions(yAxesType) {
      return [{
        type: yAxesType,
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

            return label;
          },
          beginAtZero: true,
        },
        scaleLabel(valuePayload) {
          return `${Number(valuePayload.value).toFixed(2).replace('.', ',')}`;
        },
        gridLines: {
          color: '#1a1d1f',
          display: true,
        },
      }];
    },
    removeDuplicates(myArr, prop) {
      // eslint-disable-next-line max-len
      return myArr.filter((obj, pos, arr) => arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos);
    },
    translateLabel(item) {
      const self = this;
      return self.$t(`analytics.${item.name}`);
    },
    prepareFilters() {
      const self = this;
      const filters = {};

      Object.keys(self.filtersData).forEach((key) => {
        if (key === 'daterange') {
          filters.date_from = self.$moment(self.filtersData[key].start).utc(true).unix();
          filters.date_to = self.$moment(self.filtersData[key].end).utc(true).unix() + 86400;
        } else if (key === 'coins') {
          if (Array.isArray(self.filtersData[key])) {
            filters[key] = self.filtersData[key].map(c => c.code);
          }
        } else {
          filters[key] = self.filtersData[key];
        }
      });

      return filters;
    },
    getChainData(chainCode) {
      const self = this;
      return self.config.chains.find(chain => chain.code === chainCode);
    },
    getMetric(metricName) {
      const self = this;
      return self.config.data[self.selectedChain].find(metric => metric.name === metricName);
    },
    getFiltersDiff(newFilters) {
      const self = this;
      const currentFiltersNames = self.filters.map(f => f.name);
      const newFiltersNames = newFilters.map(f => f.name);

      const addedFilters = newFiltersNames.filter(f => currentFiltersNames.indexOf(f) === -1);
      const deletedFilters = currentFiltersNames.filter(f => newFiltersNames.indexOf(f) === -1);

      return {
        added: addedFilters,
        deleted: deletedFilters,
      };
    },
  },
  watch: {
    selectedChain() {
      const self = this;

      self.filters = [];
      self.filtersData = {};
      self.selectedMetrics = [];

      if (self.selectedChain == null) {
        self.metrics = [];
        return;
      }

      // eslint-disable-next-line max-len
      self.metrics = self.config.data[self.selectedChain].filter(metric => metric.chartable);
    },
    selectedMetrics() {
      const self = this;
      if (self.selectedMetrics.length === 0) {
        self.filters = [];
        self.filtersData = {};
        return;
      }

      let filtersTypes = [];
      self.selectedMetrics.forEach((metric) => {
        filtersTypes.push(...metric.filters.map(f => f.name));
      });

      // make unique list of filters types
      filtersTypes = [...new Set(filtersTypes)];

      const filters = [];
      filtersTypes.forEach((type) => {
        filters.push(...self.config_filters[type]);
      });

      // make uniq list of object
      const newFilters = self.removeDuplicates(filters, 'name');
      const filtersDiff = self.getFiltersDiff(newFilters);

      if (filtersDiff.added.length === 0 && filtersDiff.deleted.length === 0) {
        return;
      }

      // add new filters
      filtersDiff.added.forEach((name) => {
        const filter = newFilters.find(f => f.name === name);
        let defaultValue = null;
        if (filter.type === 'daterange') {
          defaultValue = {
            start: self.$moment().subtract(7, 'days').toDate(),
            end: self.$moment().toDate(),
          };
        }

        if (filter.name === 'coins') {
          const chainData = self.getChainData(self.selectedChain);
          if (typeof chainData === 'undefined') {
            return;
          }

          // eslint-disable-next-line no-param-reassign
          filter.values = chainData.coins;
        }

        if (filter.type === 'select') {
          if (typeof filter.values !== 'undefined') {
            filter.values.forEach((value) => {
              if (typeof value.default !== 'undefined' && typeof value.code !== 'undefined' && value.default === true) {
                defaultValue = value.code;
              }
            });
          }
        }

        self.filters.push(filter);

        // add reactivity
        self.$set(self.filtersData, filter.name, defaultValue);
      });

      // remove old filters
      self.filters.forEach((filter, index, obj) => {
        if (filtersDiff.deleted.indexOf(filter.name) !== -1) {
          obj.splice(index, 1);
          delete self.filtersData[filter.name];
        }
      });
    },
  },
};
</script>

<style lang="scss">
  .choose-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1 0 auto;

    &__img-wrap {
      max-width: 268px;
    }

    &__title {
      margin: 20px 0 0 0;
      text-align: center;
    }
  }

  .analytics__form {
    text-align: center;
    margin: 0 auto;
    max-width: 678px;
  }
</style>
