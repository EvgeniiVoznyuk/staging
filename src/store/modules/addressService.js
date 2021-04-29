import Vue from 'vue';
import addressServiceApi from '../../api/addressService';
import i18n from '../../i18n';
import constants from '../../constants';
import addressesDataDemo from '../../constants/addressesDataDemo';

const state = {
  addressesData: [],
  isAddressesDataLoading: false,
};

const getters = {
  addressesData: (state, getters, rootState, rootGetters) => {
    if (!state.addressesData || state.addressesData.length === 0) return [];
    const dailyTotalRewards = rootGetters['rewardsService/dailyTotalRewards'];
    const rates = rootGetters['ratesService/rates'];

    return state.addressesData.reduce((acc, currentAddress) => {
      const {
        address, currency, balance, staking_amount: stakingAmount,
      } = currentAddress;
      const addressRewards = address in dailyTotalRewards
        ? dailyTotalRewards[address]
        : { daily: 0, total: 0 };
      const usdRate = rates[currency] ? rates[currency].usd : '';
      const balanceEquivalent = Vue.prototype.$helpers.roundWithPrecision(balance
        * usdRate, constants.USD_PRECISION);
      const dailyReward = Vue.prototype.$helpers.roundWithPrecision(addressRewards.daily
        * usdRate, constants.USD_PRECISION);
      const totalReward = Vue.prototype.$helpers.roundWithPrecision(addressRewards.total
        * usdRate, constants.USD_PRECISION);
      const stakingBalance = Vue.prototype.$helpers.roundWithPrecision(stakingAmount,
        constants.CRYPTO_MAX_PRECISION);

      acc.push(
        [
          {
            name: i18n.t('common.yourAddress'),
            result: `${address}`,
          },
          {
            name: i18n.t('common.balance'),
            result: `${balance} ${currency.toUpperCase()}`,
          },
          {
            name: i18n.t('common.equivalent'),
            result: balanceEquivalent < constants.MIN_USD_AMOUNT ? `< ${constants.MIN_USD_AMOUNT} $` : `${balanceEquivalent} $`,
          },
          {
            name: i18n.t('balance.totalStakingBalance'),
            result: `${stakingBalance} ${currency.toUpperCase()}`,
          },
          // hide until connected slurp2
          // {
          //   name: i18n.t('common.dailyReward'),
          //   result: (() => {
          //     if (dailyReward === 0) return '-----';
          //     if (dailyReward < constants.MIN_USD_AMOUNT) return `< ${constants.MIN_USD_AMOUNT} $`;
          //     return `${dailyReward} $`;
          //   })(),
          // },
          // {
          //   name: i18n.t('common.totalReward'),
          //   result: (() => {
          //     if (totalReward === 0) return '-----';
          //     if (totalReward < constants.MIN_USD_AMOUNT) return `< ${constants.MIN_USD_AMOUNT} $`;
          //     return `${totalReward} $`;
          //   })(),
          // },
        ],
      );
      return acc;
    }, []);
  },
  addressesDataNew: (state, getters, rootState, rootGetters) => {
    if (!state.addressesData || state.addressesData.length === 0) return [];
    const rates = rootGetters['ratesService/rates'];

    return state.addressesData.reduce((acc, currentAddress) => {
      const {
        address,
        currency,
        balance,
        staking_amount: stakingAmount,
        daily,
        total,
      } = currentAddress;
      const usdRate = rates[currency] ? rates[currency].usd : '';
      const dailyInUsd = Vue.prototype.$helpers.roundWithPrecision(daily
        * usdRate, constants.USD_PRECISION);
      const totalInUsd = Vue.prototype.$helpers.roundWithPrecision(total
        * usdRate, constants.USD_PRECISION);
      const balanceEquivalent = Vue.prototype.$helpers.roundWithPrecision(balance
        * usdRate, constants.USD_PRECISION);
      const dailyReward = Vue.prototype.$helpers.roundWithPrecision(daily,
        constants.CRYPTO_MAX_PRECISION);
      const totalReward = Vue.prototype.$helpers.roundWithPrecision(total,
        constants.CRYPTO_MAX_PRECISION);
      const stakingBalance = Vue.prototype.$helpers.roundWithPrecision(stakingAmount,
        constants.CRYPTO_MAX_PRECISION);

      acc.push(
        [
          {
            name: i18n.t('common.yourAddress'),
            result: `${address}`,
          },
          {
            name: i18n.t('common.balance'),
            result: `${balance} ${currency.toUpperCase()}`,
          },
          {
            name: i18n.t('common.equivalent'),
            result: balanceEquivalent < constants.MIN_USD_AMOUNT ? `< ${constants.MIN_USD_AMOUNT} $` : `${balanceEquivalent} $`,
          },
          {
            name: i18n.t('balance.totalStakingBalance'),
            result: `${stakingBalance} ${currency.toUpperCase()}`,
          },
          // hide until connnected slurp2
          // {
          //   name: i18n.t('common.dailyReward'),
          //   result: (() => {
          //     if (dailyReward === 0) return '-----';
          //     return `${dailyReward} ${currency.toUpperCase()} (${dailyInUsd < constants.MIN_USD_AMOUNT ? `< ${constants.MIN_USD_AMOUNT}` : dailyInUsd} $)`;
          //   })(),
          // },
          // {
          //   name: i18n.t('common.totalReward'),
          //   result: (() => {
          //     if (totalReward === 0) return '-----';
          //     return `${totalReward} ${currency.toUpperCase()} (${totalInUsd < constants.MIN_USD_AMOUNT ? `< ${constants.MIN_USD_AMOUNT}` : totalInUsd} $)`;
          //   })(),
          // },
        ],
      );
      return acc;
    }, []);
  },
  allAddressesOfAllCoins: (state) => {
    if (!state.addressesData || state.addressesData.length === 0) return [];

    return Object.values(state.addressesData.reduce((acc, currentAddress) => {
      const currencyCode = currentAddress.currency;
      const currencyAddress = currentAddress.address;

      if (!acc[currencyCode]) {
        acc[currencyCode] = {
          coin: currencyCode.toUpperCase(),
          addresses: currencyAddress,
        };
        return acc;
      }
      acc[currencyCode].addresses += `, ${currencyAddress}`;
      return acc;
    }, {}));
  },
  balancesByAddresses: (state, getters, rootState, rootGetters) => {
    const isUserLoggedIn = rootGetters['userService/isUserLoggedIn'];
    const rates = rootGetters['ratesService/rates'];
    const cryptoPrecision = constants.CRYPTO_MAX_PRECISION;
    const usdPrecision = constants.USD_PRECISION;
    let counter = 0;
    let totalBalanceInUsd = 0;
    let addressesData;

    if (!isUserLoggedIn) {
      addressesData = addressesDataDemo;
    } else {
      addressesData = state.addressesData || [];
    }

    return Object.values(addressesData
      .reduce((acc, currentAddress) => {
        const currentCurrency = currentAddress.currency;
        const currentAddressBalance = Vue.prototype.$helpers.roundWithPrecision(
          currentAddress.balance, cryptoPrecision,
        );
        const usdRate = rates[currentCurrency] ? Vue.prototype.$helpers.roundWithPrecision(
          rates[currentCurrency].usd, usdPrecision,
        ) : '';
        const btcRate = rates[currentCurrency] ? Vue.prototype.$helpers.roundWithPrecision(
          rates[currentCurrency].btc, cryptoPrecision,
        ) : '';
        const amountInUsd = Vue.prototype.$helpers.roundWithPrecision(
          currentAddressBalance * usdRate, usdPrecision,
        );
        const btcToUsdRate = rates.btc ? rates.btc.usd : '';

        const tokenPrice = Vue.prototype.$helpers.roundWithPrecision(usdRate, usdPrecision);
        totalBalanceInUsd += amountInUsd;

        const currentAddressStakingBalance = Vue.prototype.$helpers.roundWithPrecision(
          currentAddress.staking_amount, cryptoPrecision,
        );
        const stakingAmountInUsd = Vue.prototype.$helpers.roundWithPrecision(
          currentAddressStakingBalance * usdRate, usdPrecision,
        );
        // const stakingAmountInBtc = Vue.prototype.$helpers.roundWithPrecision(
        //   currentAddressStakingBalance * btcRate, cryptoPrecision,
        // );
        const stakingAmountInBtc = Vue.prototype.$helpers.roundWithPrecision(
          stakingAmountInUsd / btcToUsdRate, cryptoPrecision,
        );

        if (!acc[currentCurrency]) {
          acc[currentCurrency] = {
            currency: currentCurrency,
            amount: currentAddressBalance,
            amountInUsd,
            tokenPrice,
            yearlyEarning: constants.COINS_MAP[currentCurrency].yearlyEarning,
            variant: constants.VARIANTS[counter],
            coinShare: 0,
            stakingAmount: currentAddressStakingBalance,
            stakingAmountInUsd,
            stakingAmountInBtc,
          };
          counter = Vue.prototype.$helpers.countTill(counter, constants.VARIANTS.length);
          return acc;
        }

        acc[currentCurrency].amount = Vue.prototype.$helpers.roundWithPrecision(
          acc[currentCurrency].amount + currentAddressBalance, cryptoPrecision,
        );
        acc[currentCurrency].amountInUsd = Vue.prototype.$helpers.roundWithPrecision(
          acc[currentCurrency].amountInUsd + amountInUsd, usdPrecision,
        );
        acc[currentCurrency].stakingAmount = Vue.prototype.$helpers.roundWithPrecision(
          acc[currentCurrency].stakingAmount + currentAddressStakingBalance, cryptoPrecision,
        );
        acc[currentCurrency].stakingAmountInUsd = Vue.prototype.$helpers.roundWithPrecision(
          acc[currentCurrency].stakingAmountInUsd + stakingAmountInUsd, usdPrecision,
        );
        acc[currentCurrency].stakingAmountInBtc = Vue.prototype.$helpers.roundWithPrecision(
          acc[currentCurrency].stakingAmountInBtc + stakingAmountInBtc, usdPrecision,
        );

        return acc;
      }, {}))
      .map((item) => {
        item.coinShare = Vue.prototype.$helpers.roundWithPrecision(
          (item.amountInUsd * 100) / totalBalanceInUsd, usdPrecision,
        );
        return item;
      });
  },

  isAddressesDataLoading: state => state.isAddressesDataLoading,
  isUserAddressAvailable: state => state.addressesData
    && state.addressesData.length !== 0,
  availableAddresses(state, getters) {
    if (!getters.isUserAddressAvailable) return [];
    return state.addressesData.map(addressObj => addressObj.address);
  },
};

const mutations = {
  setAddressesData(state, newAddressesData) {
    state.addressesData = newAddressesData;
  },
  setIsAddressesDataLoading(state, newState) {
    state.isAddressesDataLoading = newState;
  },
};

const actions = {
  async getAddressesData({ commit }, currencies) {
    const currenciesArr = { currencies };

    try {
      commit('setIsAddressesDataLoading', true);
      commit('setAddressesData', []);
      const response = await addressServiceApi.getAddresses(currenciesArr);

      if (response.data) {
        commit('setAddressesData', response.data);
      }
    } catch (err) {
      Vue.prototype.$errors.handleErrors(err);
    } finally {
      commit('setIsAddressesDataLoading', false);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
