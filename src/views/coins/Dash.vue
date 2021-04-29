<template>
  <div class="coin" data-view>
    <DashAddressModal></DashAddressModal>
    <DashKYCModal></DashKYCModal>

    <AlertBeforeWork></AlertBeforeWork>

    <b-row>
      <b-col>
        <AddressCard
          :name="coinName"
          :address="dashDepositAddress"
          :coinIcon="coinIcon"
          :isAddAddressDisabled="true">
          <template slot="main-title">
            {{ $t('dash.mainTitle') }}:
          </template>
          <template slot="main-subtitle">
            {{ $t('dash.mainSubtitle') }}
          </template>
          <template slot="extra-block">
            <div class="address-steps">
              <!--    Bootstrap alternative          -->
              <!--              <div class="address-steps__line mb-4">-->
              <!--                <span class="fs-20">-->
              <!--                  1. {{ $t('common.verifyAccount') }}-->
              <!--                </span>-->
              <!--                <b-button inline-block variant="success"-->
              <!--                          class="width-134"-->
              <!--                          v-b-modal.dashKYCModal>-->
              <!--                  {{ $t('common.verify') }}-->
              <!--                </b-button>-->
              <!--              </div>-->
              <!--              <div class="address-steps__line">-->
              <!--                <span class="fs-20">-->
              <!--                  2.-->
<!--              {{ $t('common.addCoinAddress', {coin: 'Dash'}) }}-->
              <!--                </span>-->
              <!--                <b-button inline-block-->
              <!--                          variant="success"-->
              <!--                          class="width-134"-->
              <!--                          :disabled="!isUserAddressAvailable"-->
              <!--                          v-b-modal.dashAddressModal>-->
              <!--                  {{ $t('common.add') }}-->
              <!--                </b-button>-->
              <!--              </div>-->
              <b-row class="mb-4 text-center text-md-left">
                <b-col cols="12" md="7" lg="5" xl="4">
                  <span class="fs-18 mb-2 d-inline-block">
                    1. {{ $t('common.verifyAccount') }}
                  </span>
                </b-col>
                <b-col>
                  <div v-if="isDashKYCPassed" class="fs-18 text-success">
                    {{ $t('dash.accountVerified') }}
                  </div>
                  <b-button inline-block variant="warning"
                            v-else
                            class="width-134"
                            :disabled="!isUserLoggedIn"
                            v-b-modal.dashKYCModal>
                    {{ $t('common.verify') }}
                  </b-button>
                </b-col>
              </b-row>
              <b-row class="text-center text-md-left">
                <b-col cols="12" md="7" lg="5" xl="4">
                   <span class="fs-18 mb-2 d-inline-block">
                     2. {{ $t('common.addCoinAddress', {coin: 'Dash'}) }}
                   </span>
                </b-col>
                <b-col>
<!--                  <b-button inline-block-->
<!--                            variant="success"-->
<!--                            class="width-134"-->
<!--                            :disabled="!isUserAddressAvailable"-->
<!--                            v-b-modal.dashAddressModal>-->
<!--                    {{ $t('common.add') }}-->
<!--                  </b-button>-->
                  <div v-if="isUserAddressAvailable" class="fs-18 text-success">
                    {{ $t('dash.addressAdded') }}
                  </div>
                  <b-button inline-block
                            v-else-if="isAddressesReady"
                            variant="warning"
                            class="width-134"
                            :disabled="!isDashKYCPassed"
                            v-b-modal.dashAddressModal>
                    {{ $t('common.add') }}
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </template>

          <template slot="address-card-footer">
            <div>
