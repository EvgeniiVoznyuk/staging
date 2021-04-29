<template>
  <div class="coin" data-view>
    <AlertBeforeWork></AlertBeforeWork>

    <b-row>
      <b-col>
        <AddressCard
          :name="coinName"
          :address="delegationAddress"
          :coinIcon="coinIcon">
          <template slot="main-title">
            {{ $t('coinPages.delegateCoin', {coinName}) }}:
          </template>
          <template slot="main-subtitle">
            {{ $t('coinPages.delegateCoinWithEverstake', {coinCode}) }}
          </template>
          <template slot="address-card-footer">
            <div>
              <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-3">
                {{ $t('common.ourFee') }} {{ fee }}
              </div>
              <div class="d-block d-md-inline-block mb-2 mb-md-0">
                {{ $t('common.yield') }} {{ yearlyEarning }}%
              </div>
            </div>
          </template>
        </AddressCard>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" lg="6" class="d-flex">
        <LoadingCard v-if="!isStakingInfoReady" class="min-sm-card-height"></LoadingCard>
        <CoinStats
          v-else
          class="align-items-stretch min-sm-card-height"
          :coinName="coinName"
          :statsTableData="coinStats">
        </CoinStats>
      </b-col>

      <b-col cols="12" lg="6" class="d-flex" v-if="!isAddressesReady">
        <LoadingCard class="min-sm-card-height"></LoadingCard>
      </b-col>

      <b-col cols="12" lg="6" class="d-flex" v-else-if="!isUserAddressAvailable">
        <IncomeCalculation
          class="align-items-stretch min-sm-card-height"
          :stakeProp="currentCoin">
        </IncomeCalculation>
      </b-col>

      <b-col cols="12"
             lg="6"
             class="d-flex"
             v-else
             v-for="(addressData, index) in addressesData"
             :key="index">
        <UserAddressStats
          class="align-items-stretch min-sm-card-height"
          :coinName="coinName"
          :userAddressTableData="addressData">
        </UserAddressStats>
      </b-col>
    </b-row>

    <template v-if="isUserAddressAvailable">
      <RewardsChartNew  :currentCoinName="coinName"></RewardsChartNew>
      <RewardsHistoryTable :currentCoin="currentCoin"></RewardsHistoryTable>
    </template>

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">{{ $t('coinPages.whyDelegateToValidator', {coinName}) }}</h2>
        <p>{{ $t('cosmos.whyDelegateParagraph') }}</p>

        <h2 class="fs-20">
          {{ $t('coinPages.coinNodeTitle', {coinName}) }}
        </h2>
        <p>
          {{ $t('coinPages.coinNodeParagraph', {coinName}) }}
        </p>
        <div class="mb-0">
          <p class="fs-20">Staking Guide via:</p>
          <p><a target="_blank" href="https://medium.com/everstake/how-to-stake-cosmos-atom-using-ledger-live-a-step-by-step-guide-3a7b2f0c0b97">Ledger Live</a></p>
          <p><a target="_blank" href="https://medium.com/everstake/cosmos-staking-trust-wallet-step-by-step-guide-32144112bbf5">Trust Wallet</a></p>
          <p><a target="_blank" href="https://medium.com/everstake/cosmos-staking-guide-lunie-steps-into-the-game-1ddf35003107">Lunie wallet</a></p>
        </div>
      </template>
    </DelegationInstructions>

    <FAQ :accordionOneTitle="$t('coinPages.whatIsCoinDelegation', {coinName})"
         :accordionOneTxt="$t('coinPages.coinDelegationIs', {coinName})"
         :accordionTwoTitle="$t('coinPages.coinDelegatingRewardsAndCalculator', {coinName})"
         :accordionTwoTxt="$t('cosmos.faq.second.answer')"
         :accordionThreeTitle="$t('coinPages.isItSecureToDelegateCoin', {coinName})"
         :accordionThreeTxt="$t('coinPages.absolutelySecure', {coinName})">
    </FAQ>

    <b-row>
      <b-col cols="12" lg="6" class="d-flex">
        <b-card class="align-items-stretch">
          <template slot="header">
            <h2 class="title title--small title--white mb-0">
              {{ $t('coinPages.delegatingBotTitle', {coinName}) }}
            </h2>
          </template>
          <p class="mb-0">
            {{ $t('coinPages.delegatingBotParagraph', {coinCode}) }}
            <a href="https://t.me/everstake_bot" target="_blank" rel="noopener noreferrer">t.me/everstake_bot</a>
          </p>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6" class="d-flex">
        <b-card class="align-items-stretch">
          <template slot="header">
            <h2 class="title title--small title--white mb-0">
              {{ $t('coinPages.howToDelegateCoin', {coinName}) }}
            </h2>
          </template>
          <p class="mb-0">
            <i18n path="cosmos.howToDelegateParagraph">
              <a
                href="https://hubble.figment.network/cosmos/chains/cosmoshub-2/validators/1CED30733D1625C89AB698677606D0E37B3676A9"
                place="link"
                target="_blank"
                rel="noopener noreferrer">Everstake page</a>
            </i18n>
          </p>
        </b-card>
      </b-col>
    </b-row>

