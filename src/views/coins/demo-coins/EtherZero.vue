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
            {{ $t('coinPages.coinStaking', {coinName}) }}
          </template>
          <template slot="main-subtitle">
            {{ $t('coinPages.stakeCoinCode', {coinCode}) }}
          </template>
          <template slot="address-card-footer">
          </template>
        </AddressCard>
      </b-col>
    </b-row>

<!--    <b-row>-->
<!--      <b-col cols="12" lg="6" class="d-flex">-->
<!--        <IncomeCalculation-->
<!--          class="align-items-stretch min-sm-card-height"-->
<!--          :stakeProp="'xtz'">-->
<!--        </IncomeCalculation>-->
<!--      </b-col>-->
<!--    </b-row>-->

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">
          {{ $t('coinPages.getReady', {coinName} )}}
        </h2>
        <p>
          {{ $t('coinPages.getReadyParagraph', {coinName} )}}
        </p>

        <h2 class="fs-20">
          {{ $t('coinPages.stayTuned') }}
        </h2>
        <p>
          <i18n path="coinPages.stayTunedParagraph">
            <span place="coinName">{{ coinName }}</span>
            <span place="coinCode">{{ coinCode }}</span>
            <a href="mailto:marketing@everstake.one"
               place="email">
              marketing@everstake.one</a>
          </i18n>
        </p>
      </template>
    </DelegationInstructions>

<!--    <b-card class="text-center" :header="$t('common.subscribe')" v-if="!isUserLoggedIn">-->
<!--      <p class="mb-0">-->
<!--        {{ $t('coinPages.subscribeToNewsletter', {coinName}) }}-->
<!--      </p>-->
<!--    </b-card>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EtherZero from '@/assets/img/coins-presentation/etherZero.svg';
import AddressCard from '@/components/address/AddressCard.vue';
// import IncomeCalculation from '@/components/coin-page/IncomeCalculation.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';

export default {
  name: 'EtherZero',
  metaInfo: {
    title: 'EtherZero staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake EtherZero to grow your ETZ stake and yield. Start delegating ETZ tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'EtherZero staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake EtherZero to grow your ETZ stake and yield. Start delegating ETZ tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'EtherZero staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake EtherZero to grow your ETZ stake and yield. Start delegating ETZ tokens with Everstake delegate today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    AddressCard,
    // IncomeCalculation,
    DelegationInstructions,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.etz.name,
      coinIcon: EtherZero,
      delegationAddress: constants.COINS_MAP.etz.delegationAddress,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
    coinCode() {
      return this.$_getCoinCode('etz').toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
