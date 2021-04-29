<template>
  <b-card class="w-100">
    <template slot="header">
      <h2 class="title title--small title--white mb-0 mr-2">
        <i class="fa fa-map-o grey mr-1 fs-12"></i>
        {{ $t('coinPages.yourCoinStats', {coinName}) }}
      </h2>
    </template>

<!--    stacked="md"-->
    <b-table
      :hover="true"
      :striped="true"
      :outlined="true"
      :fixed="true"
      responsive="sm"
      :items="userAddressTableData">
      <template slot="result" slot-scope="data">
        {{ data.item.result }}
        <b-button variant="link"
                  class="p-0 ml-1"
                  v-if="data.item.name === $t('common.yourAddress')"
                  v-clipboard:copy="data.item.result"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onCopyError">
          <i class="fa fa-copy"></i>
        </b-button>
      </template>
    </b-table>
  </b-card>
</template>

<script>

export default {
  name: 'UserAddressStats',
  notifications: {
    showSuccessfulMsg: {
      type: 'success',
    },
    showErrorMsg: {
      type: 'error',
    },
  },
  props: {
    coinName: {
      type: String,
    },
    userAddressTableData: {
      type: Array,
    },
  },
  methods: {
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

<style scoped>

</style>
