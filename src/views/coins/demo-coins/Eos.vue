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
            Earn EOS by staking for proxy: everstakeone
          </template>
          <template slot="main-subtitle">
            <span></span>
          </template>
          <template slot="address-card-footer">
            <div class="d-block d-md-inline-block mb-2 mb-md-0">
              {{ $t('common.yield') }} {{ yearlyEarning }}%
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

<!--    <DelegationInstructions>-->
<!--      <template slot="instructions">-->
<!--      </template>-->
<!--    </DelegationInstructions>-->

<!--    <FAQ></FAQ>-->

    <b-row>
<!--      <b-col cols="12" lg="6">-->
<!--        <b-card>-->
<!--          <template slot="header">-->
<!--            {{ $t('coinPages.tryBot', {coinName}) }}-->
<!--          </template>-->
<!--        </b-card>-->
<!--      </b-col>-->
      <b-col cols="12">
        <b-card>
          <template slot="header">
            <h2 class="title title--small title--white mb-0">
              {{ $t('eos.howToEarnTitle') }}
            </h2>
          </template>
          <p>
           <i18n path="eos.howToEarn">
             <a href="https://rex.atticlab.net"
                target="_blank"
                rel="noopener noreferrer"
                place="rexLink">
               https://rex.atticlab.net
             </a>
             <a href="http://bit.ly/earn_eos"
                target="_blank"
                rel="noopener noreferrer"
                place="bitLink">
               bit.ly/earn_eos
             </a>
           </i18n>
          </p>
          <p>
            <a href="https://medium.com/everstake/how-to-stake-eos-via-proxy-and-get-2-4-per-year-e4e13e00afe8" target="_blank" rel="noopener noreferrer">How to stake EOS with MyEOSWallet</a>
          </p>
          <p class="mb-0">
            <a href="https://medium.com/everstake/how-to-stake-eos-via-the-bloks-io-proxy-in-the-scatter-desktop-wallet-and-get-2-4-per-annum-b82ee5e6101e" target="_blank" rel="noopener noreferrer">How to stake EOS with Scatter and Bloks.io</a>
          </p>
        </b-card>
      </b-col>
    </b-row>

<!--    <b-card class="text-center" :header="$t('common.subscribe')" v-if="!isUserLoggedIn">-->
<!--      Subscribe to see what we've been working on Iost and be the first on all-->
<!--      new staking features launches. Stay in the know, on the go.-->
<!--    </b-card>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Eos from '@/assets/img/coins-presentation/eos.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import IncomeCalculation from '@/components/coin-page/IncomeCalculation.vue';
// import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
// import FAQ from '@/components/coin-page/FAQ.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';

export default {
  name: 'Eos',
  mixins: [coinGetter],
  components: {
    AddressCard,
    IncomeCalculation,
    // DelegationInstructions,
    // FAQ,
  },
  data() {
    return {
      coinName: this.$helpers.capitalize(constants.COINS_MAP.eos.name),
      coinIcon: Eos,
      delegationAddress: constants.COINS_MAP.eos.delegationAddress,
      yearlyEarning: constants.COINS_MAP.eos.yearlyEarning,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
    coinCode() {
      return this.$_getCoinCode('eos').toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
