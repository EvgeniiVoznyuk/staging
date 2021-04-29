<template>
  <div class="coin" data-view>
<!--    <AlertBeforeWork></AlertBeforeWork>-->

    <b-row>
      <b-col>
        <AddressCard
          :name="coinName"
          :coinIcon="coinIcon"
          :isAddAddressDisabled="true">
          <template slot="main-title">
            {{ $t('coinPages.delegateCoin', {coinName}) }}:
            <span v-html="delegationAddress"></span>
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
<!--      <b-col cols="12" lg="6" class="d-flex">-->
<!--        <LoadingCard v-if="!isStakingInfoReady" class="min-sm-card-height"></LoadingCard>-->
<!--        <CoinStats-->
<!--          v-else-->
<!--          class="align-items-stretch min-sm-card-height"-->
<!--          :coinName="coinName"-->
<!--          :statsTableData="coinStats">-->
<!--        </CoinStats>-->
<!--      </b-col>-->

<!--      <b-col cols="12" lg="6" class="d-flex" v-if="!isAddressesReady">-->
<!--        <LoadingCard class="min-sm-card-height"></LoadingCard>-->
<!--      </b-col>-->

<!--v-else-if="!isUserAddressAvailable"-->
      <b-col cols="12" class="d-flex">
        <IncomeCalculation
          class="align-items-stretch min-sm-card-height"
          :stakeProp="currentCoin">
        </IncomeCalculation>
      </b-col>

<!--      <b-col cols="12"-->
<!--             lg="6"-->
<!--             class="d-flex"-->
<!--             v-else-->
<!--             v-for="(addressData, index) in addressesData"-->
<!--             :key="index">-->
<!--        <UserAddressStats-->
<!--          class="align-items-stretch min-sm-card-height"-->
<!--          :coinName="coinName"-->
<!--          :userAddressTableData="addressData">-->
<!--        </UserAddressStats>-->
<!--      </b-col>-->
    </b-row>

<!--    <template v-if="isUserAddressAvailable">-->
<!--      <RewardsChart :currentCoin="currentCoin"></RewardsChart>-->
<!--      <RewardsHistoryTable :currentCoin="currentCoin"></RewardsHistoryTable>-->
<!--    </template>-->

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">{{ $t('iotx.whyDelegate') }}</h2>
        <p>{{ $t('iotx.whyDelegateParagraph') }}</p>

        <h2 class="fs-20">
          {{ $t('coinPages.coinNodeTitle', {coinName}) }}
        </h2>
        <p class="mb-0">
          {{ $t('coinPages.coinNodeParagraph', {coinName}) }}
        </p>
      </template>
    </DelegationInstructions>

    <FAQ :accordionOneTitle="$t('coinPages.whatIsCoinDelegation', {coinName})"
         :accordionOneTxt="$t('iotx.faq.first.answer')"
         :accordionTwoTitle="$t('coinPages.isItSecureToDelegateCoin', {coinName})"
         :accordionTwoTxt="$t('coinPages.absolutelySecure')">
    </FAQ>

    <b-row>
      <b-col cols="12" lg="12" class="d-flex">
        <b-card class="align-items-stretch">
          <template slot="header">
            <h2 class="title title--small title--white mb-0">
              {{ $t('coinPages.howToDelegateCoin', {coinName}) }}
            </h2>
          </template>
          <p class="mb-0">
            <i18n path="iotx.howToDelegateParagraph">
              <a href="https://member.iotex.io/delegate/5cfe57253324884dff6c209f"
                 place="ioTeXMemberPanel"
                 target="_blank"
                 rel="noopener noreferrer">
                {{ $t('iotx.ioTeXMemberPanel') }}
              </a>
            </i18n>
          </p>
        </b-card>
      </b-col>
    </b-row>

