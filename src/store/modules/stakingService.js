import Vue from 'vue';
import stakingServiceApi from '../../api/stakingService';

const state = {
  stakingInfo: {},
  isStakingInfoLoading: false,
};


// FIXME: Do not overuse getters, it can be simply replaced by MapState.
const getters = {
  stakingInfo: state => state.stakingInfo,
  isStakingInfoLoading: state => state.isStakingInfoLoading,
};

const mutations = {
  setStakingInfo(state, newStakingInfo) {
    state.stakingInfo = newStakingInfo;
  },
  setIsStakingInfoLoading(state, newState) {
    state.isStakingInfoLoading = newState;
  },
};

const actions = {
  async getStakingInfo({ commit }, currencyCode) {
    try {
      commit('setIsStakingInfoLoading', true);

      commit('setStakingInfo', {});
      const response = await stakingServiceApi.getStakingInfo(currencyCode);

      if (response) {
        commit('setStakingInfo', response.data);
      }
    } catch (err) {
      Vue.prototype.$errors.handleErrors(err);
    } finally {
      commit('setIsStakingInfoLoading', false);
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
