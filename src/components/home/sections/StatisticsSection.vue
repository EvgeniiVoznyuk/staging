<template>
  <section class="statistics">
    <div class="pattern"></div>
    <div class="statistics__wrapper">
      <b-container class="container--custom">
        <h2 class="title statistics__title">
          {{ $t('home.everstakeStats') }}
        </h2>

        <div class="grid">
          <div class="grid__col">
            <StatsCard class="charts__card">
              <template slot="sum">
                $ {{ totalAssetsInControl }}
              </template>
              <template slot="title">
                {{ $t('home.assetsStaked') }}
              </template>
            </StatsCard>
          </div>
          <div class="grid__col">
            <StatsCard class="charts__card">
              <template slot="sum">
                {{ totalBlocksProduced }}
              </template>
              <template slot="title">
                {{ $t('home.blocksProduced') }}
              </template>
            </StatsCard>
          </div>
          <div class="grid__col">
            <StatsCard class="charts__card">
              <template slot="sum">
                $ {{ totalRewardsPaid }}
              </template>
              <template slot="title">
                {{ $t('home.rewardsPaid') }}
              </template>
            </StatsCard>
          </div>
        </div>
        <NodeStats></NodeStats>
      </b-container>
    </div>
  </section>
</template>

<script>
import StatsCard from '@/components/home/StatsCard.vue';
import NodeStats from '@/components/home/NodeStats.vue';

export default {
  name: 'StatisticsSection',
  components: {
    StatsCard,
    NodeStats,
  },
  data() {
    return {
      generalStakingInfo: null,
    };
  },
  computed: {
    totalAssetsInControl() {
      if (!this.generalStakingInfo || this.generalStakingInfo.length === 0) return 0;

      return this.$numeral(this.generalStakingInfo[this.generalStakingInfo.length - 1].stake).format('0,0');
    },
    totalBlocksProduced() {
      if (!this.generalStakingInfo || this.generalStakingInfo.length === 0) return 0;

      return this.$numeral(this.generalStakingInfo.reduce((acc, currentObj) => {
        acc += currentObj.blocks_produced;
        return acc;
      }, 0)).format('0,0');
    },
    totalRewardsPaid() {
      if (!this.generalStakingInfo || this.generalStakingInfo.length === 0) return 0;

      return this.$numeral(this.generalStakingInfo.reduce((acc, currentObj) => {
        acc += Number(currentObj.rwd_paid);
        return acc;
      }, 0)).format('0,0');
    },
  },
  methods: {
    async getGeneralStakingInfo() {
      try {
        const generalStakingInfo = await this.$indexServiceApi.getGeneralStakingInfo();
        if (generalStakingInfo) {
          this.generalStakingInfo = generalStakingInfo.data;
        }
      } catch (err) {
        this.$errors.handleErrors(err);
      }
    },
  },
  mounted() {
    this.getGeneralStakingInfo();
  },
};
</script>

<style lang="scss" scoped>
  .grid {
    background-color: $white;
    border-top: $border-yellow--2px;
    border-left: $border-yellow--2px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0;
    grid-template-rows: auto auto;
    grid-template-areas: "stat1 stat2 stat3"
                         "chart chart chart";

    &__col {
      border-bottom: $border-yellow--2px;
      border-right: $border-yellow--2px;
      padding: 40px 20px;

      &:first-child {
        grid-area: stat1;
      }

      &:nth-child(2) {
        grid-area: stat2;
      }

      &:nth-child(3) {
        grid-area: stat3;
      }

      &:nth-child(4) {
        grid-area: chart;
      }
    }
  }

  .pattern {
    background-image: url('~@/assets/img/backgrounds/plus-pattern.svg');
    background-repeat: repeat;
    width: 380px;
    height: 400px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;
  }

  .statistics {
    background-color: $white;
    background-repeat: repeat;
    padding-top: 98px;
    padding-bottom: 60px;
    position: relative;
    overflow: hidden;

    &__wrapper {
      position: relative;
      z-index: 1;
    }

    &__title {
      margin-bottom: 60px;
    }
  }

  @media(max-width: 1199px) {
    .statistics {
      padding-top: 60px;
    }
  }

  @media (max-width: 767px) {
    .grid {
      grid-template-areas: "stat1 stat1 stat1" "stat2 stat2 stat2" "stat3 stat3 stat3" "chart chart chart";
    }
  }

  @media (max-width: 575px) {
    .statistics {
      &__title {
        margin-bottom: 30px;
      }
    }
  }
</style>
