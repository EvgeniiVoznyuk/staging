import Vue from 'vue';
import dashServiceApi from '../../api/dashService';

const state = {
  dashUserSettings: {},
  isDashUserSettingsLoading: false,
};

const getters = {
  dashUserSettings: state => state.dashUserSettings,
  dashDepositAddress: state => (state.dashUserSettings ? state.dashUserSettings.dash_deposit_address : ''),
  isDashUserSettingsLoading: state => state.isDashUserSettingsLoading,
};

const mutations = {
  setDashUserSettings(state, newState) {
    state.dashUserSettings = newState;
  },
  setIsDashUserSettingsLoading(state, newState) {
    state.isDashUserSettingsLoading = newState;
  },
};

const actions = {
  async getDashUserSettings({ commit }) {
    try {
      commit('setIsDashUserSettingsLoading', true);
      const response = await dashServiceApi.getDashUserSettings();
      if (response) {
        commit('setDashUserSettings', response.data);
      }
    } catch (err) {
      this.$errors.handleErrors(err);
    } finally {
      commit('setIsDashUserSettingsLoading', false);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
