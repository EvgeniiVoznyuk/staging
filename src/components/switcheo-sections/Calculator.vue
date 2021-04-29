<template>
  <b-card no-body v-if="!isRatesLoading">
    <b-card-header>
      <h2 class="title title--white title--l mb-0">
        {{ $t('swth.rewardCalculator') }}
      </h2>
    </b-card-header>
    <b-card-body>
      <b-row>
        <b-col lg="6">
          <form
            action="#"
            class="form-calc text-center"
          >
            <h3 class="title title--white title--l mb-3">
              {{ $t('swth.howMany') }}
            </h3>
            <b-form-input
              size="lg"
              min="0"
              id="assets"
              v-model="tokensAmount"
              type="number"
              class="text-center mb-3"
              @keypress="isPositiveIntOrDecOnly($event)"
            />
            <p class="grey">
              <i18n path="swth.support">
                <template #supportTeam>
                  <a
                    href="https://t.me/everstake_chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-lowercase"
                  >
                    {{ $t('home.supportTeam') }}
                  </a>
                </template>
              </i18n>
            </p>
          </form>
        </b-col>

        <b-col lg="6">
          <b-table
            :hover="true"
            :striped="true"
            :outlined="true"
            :fixed="true"
            responsive="sm"
            stacked="md"
            thead-class="d-none"
            :items="incomeDataTable">
          </b-table>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex';
import constants from '@/constants';

export default {
  name: 'Calculator',
  props: {
    coinCode: {
      type: String,
      default() {
        return this.$route.meta.coinCode;
      },
    },
  },
  data() {
    return {
      tokensAmount: 0,
      roi: constants.COINS_MAP.swth.yearlyEarning,
      cryptoMaxPrecision: constants.CRYPTO_MAX_PRECISION,
      usdPrecision: constants.USD_PRECISION,
      minUsdAmount: constants.MIN_USD_AMOUNT,
    };
  },
  computed: {
    ...mapGetters({
      rates: 'ratesService/rates',
      isRatesLoading: 'ratesService/isRatesLoading',
    }),
    tokensAmountInUsd() {
      if (!this.rates || !Object.keys(this.rates).length) return null;

      return this.$helpers.roundWithPrecision(this.tokensAmount
        * Number(this.rates[this.coinCode].usd),
        this.usdPrecision);
    },
    yearlyEarning() {
      return this.$helpers.roundWithPrecision(this.tokensAmount
        * this.roi / 100,
        this.cryptoMaxPrecision);
    },
    yearlyEarningInUsd() {
      if (!this.rates || !Object.keys(this.rates).length) return null;

      return this.$helpers.roundWithPrecision(this.yearlyEarning
        * Number(this.rates[this.coinCode].usd),
        this.usdPrecision);
    },
    monthlyEarning() {
      return this.$helpers.roundWithPrecision(this.yearlyEarning / 12,
        this.cryptoMaxPrecision);
    },
    monthlyEarningInUsd() {
      return this.$helpers.roundWithPrecision(this.yearlyEarningInUsd / 12,
        this.usdPrecision);
    },
    dailyEarning() {
      return this.$helpers.roundWithPrecision(this.yearlyEarning / 365,
        this.cryptoMaxPrecision);
    },
    dailyEarningInUsd() {
      return this.$helpers.roundWithPrecision(this.yearlyEarningInUsd / 365,
        this.usdPrecision);
    },
    incomeDataTable() {
      return [
        {
          name: this.$t('incomeCalculator.holdingValue'),
          amount: `${this.tokensAmount} ${this.coinCode.toUpperCase()}`,
          amountInUSD: `${this.tokensAmountInUsd < this.minUsdAmount
            ? `< $${this.minUsdAmount}`
            : `$${this.tokensAmountInUsd}`}`,
        },
        {
          name: this.$t('incomeCalculator.dailyEarning'),
          amount: `${this.dailyEarning} ${this.coinCode.toUpperCase()}`,
          amountInUSD: `${this.dailyEarningInUsd < this.minUsdAmount
            ? `< $${this.minUsdAmount}`
            : `$${this.dailyEarningInUsd}`}`,
        },
        {
          name: this.$t('incomeCalculator.monthlyEarning'),
          amount: `${this.monthlyEarning} ${this.coinCode.toUpperCase()}`,
          amountInUSD: `${this.monthlyEarningInUsd < this.minUsdAmount
            ? `< $${this.minUsdAmount}`
            : `$${this.monthlyEarningInUsd}`}`,
        },
        {
          name: this.$t('incomeCalculator.yearlyEarning'),
          amount: `${this.yearlyEarning} ${this.coinCode.toUpperCase()}`,
          amountInUSD: `${this.yearlyEarningInUsd < this.minUsdAmount
            ? `< $${this.minUsdAmount}`
            : `$${this.yearlyEarningInUsd}`}`,
        },
      ];
    },
  },
  methods: {
    isPositiveIntOrDecOnly(e) {
      const charCode = (e.which) ? e.which : e.keyCode;
      if (charCode !== 118
        && (charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        e.preventDefault();
      } else if ((charCode === 46) && (e.target.value.indexOf('.') >= 0 || e.target.value === '')) {
        e.preventDefault();
      } else {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .form-calc {
    max-width: 494px;
    margin: 0 auto;
  }
</style>
