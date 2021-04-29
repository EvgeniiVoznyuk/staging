import Vue from 'vue';
// import store from '../../store';

// Refresh vars
let refreshPromise;
let isRefreshing = false;

export default {
  // Request Interceptors
  handleUserEnv(config) {
    if (localStorage.getItem('userEnv')) {
      const userEnv = {
        cookie_id: Vue.prototype.$helpers.getCookieUuid(),
      };
      const userEnvEncoded = btoa(JSON.stringify(userEnv));
      config.headers['User-Env'] = userEnvEncoded;
    }
  },

  handleAuthorizationBearer(config) {
    // const accessToken = store.getters['userService/accessToken'];
    const accessToken = Vue.prototype.$store.getters['userService/accessToken'];
    if (accessToken && accessToken.length) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  },

  // Response Interceptors
  async handleRefreshToken(err, axios) {
    const originalRequest = err.config;
    // const refreshToken = store.getters['userService/refreshToken'];
    const refreshToken = Vue.prototype.$store.getters['userService/refreshToken'];

    if (Vue.prototype.$errors.isBadJWT(err) && refreshToken) {
      try {
        const response = await this.getRefreshToken(refreshToken);

        if (response) {
          const url = err.config.url.split('/');

          if (url[url.length - 1] === 'addresses') {
            Vue.prototype.$store.dispatch('addressService/getAddressesData', JSON.parse(err.config.data).currencies);
          }

          return axios(originalRequest);
        }
      } catch {
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  },

  async getRefreshToken(refreshToken) {
    if (isRefreshing) {
      return refreshPromise;
    }
    isRefreshing = true;
    refreshPromise = new Promise(async (resolve) => {
      try {
        // resolve(await store.dispatch('userService/refreshJWT',
        resolve(await Vue.prototype.$store.dispatch('userService/refreshJWT',
          { refreshToken }));
      } finally {
        isRefreshing = false;
      }
    });
    return refreshPromise;
  },
};
