import removeTrailingSlash from 'remove-trailing-slash';
import axios from 'axios';
import service from './service';
import userServiceInterceptors from './interceptors/userServiceInterceptors';

const addressService = service.createService({
  baseURL: removeTrailingSlash(process.env.VUE_APP_ROOT_API_HOST),
  withCredentials: true,
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// abort duplicate request
const pending = {};
const { CancelToken } = axios;
const removePending = (config, f) => {
  // make sure the url is same for both request and response
  const url = config.url.replace(config.baseURL, '');
  // const url = config.url.replace(config.baseURL, '');
  // stringify whole RESTful request with URL params
  const flagUrl = `${url}&${
    config.method}&${
    JSON.stringify(config.params)}`;
  if (flagUrl in pending) {
    if (f) {
      f(); // abort the request
    } else {
      delete pending[flagUrl];
    }
  } else if (f) {
    pending[flagUrl] = f; // store the cancel function
  }
};

service.addRequestInterceptors(addressService,
  (config) => {
    userServiceInterceptors.handleUserEnv(config);
    userServiceInterceptors.handleAuthorizationBearer(config);
    config.cancelToken = new CancelToken((c) => {
      removePending(config, c);
    });
    return config;
  },
  err => Promise.reject(err));

service.addResponseInterceptors(addressService,
  (response) => {
    removePending(response.config);
    return response;
  },
  (err) => {
    if (!axios.isCancel(err)) {
      userServiceInterceptors.handleRefreshToken(err, addressService);
      removePending(err.config);
      return Promise.reject(err);
    }
    // removePending(err.config);
    // return empty object for aborted request
    return Promise.resolve({});
  });

export default {
  getAddresses(currencies) {
    return addressService.post('/addresses', currencies);
  },

  createAddress(addressData) {
    return addressService.post('/address/create', addressData);
  },

  deleteAddress(addressData) {
    return addressService.post('/address/delete', addressData);
  },

  clearPendingRequests() {
    return Object.keys(pending)
      .map((e) => {
        if (pending[e]) {
          pending[e]();
          delete pending[e];
        }
      });
  },
};
