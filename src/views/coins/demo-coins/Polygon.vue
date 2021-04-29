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
            Delegate to Everstake:
            <a
              href="https://wallet.matic.network/staking/validators/77"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ delegationAddress }}
            </a>
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

    <DelegationInstructions>
      <template #instructions>
        <h2 class="fs-20">What is Matic?</h2>
        <p>
          Blockchain Smart contract platforms and cryptocurrencies have captured
          mass attention but still haven’t been able to achieve mass adoption
          due to scalability and user experience issues. Even on Ethereum, which
          is the most widely used smart contracts platform, there have been no
          significant Dapps which have seen mass adoption. There have been a few
          cases where one or the other application temporarily succeeded in
          achieving a significant user base, but it led to crippling of the
          entire network during the high load times. Essentially meaning that
          even the most advanced and widely used platforms are not ready for
          mass adoption. On the other hand, there are a few smart contract
          platforms which boast of higher transaction throughput, but they trade
          off transaction speed with decentralization. Also, many of the
          upcoming solutions propose their own blockchains neglecting the
          network effects DApps and other projects have already generated on
          platforms like Ethereum and others. Even more importantly they neglect
          the massive developer community and developer ecosystem that exists
          for platforms like Ethereum. Matic Network is a Layer 2 scaling
          solution that achieves scale by utilizing sidechains for off-chain
          computation while ensuring asset security using the Plasma framework
          and a decentralized network of Proof-of-Stake (PoS) validators. Matic
          strives to solve the scalability and usability issues while not
          compromising on decentralization and leveraging the existing developer
          community and ecosystem. Matic Network is an ​off/side chain scaling
          solution for existing platforms to provide scalability and superior
          user experience to DApps/user functionalities.
        </p>
        <div class="mb-0">
          <p class="fs-20">Key Features & Highlights</p>
          <p>
            Scalability: Fast, low-cost and secure transactions on Matic
            sidechains with finality achieved on mainchain and Ethereum as the
            first compatible Layer 1 basechain
          </p>
          <p>
            High Throughput: Achieved up to 10,000 TPS on a single sidechain on
            internal testnet; Multiple chains to be added for horizontal scaling
          </p>
          <p>
            User Experience: Smooth UX and developer abstraction from mainchain
            to Matic chain; native mobile apps and SDK with WalletConnect
            support
          </p>
          <p>
            Security: Matic chain operators are themselves stakers in the PoS
            system
          </p>
          <p>
            Public Sidechains: Matic sidechains are public in nature (vs.
            individual DApp chains), permissionless and capable of supporting
            multiple protocols
          </p>
          <p>
            <a
              target="_blank"
              href="https://docs.matic.network/docs/validate/delegator/"
            >
              Delegate on Matic
            </a>
          </p>
          <p>
            <a
              target="_blank"
              href="https://docs.matic.network/docs/home/blockchain-basics/import-account-to-metamask/"
            >
              Importing an Account to Metamask
            </a>
          </p>
        </div>
      </template>
    </DelegationInstructions>

    <Faqs :faq="faq" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AddressCard from '@/components/address/AddressCard.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import constants from '@/constants';
import coinGetter from '@/plugins/mixins/coinGetter';
import Calculator from '@/components/polygon-section/Calculator.vue';
import Faqs from '@/components/coin-page/Faqs.vue';

