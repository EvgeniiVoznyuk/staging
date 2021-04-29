import Vue from 'vue';
import rewardsServiceApiNew from '../../api/rewardsServiceNew';
import constants from '../../constants';

const state = {
  rewardsHistory: {},
  isRewardsHistoryLoading: false,
  // dailyTotalRewards: {},
  // isDailyTotalRewardsLoading: false,
  rewardsByPeriod: {},
  isRewardsByPeriodLoading: false,
};

const getters = {
  rewardsHistory: (state, getters, rootState, rootGetters) => {
    if (!(Object.keys(state.rewardsHistory) && state.rewardsHistory.rewards)) return [];
    const rates = rootGetters['ratesService/rates'];
    const currencyCode = state.rewardsHistory.currency_code;

    return state.rewardsHistory.rewards.map((item) => {
      const formattedDate = Vue.prototype.$helpers.formatTimestamp(item.created_at);
      function calcFee(reward, payout) {
        if (payout === '0') return '-----';
        if (+reward < +payout) return '0';
        const diff = Vue.prototype.$helpers.roundWithPrecision(+reward - +payout, constants.CRYPTO_MAX_PRECISION);
        const fee = Vue.prototype.$helpers.roundWithPrecision(diff / +reward * 100, 10);
        return `${diff} ${currencyCode.toUpperCase()} (${fee}%)`;
      }

      return {
        baker: item.baker,
        delegator: item.delegator,
        reward: `${item.reward} ${currencyCode.toUpperCase()}`,
        fee: calcFee(item.reward, item.payout),
        payout: item.payout === '0' ? '-----' : `${item.payout} ${currencyCode.toUpperCase()}`,
        cycle: item.cycle,
        equivalent: rates[currencyCode]
          ? `${Vue.prototype.$helpers.roundWithPrecision(
            (item.reward * rates[currencyCode].usd),
            constants.USD_PRECISION,
          )} $` : '',
        date: formattedDate,
      };
    });
  },
  rewardsByPeriod: state => state.rewardsByPeriod,
  isRewardsByPeriodLoading: state => state.isRewardsByPeriodLoading,
  rewardsHistoryTotal: state => state.rewardsHistory && state.rewardsHistory.total,
  isRewardsHistoryLoading: state => state.isRewardsHistoryLoading,
  rewardsChartLabels: (state, getters) => {
    if (!getters.rewardsByPeriod
      || Object.keys(getters.rewardsByPeriod).length === 0) return [];
    const arrayOfPoints = Object.keys(getters.rewardsByPeriod)
      .map(address => getters.rewardsByPeriod[address].map(point => point.created_at));
    const timestamps = [];
    arrayOfPoints.map(array => array.forEach(item => timestamps.push(item)));

    const filteredTimestamp = timestamps.filter((item, pos) => timestamps.indexOf(item) === pos);

    const dateSortAsc = function (date1, date2) {
      // This is a comparison function that will result in dates being sorted in
      // ASCENDING order.
      if (new Date(date1) > new Date(date2)) return 1;
      if (new Date(date1) < new Date(date2)) return -1;
      return 0;
    };
    const sortedTimestamps = filteredTimestamp.sort(dateSortAsc);
    return sortedTimestamps.map((timestamp => Vue.prototype.$moment.utc(timestamp * 1000).format('DD.MM.YYYY')));
  },
  rewardsChartDatasets: (state, getters) => {
    if (!getters.rewardsByPeriod
      || Object.keys(getters.rewardsByPeriod).length === 0) return {};
    return Vue.prototype.$helpers.generateChartData2(getters.rewardsByPeriod, getters.rewardsChartLabels);
  },
};

const mutations = {
  setRewardsHistory(state, newRewardsHistory) {
    state.rewardsHistory = newRewardsHistory;
  },
  setIsRewardsHistoryLoading(state, newState) {
    state.isRewardsHistoryLoading = newState;
  },
  // setDailyTotalRewards(state, newDailyTotalRewards) {
  //   state.dailyTotalRewards = newDailyTotalRewards;
  // },
  // setIsDailyTotalRewardsLoading(state, newState) {
  //   state.isDailyTotalRewardsLoading = newState;
  // },
  setRewardsByPeriod(state, newRewards) {
    state.rewardsByPeriod = newRewards;
  },
  setIsRewardsByPeriodLoading(state, newState) {
    state.isRewardsByPeriodLoading = newState;
  },
};

const actions = {
  async requestRewardsHistory({ commit }, { coinName, params }) {
    try {
      commit('setIsRewardsHistoryLoading', true);

      const response = await rewardsServiceApiNew.requestRewardsHistory(coinName, params);

      if (response) {
        commit('setRewardsHistory', response.data);
      }
    } catch (err) {
      Vue.prototype.$errors.handleErrors(err);
    } finally {
      commit('setIsRewardsHistoryLoading', false);
    }
  },
  // async requestDailyTotalRewards({ commit }, data) {
  //   try {
  //     commit('setIsDailyTotalRewardsLoading', true);
  //
  //     const response = await rewardsServiceApiNew.requestDailyTotalRewards(data);
  //
  //     if (response) {
  //       commit('setDailyTotalRewards', response.data);
  //     }
  //   } catch (err) {
  //     Vue.prototype.$errors.handleErrors(err);
  //   } finally {
  //     commit('setIsDailyTotalRewardsLoading', false);
  //   }
  // },
  async requestRewardsByPeriod({ commit }, { coinName, params }) {
    try {
      commit('setIsRewardsByPeriodLoading', true);

      const response = await rewardsServiceApiNew.requestRewardsByPeriod(coinName, params);

      if (response) {
        const rewardsByPeriod = {};
        params.delegators.forEach((delegator) => {
          rewardsByPeriod[`${delegator}`] = response.data.items.filter(item => item.delegator === delegator);
        });
        commit('setRewardsByPeriod', rewardsByPeriod);
      }
    } catch (err) {
      Vue.prototype.$errors.handleErrors(err);
    } finally {
      commit('setIsRewardsByPeriodLoading', false);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
