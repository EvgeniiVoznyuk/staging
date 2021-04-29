import Vue from 'vue';
import ethService from '../../api/ethService';
import constants from '@/constants';

const state = {
  address: '',
  depositsHistory: {},
  isDepositsLoading: false,
  chartDatasets: {},
  isLoadingChartTotalHistory: false,
  balancesChart: {},
  isBalancesChartLoading: false,
};

const getters = {
  depositsHistory(state) {
    if (
      !Object.keys(state.depositsHistory)
      || !Object.keys(state.depositsHistory).length
      || !state.depositsHistory.items
    ) {
      return [];
    }

    return state.depositsHistory.items.map(item => ({
      address: item.public_key,
      deposit: item.amount,
      date: item.created_at,
    }));
  },
  depositsHistoryTotal: state => state.depositsHistory.total,
  incomesChartDatasets(state) {
    if (!state.chartDatasets || !state.chartDatasets.length) return [];
    const coinName = constants.COINS_MAP.eth.name;

    return Vue.prototype.$helpers.generateChartsData(state.chartDatasets, coinName);
  },
  incomesChartLabels(state) {
    if (!state.chartDatasets || !state.chartDatasets.length) return [];

    return Vue.prototype.$helpers.generateChartsLabels(state.chartDatasets);
  },
  balancesChartDatasets(state) {
    if (!state.balancesChart || !state.balancesChart.length) return [];
    const coinName = constants.COINS_MAP.eth.name;

    return Vue.prototype.$helpers.generateChartsData(state.balancesChart, coinName);
  },
  balancesChartLabels(state) {
    if (!state.balancesChart || !state.balancesChart.length) return [];

    return Vue.prototype.$helpers.generateChartsLabels(state.balancesChart);
  },
  isAddressAvailable(state) {
    return !!state.address;
  },
};

const mutations = {
  setDepositsHistory(state, newDepositsHistory) {
    state.depositsHistory = newDepositsHistory;
  },
  setIsDepositsLoading(state, newState) {
    state.isDepositsLoading = newState;
  },
  setIncomesChartDatasets(state, newDataset) {
    state.chartDatasets = newDataset;
  },
  setIsLoadingChartTotalHistory(state, newState) {
    state.isLoadingChartTotalHistory = newState;
  },
  setBalancesChart(state, newDataset) {
    state.balancesChart = newDataset;
  },
  setIsBalancesChartLoading(state, newDataset) {
    state.isBalancesChartLoading = newDataset;
  },
  setAddress(state, newAddress) {
    state.address = newAddress;
  },
};

const actions = {
  async requestDepositsEth({ commit }, data) {
    try {
      commit('setIsDepositsLoading', true);

      const response = await ethService.requestDeposits(data);

      if (response) {
        commit('setDepositsHistory', response.data);
      }
    } catch (err) {
      Vue.prototype.$errors.handleErrors(err);
    } finally {
      commit('setIsDepositsLoading', false);
    }
  },
  async requestChartDataset({ commit }, data) {
    try {
      commit('setIsLoadingChartTotalHistory', true);

      const response = await ethService.requestIncomesAgg(data);

      if (response) {
        commit('setIncomesChartDatasets', response.data);
      }
    } catch (err) {
      Vue.prototype.$errors.handleErrors(err);
    } finally {
      commit('setIsLoadingChartTotalHistory', false);
    }
  },
  async requestBalancesChart({ commit }, data) {
    try {
      commit('setIsBalancesChartLoading', true);

      const response = await ethService.requestBalancesAgg(data);

      if (response) {
        commit('setBalancesChart', response.data);
      }
    } catch (err) {
      Vue.prototype.$errors.handleErrors(err);
    } finally {
      commit('setIsBalancesChartLoading', false);
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
