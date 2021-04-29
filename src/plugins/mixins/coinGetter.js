// FIXME: create JS ES6 new Map, and simply get all data from coinsMap.get('coinCode');
// !! Vue does not support reactivity over the Map struct !!
import constants from '@/constants';

export default {
  data() {
    return {
      coinsMap: constants.COINS_MAP,
    };
  },
  methods: {
    $_getCoinCode(coinCode) {
      return Object.keys(this.coinsMap).find(currentCoin => coinCode === currentCoin);
    },
    $_getCoinCodeByName(coinName) {
      return Object.keys(this.coinsMap).find(coinCode => this.coinsMap[coinCode].name === coinName);
    },
  },
};
