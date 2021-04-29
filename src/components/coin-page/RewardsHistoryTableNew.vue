<template>
  <b-card class="min-rewards-history-height" no-body>
    <template slot="header">
      <h2 class="title title--small title--white mb-0">
        <i class="fa fa-check grey"></i>
        {{ $t('common.rewardsHistory') }}
      </h2>
    </template>

    <b-card-body class="d-flex flex-column">
      <div class="table-controls">
        <b-form class="table-controls__filters"
                inline>
          <b-form-group class="mb-3 mb-md-0">
            <div class="mb-2">
              {{ $t('filters.byDate') }}:
            </div>
            <DatePicker class="d-inline-block"
                        @range-start="setRangeStart"
                        @range-end="setRangeEnd">
            </DatePicker>
          </b-form-group>
        </b-form>
      </div>
      <div v-if="!isRewardsHistoryReadyNew" class="flex-grow-1 align-items-center d-flex">
        <CircleSpinner></CircleSpinner>
      </div>
      <div v-else-if="rewardsHistory.length === 0"
           class="text-warning justify-content-center flex-grow-1 align-items-center d-flex">
        {{ $t('common.noData') }}
      </div>
      <template v-else>
        <b-table
          :hover="true"
          :outlined="true"
          :striped="true"
          :responsive="true"
          :current-page="tableConfig.currentPage"
          :per-page="0"
          :items="rewardsHistory">
          <template slot="baker" slot-scope="data">
            <span class="clip">{{ data.item.baker }}</span>
          </template>
          <template slot="delegator" slot-scope="data">
            <span class="clip">{{ data.item.delegator }}</span>
          </template>
        </b-table>
      </template>

      <b-pagination align="right"
                    :total-rows="rewardsHistoryTotal"
                    v-model="tableConfig.currentPage"
                    :per-page="tableConfig.perPage"
                    prev-text="Previous" next-text="Next"
                    hide-goto-end-buttons
                    class="mb-0">
      </b-pagination>
    </b-card-body>
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DatePicker from '@/components/DatePicker.vue';

export default {
  name: 'RewardsHistoryTableNew',
  components: {
    DatePicker,
  },
  props: {
    currentCoinName: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      tableConfig: {
        perPage: 10,
        currentPage: 1,
      },
      range: {
        rangeStart: null,
        rangeEnd: null,
      },
      rewardsHistoryFields: [
        { key: 'baker' },
        { key: 'delegator' },
        { key: 'reward' },
        { key: 'fee' },
        { key: 'payout' },
        { key: 'cycle' },
        { key: 'equivalent' },
        { key: 'date' },
      ],
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
      rewardsHistory: 'rewardsServiceNew/rewardsHistory',
      rewardsHistoryTotal: 'rewardsServiceNew/rewardsHistoryTotal',
      isRewardsHistoryReadyNew: 'isRewardsHistoryReadyNew',
      availableAddresses: 'addressService/availableAddresses',
    }),
  },
  watch: {
    tableConfig: {
      deep: true,
      handler(val) {
        const payload = {
          coinName: this.currentCoinName.toLowerCase(),
          params: {
            limit: this.tableConfig.perPage,
            offset: (val.currentPage - 1) * val.perPage,
            addresses: this.availableAddresses,
          },
        };

        if (this.range.rangeStart) {
          payload.params.date_from = this.range.rangeStart;
        }

        if (this.range.rangeEnd) {
          payload.params.date_to = this.range.rangeEnd;
        }

        this.requestRewardsHistory(payload);
      },
    },
    range: {
      deep: true,
      handler(val) {
        const payload = {
          coinName: this.currentCoinName.toLowerCase(),
          params: {
            limit: this.tableConfig.perPage,
            offset: (this.tableConfig.currentPage - 1),
            addresses: this.availableAddresses,
          },
        };

        if (this.range.rangeStart) {
          payload.params.date_from = val.rangeStart;
        }

        if (this.range.rangeEnd) {
          payload.params.date_to = val.rangeEnd;
        }

        this.requestRewardsHistory(payload);
      },
    },
  },
  methods: {
    ...mapActions({
      requestRewardsHistory: 'rewardsServiceNew/requestRewardsHistory',
    }),
    setRangeStart(resp) {
      this.range.rangeStart = resp;
    },
    setRangeEnd(resp) {
      this.range.rangeEnd = resp;
    },
  },
  // mounted() {
  //   if (this.isUserLoggedIn) {
  //     this.requestRewardsHistory({
  //       coinName: this.currentCoinName.toLowerCase(),
  //       params: {
  //         limit: this.tableConfig.perPage,
  //         offset: this.tableConfig.currentPage - 1,
  //         addresses: this.availableAddresses,
  //       },
  //     });
  //   }
  // },
};
</script>

<style lang="scss" scoped>
  >>> tr {
    td:first-child, td:nth-child(2) {
      width: 180px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .clip {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
    white-space: nowrap;
  }
</style>
