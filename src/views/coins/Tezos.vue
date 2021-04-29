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
                {{ $t('tezos.payoutsFrom') }} {{ payoutsFrom }}
              </div>
              <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-3">
                {{ $t('common.ourFee') }} {{ fee }}
              </div>
              <div class="d-block d-md-inline-block mb-2 mb-md-0">
                {{ $t('common.yield') }} {{ yearlyEarning }}%
              </div>
            </div>
            <div>
              <a
                href="https://medium.com/everstake/why-delegating-to-the-new-tezos-baker-is-better-for-token-holders-64e6767f11a9"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ $t('tezos.delegateToNewBaker') }}
              </a>
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
<!--      <RewardsChart :currentCoin="currentCoin"></RewardsChart>-->
      <RewardsChartNew  :currentCoinName="coinName"></RewardsChartNew>
<!--      <RewardsHistoryTable :currentCoin="currentCoin"></RewardsHistoryTable>-->
      <RewardsHistoryTableNew :currentCoinName="coinName"></RewardsHistoryTableNew>
    </template>

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">{{ $t('tezos.whyDelegate') }}</h2>
        <p>{{ $t('tezos.whyDelegateParagraph') }}</p>

        <h2 class="fs-20">
          {{ $t('coinPages.coinNodeTitle', {coinName}) }}
        </h2>
        <p>
          {{ $t('coinPages.coinNodeParagraph', {coinName}) }}
        </p>
        <div class="mb-0">
          <p class="fs-20">Delegation Guides via:</p>
          <p><a target="_blank" href="https://medium.com/everstake/how-to-stake-tezos-using-the-atomex-web-wallet-a65142e3e282">Atomex wallet</a></p>
          <p><a target="_blank" href="https://medium.com/everstake/how-to-stake-tezos-xtz-using-the-kukai-web-wallet-ad484f6028c2">Kukai</a></p>
          <p><a target="_blank" href="https://medium.com/everstake/how-to-stake-tezos-using-thanos-web-wallet-43ebd80250ff">Thanos wallet</a></p>
          <p><a target="_blank" href="https://medium.com/everstake/tezos-staking-guide-via-galleon-simple-steps-that-lead-to-good-returns-785f30d1c32">Galleon wallet</a></p>
          <p><a target="_blank" href="https://medium.com/everstake/tezos-staking-guide-via-ledger-live-a-simple-way-to-stake-your-xtz-cea7f6ebd324">Ledger Live</a></p>
          <p><a target="_blank" href="https://medium.com/@everstake/tezos-staking-guide-via-exodus-mobile-wallet-cd6aa59efcfd">Exodus Wallet</a></p>
          <p><a target="_blank" href="https://medium.com/everstake/tezos-staking-guide-trust-wallet-is-more-than-a-vault-65d92ebfd2cb">Trust Wallet</a></p>
        </div>
      </template>
    </DelegationInstructions>

    <FAQ :accordionOneTitle="$t('coinPages.whatIsCoinDelegation', {coinName})"
         :accordionOneTxt="$t('tezos.faq.first.answer')"
         :accordionTwoTitle="$t('coinPages.coinDelegatingRewardsAndCalculator', {coinName})"
         :accordionTwoTxt="$t('tezos.faq.second.answer')"
         :accordionThreeTitle="$t('coinPages.isItSecureToDelegateCoin', {coinName})"
         :accordionThreeTxt="$t('coinPages.absolutelySecure', {coinName})">
      <template slot="botLink">
        <a href="https://t.me/everstake_bot" target="_blank" rel="noopener noreferrer">https://t.me/everstake_bot</a>
      </template>
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
            <a href="https://t.me/everstake_bot" target="_blank" rel="noopener noreferrer">https://t.me/everstake_bot</a>
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
            {{ $t('tezos.howToDelegateParagraph')}}
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
import Tezos from '@/assets/img/coins-presentation/tezos.svg';
import AddressCard from '@/components/address/AddressCard';
import LoadingCard from '@/components/LoadingCard';
import AlertBeforeWork from '@/components/coin-page/AlertBeforeWork';
import CoinStats from '@/components/coin-page/CoinStats';
import IncomeCalculation from '@/components/coin-page/IncomeCalculation';
import UserAddressStats from '@/components/coin-page/UserAddressStats';
// import RewardsChart from '@/components/coin-page/RewardsChart';
import RewardsChartNew from '@/components/coin-page/RewardsChartNew';
// import RewardsHistoryTable from '@/components/coin-page/RewardsHistoryTable';
import RewardsHistoryTableNew from '@/components/coin-page/RewardsHistoryTableNew';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions';
import FAQ from '@/components/coin-page/FAQ';
import coinGetter from '@/plugins/mixins/coinGetter';
import stakingInfoGenerator from '@/plugins/mixins/stakingInfoGenerator';
import constants from '@/constants';

export default {
  name: 'Tezos',
  metaInfo: {
    title: 'Tezos Delegation with Everstake baker',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to Delegate XTZ to grow your Tezos stake and yield. Start delegating Tezos with Everstake baker today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Tezos Delegation with Everstake baker',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to Delegate XTZ to grow your Tezos stake and yield. Start delegating Tezos with Everstake baker today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Tezos Delegation with Everstake baker',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to Delegate XTZ to grow your Tezos stake and yield. Start delegating Tezos with Everstake baker today in just a few steps.',
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
    // RewardsChart,
    // RewardsHistoryTable,
    DelegationInstructions,
    FAQ,
    RewardsChartNew,
    RewardsHistoryTableNew,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.xtz.name,
      coinIcon: Tezos,
      delegationAddress: constants.COINS_MAP.xtz.delegationAddress,
      payoutsFrom: constants.COINS_MAP.xtz.payoutsFrom,
      fee: constants.COINS_MAP.xtz.fee,
      yearlyEarning: constants.COINS_MAP.xtz.yearlyEarning,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
      // addressesData: 'addressService/addressesData',
      addressesData: 'addressService/addressesDataNew',
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
      return this.$_getCoinCode('xtz');
    },
    coinStats() {
      if (Object.keys(this.stakingInfo).length === 0
          && Object.keys(this.rates).length === 0) return [];
      return this.$_generateStakingInfo(this.currentCoin, this.stakingInfo, this.rates);
    },
  },
  watch: {
    isUserAddressAvailable: {
      handler(val) {
        if (val) {
          // the request is here instead of the dedicated component because it has to wait asynchronous change of the addresses!
          // the request is here instead of the dedicated component because it has to wait asynchronous change of the addresses!
          this.requestRewardsHistory({
            coinName: this.coinName.toLowerCase(),
            params: {
              // Probably should be a prop
              limit: 10,
              offset: 0,
              addresses: this.availableAddresses,
            },
          });
        }
      },
    },
  },
  methods: {
    ...mapActions({
      getAddressesData: 'addressService/getAddressesData',
      requestRates: 'ratesService/requestRates',
      getStakingInfo: 'stakingService/getStakingInfo',
      requestDailyTotalRewards: 'rewardsService/requestDailyTotalRewards',
      requestRewardsByPeriod: 'rewardsServiceNew/requestRewardsByPeriod',
      requestRewardsHistory: 'rewardsServiceNew/requestRewardsHistory',
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
          // the request is here instead of the dedicated component because it has to wait asynchronous change of the addresses!
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
        //   // the request is here instead of the dedicated component because it has to wait asynchronous change of the addresses!
        //   this.requestRewardsHistory({
        //     coinName: this.coinName.toLowerCase(),
        //     params: {
        //       limit: 5,
        //       offset: 0,
        //       addresses: this.availableAddresses,
        //     },
        //   });
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
