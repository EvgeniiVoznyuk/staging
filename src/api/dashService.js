import removeTrailingSlash from 'remove-trailing-slash';
import service from './service';
import userServiceInterceptors from './interceptors/userServiceInterceptors';

const dashService = service.createService({
  baseURL: removeTrailingSlash(process.env.VUE_APP_ROOT_API_HOST),
  withCredentials: true,
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

service.addRequestInterceptors(dashService,
  (config) => {
    userServiceInterceptors.handleUserEnv(config);
    userServiceInterceptors.handleAuthorizationBearer(config);
    return config;
  },
  err => Promise.reject(err));

service.addResponseInterceptors(dashService,
  response => response,
  err => userServiceInterceptors.handleRefreshToken(err, dashService));

export default {
  setDashAutoPayout(isEnabled) {
    return dashService.post('/dash/set_auto_payout', isEnabled);
  },

  getDashUserSettings() {
    return dashService.get('/dash/get_user_settings');
  },
};
