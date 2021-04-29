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
            {{ $t('coinPages.voteCoin', {coinName}) }}:
          </template>
          <template slot="main-subtitle">
            {{ $t('ark.mainSubtitle') }}
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
      <b-col cols="12" class="d-flex">
        <IncomeCalculation
          class="align-items-stretch min-sm-card-height"
          :stakeProp="coinCode.toLowerCase()">
        </IncomeCalculation>
      </b-col>
    </b-row>

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">{{ $t('coinPages.whyVoteWithCoin', {coinName}) }}</h2>
        <p>{{ $t('ark.whyVoteParagraph') }}</p>

        <h2 class="fs-20">{{ $t('coinPages.coinNodeTitle', {coinName}) }}</h2>
        <p class="mb-0">{{ $t('ark.nodeParagraph') }}</p>
      </template>
    </DelegationInstructions>

    <FAQ :accordionOneTitle="$t('coinPages.whatIsCoinVoting', {coinName})"
         :accordionOneTxt="$t('ark.faq.first.answer')"
         :accordionTwoTitle="$t('coinPages.isItSecureToVoteWithCoin', {coinName})"
         :accordionTwoTxt="$t('ark.faq.third.answer')">
    </FAQ>

    <b-row>
      <b-col cols="12" lg="6" class="d-flex">
        <b-card class="align-items-stretch">
          <template slot="header">
            <h2 class="title title--small title--white mb-0">
              {{ $t('coinPages.votingBotTitle') }}
            </h2>
          </template>
          <p>
            {{ $t('coinPages.votingBotParagraph', {coinCode}) }}
          </p>
          <p class="mb-0"><a target="_blank" href="https://t.me/everstake_bot">Everstake Bot</a></p>
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
            {{ $t('ark.howToVoteParagraph') }}
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
import Ark from '@/assets/img/coins-presentation/ark.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import IncomeCalculation from '@/components/coin-page/IncomeCalculation.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import FAQ from '@/components/coin-page/FAQ.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';

export default {
  name: 'Ark',
  metaInfo: {
    title: 'ARK Voting with Everstake Delegate',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Start voting ARK for Everstake. Learn how to grow your ARK stake and yield.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'ARK Voting with Everstake Delegate',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Start voting ARK for Everstake. Learn how to grow your ARK stake and yield.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'ARK Voting with Everstake Delegate',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Start voting ARK for Everstake. Learn how to grow your ARK stake and yield.',
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
      coinName: this.$helpers.capitalize(constants.COINS_MAP.ark.name),
      coinIcon: Ark,
      delegationAddress: constants.COINS_MAP.ark.delegationAddress,
      fee: constants.COINS_MAP.ark.fee,
      yearlyEarning: constants.COINS_MAP.ark.yearlyEarning,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
    coinCode() {
      return this.$_getCoinCode('ark').toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
