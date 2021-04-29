<template>
  <b-card class="min-rewards-history-height" no-body>
    <template slot="header">
      <h2 class="title title--small title--white mb-0">
        <i class="fa fa-check grey"></i>
        {{ $t('common.depositHistory') }}
      </h2>
    </template>

    <b-card-body class="d-flex flex-column justify-content-between">
      <div
        class="flex-grow-1 align-items-center d-flex"
        v-if="isDepositsLoading"
      >
        <CircleSpinner></CircleSpinner>
      </div>
      <div
        class="text-warning justify-content-center flex-grow-1 align-items-center d-flex"
        v-else-if="depositsHistory.length === 0"
      >
        {{ $t('common.noData') }}
      </div>
      <template v-else>
        <b-table
          :hover="true"
          :outlined="true"
          :striped="true"
          :responsive="true"
          :per-page="tableConfig.perPage"
          :current-page="tableConfig.currentPage"
          :items="depositsHistory"
          :fields="depositsHistoryFields"
          class="text-center"
        >
          <template slot="address" slot-scope="data">
            <span class="d-inline-flex align-items-center">
                <span class="address">
                 {{ data.value }}
                </span>
                <b-button variant="link"
                          class="p-0 ml-1"
                          v-clipboard:copy="data.value"
                          v-clipboard:success="onCopy"
                          v-clipboard:error="onCopyError">
                  <i class="fa fa-copy fa-lg fs-15"></i>
                </b-button>

                <b-link :href="$_generateLinkAddress"
                        class="p-0 ml-2"
                        target="_blank"
                >
                  <i class="fa fa-link fa-lg fs-15"></i>
                </b-link>
              </span>
          </template>

          <template slot="deposit" slot-scope="data">
            {{  $numeral(data.value).format('0,0[.][000000000]') }} {{ coinCode }}
          </template>

          <template slot="equivalent" slot-scope="data">
            $ {{ $numeral(data.item.deposit * Number(rates.eth.usd)).format('0,0[.][00]') }}
          </template>
        </b-table>
      </template>

      <b-pagination
        align="right"
        :total-rows="depositsHistoryTotal"
        v-model="tableConfig.currentPage"
        :per-page="tableConfig.perPage"
        prev-text="<"
        next-text=">"
        hide-goto-end-buttons
        class="mb-0"
      >
      </b-pagination>
    </b-card-body>
  </b-card>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import generateLinkAddress from '@/plugins/mixins/generateLinkAddress';

export default {
  name: 'DepositsHistoryTable',
  mixins: [generateLinkAddress],
  notifications: {
    showSuccessfulMsg: {
      type: 'success',
    },
    showErrorMsg: {
      type: 'error',
    },
  },
  props: {
    coinCode: {
      required: true,
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
      depositsHistoryFields: [
        {
          key: 'address',
        },
        { key: 'deposit' },
        {
          key: 'equivalent',
        },
        {
          key: 'date',
          formatter: value => this.$moment.unix(value)
            .format('YYYY-MM-DD'),
        },
      ],
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
    ...mapState('ethService', ['address', 'isDepositsLoading']),
    ...mapGetters({
      depositsHistory: 'ethService/depositsHistory',
      depositsHistoryTotal: 'ethService/depositsHistoryTotal',
      rates: 'ratesService/rates',
    }),
  },
  watch: {
    address: {
      immediate: true,
      handler(val) {
        this.requestDepositsEth({
          public_keys: [val],
          from: this.rangeDates.from,
          to: this.rangeDates.to,
          offset: (this.tableConfig.currentPage - 1) * this.tableConfig.perPage,
          limit: this.tableConfig.perPage,
        });
      },
    },
    tableConfig: {
      deep: true,
      handler(val) {
        this.requestDepositsEth(
          {
            public_keys: [this.address],
            from: this.rangeDates.from,
            to: this.rangeDates.to,
            offset: (val.currentPage - 1) * val.perPage,
            limit: this.tableConfig.perPage,
          },
        );
      },
    },
  },
  methods: {
    ...mapActions({
      requestDepositsEth: 'ethService/requestDepositsEth',
    }),
    onCopy() {
      this.showSuccessfulMsg({
        title: this.$t('notifications.success'),
        message: this.$t('notifications.copied'),
      });
    },
    onCopyError() {
      this.showErrorMsg({
        title: this.$t('notifications.error'),
        message: this.$t('notifications.failedToCopy'),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.address {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  white-space: nowrap;
}
</style>
