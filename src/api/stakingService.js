import removeTrailingSlash from 'remove-trailing-slash';
import querystring from 'query-string';
import service from './service';

const stakingService = service.createService({
  baseURL: removeTrailingSlash(process.env.VUE_APP_ROOT_API_HOST),
  withCredentials: true,
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default {
  getStakingInfo(currencyCode) {
    return stakingService.get(`/staking_info?currency=${currencyCode}`);
    // return stakingService.get(`/staking_info${currencyCode ? `?${querystring.stringify(currencyCode)}` : ''}`);
  },
};
