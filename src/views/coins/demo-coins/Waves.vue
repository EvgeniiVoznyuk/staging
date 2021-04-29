<template>
  <div class="coin" data-view>
    <b-row>
      <b-col>
        <AddressCard
          :name="coinName"
          :address="delegationAddress"
          :coinIcon="coinIcon"
          :isAddAddressDisabled="true">
          <template slot="main-title">
            {{ $t('waves.mainTitle') }}:
          </template>
          <template slot="main-subtitle">
            {{ $t('waves.mainSubtitle') }}
          </template>
          <template slot="address-card-footer">
            <div>
              <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-3">
                {{ $t('common.ourFee') }} {{ fee }} {{ coinName.toUpperCase()}},
                {{ mrt }} {{ $t('common.mrt') }}
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
        <IncomeCalculation
          class="align-items-stretch min-sm-card-height"
          :stakeProp="coinCode.toLowerCase()">
        </IncomeCalculation>
      </b-col>
    </b-row>

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">{{ $t('waves.whyLease') }}</h2>
        <p>{{ $t('waves.whyLeaseParagraph') }}</p>

        <h2 class="fs-20">
          {{ $t('coinPages.coinSuperNodeTitle', {coinName}) }}
        </h2>
        <p class="mb-0">{{ $t('waves.nodeParagraph') }}</p>
      </template>
    </DelegationInstructions>

    <FAQ :accordionOneTitle="$t('waves.faq.first.question')"
         :accordionOneTxt="$t('waves.faq.first.answer')"
         :accordionTwoTitle="$t('waves.faq.second.question')"
         :accordionTwoTxt="$t('waves.faq.second.answer')"
         :accordionThreeTitle="$t('waves.faq.third.question')"
         :accordionThreeTxt="$t('waves.faq.third.answer')">
    </FAQ>

    <b-row>
      <b-col cols="12" lg="6" class="d-flex">
        <b-card class="align-items-stretch">
          <template slot="header">
            <h2 class="title title--small title--white mb-0">
              {{ $t('waves.botTitle') }}
            </h2>
          </template>
          <p>
            {{ $t('waves.botParagraph') }}
          </p>
        </b-card>
      </b-col>
      <b-col cols="12" lg="6">
        <b-card>
          <template slot="header">
            <h2 class="title title--small title--white mb-0">
              {{ $t('waves.howToLease') }}
            </h2>
          </template>
          <p>
            {{ $t('waves.howToLeaseParagraph') }}
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
import { mapGetters } from 'vuex';
import Waves from '@/assets/img/coins-presentation/waves.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import IncomeCalculation from '@/components/coin-page/IncomeCalculation.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import FAQ from '@/components/coin-page/FAQ.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';

export default {
  name: 'Waves',
  metaInfo: {
    title: 'Waves leasing with Everstake staking provider',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to lease your Waves and get a passive income from staking. Start leasing Waves with Everstake supernode today.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Waves leasing with Everstake staking provider',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to lease your Waves and get a passive income from staking. Start leasing Waves with Everstake supernode today.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Waves leasing with Everstake staking provider',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to lease your Waves and get a passive income from staking. Start leasing Waves with Everstake supernode today.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    AddressCard,
    IncomeCalculation,
    DelegationInstructions,
    FAQ,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.waves.name,
      coinIcon: Waves,
      delegationAddress: constants.COINS_MAP.waves.delegationAddress,
      fee: constants.COINS_MAP.waves.fee,
      mrt: constants.COINS_MAP.waves.mrt,
      yearlyEarning: constants.COINS_MAP.waves.yearlyEarning,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
    coinCode() {
      return this.$_getCoinCode('waves').toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
