<template>
  <div class="coin" data-view>
    <b-row>
      <b-col>
        <AddressCard
          :name="coinName"
          :address="delegationAddress"
          :coinIcon="coinIcon"
          :isAddAddressDisabled="true"
        >
          <template slot="main-title">
            Stake for [EVE1] Everstake:
          </template>
          <template slot="main-subtitle">
            your trusted staking provider
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

    <Calculator />

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">
          Staking step by step
        </h2>
        <p>
          Cardano is a proof of stake (PoS) blockchain.
          This means that even if you do not have the time or resources to run a stake pool,
          you can still delegate your ADA to another pool
          operator and have it staked on your behalf.
        </p>
        <h2 class="fs-20">
          How to stake ADA?
        </h2>
        <p>
          <a href="https://medium.com/everstake/how-to-stake-cardano-ada-in-daedalus-wallet-b1c519b2033b" target="_blank">Staking Tutorial via Daedalus Wallet</a>
        </p>
        <p>
          It is very important that users have to download the
          latest version of Daedalus before they start delegating,
          which you can find by navigating to Cardano.org,
          selecting ‘Individuals’ from the menu at the top of the page, and clicking on ‘Daedalus’.
        </p>
        <p>
          Once you have installed the latest version of Daedalus,
          synced your wallet with the blockchain, and have your
          ada stored in your wallet, you can start the process of delegating your stake.
        </p>
        <p>
          <a
            href="https://medium.com/everstake/how-to-stake-cardano-ada-via-the-adalite-wallet-35387ca8491b"
            target="_blank"
          >
            Staking Tutorial via Adalite Wallet
          </a>
        </p>
        <p>
          <a
            href="https://medium.com/everstake/how-to-stake-cardano-ada-using-exodus-desktop-wallet-45b64f1cdc83"
            target="_blank"
          >
            Staking Tutorial via Exodus Desktop Wallet
          </a>
        </p>
        <p>
          <a
            href="https://medium.com/everstake/how-to-stake-cardano-ada-in-exodus-mobile-wallet-3a31081a0f35"
            target="_blank"
          >
            Staking Tutorial via Exodus Mobile Wallet
          </a>
        </p>
        <p>
          <a
            href="https://medium.com/everstake/how-to-stake-cardano-ada-via-the-yoroi-browser-wallet-1a49fd1fa401"
            target="_blank"
          >
            Staking Tutorial via Yoroi Wallet
          </a>
        </p>
        <h2 class="fs-20">
          When will I receive my rewards?
        </h2>
        <p>
          If you delegate your ada during the first epoch,
          the pool which you delegate to can produce blocks two epochs later.
        </p>
        <p>
          Two epochs after that, you will begin receiving rewards.
          This is the case in any epoch you begin delegating your stake in.
        </p>
        <p>
          We know that each epoch is exactly five days long.
          Therefore, you will begin receiving staking rewards after 20 days.
        </p>
      </template>
    </DelegationInstructions>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Cardano from '@/assets/img/coins-presentation/cardano.svg';
import AddressCard from '@/components/address/AddressCard.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import constants from '@/constants';
import Calculator from '@/components/cardano-sections/Calculator.vue';

export default {
  name: 'Cardano',
  metaInfo: {
    title: 'Cardano staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake Cardano to grow your stake and yield. Start delegating Cardano with Everstake delegate today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    AddressCard,
    DelegationInstructions,
    Calculator,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.ada.name,
      coinIcon: Cardano,
      delegationAddress: constants.COINS_MAP.ada.delegationAddress,
      yearlyEarning: constants.COINS_MAP.ada.yearlyEarning,
      fee: constants.COINS_MAP.ada.fee,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
  },
  created() {
    const { coinCode = null } = this.$route.meta;

    if (!coinCode) {
      this.$router.push({ name: 'Page404' });
    }
    this.coinData = this.coinsMap[coinCode];
    this.coinCode = coinCode;
    this.coinName = this.coinData.name;

    this.requestRates({
      base_currencies: [coinCode],
      quote_currencies: [this.$_getCoinCode('usd')],
    });
  },
  methods: {
    ...mapActions({
      requestRates: 'ratesService/requestRates',
    }),
  },
};
</script>

<style scoped>

</style>
