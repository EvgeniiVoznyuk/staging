<template>
  <div class="coin" data-view>
    <b-row>
      <b-col>
        <AddressCard
          :name="coinName"
          :coinIcon="coinIcon"
          :address="delegationAddress"
          :isAddAddressDisabled="true"
        >
          <template slot="main-title">
            Stake XKI with Everstake:
          </template>
          <template slot="main-subtitle">
            Your trusted staking provider
          </template>
          <template slot="address-card-footer">
            <div class="d-block d-md-inline-block mb-2 mb-md-0 mr-0 mr-md-3">
              {{ $t("common.ourFee") }} {{ fee }}
            </div>
            <div class="d-block d-md-inline-block mb-2 mb-md-0">
              {{ $t("common.yield") }} {{ yearlyEarning }}%
            </div>
          </template>
        </AddressCard>
      </b-col>
    </b-row>
    <Calculator />

    <Faqs :faq="faq" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AddressCard from '@/components/address/AddressCard.vue';
import constants from '@/constants';
import coinGetter from '@/plugins/mixins/coinGetter';
import Calculator from '@/components/kichain-sections/Calculator.vue';
import Faqs from '@/components/coin-page/Faqs.vue';

export default {
  name: 'Kichain',
  metaInfo: {
    title: 'Kichain Delegation with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content:
          'Learn how to Delegate Kichain to grow your Kichain stake and yield. Start delegating Ethereum2 with Everstake baker today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Kichain Delegation with Everstake baker',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content:
          'Learn how to Delegate Kichain to grow your Polygon stake and yield. Start delegating Kichain with Everstake baker today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Kichain Delegation with Everstake baker',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Learn how to Delegate ETH2 to grow your Kichain stake and yield. Start delegating Kichain with Everstake baker today in just a few steps.',
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
      coinName: constants.COINS_MAP.kichain.name,
      coinIcon: constants.COINS_MAP.kichain.img,
      delegationAddress: constants.COINS_MAP.kichain.delegationAddress,
      fee: constants.COINS_MAP.kichain.fee,
      yearlyEarning: constants.COINS_MAP.kichain.yearlyEarning,
      faq: [
        {
          question: 'What is Ki-Chain?',
          answer: `
           Ki-Chain is a Cosmos-backed blockchain using a Tendermint core. The chain ecosystem provides gateways to various businesses such as hospitality, insurance, air transportation, Cefi, Defi, and others. Ki Foundation team declared to have established partnerships with Lufthansa, booking.com, AAVE, and other significant market players.
          `,
        },
        {
          question: 'What is Ki Token?',
          answer: `
           The Ki Token (XKI) is a native staking utility token, serving the Ki Chain ecosystem. XKI unlocks access to all businesses & drivers of the value flow. Through its role in collateralizing the security mechanisms, XKI provides incentives for validators who would gain rewards equal to 5% from any transaction in addition to staking rewards. 

          Ki Token exchange listing is expected in Q1 2021 along with the launch of the first ecosystem product - neobank Klub. XKI is already stakable in the mainnet and could be bought through OTC directly from the core team while not listed.    
          `,
        },
        {
          question: 'What is bonding / unbonding period?',
          answer: `
           Bonding period is instant and unbonding period is 21 days.
          `,
        },
        {
          question: 'How to stake (delegate)?',
          answer: `
           Delegate to Everstake - kivaloper1dm98ttse9xefpgfzvl2wnq6hcrhx8ndxd4stz8

          inside desktop Ki wallet

          or using CLI: kicli tx staking delegate kivaloper1dm98ttse9xefpgfzvl2wnq6hcrhx8ndxd4stz8 &#60;amount to bond in uxki> uxki /\
          --from &#60;your account or account name>
          `,
        },
        {
          question: 'When will I start to earn rewards?',
          answer: `
           Right after your delegation is completed you will get payouts for every block [~7sec]. All rewards become available after their withdrawal.
          `,
        },
      ],
    };
  },
  computed: {
    coinCode() {
      return this.currentCoin.toUpperCase();
    },
    currentCoin() {
      return this.$_getCoinCode('kichain');
    },
  },
  methods: {
    ...mapActions({
      requestRates: 'ratesService/requestRates',
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
};
</script>
