<template>
  <section
    class="mb-5"
  >
    <h2 class="title title--white title--lap">
      {{ $t('icx.devOperations') }}
    </h2>

    <b-row class="mb-5">
      <b-col lg="6">
        <p class="paragraph paragraph--big mb-4">
          {{ $t('icx.devOperationsP1') }}
        </p>
        <p class="paragraph paragraph--big mb-4">
          {{ $t('icx.devOperationsP2') }}
        </p>
        <ul class="list list--yellow">
          <li>
            <a
              href="https://medium.com/everstake/the-new-icon-update-and-how-to-cope-with-it-d447eb114498"
              target="_blank"
              rel="noopener noreferrer"
            >
              The New ICON Update and How to Cope With It.
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/everstake_pool/status/1224327386256363520"
              target="_blank"
              rel="noopener noreferrer"
            >
              Additional node for tests
            </a>
          </li>
        </ul>
      </b-col>

      <b-col lg="6">
        <LoadingCard v-if="!coinData" class="min-sm-card-height"></LoadingCard>
        <CoinStats
          v-else
          class="align-items-stretch min-sm-card-height"
          :coinName="coinData.name"
          :statsTableData="coinStats">
        </CoinStats>
      </b-col>
    </b-row>

    <CardInfo
      :title="card.title"
      :texts="card.texts"
    >
      <template #btns>
        <b-btn
          tag="a"
          href="http://bit.ly/ICX_BUGbounty"
          target="_blank"
          rel="noopener noreferrer"
          variant="warning"
          size="lg"
        >
          {{ $t('icx.iconMonOpen') }}
        </b-btn>
      </template>
    </CardInfo>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CardInfo from '@/components/coin-page/CardInfo.vue';
import CoinStats from '@/components/coin-page/CoinStats.vue';
import LoadingCard from '@/components/LoadingCard.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import stakingInfoGenerator from '@/plugins/mixins/stakingInfoGenerator';

export default {
  name: 'DevOperations',
  components: {
    CardInfo,
    CoinStats,
    LoadingCard,
  },
  mixins: [coinGetter, stakingInfoGenerator],
  data() {
    return {
      card: {
        title: this.$t('icx.iconMon'),
        texts: [this.$t('icx.iconMonP')],
      },
      coinData: null,
    };
  },
  computed: {
    ...mapGetters({
      rates: 'ratesService/rates',
      stakingInfo: 'stakingService/stakingInfo',
    }),
    coinStats() {
      if (Object.keys(this.stakingInfo).length === 0
        && Object.keys(this.rates).length === 0) return [];
      return this.$_generateStakingInfo('icx', this.stakingInfo, this.rates);
    },
  },
  async created() {
    const { coinCode = null } = this.$route.meta;
    this.coinData = this.coinsMap[coinCode];
    if (!coinCode) {
      this.$router.push({ name: 'Page404' });
    }

    this.getStakingInfo(coinCode);
  },
  methods: {
    ...mapActions({
      getStakingInfo: 'stakingService/getStakingInfo',
    }),
  },
};
</script>

<style scoped>

</style>
