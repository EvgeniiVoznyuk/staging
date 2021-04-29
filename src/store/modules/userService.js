import Vue from 'vue';
import userServiceApi from '../../api/userService';
import router from '../../router';

const state = {
  authorizationTokens: {
    accessToken: '',
    refreshToken: '',
  },
  isLoginSubmitting: false,
  userData: {},
  countries: [],
  permissions: {},
};

const getters = {
  isUserLoggedIn: state => Boolean(state.authorizationTokens.accessToken
    && state.authorizationTokens.accessToken.length),
  accessToken: state => state.authorizationTokens.accessToken,
  refreshToken: state => state.authorizationTokens.refreshToken,
  isLoginSubmitting: state => state.isLoginSubmitting,
  userData: state => state.userData,
  userEmail: state => (state.userData ? state.userData.email : ''),
  isDashKYCPassed: state => state.userData.permissions && state.userData.permissions.includes('use_dash'),
  countries: state => state.countries,
  permissions: state => state.permissions,
};

const mutations = {
  setAccessToken(state, accessToken) {
    state.authorizationTokens.accessToken = accessToken;
  },
  setRefreshToken(state, refreshToken) {
    state.authorizationTokens.refreshToken = refreshToken;
  },
  setIsLoginSubmitting(state, newState) {
    state.isLoginSubmitting = newState;
  },
  setUserData(state, userData) {
    state.userData = userData;
  },
  setCountries(state, countries) {
    state.countries = countries;
  },
  setPermissions(state, permissions) {
    state.permissions = permissions;
  },
};

const actions = {
  async login({ commit, dispatch }, data) {
    const { payload, onSuccess, onFail } = data;

    try {
      commit('setIsLoginSubmitting', true);
      const response = await userServiceApi.login(payload);
      const responseData = response.data;

      if (response.data) {
        commit('setAccessToken', responseData.access_token);
        commit('setRefreshToken', responseData.refresh_token);
        onSuccess();
        dispatch('getUserData');
        router.push({ name: 'Balance' });
      }
    } catch (err) {
      // onFail();
      Vue.errors.handleErrors(err);
    } finally {
      commit('setIsLoginSubmitting', false);
    }
  },

  async restoreJWT({ commit, dispatch }) {
    try {
      const response = await userServiceApi.restoreJWT();
      const responseData = response.data;

      if (response.data) {
        commit('setAccessToken', responseData.access_token);
        commit('setRefreshToken', responseData.refresh_token);
        dispatch('getUserData');
      }
    } catch (err) {
      return err;
    }
  },

  async refreshJWT({ dispatch, commit }, data) {
    // const { refreshToken, axios, originalRequest } = data;
    const { refreshToken } = data;
    try {
      const response = await userServiceApi.refreshJWT({ refresh_token: refreshToken });
      const responseData = response.data;

      if (responseData) {
        commit('setAccessToken', responseData.access_token);
        commit('setRefreshToken', responseData.refresh_token);
        // return axios(originalRequest);
        // return is needed to check if the request is successful in the interceptor
        return response ? response.data : response;
      }
    } catch (err) {
      if (Vue.prototype.$errors.isBadToken(err)) {
        dispatch('logout').then(() => router.push({ name: 'Sign in' }));
      }
    }
  },

  async logout({ commit }) {
    try {
      const response = await userServiceApi.logout();
      const responseData = response.data;

      if (responseData.message === 'success') {
        commit('setAccessToken', '');
        commit('setRefreshToken', '');
        commit('addressService/setAddressesData', [], { root: true });
        commit('setUserData', {});
        router.push({ name: 'Sign in' });
      }
    } catch (err) {
      commit('setAccessToken', '');
      commit('setRefreshToken', '');
      commit('addressService/setAddressesData', [], { root: true });
      commit('setUserData', {});
      router.push({ name: 'Sign in' });
    }
  },

  async getUserData({ commit }) {
    try {
      const response = await userServiceApi.getUserData();

      if (response) {
        commit('setUserData', response.data);
      }
    } catch (err) {
      Vue.errors.handleErrors(err);
    }
  },

  async getCountries({ commit }) {
    try {
      const response = await userServiceApi.getCountries();
      if (response) {
        commit('setCountries', response.data);
      }
    } catch (err) {
      Vue.errors.handleErrors(err);
    }
  },

  async getPermissions({ commit }) {
    try {
      const response = await userServiceApi.getPermissions();
      if (response) {
        commit('setPermissions', response.data);
      }
    } catch (err) {
      Vue.errors.handleErrors(err);
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
