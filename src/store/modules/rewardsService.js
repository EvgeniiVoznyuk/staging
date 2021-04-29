import Vue from 'vue';
import rewardsServiceApi from '../../api/rewardsService';
import constants from '../../constants';

const state = {
  rewardsHistory: {},
  isRewardsHistoryLoading: false,
  dailyTotalRewards: {},
  isDailyTotalRewardsLoading: false,
  rewardsByPeriod: {},
  isRewardsByPeriodLoading: false,
};

const getters = {
  rewardsHistory: (state, getters, rootState, rootGetters) => {
    if (!(Object.keys(state.rewardsHistory) && state.rewardsHistory.data)) return [];
    const rates = rootGetters['ratesService/rates'];
    const coinCode = state.rewardsHistory.currency_code;

    return state.rewardsHistory.data.map((item) => {
      const formattedDate = Vue.prototype.$helpers.formatTimestamp(item.payout_date);

      return {
        name: item.baker,
        address: item.address,
        reward: `${item.amount_rewards} ${coinCode.toUpperCase()}`,
        equivalent: rates[coinCode]
          ? `${Vue.prototype.$helpers.roundWithPrecision(
            (item.amount_rewards * rates[coinCode].usd),
            constants.USD_PRECISION,
          )} $` : '',
        date: formattedDate,
      };
    });
  },
  rewardsHistoryTotal: state => state.rewardsHistory && state.rewardsHistory.total,
  isRewardsHistoryLoading: state => state.isRewardsHistoryLoading,
  dailyTotalRewards: state => state.dailyTotalRewards,
  isDailyTotalRewardsLoading: state => state.isDailyTotalRewardsLoading,
  rewardsByPeriod: state => state.rewardsByPeriod,
  isRewardsByPeriodLoading: state => state.isRewardsByPeriodLoading,
  rewardsChartLabels: (state, getters) => {
    if (!getters.rewardsByPeriod
      || Object.keys(getters.rewardsByPeriod).length === 0) return [];
    return Vue.prototype.$helpers.generateChartLabels(getters.rewardsByPeriod);
  },
  rewardsChartDatasets: (state, getters) => {
    if (!getters.rewardsByPeriod
      || Object.keys(getters.rewardsByPeriod).length === 0) return {};
    return Vue.prototype.$helpers.generateChartData(getters.rewardsByPeriod);
  },
};

const mutations = {
  setRewardsHistory(state, newRewardsHistory) {
    state.rewardsHistory = newRewardsHistory;
  },
  setIsRewardsHistoryLoading(state, newState) {
    state.isRewardsHistoryLoading = newState;
  },
  setDailyTotalRewards(state, newDailyTotalRewards) {
    state.dailyTotalRewards = newDailyTotalRewards;
  },
  setIsDailyTotalRewardsLoading(state, newState) {
    state.isDailyTotalRewardsLoading = newState;
  },
  setRewardsByPeriod(state, newRewards) {
    state.rewardsByPeriod = newRewards;
  },
  setIsRewardsByPeriodLoading(state, newState) {
    state.isRewardsByPeriodLoading = newState;
  },
};

const actions = {
  async requestRewardsHistory({ commit }, data) {
    try {
      commit('setIsRewardsHistoryLoading', true);

      const response = await rewardsServiceApi.requestRewardsHistory(data);

      if (response) {
        commit('setRewardsHistory', response.data);
      }
    } catch (err) {
      Vue.prototype.$errors.handleErrors(err);
    } finally {
      commit('setIsRewardsHistoryLoading', false);
    }
  },
  async requestDailyTotalRewards({ commit }, data) {
    try {
      commit('setIsDailyTotalRewardsLoading', true);

      const response = await rewardsServiceApi.requestDailyTotalRewards(data);

      if (response) {
        commit('setDailyTotalRewards', response.data);
      }
    } catch (err) {
      Vue.prototype.$errors.handleErrors(err);
    } finally {
      commit('setIsDailyTotalRewardsLoading', false);
    }
  },
  async requestRewardsByPeriod({ commit }, data) {
    try {
      commit('setIsRewardsByPeriodLoading', true);

      const response = await rewardsServiceApi.requestRewardsByPeriod(data);

      if (response) {
        commit('setRewardsByPeriod', response.data);
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
