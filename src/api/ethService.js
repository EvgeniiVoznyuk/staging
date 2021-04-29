import axios from 'axios';

const ethService = axios.create({
  baseURL: 'https://slurp2.everstake.one',
  // baseURL: process.env.VUE_APP_SLURP_2_API_HOST,
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default {
  requestDeposits(data) {
    return ethService.post('/ethereum/deposits', data);
  },
  requestIncomesAgg(data) {
    return ethService.post('/ethereum/incomes/agg', data);
  },
  requestBalancesAgg(data) {
    return ethService.post('/ethereum/balances/agg', data);
  },
};