<!--              <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-4">-->
<!--                {{ $t('common.minDelegation') }} {{ minDelegation }}-->
<!--              </div>-->
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
          class="align-items-stretch"
          :coinName="coinName"
          :userAddressTableData="addressData">
        </UserAddressStats>
      </b-col>
    </b-row>

    <template v-if="isUserAddressAvailable">
      <RewardsChart :currentCoin="currentCoin"></RewardsChart>
      <RewardsHistoryTable :currentCoin="currentCoin"></RewardsHistoryTable>
    </template>

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">
          {{ $t('coinPages.coinMasterNodeTitle', {coinName}) }}
        </h2>
        <p>{{ $t('dash.nodeParagraph') }}</p>


        <h2 class="fs-20">
          {{ $t('coinPages.masternodeStatsInTelegramBot') }}
        </h2>
        <p class="mb-0">
          {{ $t('dash.botParagraph') }}
          <a href="https://t.me/everstake_bot" target="_blank" rel="noopener noreferrer">t.me/everstake_bot.</a>
          {{ $t('dash.botParagraph_statistics') }}
        </p>
      </template>
    </DelegationInstructions>

    <b-card>
      <template v-slot:header>
        <h2 class="title title--small title--white mb-0">
          {{ $t('coinPages.delegationStatsBot',  {coinName}) }}
        </h2>
      </template>
        <p class="mb-0">{{ $t('coinPages.delegationBotDescription',  {coinName}) }}
          <a href="https://t.me/everstake_bot" target="_blank" rel="noopener noreferrer">t.me/everstake_bot</a>
        </p>
    </b-card>

    <FAQ :accordionOneTitle="$t('dash.faq.first.question')"
         :accordionOneTxt="$t('dash.faq.first.answer')"
         :accordionTwoTitle="$t('dash.faq.second.question')"
         :accordionTwoTxt="$t('dash.faq.second.answer')"
         :accordionThreeTitle="$t('dash.faq.third.question')"
         :accordionThreeTxt="$t('dash.faq.third.answer')">
    </FAQ>

<!--    <b-row>-->
<!--      <b-col cols="12">-->
<!--        <b-card>-->
<!--          <template slot="header">-->
<!--            <h2 class="title title--small title--white mb-0">-->
<!--              {{ $t('dash.botTitle') }}-->
<!--            </h2>-->
<!--          </template>-->
<!--          <p>-->
<!--            {{ $t('dash.botParagraph') }}-->
<!--            <a href="#" target="_blank">link</a>-->
<!--          </p>-->
<!--        </b-card>-->
<!--      </b-col>-->
<!--      <b-col cols="12" lg="6">-->
<!--        <b-card>-->
<!--          <template slot="header">-->
<!--    {{ $t('coinPages.howToDelegateCoin', {coinName}) }}-->
<!--          </template>-->
<!--          <p>-->
<!--            Lorem ipsum dolor sit amet, consectetuer adipiscing elit,-->
<!--            sed diam nonummy nibh euismod tincidunt ut laoreet dolore-->
<!--            magna aliquam erat volutpat. Ut wisi enim ad minim veniam,-->
<!--            quis nostrud exerci tation ullamcorper suscipit lobortis nisl-->
<!--            ut aliquip ex ea commodo consequat.-->
<!--          </p>-->
<!--        </b-card>-->
<!--      </b-col>-->
<!--    </b-row>-->

<!--    <b-card class="text-center" :header="$t('common.subscribe')" v-if="!isUserLoggedIn">-->
<!--      <p class="mb-0">-->
<!--        {{ $t('coinPages.subscribeToNewsletter', {coinName}) }}-->
<!--      </p>-->
<!--    </b-card>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Dash from '@/assets/img/coins-presentation/dash.svg';
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
import DashAddressModal from '@/components/dash/DashAddressModal';
import DashKYCModal from '@/components/dash/DashKYCModal';
import constants from '@/constants';

export default {
  name: 'Dash',
  metaInfo: {
    title: 'Dash PoS Supernode with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to run supernode to grow your Dash stake and yield. Start a supernode with Everstake PoS validation service provider today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Dash PoS Supernode with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: ' Learn how to run supernode to grow your Dash stake and yield. Start a supernode with Everstake PoS validation service provider today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Dash PoS Supernode with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: ' Learn how to run supernode to grow your Dash stake and yield. Start a supernode with Everstake PoS validation service provider today in just a few steps.',
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
    DashAddressModal,
    DashKYCModal,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.dash.name,
      coinIcon: Dash,
      minDelegation: constants.COINS_MAP.dash.minDelegation,
      fee: constants.COINS_MAP.dash.fee,
      yearlyEarning: constants.COINS_MAP.dash.yearlyEarning,
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
      isDashKYCPassed: 'userService/isDashKYCPassed',
      dashDepositAddress: 'dashService/dashDepositAddress',
    }),
    // isDashKYCPassed() {
    //   return false;
    // },
    currentCoin() {
      return this.$_getCoinCode('dash');
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
      getDashUserSettings: 'dashService/getDashUserSettings',
    }),
  },
  mounted() {
    this.getStakingInfo(this.currentCoin);
    this.requestRates({
      base_currencies: [this.currentCoin],
      quote_currencies: [this.$_getCoinCode('usd')],
    });
    if (this.isUserLoggedIn) {
      this.getDashUserSettings();
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
  .address-steps {
    /*max-width: 52%;*/
    margin-top: 30px;

    &__line {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
