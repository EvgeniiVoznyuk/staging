<template>
  <b-card
    :header="$t('dash.getAddress')"
    class="w-100">
    <div>
      <b-row>
        <b-col>
          <QrCode
            :text="dashDepositAddress"
            :size="114"
            class="qr mb-3">
          </QrCode>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div class="mb-4">
            <div>{{ $t('dash.transferTo') }}:</div>
            <div>{{ dashDepositAddress }}</div>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-card>
</template>

<script>
import QrCode from 'vue-qrcode-component';
import { mapGetters } from 'vuex';

export default {
  name: 'GetAddress',
  components: {
    QrCode,
  },
  data() {
    return {
      transferTo: 'XjbaGWaGnvEtuQAUoBgDxJWe8ZNv45upG2',
      transferFrom: 'XamReQZgQdSdkHv3xj3TF6WoSFegCdU5s6',
    };
  },
  computed: {
    ...mapGetters({
      dashDepositAddress: 'dashService/dashDepositAddress',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .qr {
    width: 146px;
    border: 16px solid $white;
  }
</style>
