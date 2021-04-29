<template>
  <div class="coin" data-view>
    <AlertBeforeWork />

    <b-row>
      <b-col>
        <AddressCardNew
          :name="coinName"
          :coinIcon="coinIcon"
        >
          <template slot="main-title">
            {{ $t('coinPages.delegateCoin', { coinName }) }} - Coming soon
          </template>
          <template slot="main-subtitle">
            {{ $t('coinPages.delegateCoinWithEverstake', { coinCode }) }}
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
        </AddressCardNew>
      </b-col>
    </b-row>

    <DelegationInfo v-if="isAddressAvailable" />

    <IncomesChart v-if="isAddressAvailable" :coinCode="coinCode" />

    <BalancesChart v-if="isAddressAvailable" :coinCode="coinCode" />

    <DepositsHistoryTable
      v-if="isAddressAvailable"
      :coinCode="coinCode"
    />

    <DelegationInstructions>
      <template #instructions>
        <h2 class="fs-20">
          {{ $t('ethereum2.whyDelegate') }}
        </h2>
        <p>
          {{ $t('ethereum2.whyDelegateParagraph') }}
        </p>
        <div class="mb-0">
          <p class="fs-20">{{ $t('common.delegationGuides') }}</p>
          <p>{{ $t('common.willBeAvailableSoon') }}</p>
        </div>
      </template>
    </DelegationInstructions>

    <FAQEthereum2 class="mb-5"/>
  </div>
</template>

<script>
import {
  mapActions, mapGetters, mapMutations, mapState,
} from 'vuex';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import AddressCardNew from '@/components/eth2/AddressCardNew.vue';
import AlertBeforeWork from '@/components/coin-page/AlertBeforeWork.vue';
import constants from '@/constants';
import DelegationInfo from '@/components/eth2/DelegationInfo.vue';
import DepositsHistoryTable from '@/components/eth2/DepositsHistoryTable.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import FAQEthereum2 from '@/components/eth2/FAQEthereum2.vue';
import IncomesChart from '@/components/eth2/IncomesChart.vue';
import BalancesChart from '@/components/eth2/BalancesChart.vue';

export default {
  name: 'Ethereum2',
  metaInfo: {
    title: 'Ethereum2 Delegation with Everstake baker',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to Delegate ETH2 to grow your Ethereum2 stake and yield. Start delegating Ethereum2 with Everstake baker today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Ethereum2 Delegation with Everstake baker',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to Delegate ETH2 to grow your Ethereum2 stake and yield. Start delegating Ethereum2 with Everstake baker today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Ethereum2 Delegation with Everstake baker',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to Delegate ETH2 to grow your Ethereum2 stake and yield. Start delegating Ethereum2 with Everstake baker today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    AddressCardNew,
    AlertBeforeWork,
    DelegationInfo,
    DepositsHistoryTable,
    DelegationInstructions,
    FAQEthereum2,
    IncomesChart,
    BalancesChart,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.eth.name,
      coinIcon: constants.COINS_MAP.eth.img,
      delegationAddress: constants.COINS_MAP.eth.delegationAddress,
      fee: constants.COINS_MAP.eth.fee,
      yearlyEarning: constants.COINS_MAP.eth.yearlyEarning,
    };
  },
  computed: {
    ...mapState('ethService', ['address']),
    ...mapGetters({
      isAddressAvailable: 'ethService/isAddressAvailable',
    }),
    coinCode() {
      return this.currentCoin.toUpperCase();
    },
    currentCoin() {
      return this.$_getCoinCode('eth');
    },
  },
  created() {
    this.checkRouteAddress();
    this.requestRates({
      base_currencies: [this.currentCoin],
      quote_currencies: [this.$_getCoinCode('usd')],
    });
  },
  methods: {
    ...mapMutations('ethService', ['setAddress']),
    ...mapActions({
      requestRates: 'ratesService/requestRates',
    }),
    checkRouteAddress() {
      if (this.$route.params && this.$route.params.address) {
        this.setAddress(this.$route.params.address);
      }
    },
  },
};
</script>
