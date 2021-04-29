import removeTrailingSlash from 'remove-trailing-slash';
import queryString from 'query-string';
import service from './service';

const analyticsService = service.createService({
  baseURL: removeTrailingSlash(process.env.VUE_APP_ANALYTICS_API_HOST),
  // withCredentials: true,
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default {
  exec(chain, endpoint, filters) {
    return analyticsService.get(
      `/${chain}/${removeTrailingSlash(endpoint)}?${queryString.stringify(filters)}`,
    );
  },
  config() {
    return analyticsService.get(
      'metrics_config',
    );
  },
};
