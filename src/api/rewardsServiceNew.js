import removeTrailingSlash from 'remove-trailing-slash';
import querystring from 'query-string';
import service from './service';
import userServiceInterceptors from './interceptors/userServiceInterceptors';

const rewardsServiceNew = service.createService({
  baseURL: removeTrailingSlash('https://slurp2.everstake.one'),
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

service.addRequestInterceptors(rewardsServiceNew,
  (config) => {
    userServiceInterceptors.handleUserEnv(config);
    userServiceInterceptors.handleAuthorizationBearer(config);
    return config;
  },
  err => Promise.reject(err));

service.addResponseInterceptors(rewardsServiceNew,
  response => response,
  err => userServiceInterceptors.handleRefreshToken(err, rewardsServiceNew));

export default {
  requestRewardsByPeriod(coinName, params) {
    return rewardsServiceNew.post(`/${coinName}/rewards`, params);
  },
  requestRewardsHistory(coinName, params) {
    return rewardsServiceNew.get(`/${coinName}/reports/rewards?${querystring.stringify(params)}`);
  },
};
