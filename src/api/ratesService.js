import removeTrailingSlash from 'remove-trailing-slash';
import service from './service';

const ratesService = service.createService({
  baseURL: removeTrailingSlash(process.env.VUE_APP_ROOT_API_HOST),
  withCredentials: true,
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default {
  /* To get all rates passing an empty object {} is needed
     If base_currencies[] is empty or not added, all base currencies will be returned
     If quote_currencies[] is empty or not added, all quote currencies will be returned */
  requestRates(currencySide) {
    return ratesService.post('/rates', currencySide);
  },
};
