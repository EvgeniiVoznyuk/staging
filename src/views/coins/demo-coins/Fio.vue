<template>
  <div class="coin" data-view>
    <b-row>
      <b-col>
        <AddressCard
          :name="coinName"
          :coinIcon="coinIcon"
          :isAddAddressDisabled="true">
          <template slot="main-title">
            Vote with FIO for: bp@everstake
          </template>
          <template slot="main-subtitle">
            {{ $t('coinPages.voteForStaking', {coinCode}) }}
          </template>
        </AddressCard>
      </b-col>
    </b-row>

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">
          Getting Started with FIO
        </h2>
        <p>
          FIO Addresses are a single identifier that eliminates the need to see, or even know about, blockchain public addresses.
          It’s simple to register, easy to use, and works with every token/coin automatically. More info - <a href="https://fioprotocol.io/getting-started/" target="_blank">https://fioprotocol.io/getting-started</a>
        </p>
      </template>
    </DelegationInstructions>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Fio from '@/assets/img/coins-presentation/fio.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';

export default {
  name: 'Fio',
  metaInfo: {
    title: 'Polkadot staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake Polkadot to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Polkadot staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake Polkadot to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Polkadot staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake Polkadot to grow your KSM stake and yield. Start delegating KSM tokens with Everstake delegate today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    AddressCard,
    DelegationInstructions,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.dot.name,
      coinIcon: Fio,
      delegationAddress: constants.COINS_MAP.dot.delegationAddress,
      yearlyEarning: constants.COINS_MAP.dot.yearlyEarning,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
    coinCode() {
      return this.$_getCoinCode('dot').toUpperCase();
    },
  },
};
</script>

<style scoped>

</style>
