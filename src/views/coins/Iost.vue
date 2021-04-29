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
            {{ $t('coinPages.voteCoin', {coinName}) }}:
          </template>
          <template slot="main-subtitle">
            {{ $t('iost.mainSubtitle') }}
          </template>
          <template slot="address-card-footer">
            <div>
              <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-3">
<!--                {{ $t('common.ourFee') }} {{ fee }}-->
                {{ $t('common.noFeesXRewards', {numX: fee}) }}
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
      <RewardsChart :currentCoin="currentCoin"></RewardsChart>
      <RewardsHistoryTable :currentCoin="currentCoin"></RewardsHistoryTable>
    </template>

    <DelegationInstructions :isVoting="true">
      <template slot="instructions">
        <h2 class="fs-20">{{ $t('coinPages.whyVoteWithCoin', {coinName}) }}</h2>
        <p>{{ $t('iost.whyVoteParagraph') }}</p>

        <h2 class="fs-20">{{ $t('coinPages.coinNodeTitle', {coinName}) }}</h2>
        <p class="mb-0">{{ $t('iost.nodeParagraph') }}</p>
      </template>
    </DelegationInstructions>

    <FAQ :accordionOneTitle="$t('coinPages.whatIsCoinVoting', {coinName})"
         :accordionOneTxt="$t('iost.faq.first.answer')"
         :accordionTwoTitle="$t('coinPages.coinVotingRewardsAndCalculator', {coinName})"
         :accordionTwoTxt="$t('iost.faq.second.answer')"
         :accordionThreeTitle="$t('coinPages.isItSecureToVoteWithCoin', {coinName})"
         :accordionThreeTxt="$t('iost.faq.third.answer')">
    </FAQ>

    <b-row>
      <b-col cols="12" lg="6" class="d-flex">
        <b-card class="align-items-stretch">
          <template slot="header">
            <h2 class="title title--small title--white mb-0">
              {{ $t('coinPages.votingBotTitle') }}
            </h2>
          </template>
          <p class="mb-0">
            {{ $t('coinPages.votingBotParagraph', {coinCode}) }}
            <a href="https://t.me/everstake_bot" target="_blank" rel="noopener noreferrer">t.me/everstake_bot</a>
          </p>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6">
        <b-card>
          <template slot="header">
            <h2 class="title title--small title--white mb-0">
              {{ $t('coinPages.howToVoteCoin', {coinName}) }}
            </h2>
          </template>
          <p class="mb-0">
            {{ $t('iost.howToVoteParagraph') }}
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
import Iost from '@/assets/img/coins-presentation/iost.svg';
import AddressCard from '@/components/address/AddressCard';
import LoadingCard from '@/components/LoadingCard';
import AlertBeforeWork from '@/components/coin-page/AlertBeforeWork';
import CoinStats from '@/components/coin-page/CoinStats';
import IncomeCalculation from '@/components/coin-page/IncomeCalculation';
import UserAddressStats from '@/components/coin-page/UserAddressStats';
import RewardsChart from '@/components/coin-page/RewardsChart';
import RewardsHistoryTable from '@/components/coin-page/RewardsHistoryTable';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions';
import FAQ from '@/components/coin-page/FAQ';
import coinGetter from '@/plugins/mixins/coinGetter';
import stakingInfoGenerator from '@/plugins/mixins/stakingInfoGenerator';
import constants from '@/constants';

export default {
  name: 'Iost',
  metaInfo: {
    title: 'IOST Voting with Everstake staking provider',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Start voting IOST with Everstake Servi node. Learn how to grow your IOST stake and yield.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'IOST Voting with Everstake staking provider',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Start voting IOST with Everstake Servi node. Learn how to grow your IOST stake and yield.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'IOST Voting with Everstake staking provider',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Start voting IOST with Everstake Servi node. Learn how to grow your IOST stake and yield.',
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
    RewardsChart,
    RewardsHistoryTable,
    DelegationInstructions,
    FAQ,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.iost.name,
      coinIcon: Iost,
      delegationAddress: constants.COINS_MAP.iost.delegationAddress,
      fee: constants.COINS_MAP.iost.fee,
      yearlyEarning: constants.COINS_MAP.iost.yearlyEarning,
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
      return this.$_getCoinCode('iost');
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
      })();
      // this.getAddressesData([this.currentCoin]);
      // this.requestDailyTotalRewards({ addresses: this.availableAddresses, currency: this.currentCoin });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
