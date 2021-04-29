<template>
  <div class="coin" data-view>
    <b-row>
      <b-col>
        <AddressCard
          :name="coinName"
          :coinIcon="coinIcon"
          :isAddAddressDisabled="true">
          <template slot="main-title">
            {{ $t('coinPages.coinStaking', {coinName}) }}:
            <a
              href="https://mainnet.daovalidator.com/producers"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ delegationAddress }}
            </a>
          </template>
          <template slot="main-subtitle">
            {{ $t('coinPages.stakeCoinCode', {coinCode}) }}
          </template>
          <template slot="address-card-footer">
<!--            <div>-->
<!--              <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-4">-->
<!--                {{ $t('common.ourFee') }} {{ fee }}-->
<!--              </div>-->
<!--              <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-4">-->
<!--                {{ $t('common.yield') }} {{ yearlyEarning }}%-->
<!--              </div>-->
<!--            </div>-->
          </template>
        </AddressCard>
      </b-col>
    </b-row>

<!--    <b-row>-->
<!--      <b-col cols="12" lg="6" class="d-flex">-->
<!--        <IncomeCalculation-->
<!--          class="align-items-stretch min-sm-card-height"-->
<!--          :stakeProp="'trc'">-->
<!--        </IncomeCalculation>-->
<!--      </b-col>-->
<!--    </b-row>-->

    <DelegationInstructions :isVoting="true">
      <template slot="instructions">
        <h2 class="fs-20">
          {{ $t('bet.whatIs') }}
        </h2>
        <p>
          {{ $t('bet.whatIsParagraph') }}
        </p>
        <p>
          {{ $t('bet.whatIsParagraph2') }}
        </p>
        <p>
          {{ $t('bet.whatIsParagraph3') }}
        </p>
      </template>
    </DelegationInstructions>
  </div>
</template>

<script>
import Daobet from '@/assets/img/coins-presentation/daobet.svg';
import AddressCard from '@/components/address/AddressCard.vue';
// import IncomeCalculation from '@/components/coin-page/IncomeCalculation.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';

export default {
  name: 'Daobet',
  metaInfo: {
    title: 'DAOBet staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake DAOBet to grow your DAOBet stake and yield.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'DAOBet staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake DAOBet to grow your DAOBet stake and yield.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'DAOBet staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake DAOBet to grow your DAOBet stake and yield.',
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
      coinName: this.$helpers.capitalize(constants.COINS_MAP.bet.name),
      coinIcon: Daobet,
      delegationAddress: constants.COINS_MAP.bet.delegationAddress,
      yearlyEarning: constants.COINS_MAP.bet.yearlyEarning,
      fee: constants.COINS_MAP.bet.fee,
    };
  },
  computed: {
    coinCode() {
      return this.$_getCoinCode('bet').toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