<!--    <b-card class="text-center" :header="$t('common.subscribe')" v-if="!isUserLoggedIn">-->
<!--      <p class="mb-0">-->
<!--&lt;!&ndash;        {{ $t('coinPages.subscribeToNewsletter', {coinName}) }}&ndash;&gt;-->
<!--        {{ $t('coinPages.subscribeToNewsletterAlt') }}-->
<!--      </p>-->
<!--    </b-card>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Cosmos from '@/assets/img/coins-presentation/cosmos.svg';
import AddressCard from '@/components/address/AddressCard';
import LoadingCard from '@/components/LoadingCard';
import AlertBeforeWork from '@/components/coin-page/AlertBeforeWork';
import CoinStats from '@/components/coin-page/CoinStats';
import IncomeCalculation from '@/components/coin-page/IncomeCalculation';
import UserAddressStats from '@/components/coin-page/UserAddressStats';
import RewardsChartNew from '@/components/coin-page/RewardsChartNew';
import RewardsHistoryTable from '@/components/coin-page/RewardsHistoryTable';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions';
import FAQ from '@/components/coin-page/FAQ';
import coinGetter from '@/plugins/mixins/coinGetter';
import stakingInfoGenerator from '@/plugins/mixins/stakingInfoGenerator';
import constants from '@/constants';

export default {
  name: 'Cosmos',
  metaInfo: {
    title: 'Cosmos Delegation with Everstake validator',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to Delegate ATOM to grow your Cosmos stake and yield. Start delegating Cosmos with Everstake validator today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Cosmos Delegation with Everstake validator',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to Delegate ATOM to grow your Cosmos stake and yield. Start delegating Cosmos with Everstake validator today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Cosmos Delegation with Everstake validator',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to Delegate ATOM to grow your Cosmos stake and yield. Start delegating Cosmos with Everstake validator today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter, stakingInfoGenerator],
  components: {
    AddressCard,
    LoadingCard,
    AlertBeforeWork,
    CoinStats,
    IncomeCalculation,
    UserAddressStats,
    RewardsChartNew,
    RewardsHistoryTable,
    DelegationInstructions,
    FAQ,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.atom.name,
      coinIcon: Cosmos,
      delegationAddress: constants.COINS_MAP.atom.delegationAddress,
      fee: constants.COINS_MAP.atom.fee,
      yearlyEarning: constants.COINS_MAP.atom.yearlyEarning,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
      addressesData: 'addressService/addressesData',
      rates: 'ratesService/rates',
      stakingInfo: 'stakingService/stakingInfo',
      isUserAddressAvailable: 'addressService/isUserAddressAvailable',
      availableAddresses: 'addressService/availableAddresses',
      isAddressesReady: 'isAddressesReady',
      isStakingInfoReady: 'isStakingInfoReady',
    }),
    coinCode() {
      return this.currentCoin.toUpperCase();
    },
    currentCoin() {
      return this.$_getCoinCode('atom');
    },
    coinStats() {
      if (Object.keys(this.stakingInfo).length === 0
          && Object.keys(this.rates).length === 0) return [];
      return this.$_generateStakingInfo(this.currentCoin, this.stakingInfo, this.rates);
    },
  },
  methods: {
    ...mapActions({
      getAddressesData: 'addressService/getAddressesData',
      requestRates: 'ratesService/requestRates',
      getStakingInfo: 'stakingService/getStakingInfo',
      requestRewardsByPeriod: 'rewardsServiceNew/requestRewardsByPeriod',
      requestDailyTotalRewards: 'rewardsService/requestDailyTotalRewards',
    }),
  },
  mounted() {
    this.getStakingInfo(this.currentCoin);
    this.requestRates({
      base_currencies: [this.currentCoin],
      quote_currencies: [this.$_getCoinCode('usd')],
    });
    if (this.isUserLoggedIn) {
      // Needed for addresses stats
      (async () => {
        await this.getAddressesData([this.currentCoin]);
        this.requestDailyTotalRewards({ addresses: this.availableAddresses, currency: this.currentCoin });
        if (this.isUserAddressAvailable) {
          this.requestRewardsByPeriod({
            coinName: this.coinName.toLowerCase(),
            params: {
              by: 'month',
              to: this.$moment(this.$moment().endOf('day')).utc().unix(),
              from: this.$moment(this.$moment().startOf('day').subtract(30, 'months')).utc().unix(),
              delegators: this.availableAddresses,
              validators: [constants.COINS_MAP[`${this.currentCoin}`].delegationAddress],
            },
          });
        }
      })();
      // this.getAddressesData([this.currentCoin]);
      // this.requestDailyTotalRewards({ addresses: this.availableAddresses, currency: this.currentCoin });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
