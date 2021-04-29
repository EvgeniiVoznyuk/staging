import removeTrailingSlash from 'remove-trailing-slash';
import service from './service';
import userServiceInterceptors from './interceptors/userServiceInterceptors';

const rewardsService = service.createService({
  baseURL: removeTrailingSlash(process.env.VUE_APP_SLURP_API_HOST),
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

service.addRequestInterceptors(rewardsService,
  (config) => {
    userServiceInterceptors.handleUserEnv(config);
    userServiceInterceptors.handleAuthorizationBearer(config);
    return config;
  },
  err => Promise.reject(err));

service.addResponseInterceptors(rewardsService,
  response => response,
  err => userServiceInterceptors.handleRefreshToken(err, rewardsService));

export default {
  requestRewardsHistory(data) {
    return rewardsService.post('/rewards', data);
  },
  requestDailyTotalRewards(addresses) {
    return rewardsService.post('/rewards/agg', addresses);
  },
  requestRewardsByPeriod(data) {
    return rewardsService.post('/rewards/agg/period', data);
  },
};
