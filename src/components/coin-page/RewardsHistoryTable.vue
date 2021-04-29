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
                inline
                @submit.prevent="requestRewardsHistory({
                  currency: currentCoin,
                  offset: (this.tableConfig.currentPage - 1) * this.tableConfig.perPage,
                  limit: this.tableConfig.perPage,
                  from_timestamp: this.range.rangeStart,
                  to_timestamp: this.range.rangeEnd,
                  })">
          <b-form-group class="mb-3 mb-md-0">
              <div class="mb-2">
                {{ $t('filters.byDate') }}:
              </div>
            <!--              <b-form-input class="input-filter mx-3" :size="'sm'"></b-form-input>-->
            <!--              <b-form-input class="input-filter" :size="'sm'"></b-form-input>-->
            <DatePicker class="d-inline-block"
                        @range-start="setRangeStart"
                        @range-end="setRangeEnd">
            </DatePicker>
          </b-form-group>
        </b-form>
        <!--          <b-form class="table-controls__search"-->
        <!--                  inline>-->
        <!--            <b-form-group>-->
        <!--              <span class="mr-3 d-block d-md-inline-block">-->
        <!--                {{ $t('common.search') }}:-->
        <!--              </span>-->
        <!--              <b-form-input :size="'sm'" class="input-filter"></b-form-input>-->
        <!--            </b-form-group>-->
        <!--          </b-form>-->
      </div>
      <div v-if="!isRewardsHistoryReady" class="flex-grow-1 align-items-center d-flex">
        <CircleSpinner></CircleSpinner>
      </div>
      <div v-else-if="rewardsHistory.length === 0"
           class="text-warning justify-content-center flex-grow-1 align-items-center d-flex">
        {{ $t('common.noData') }}
      </div>
      <template v-else>
        <!-- This additional table is needed for displaying thead for the table below it, as
            stacked tables don't render theads! -->
        <b-table
          class="mb-0 d-none d-md-table"
          :outlined="true"
          :fixed="true"
          :responsive="true"
          :fields="rewardsHistoryFields">
        </b-table>
        <b-table
          :hover="true"
          :outlined="true"
          :striped="true"
          :fixed="true"
          :responsive="true"
          :stacked="'md'"
          :current-page="tableConfig.currentPage"
          :per-page="0"
          :items="rewardsHistory">
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
  name: 'RewardsHistoryTable',
  components: {
    DatePicker,
  },
  props: {
    currentCoin: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      tableConfig: {
        perPage: 5,
        currentPage: 1,
      },
      range: {
        rangeStart: null,
        rangeEnd: null,
      },
      rewardsHistoryFields: [
        { key: 'name' },
        { key: 'address' },
        { key: 'reward' },
        { key: 'equivalent' },
        { key: 'date' },
      ],
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
      rewardsHistory: 'rewardsService/rewardsHistory',
      rewardsHistoryTotal: 'rewardsService/rewardsHistoryTotal',
      isRewardsHistoryReady: 'isRewardsHistoryReady',
    }),
  },
  watch: {
    tableConfig: {
      deep: true,
      handler(val) {
        this.requestRewardsHistory({
          currency: this.currentCoin,
          offset: (val.currentPage - 1) * val.perPage,
          limit: this.tableConfig.perPage,
          from_timestamp: this.range.rangeStart,
          to_timestamp: this.range.rangeEnd,
        });
      },
    },
    range: {
      deep: true,
      handler(val) {
        this.requestRewardsHistory({
          currency: this.currentCoin,
          offset: (this.tableConfig.currentPage - 1),
          limit: this.tableConfig.perPage,
          from_timestamp: val.rangeStart,
          to_timestamp: val.rangeEnd,
        });
      },
    },
  },
  methods: {
    ...mapActions({
      requestRewardsHistory: 'rewardsService/requestRewardsHistory',
    }),
    setRangeStart(resp) {
      this.range.rangeStart = resp;
    },
    setRangeEnd(resp) {
      this.range.rangeEnd = resp;
    },
  },
  mounted() {
    if (this.isUserLoggedIn) {
      this.requestRewardsHistory({
        currency: this.currentCoin,
        offset: this.tableConfig.currentPage - 1,
        limit: this.tableConfig.perPage,
      });
    }
  },
};
</script>

<style scoped>

</style>
