<template>
  <section class="coins" id="coins">
    <div class="coins__available">
      <b-container class="container--custom">
        <h2 class="title coins__title">
          {{ $t('home.availableCoins') }}
        </h2>

        <div class="coins-grid">
          <div class="coins-grid__item"
               v-for="(coinObj, index) in availableCoins"
               :key="index">
            <CoinPresentation>
              <template slot="icon">
                <i
                  :class="{ [coinObj.img]: true,
                             'coin-icon': true,
                             'fs-80': coinObj.img === 'ev-remme' }"></i>
              </template>
              <template slot="name">{{ coinObj.name }}</template>
              <template slot="percent">{{ coinObj.percent }}</template>
              <template slot="description">
<!--                {{ coinObj.description }}-->
              </template>
              <template slot="routerLink">
<!--                class="btn&#45;&#45;alt btn&#45;&#45;alt&#45;&#45;white-txt"-->
                <b-button :to="{ name:  coinObj.name }" :variant="'warning'">
                  <template v-if="coinObj.name === 'ETH 2.0'">
                    {{$t('home.moreInfo')}}
                  </template>
                  <template v-else>
                    {{ parseInt(coinObj.percent) ? $t('home.stakeNow') : $t('home.moreInfo') }}
                  </template>
                </b-button>
              </template>
            </CoinPresentation>
          </div>
        </div>
      </b-container>
    </div>

    <div class="coins__dev">
      <b-container class="container--custom">
        <h2 class="title coins__title">
          {{ $t('home.devCoins') }}
        </h2>

        <div class="coins-grid">
          <div class="coins-grid__item coins-grid__item--dev"
               v-for="(coinObj, index) in devCoins"
               :key="index">
            <CoinPresentation :noLink="true"
                              :noCoin="coinObj.noCoin"
                              :underDev="true"
                              class="mb-md-0">
              <template slot="icon">
                <i :class="{ [coinObj.img]: true,
                             'coin-icon': true,
                             'coin-icon--dev': true }"></i>
              </template>
              <template slot="name">
                {{ coinObj.name }}
              </template>
              <template slot="description">
                {{ coinObj.description }}
              </template>
              <template slot="routerLink">
                <!--Ucomment when forms are provided-->
                <!--<b-button class="btn&#45;&#45;grey mt-3">-->
                  <!--{{ $t('home.notify') }}-->
                <!--</b-button>-->
              </template>
            </CoinPresentation>
          </div>
        </div>
      </b-container>
    </div>
  </section>
</template>

<script>
import CoinPresentation from '@/components/CoinPresentation.vue';
import constants from '@/constants';

export default {
  name: 'CoinsSection',
  components: {
    CoinPresentation,
  },
  data() {
    return {
      devCoins: [
        // {
        //   img: 'ev-nucypher',
        //   name: 'NuCypher',
        //   description: this.$t('home.publicTestNet'),
        // },
        // {
        //   img: 'ev-elrond',
        //   name: 'Elrond',
        //   description: this.$t('home.publicTestNet'),
        // },
        // {
        //   img: 'ev-kava',
        //   name: 'Kava',
        //   description: this.$t('home.publicTestNet'),
        // },
        // {
        //   img: 'ev-ton',
        //   name: 'TON Network',
        //   description: this.$t('home.publicTestNet'),
        // },
        {
          img: 'ev-elixxir',
          name: 'Elixxir',
          description: this.$t('home.publicTestNet'),
        },
        // {
        //   img: 'ev-near',
        //   name: 'Near',
        //   description: this.$t('home.publicTestNet'),
        // },
        // {
        //   img: 'ev-casperlabs',
        //   name: 'Casper Labs',
        //   description: this.$t('home.publicTestNet'),
        // },
        {
          img: 'ev-ontology',
          name: 'Ontology',
          description: this.$t('home.publicTestNet'),
        },
        // {
        //   img: 'ev-nano',
        //   name: 'NANO',
        //   description: this.$t('home.publicTestNet'),
        // },
        {
          img: 'ev-neo',
          name: 'Neo',
          description: this.$t('home.publicTestNet'),
        },
        // {
        //   img: 'ev-pvx',
        //   name: 'Pivx',
        //   description: this.$t('home.publicTestNet'),
        // },
        // {
        //   img: 'ev-eth',
        //   name: 'Ethereum 2.0',
        //   description: this.$t('home.publicTestNet'),
        // },
        // {
        //   img: 'ev-cardano',
        //   name: 'Cardano',
        //   description: this.$t('home.publicTestNet'),
        // },
        // {
        //   img: 'ev-polkadot',
        //   name: 'Polkadot',
        //   description: this.$t('home.publicTestNet'),
        // },
        // {
        //   img: 'ev-oasis',
        //   name: 'Oasis',
        //   description: this.$t('home.publicTestNet'),
        // },
        // {
        //   img: 'ev-coda',
        //   name: 'Coda',
        //   description: this.$t('home.publicTestNet'),
        // },
        {
          img: 'ev-graph',
          name: 'The Graph',
          description: this.$t('home.publicTestNet'),
        },
        {
          img: 'ev-casper',
          name: 'CasperLabs',
          description: this.$t('home.publicTestNet'),
        },
        {
          img: 'ev-mina',
          name: 'Mina',
          description: this.$t('home.publicTestNet'),
        },
      ],
    };
  },
  computed: {
    availableCoins() {
      return Object.keys(constants.COINS_MAP)
        .filter(coinCode => coinCode !== 'usd')
        .map((coinCode) => {
          const coinName = constants.COINS_MAP[coinCode].name;
          return {
            // img: constants.COINS_MAP[coinCode].img,
            img: constants.COINS_MAP[coinCode].icon,
            name: coinName,
            percent: constants.COINS_MAP[coinCode].yearlyEarning
              ? `${constants.COINS_MAP[coinCode].yearlyEarning}%`
              : '-----',
            description: this.$t(`home.coinsPresentation.${coinCode}`),
          };
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  .coins {
    background: $white;
    padding: 50px 0 110px;

    &__available {
      margin-bottom: 110px;
    }

    &__title {
      margin-bottom: 55px;
    }
  }

  .coin-icon {
    color: $black;
    font-size: 60px;

    &--dev {
      transition: color 0.2s;
      color: $grey;
    }
  }

  @media (max-width: 575px) {
    .coins {
      padding-bottom: 48px;

      &__title {
        margin-bottom: 30px;
      }

      &__available {
        margin-bottom: 54px;
      }
    }
  }
</style>
