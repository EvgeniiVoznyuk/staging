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
            {{ $t('coinPages.coinStaking', {coinName}) }}:
          </template>
          <template slot="main-subtitle">
            {{ $t('coinPages.stakeCoinCode', {coinCode}) }}
          </template>
          <template slot="address-card-footer">
            <div>
              <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-4">
                {{ $t('common.ourFee') }} {{ fee }}
              </div>
              <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-4">
                {{ $t('common.yield') }} {{ yearlyEarning }}%
              </div>
            </div>
          </template>
        </AddressCard>
      </b-col>
    </b-row>

    <Calculator />

<!--    <DelegationInstructions>-->
<!--      <template slot="instructions">-->
<!--        <h2 class="fs-20">-->
<!--          {{ $t('coinPages.getReady', {coinName} )}}-->
<!--        </h2>-->
<!--        <p>-->
<!--          {{ $t('coinPages.getReadyParagraph', {coinName} )}}-->
<!--        </p>-->

<!--        <h2 class="fs-20">-->
<!--          {{ $t('coinPages.stayTuned') }}-->
<!--        </h2>-->
<!--        <p class="mb-0">-->
<!--          <i18n path="coinPages.stayTunedParagraph">-->
<!--            <span place="coinName">{{ coinName }}</span>-->
<!--            <span place="coinCode">{{ coinCode }}</span>-->
<!--            <a href="mailto:marketing@everstake.one"-->
<!--               place="email">-->
<!--              marketing@everstake.one</a>-->
<!--          </i18n>-->
<!--        </p>-->
<!--      </template>-->
<!--    </DelegationInstructions>-->

    <Faqs :faq="faq" />
  </div>
</template>

<script>
import Terra from '@/assets/img/coins-presentation/terra.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import Calculator from '@/components/terra-sections/Calculator.vue';
import Faqs from '@/components/coin-page/Faqs.vue';

export default {
  name: 'Terra',
  metaInfo: {
    title: 'Terra staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake Terra to grow your LUNA stake and yield.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Terra staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake Terra to grow your Terra stake and yield.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Terra staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake Terra to grow your Terra stake and yield.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    AddressCard,
    Calculator,
    Faqs,
  },
  data() {
    return {
      coinName: this.$helpers.capitalize(constants.COINS_MAP.luna.name),
      coinIcon: Terra,
      delegationAddress: constants.COINS_MAP.luna.delegationAddress,
      yearlyEarning: constants.COINS_MAP.luna.yearlyEarning,
      fee: constants.COINS_MAP.luna.fee,
      faq: [
        {
          question: 'What is Terra?',
          answer: `
            <p>
              ​Terra is a blockchain protocol that supports stable programmable payments and open financial infrastructure development.
              It is supported by a basket of fiat-pegged, seigniorage share style stablecoins which are algorithmically stabilized by its native cryptoasset, Luna.
            </p>
            <p>
              One part of Terra's value contributions, payments, in essence replaces the complicated payments value chain, including credit card networks, banks, and payment gateways with a single blockchain layer.
            </p>
            <p>
              In concert with the efficiencies that Terra has provided payment channels for both merchants and consumers, it continues to steadily provide infrastructural improvements and tools for the foundations of laying down a credibly neutral, distributed, and radically transparent ecosystem.
            </p>
          `,
        },
        {
          question: 'What is Luna?',
          answer: `
            <p>
              Luna is the native staking token recognized by the Terra protocol. Through its role in collateralizing the mechanisms that secure the price-stability of Terra stablecoins and modulate the incentives of validators, Luna serves as a foundational asset for the entire Terra network and ecosystem
            </p>
          `,
        },
        {
          question: 'What is the bonding period? Unbonding period?',
          answer: `
            <p>There is no bonding period.</p>
            <p>There is a 21 day unbonding period to transfer your LUNA tokens after staking.</p>
          `,
        },
        {
          question: 'When will I start to earn rewards?',
          answer: `
            <p>
             Right after your delegation is completed you will get payouts every block [~7sec]. All rewards become available after their withdrawal.
            </p>
          `,
        },
        {
          question: 'How to stake (delegate)?',
          answer: `
            <p><a href="https://terra.money/static/Terra_Station_Guide_Eng.pdf" target="_blank" rel="noopener noreferrer">Step by Step delegation guide</a></p>
            <p>Delegate for everstakeone - terra13g7z3qq6f00qww3u4mpcs3xw5jhqwraswv3q3t</p>
          `,
        },
      ],
    };
  },
  computed: {
    coinCode() {
      return this.$_getCoinCode('luna').toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
