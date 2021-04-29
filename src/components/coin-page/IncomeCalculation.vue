<template>
  <b-card>
    <template slot="header">
      <h2 class="title title--small title--white mb-0">
        <i class="fa fa-map-o grey mr-1 fs-12"></i>
        {{ $t('common.calcIncome') }}
      </h2>
    </template>

    <p class="">{{ $t('common.everstakeIsTheBest') }}</p>

    <b-form>
      <b-row>
        <b-col cols="12" md="6">
          <b-form-group
            :label="$t('common.whatToStake')"
            label-for="stake">
            <b-form-select id="stake"
                           v-model.trim="stake">
              <option :value="index"
                      class="text-capitalize"
                      v-for="(coin, index) in coinsFiltered" :key="index">
                  {{ $helpers.capitalize(coin.name) }}
              </option>
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col cols="12" md="6">
          <b-form-group
            :label="$t('common.howManyAssets')"
            label-for="assets">
            <b-form-input min="0" id="assets" v-model="assets" type="number"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>

    <b-table
      v-if="!isAllRatesLoading "
      :hover="true"
      :striped="true"
      :outlined="true"
      :fixed="true"
      responsive="sm"
      stacked="md"
      thead-class="d-none"
      :items="incomeDataTable">
    </b-table>
  </b-card>
</template>

<script>
import constants from '@/constants';

export default {
  name: 'IncomeCalculation',
  props: {
    stakeProp: {
      type: String,
    },
  },
  data() {
    return {
      // stake: 'xtz',
      stake: this.stakeProp,
      assets: '0',
      coins: constants.COINS_MAP,
      isAllRatesLoading: true,
      rates: {},
      cryptoMaxPrecision: constants.CRYPTO_MAX_PRECISION,
      usdPrecision: constants.USD_PRECISION,
      restrictedCoins: ['usd', 'etz', 'nkn', 'cyber', 'rem', 'bet'],
      minUsdAmount: constants.MIN_USD_AMOUNT,
    };
  },
  computed: {
    coinsFiltered() {
      return Object.keys(this.coins).reduce((acc, coinCode) => {
        if (!this.restrictedCoins.includes(coinCode)) {
          acc[coinCode] = this.coins[coinCode];
        }
        return acc;
      }, {});
    },
    yearlyEarning() {
      return this.$helpers.roundWithPrecision(this.assets
        * this.coins[this.stake].yearlyEarning / 100,
      this.cryptoMaxPrecision);
    },
    monthlyEarning() {
      return this.$helpers.roundWithPrecision(this.yearlyEarning / 12,
        this.cryptoMaxPrecision);
    },
    dailyEarning() {
      return this.$helpers.roundWithPrecision(this.yearlyEarning / 365,
        this.cryptoMaxPrecision);
    },
    holdingValueInUsd() {
      return this.$helpers.roundWithPrecision(this.assets
        * this.rates[this.stake].usd,
      this.usdPrecision);
    },
    dailyEarningInUsd() {
      return this.$helpers.roundWithPrecision(this.dailyEarning
        * this.rates[this.stake].usd,
      this.usdPrecision);
    },
    monthlyEarningInUsd() {
      return this.$helpers.roundWithPrecision(this.monthlyEarning
        * this.rates[this.stake].usd,
      this.usdPrecision);
    },
    yearlyEarningInUsd() {
      return this.$helpers.roundWithPrecision(this.yearlyEarning
        * this.rates[this.stake].usd,
      this.usdPrecision);
    },
    incomeDataTable() {
      return [
        {
          name: this.$t('incomeCalculator.holdingValue'),
          amount: `${this.assets} ${this.stake.toUpperCase()}`,
          amountInUSD: `${this.holdingValueInUsd < this.minUsdAmount
            ? `< ${this.minUsdAmount}`
            : this.holdingValueInUsd} $`,
        },
        {
          name: this.$t('incomeCalculator.dailyEarning'),
          amount: `${this.dailyEarning} ${this.stake.toUpperCase()}`,
          amountInUSD: `${this.dailyEarningInUsd < this.minUsdAmount
            ? `< ${this.minUsdAmount}`
            : this.dailyEarningInUsd} $`,
        },
        {
          name: this.$t('incomeCalculator.monthlyEarning'),
          amount: `${this.monthlyEarning} ${this.stake.toUpperCase()}`,
          amountInUSD: `${this.monthlyEarningInUsd < this.minUsdAmount
            ? `< ${this.minUsdAmount}`
            : this.monthlyEarningInUsd} $`,
        },
        {
          name: this.$t('incomeCalculator.yearlyEarning'),
          amount: `${this.yearlyEarning} ${this.stake.toUpperCase()}`,
          amountInUSD: `${this.yearlyEarningInUsd < this.minUsdAmount
            ? `< ${this.minUsdAmount}`
            : this.yearlyEarningInUsd} $`,
        },
      ];
    },
  },
  methods: {
    async requestAllRates() {
      try {
        this.isAllRatesLoading = true;
        const response = await this.$ratesServiceApi.requestRates({});
        if (response) {
          this.rates = response.data;
        }
      } catch (err) {
        this.$errors.handleErrors(err);
      } finally {
        this.isAllRatesLoading = false;
      }
    },
  },
  mounted() {
    this.requestAllRates();
  },
};
</script>

<style scoped>

</style>