<!--    <b-card class="text-center" :header="$t('common.subscribe')" v-if="!isUserLoggedIn">-->
<!--      <p class="mb-0">-->
<!--        {{ $t('coinPages.subscribeToNewsletter', {coinName}) }}-->
<!--      </p>-->
<!--    </b-card>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Iotex from '@/assets/img/coins-presentation/iotex.svg';
import AddressCard from '@/components/address/AddressCard.vue';
// import LoadingCard from '@/components/LoadingCard';
// import AlertBeforeWork from '@/components/coin-page/AlertBeforeWork';
// import CoinStats from '@/components/coin-page/CoinStats';
import IncomeCalculation from '@/components/coin-page/IncomeCalculation.vue';
// import UserAddressStats from '@/components/coin-page/UserAddressStats';
// import RewardsChart from '@/components/coin-page/RewardsChart';
// import RewardsHistoryTable from '@/components/coin-page/RewardsHistoryTable';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import FAQ from '@/components/coin-page/FAQ.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import stakingInfoGenerator from '@/plugins/mixins/stakingInfoGenerator';
import constants from '@/constants';

export default {
  name: 'Iotex',
  metaInfo: {
    title: 'IOTX Voting with Everstake delegate',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to Vote IOTX and grow your IoTeX stake and yield. Start delegating IoTeX tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'IOTX Voting with Everstake delegate',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to Vote IOTX and grow your IoTeX stake and yield. Start delegating IoTeX tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'IOTX Voting with Everstake delegate',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to Vote IOTX and grow your IoTeX stake and yield. Start delegating IoTeX tokens with Everstake delegate today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter, stakingInfoGenerator],
  components: {
    AddressCard,
    // LoadingCard,
    // AlertBeforeWork,
    // CoinStats,
    IncomeCalculation,
    // UserAddressStats,
    // RewardsChart,
    // RewardsHistoryTable,
    DelegationInstructions,
    FAQ,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.iotx.name,
      coinIcon: Iotex,
      delegationAddress: constants.COINS_MAP.iotx.delegationAddress,
      fee: constants.COINS_MAP.iotx.fee,
      yearlyEarning: constants.COINS_MAP.iotx.yearlyEarning,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
      // addressesData: 'addressService/addressesData',
      // rates: 'ratesService/rates',
      // stakingInfo: 'stakingService/stakingInfo',
      // isUserAddressAvailable: 'addressService/isUserAddressAvailable',
      // availableAddresses: 'addressService/availableAddresses',
      // isAddressesReady: 'isAddressesReady',
      // isStakingInfoReady: 'isStakingInfoReady',
    }),
    coinCode() {
      return this.currentCoin.toUpperCase();
    },
    currentCoin() {
      return this.$_getCoinCode('iotx');
    },
    // coinStats() {
    //   if (Object.keys(this.stakingInfo).length === 0
    //     && Object.keys(this.rates).length === 0) return [];
    //   return this.$_generateStakingInfo(this.currentCoin, this.stakingInfo, this.rates);
    // },
  },
  // methods: {
  //   ...mapActions({
  //     getAddressesData: 'addressService/getAddressesData',
  //     requestRates: 'ratesService/requestRates',
  //     getStakingInfo: 'stakingService/getStakingInfo',
  //     requestDailyTotalRewards: 'rewardsService/requestDailyTotalRewards',
  //   }),
  // },
  // mounted() {
  //   this.getStakingInfo(this.currentCoin);
  //   this.requestRates({
  //     base_currencies: [this.currentCoin],
  //     quote_currencies: [this.$_getCoinCode('usd')],
  //   });
  //   if (this.isUserLoggedIn) {
  //     // Needed for addresses stats
  //     (async () => {
  //       await this.getAddressesData([this.currentCoin]);
  //       this.requestDailyTotalRewards({ addresses: this.availableAddresses, currency: this.currentCoin });
  //     })();
  //     // this.getAddressesData([this.currentCoin]);
  //     // this.requestDailyTotalRewards({ addresses: this.availableAddresses, currency: this.currentCoin });
  //   }
  // },
};
</script>

<style lang="scss" scoped>
</style>
