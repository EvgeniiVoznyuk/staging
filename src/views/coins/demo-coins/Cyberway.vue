<template>
  <div class="coin" data-view>
    <b-row>
      <b-col>
        <AddressCard :name="coinName"
                     :address="delegationAddress"
                     :coinIcon="coinIcon"
                     :isAddAddressDisabled="true">
          <template slot="main-title">
            {{ $t('cyber.mainTitle') }}
          </template>
          <template slot="main-subtitle">
            {{ $t('cyber.mainSubtitle') }}
          </template>
          <template slot="address-card-footer">
            <div class="d-block d-md-inline-block mr-0 mr-md-3">
              {{ $t('cyber.rewardFee') }} {{ fee }}
            </div>
            <div class="d-block d-md-inline-block">
              {{ $t('cyber.minOwnStaked') }} {{ minOwnStaked }}
            </div>
          </template>
        </AddressCard>
      </b-col>
    </b-row>

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">
          {{ $t('coinPages.whyVoteWithCoin', { coinName: coinCode }) }}
        </h2>
        <p>
          {{ $t('cyber.whyVoteParagraph') }}
        </p>

        <h2 class="fs-20">
          {{ $t('coinPages.coinNodeTitle', { coinName }) }}
        </h2>
        <p class="mb-0">
          {{ $t('cyber.nodeParagraph') }}
        </p>
      </template>
    </DelegationInstructions>
  </div>
</template>

<script>
import AddressCard from '@/components/address/AddressCard.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';

export default {
  name: 'Cyberway',
  components: {
    AddressCard,
    DelegationInstructions,
  },
  mixins: [coinGetter],
  data() {
    return {
      coinName: constants.COINS_MAP.cyber.name,
      coinIcon: constants.COINS_MAP.cyber.img,
      delegationAddress: constants.COINS_MAP.cyber.delegationAddress,
      fee: constants.COINS_MAP.cyber.fee,
      minOwnStaked: constants.COINS_MAP.cyber.minOwnStaked,
    };
  },
  computed: {
    coinCode() {
      return this.$_getCoinCode('cyber').toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
