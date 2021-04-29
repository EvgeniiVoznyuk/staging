<template>
  <div class="node-stats">
    <div class="node-stats__coins-list">
       <h5 class="title node-stats__title">
         {{ $t('home.nodeStatistics') }}
       </h5>
      <PerfectScrollbar class="scroll-area" :settings="scrollbarSettings">
        <ul class="coins-ul">
          <li v-for="(coinCode, index) in coinsWithAvailableNodeData"
              :key="index">
            <button :class="{ 'coins-ul__btn': true,
                              'coins-ul__btn--active': coinCode === selectedCoinCode }"
                    @click="selectCoinCode(coinCode)">
              {{ coinsMap[coinCode].name }}
            </button>
          </li>
        </ul>
      </PerfectScrollbar>
    </div>
    <div class="node-stats__node-info">
      <div v-if="!isStakingInfoReady"
           class="d-flex align-items-center h-100 justify-content-center">
        <CircleSpinner></CircleSpinner>
      </div>

      <div v-else class="node-info">
        <div>
          <h2 class="title node-stats__title ml-0 mb-4">
            {{ $t('common.coinNode', { coinName: coinsMap[selectedCoinCode].name }) }}
          </h2>
          <table>
            <tbody>
            <tr v-for="(stakingInfoObj, index) in currentStakingInfo"
                :key="index">
              <th class="node-info__field pb-3">{{ stakingInfoObj.name }}:</th>
              <td class="node-info__value pb-3 pl-2">{{ stakingInfoObj.result }}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="node-info__status mt-3 mt-xl-0">
        <span class="node-info__field">
          {{ $t('common.status') }}:
        </span>
        <span class="node-info__value">
          <span class="node-info__status-icon"></span>
          {{ $t('common.active') }}
        </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import stakingInfoGenerator from '@/plugins/mixins/stakingInfoGenerator';
import constants from '@/constants';

export default {
  name: 'NodeStats',
  mixins: [stakingInfoGenerator],
  data() {
    return {
      coinsMap: constants.COINS_MAP,
      coinsWithAvailableNodeData: constants.REWARDS_CHART_COINS,
      selectedCoinCode: '',
      scrollbarSettings: {
        wheelPropagation: true,
      },
    };
  },
  computed: {
    ...mapGetters({
      stakingInfo: 'stakingService/stakingInfo',
      rates: 'ratesService/rates',
      isStakingInfoReady: 'isStakingInfoReady',
    }),
    currentStakingInfo() {
      return this.$_generateStakingInfo(this.selectedCoinCode, this.stakingInfo, this.rates)
        .filter((stakingInfoObj) => stakingInfoObj.name !== 'Status');
    },
  },
  watch: {
    selectedCoinCode(val) {
      this.getStakingInfo(val);
      this.requestRates({
        base_currencies: [this.selectedCoinCode],
        quote_currencies: ['usd'],
      });
    },
  },
  methods: {
    ...mapActions({
      getStakingInfo: 'stakingService/getStakingInfo',
      requestRates: 'ratesService/requestRates',
    }),
    selectCoinCode(coinCode) {
      this.selectedCoinCode = coinCode;
    },
  },
  created() {
    this.selectedCoinCode = this.coinsWithAvailableNodeData[0];
  },
};
</script>

<style lang="scss" scoped>
  .scroll-area {
    max-height: 354px;
    padding: 0;
  }

  .node-stats {
    display: grid;
    background-color: $white;
    border-left: $border-yellow--2px;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0;
    grid-template-rows: auto auto;
    grid-template-areas: "coins-list coins-info coins-info";

    &__coins-list {
      grid-area: coins-list;
      border-bottom: $border-yellow--2px;
      border-right: $border-yellow--2px;
      padding-top: 20px;
      position: relative;
    }

    &__node-info {
      border-bottom: $border-yellow--2px;
      border-right: $border-yellow--2px;
      color: $black;
      grid-area: coins-info;
      font-size: 20px;
      font-weight: 700;
      padding: 20px;
    }

    &__title {
      font-size: 26px;
      margin: 0 20px 16px 20px;
    }
  }

  .coins-ul {
    font-size: 26px;
    color: $black;
    padding: 0;
    list-style-type: none;
    margin-bottom: 0;

    &__btn {
      background-color: transparent;
      border: none;
      display: block;
      padding: 10px 20px;
      text-align: left;
      transition: background-color 0.2s;
      width: 100%;

      &:hover, &:focus, &--active {
        background-color: $white--2;
      }

      &:focus {
        outline: none;
      }
    }
  }

  .node-info {
    display: flex;
    justify-content: space-between;

    &__field {
      color: $grey--dark;
    }

    &__value {
      font-family: 'Space Mono', monospace;
    }

    &__status-icon {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: $success;
      display: inline-block;
    }
  }

  @media (max-width: 1199px) {
    .coins-ul__btn {
      font-size: 20px;
    }

    .node-info {
      flex-direction: column;
    }
  }

  @media (max-width: 991px) {
    .node-stats {
      grid-template-areas: "coins-list coins-list coins-list"
                           "coins-info coins-info coins-info";

      &__node-info {
        min-height: 400px;
        height: 100%;
      }
    }
  }

  @media (max-width: 575px) {
    .node-info {
      font-size: 16px;
    }
  }
</style>
