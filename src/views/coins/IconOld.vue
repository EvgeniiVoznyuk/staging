<template>
  <div class="coin" data-view>
<!--    <AlertBeforeWork></AlertBeforeWork>-->

    <b-row v-if="coinData">
      <b-col>
        <AddressCard
          :name="coinData.name"
          :address="coinData.delegationAddress"
          :coinIcon="coinData.img"
          :isAddAddressDisabled="true">
          <template slot="main-title">
            {{ $t('icx.mainTitle') }}:
          </template>
          <template slot="main-subtitle">
            {{ $t('coinPages.voteForStaking', {coinCode}) }}
          </template>
          <template slot="address-card-footer">
            <div>
              <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-4">
                {{ $t('common.reward') }} {{ coinData.fee }}
              </div>
            </div>
          </template>
        </AddressCard>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" lg="6" class="d-flex">
        <LoadingCard v-if="!coinData" class="min-sm-card-height"></LoadingCard>
        <CoinStats
          v-else
          class="align-items-stretch min-sm-card-height"
          :coinName="coinData.name"
          :statsTableData="coinStats">
        </CoinStats>
      </b-col>
<!--      <b-col cols="12" lg="6" class="d-flex" v-if="!isAddressesReady">-->
<!--        <LoadingCard class="min-sm-card-height"></LoadingCard>-->
<!--      </b-col>-->
<!--v-else-if="!isUserAddressAvailable"-->
      <b-col cols="12" lg="6" class="d-flex">
        <IncomeCalculation
          class="align-items-stretch min-sm-card-height"
          :stakeProp="coinCode"
        >
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
<!--          :coinName="coinData.name"-->
<!--          :userAddressTableData="addressData">-->
<!--        </UserAddressStats>-->
<!--      </b-col>-->
    </b-row>

<!--    <template v-if="isUserAddressAvailable">-->
<!--      <RewardsChart :currentCoin="coinCode"></RewardsChart>-->
<!--      <RewardsHistoryTable :currentCoin="coinCode"></RewardsHistoryTable>-->
<!--    </template>-->

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">{{ $t('icx.howToGetStarted') }}</h2>
        <i18n path="icx.howToGetStartedParagraph" tag="p">
          <a place="guide"
             href="https://medium.com/everstake/detailed-guide-to-icon-icx-staking-and-voting-how-things-do-exactly-work-d650e75f5ab9"
             target="_blank"
             rel="noopener noreferrer">
            {{ $t('icx.stakingGuide') }}
          </a>
        </i18n>

        <h2 class="fs-20">{{ $t('coinPages.whyDelegateToValidator', {coinName}) }}</h2>
        <p>{{ $t('icx.whyDelegateParagraph') }}</p>

        <h2 class="fs-20">{{ $t('coinPages.masternodeStatsInTelegramBot') }}</h2>
        <i18n path="icx.botParagraph" tag="p" class="mb-0">
          <a place="botLink"
            href="https://t.me/everstake_bot"
            target="_blank"
            rel="noopener noreferrer">
            {{ $t('icx.telegramBot') }}
          </a>
        </i18n>
      </template>
    </DelegationInstructions>

    <b-card>
      <template v-slot:header>
        <h2 class="title title--small title--white mb-0">
          {{ $t('coinPages.delegationStatsBot', {coinName} ) }}
        </h2>
      </template>
      <p class="mb-0">{{ $t('coinPages.delegationBotDescription',  {coinName})}}
        <a href="https://t.me/everstake_bot" target="_blank" rel="noopener noreferrer">t.me/everstake_bot</a>
      </p>
    </b-card>

    <FAQ :accordionOneTitle="$t('icx.faq.first.question')"
         :accordionOneTxt="$t('icx.faq.first.answer')"
         :accordionTwoTitle="$t('icx.faq.second.question')"
         :accordionThreeTitle="$t('icx.faq.third.question')"
         :accordionThreeTxt="$t('icx.faq.third.answer')">
      <template slot="accordionTwoCustomTxt">
        <i18n path="icx.faq.second.answer">
          <a href="https://medium.com/helloiconworld/updates-to-iiss-5a088b17473d"
             target="_blank"
             place="structureLink"
             rel="noopener noreferrer">
            {{ $t('icx.faq.second.structure') }}.
          </a>
        </i18n>
      </template>
    </FAQ>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddressCard from '@/components/address/AddressCard.vue';
import LoadingCard from '@/components/LoadingCard';
// import AlertBeforeWork from '@/components/coin-page/AlertBeforeWork';
import CoinStats from '@/components/coin-page/CoinStats';
import IncomeCalculation from '@/components/coin-page/IncomeCalculation';
// import UserAddressStats from '@/components/coin-page/UserAddressStats';
// import RewardsChart from '@/components/coin-page/RewardsChart';
// import RewardsHistoryTable from '@/components/coin-page/RewardsHistoryTable';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import FAQ from '@/components/coin-page/FAQ';
import coinGetter from '@/plugins/mixins/coinGetter';
import stakingInfoGenerator from '@/plugins/mixins/stakingInfoGenerator';


export default {
  name: 'ICON',
  metaInfo: {
    title: 'ICON staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake ICON to grow your ICON stake and yield. Start delegating ICON tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'ICON staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake ICON to grow your ICON stake and yield. Start delegating ICON tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'ICON staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake ICON to grow your ICON stake and yield. Start delegating ICON tokens with Everstake delegate today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter, stakingInfoGenerator],
  components: {
    AddressCard,
    LoadingCard,
    // AlertBeforeWork,
    CoinStats,
    IncomeCalculation,
    // UserAddressStats,
    // RewardsChart,
    // RewardsHistoryTable,
    DelegationInstructions,
    FAQ,
  },
  data() {
    return {
      coinData: null,
      coinName: '',
      coinCode: '',
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
    coinStats() {
      if (Object.keys(this.stakingInfo).length === 0
        && Object.keys(this.rates).length === 0) return [];
      return this.$_generateStakingInfo('icx', this.stakingInfo, this.rates);
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
  created() {
    // TODO: create meta component for all coins page.
    // Refactor route nesting, make dynamic route with coin name /coins/:code
    // Then we can get this code from this.$route.param ->
    // remove boilerplate hardcode for every coin.
    // Or, for example we can get coin code for structure access from router meta.
    // Temporarily example for ICON coin.
    const { coinCode = null } = this.$route.meta;

    if (!coinCode) {
      this.$router.push({ name: 'Page404' });
    }
    this.coinData = this.coinsMap[coinCode];
    this.coinCode = coinCode;
    this.coinName = this.coinData.name;


    // STAKING INFO
    this.getStakingInfo(this.coinCode);
    this.requestRates({
      base_currencies: [this.coinCode],
      quote_currencies: [this.$_getCoinCode('usd')],
    });
    if (this.isUserLoggedIn) {
      this.getDashUserSettings();
      // Needed for addresses stats
      (async () => {
        await this.getAddressesData([this.coinCode]);
        this.requestDailyTotalRewards({ addresses: this.availableAddresses, currency: this.coinCode });
      })();
    }
    //  STAKING INFO END
  },
};
</script>

<style lang="scss" scoped>
</style>
