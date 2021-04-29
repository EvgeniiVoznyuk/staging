import Vue from 'vue';
import ratesServiceApi from '../../api/ratesService';

const state = {
  rates: {},
  isRatesLoading: false,
};

const getters = {
  rates: state => state.rates,
  isRatesLoading: state => state.isRatesLoading,
};

const mutations = {
  setRates(state, newState) {
    state.rates = newState;
  },
  setIsRatesLoading(state, newState) {
    state.isRatesLoading = newState;
  },
};

const actions = {
  async requestRates({ commit }, currencySide) {
    try {
      commit('setIsRatesLoading', true);
      const response = await ratesServiceApi.requestRates(currencySide);

      if (response.data) {
        commit('setRates', response.data);
      }
    } catch (err) {
      Vue.prototype.$errors.handleErrors(err);
    } finally {
      commit('setIsRatesLoading', false);
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