export default {
  name: 'Polygon',
  metaInfo: {
    title: 'Polygon Delegation with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content:
          'Learn how to Delegate Polygon to grow your Polygon stake and yield. Start delegating Ethereum2 with Everstake baker today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'PolygonDelegation with Everstake baker',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content:
          'Learn how to Delegate ETH2 to grow your Polygon stake and yield. Start delegating Polygon with Everstake baker today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Polygon Delegation with Everstake baker',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content:
          'Learn how to Delegate ETH2 to grow your Polygon stake and yield. Start delegating Polygon with Everstake baker today in just a few steps.',
      },
    ],
  },
  mixins: [coinGetter],
  components: {
    AddressCard,
    DelegationInstructions,
    Calculator,
    Faqs,
  },
  data() {
    return {
      coinName: constants.COINS_MAP.polygon.name,
      coinIcon: constants.COINS_MAP.polygon.img,
      delegationAddress: constants.COINS_MAP.polygon.delegationAddress,
      fee: constants.COINS_MAP.polygon.fee,
      yearlyEarning: constants.COINS_MAP.polygon.yearlyEarning,
      faq: [
        {
          question: 'What is the Staking Dashboard URL?',
          answer: `
           The staking dashboard URL is https://wallet.matic.network/staking.
          `,
        },
        {
          question: 'What is the Minimum stake amount?',
          answer: `
           There is no minimum stake amount to delegate. However, you can always start with 1 Matic token
          `,
        },
        {
          question: 'How many rewards will I get if I delegate??',
          answer: `
           Please use the Staking Rewards Calculator to determine your estimates. https://wallet.matic.network/staking-rewards
          `,
        },
        {
          question: 'Why does my transaction take so long?',
          answer: `
           All staking transactions of Matic happen on Ethereum for security reasons.

          The time taken to complete a transaction depends on the gas fees that you have allowed and also the network congestion of Ethereum mainnet at that point in time. You can always use the “Speed Up” option to increase the gas fees so that your transaction can be completed soon
          `,
        },
        {
          question: 'Which wallets are currently supported?',
          answer: `
           Currently, only the Metamask extension on the desktop browser and Coinbase Wallet are supported. Additionally you can use WalletConnect and Walletlink from supported mobile wallets to interact with the Staking UI dashboard on desktop/laptop. We will be gradually adding support for other wallets soon.
          `,
        },
        {
          question: 'Are hardware wallets supported?',
          answer: `
           Yes, hardware wallets are supported. You can use the "Connect Hardware Wallet" option on Metamask and connect your Hardware wallet and then continue the delegation process.
          `,
        },
        {
          question: 'Why can’t I stake directly from Binance?',
          answer: `
           Staking through Binance is not yet supported. There will be an announcement if and when Binance starts supporting it.
          `,
        },
        {
          question:
            'I have completed my delegation, where can I check details?',
          answer: `
           Once you have completed your delegation, wait for 12 block confirmations on Ethereum (~3-5 minutes), then on the Dashboard,you can click on the “My Delegator Details” option on the left-hand side. Or you could also click on “Show Delegator Profile” card
          `,
        },
        {
          question: 'Where can I check my rewards?',
          answer: `
           On the Dashboard, you can click on the “My Delegator Details” option on the left-hand side. Or you could also click on “Show Delegator Profile” card.

          Check the New Rewards card on the right. Once you accrue rewards, you can click on the Details link to check rewards in detail.
          `,
        },
        {
          question: 'Do I need ETH to pay for Gas fees?',
          answer: `
           Yes. You should provision for ~0.05-0.1 ETH to be safe.
          `,
        },
        {
          question:
            'Do I need to deposit Matic tokens to the Matic Mainnet network for staking?',
          answer: `
           No. All your funds need to be on the Main Ethereum Network.
          `,
        },
        {
          question:
            'When I try to do the transaction my Confirm button is disabled, why so?',
          answer: `
           Please check if you have enough ETH for the gas fees.
          `,
        },
        {
          question: 'When does reward get distributed?',
          answer: `
           The rewards are distributed whenever a checkpoint is submitted.

            Currently 20188 Matic tokens are distributed proportionately on each successful checkpoint submission to each delegator based on their stake relative to the overall staking pool of all validators and delegators. Also, the percentage for the reward distributed to each delegator will vary with each checkpoint depending on the relative stake of the delegator, validator and the overall stake.

            (Note that there is a 10% proposer bonus that accrues to the validator who submits the checkpoint, but over time, the effect of the extra bonus is nullified over multiple checkpoints by different validators.)

            The checkpoint submission is done by one of the validators approximately every 34 minutes. This time is approximate and may vary based on validator consensus on the Matic Heimdall layer. This may also vary based on Ethereum Network. Higher congestion in the network may result in delayed checkpoints.

            You can track checkpoints on the staking contract here: https://etherscan.io/address/0x86e4dc95c7fbdbf52e33d563bbdb00823894c287
          `,
        },
        {
          question: 'Why does reward keep getting decreased every checkpoint?',
          answer: `
           Actual rewards earned will depend on the actual total locked supply in the network at each checkpoint. This is expected to vary significantly as more MATIC tokens get locked in the staking contracts.

            Rewards will be higher, to begin with, and will keep decreasing as the locked supply % goes up. This change in locked supply is captured at every checkpoint, and rewards are calculated based on this.
          `,
        },
        {
          question: 'How can I claim my rewards?',
          answer: `
           You can claim your rewards instantly by clicking on the “New Rewards” card and then clicking on the Withdraw rewards button. This will transfer the rewards accumulated to your delegated account on Metamask.
          `,
        },
        {
          question: 'What is the Unbonding period?',
          answer: `
           The unbonding period on Matic is approximately 9 days now. It was 19 days previously. This period applies to the originally delegated amount and re-delegated amounts - it does not apply to any rewards that were nor re-delegated.
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
      return this.$_getCoinCode('polygon');
    },
  },
  created() {
    this.requestRates({
      base_currencies: [this.currentCoin],
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
