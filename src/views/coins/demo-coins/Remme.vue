<template>
  <div class="coin" data-view>
    <b-row>
      <b-col>
        <AddressCard
          :name="coinName"
          :coinIcon="coinIcon"
          :isAddAddressDisabled="true"
        >
          <template slot="main-title">
            {{ $t('coinPages.coinStaking', {coinName}) }}:
            <a
              href="https://remchain.remme.io/account/everstakerem"
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
<!--          :stakeProp="'aion'">-->
<!--        </IncomeCalculation>-->
<!--      </b-col>-->
<!--    </b-row>-->

    <DelegationInstructions :isVoting="true">
      <template slot="instructions">
        <h2 class="fs-20">
          {{ $t('rem.whatIs') }}
        </h2>
        <p>
          {{ $t('rem.whatIsParagraph') }}
        </p>
        <p>
          {{ $t('rem.whatIsParagraph2') }}
        </p>
        <p> {{ $t('rem.toMention') }} </p>
        <ul>
          <li> {{ $t('rem.toMention1') }}</li>
          <li> {{ $t('rem.toMention2') }}</li>
          <li> {{ $t('rem.toMention3') }}</li>
          <li> {{ $t('rem.toMention4') }}</li>
          <li> {{ $t('rem.toMention5') }}</li>
          <li> {{ $t('rem.toMention6') }}</li>
        </ul>

        <h2 class="fs-20">
          {{ $t('rem.whyVote') }}
        </h2>
        <p>
          {{ $t('rem.whyVoteParagraph') }}
        </p>
        <p class="mb-0">
          {{ $t('rem.whyVoteParagraph2') }}
        </p>
      </template>
    </DelegationInstructions>
  </div>
</template>

<script>
import Remme from '@/assets/img/coins-presentation/remme.svg';
import AddressCard from '@/components/address/AddressCard.vue';
// import IncomeCalculation from '@/components/coin-page/IncomeCalculation.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';

export default {
  name: 'Remme',
  metaInfo: {
    title: 'Remme staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake Remme to grow your Remme stake and yield.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Remme staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake Remme to grow your Remme stake and yield.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Remme staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake Remme to grow your Remme stake and yield.',
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
      coinName: this.$helpers.capitalize(constants.COINS_MAP.rem.name),
      coinIcon: Remme,
      delegationAddress: constants.COINS_MAP.rem.delegationAddress,
      yearlyEarning: constants.COINS_MAP.rem.yearlyEarning,
      fee: constants.COINS_MAP.rem.fee,
    };
  },
  computed: {
    coinCode() {
      return this.$_getCoinCode('rem').toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
