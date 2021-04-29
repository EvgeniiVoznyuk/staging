<template>
  <b-card class="w-100" no-body>
    <template slot="header">
      <div class="d-flex">
        <h2 class="title title--small title--white mb-0 mr-2">
          <i class="fa fa-check grey mr-1"></i>
          {{ $t('coinPages.ourStats', {coinName}) }}
        </h2>
        <b-badge class="d-none d-sm-flex align-items-center" variant="warning">
          {{ $t('common.realtimeStats') }}
        </b-badge>
      </div>
    </template>

    <b-card-body class="d-flex flex-column">
      <div v-if="statsTableData.length === 0"
           class="text-warning justify-content-center flex-grow-1 align-items-center d-flex">
        {{ $t('common.noData') }}
      </div>
      <b-table
        v-else
        :hover="true"
        :striped="true"
        :outlined="true"
        :fixed="true"
        :responsive="true"
        :fields="statsFields ? statsFields : []"
        :items="statsTableData">

        <template slot="result" slot-scope="data">
          <b-badge v-if="defineIfValueStatus(data.item.result)"
                   :variant="getBadge(data.item.result)">
            {{ data.item.result }}
          </b-badge>
          <div v-else-if="defineIfValueProgress(data.item.result)">
            <div class="mb-1">{{ data.item.result.split(' ')[0] }} / 1000 DASH</div>
            <b-progress
              variant="warning"
              height="35px"
              class="w-75">
              <b-progress-bar :value="getProgressPercentValue(data.item.result)">
                {{ getProgressPercentValue(data.item.result) }}%
              </b-progress-bar>
            </b-progress>
          </div>
          <template v-else>
            {{ data.item.result }}
          </template>
        </template>
      </b-table>
    </b-card-body>
  </b-card>
</template>

<script>
import constants from '@/constants';

export default {
  name: 'CoinStats',
  props: {
    coinName: {
      type: String,
    },
    statsFields: {
      type: Object,
    },
    statsTableData: {
      type: Array,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    defineIfValueStatus(val) {
      switch (val) {
        case 'Active':
          return true;
        case 'warning':
          return true;
        default:
          return false;
      }
    },
    defineIfValueProgress(val) {
      const stringArray = val.toString().split(' ');
      const lastElement = stringArray.length - 1;
      return stringArray[lastElement] === 'progress';
    },
    getProgressPercentValue(val) {
      return Math.round(100 - Number(val.split(' ')[0] / constants.DASH_MASTERNODE_THRESHOLD) * 100);
    },
    getBadge(status) {
      // return status === 'Active' ? 'success'
      return status === 'Active' ? 'warning'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary';
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
