import removeTrailingSlash from 'remove-trailing-slash';
import service from './service';
import userServiceInterceptors from './interceptors/userServiceInterceptors';
import balanceHistoryDemo from '../constants/balanceHistoryDemo';

const balanceService = service.createService({
  baseURL: removeTrailingSlash(process.env.VUE_APP_ROOT_API_HOST),
  withCredentials: true,
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

service.addRequestInterceptors(balanceService,
  (config) => {
    userServiceInterceptors.handleUserEnv(config);
    userServiceInterceptors.handleAuthorizationBearer(config);
    return config;
  },
  err => Promise.reject(err));

service.addResponseInterceptors(balanceService,
  response => response,
  err => userServiceInterceptors.handleRefreshToken(err, balanceService));

export default {
  requestBalanceHistory(data, isUserLoggedIn) {
    return isUserLoggedIn
      ? balanceService.post('/balance/history/agg', data)
      : Promise.resolve({ data: balanceHistoryDemo });
  },
};
