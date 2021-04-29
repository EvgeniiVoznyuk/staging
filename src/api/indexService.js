import removeTrailingSlash from 'remove-trailing-slash';
import service from './service';

const indexService = service.createService({
  baseURL: removeTrailingSlash(process.env.VUE_APP_ROOT_API_HOST),
  withCredentials: true,
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default {
  getGeneralStakingInfo() {
    return indexService.get('/general_staking_info');
  },

  getGeneralRewardsStats(currencies) {
    return indexService.post('/general_rewards_stats', currencies);
  },
};
