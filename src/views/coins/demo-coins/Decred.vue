<template>
  <div class="coin" data-view>
    <b-row>
      <b-col>
        <AddressCard
          :name="coinName"
          :coinIcon="coinIcon"
          :isAddAddressDisabled="true">
          <template slot="main-title">
            {{ $t('decred.mainTitle') }}:
            <span v-html="delegationAddress"></span>
          </template>
          <template slot="main-subtitle">
            {{ $t('decred.mainSubtitle') }}
          </template>
          <template slot="address-card-footer">
<!--            <a href="https://rex.atticlab.net/" rel="noopener noreferrer" target="_blank"></a>-->
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
      <b-col cols="12" class="d-flex">
        <IncomeCalculation
          class="align-items-stretch min-sm-card-height"
          :stakeProp="coinCode.toLowerCase()">
        </IncomeCalculation>
      </b-col>
    </b-row>

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">{{ $t('decred.whyVote') }}</h2>
        <p>{{ $t('decred.whyVoteParagraph') }}</p>

        <h2 class="fs-20">{{ $t('coinPages.coinNodeTitle', {coinName}) }}</h2>
        <p class="mb-0">{{ $t('decred.nodeParagraph') }}</p>
      </template>
    </DelegationInstructions>

    <FAQ :accordionOneTitle="$t('decred.faq.first.question')"
         :accordionOneTxt="$t('decred.faq.first.answer')"
         :accordionTwoTitle="$t('coinPages.isItSecureToVoteWithCoin', {coinName})"
         :accordionTwoTxt="$t('decred.faq.third.answer')">
    </FAQ>

    <b-row>
      <b-col cols="12" lg="12">
        <b-card>
          <template slot="header">
            <h2 class="title title--small title--white mb-0">
              {{ $t('coinPages.howToVoteCoin', {coinName}) }}
            </h2>
          </template>
          <p class="mb-0">
            <p><a target='_blank' href='https://medium.com/@everstake/guide-on-how-to-stake-decred-staking-via-official-decrediton-wallet-3b40f3586a51'>How to Stake Decred</a></p>
            {{ $t('decred.howToVoteParagraph') }}
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
import Decred from '@/assets/img/coins-presentation/decred.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import IncomeCalculation from '@/components/coin-page/IncomeCalculation.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import FAQ from '@/components/coin-page/FAQ.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';

export default {
  name: 'Decred',
  metaInfo: {
    title: 'Decred Voting with Everstake VSP',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Start voting Decred with Everstake Voting Service Provider. Learn how to grow your Decred stake and yield.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Decred Voting with Everstake VSP',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Start voting Decred with Everstake Voting Service Provider. Learn how to grow your Decred stake and yield.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Decred Voting with Everstake VSP',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Start voting Decred with Everstake Voting Service Provider. Learn how to grow your Decred stake and yield.',
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
      coinName: constants.COINS_MAP.dcr.name,
      coinIcon: Decred,
      delegationAddress: constants.COINS_MAP.dcr.delegationAddress,
      fee: constants.COINS_MAP.dcr.fee,
      yearlyEarning: constants.COINS_MAP.dcr.yearlyEarning,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
    coinCode() {
      return this.$_getCoinCode('dcr').toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
