<template>
  <div>
    <h3 class="title title--medium title--white">
      {{ $t('icx.stats') }}
    </h3>
    <div class="d-flex justify-content-between flex-column flex-lg-row">
      <b-card class="card--yellow text-center">
        <h4 class="title title--medium mb-3">
          {{ requests }} <br>
          {{ $t('icx.requestsToNode') }}
        </h4>

        <a
          href="https://twitter.com/everstake_pool/status/1243129876393136129"
          target="_blank"
          rel="noopener noreferrer"
          class="link link--black fs-18"
        >
          {{ $t('common.viewMore') }}
        </a>
      </b-card>

      <b-card class="card--yellow text-center mx-lg-4">
        <h4 class="title title--medium mb-3">
          {{ speed }} <br>
          {{ $t('icx.avgSpeed') }}
        </h4>

        <a
          href="https://twitter.com/everstake_pool/status/1244940993578897410"
          target="_blank"
          rel="noopener noreferrer"
          class="link link--black fs-18"
        >
          {{ $t('common.viewMore') }}
        </a>
      </b-card>

      <b-card class="card--yellow text-center">
        <h4 class="title title--medium mb-3">
          {{ parsingTime }} <br>
          {{ $t('icx.blockchainParsing') }}
        </h4>

        <a
          href="https://twitter.com/everstake_pool/status/1245633400305639424"
          target="_blank"
          rel="noopener noreferrer"
          class="link link--black fs-18"
        >
          {{ $t('common.viewMore') }}
        </a>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsIcon',
  data() {
    return {
      requests: '105 128 614',
      speed: '1500 queries/sec',
      parsingTime: '17 hours',
    };
  },
};
</script>

<style lang="scss" scoped>
  .card--yellow {
    background-color: $yellow;
    color: $black
  }
</style>
