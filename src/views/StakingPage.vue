<template>
  <BasicLayout :isWhiteBg="true" data-view>
    <template slot="content">
      <div class="staking">
        <section class="staking-section">
          <h4 class="title">
            {{ $t('stakingPage.allYouNeedToKnow') }}
          </h4>

          <p class="paragraph paragraph--black staking-section__paragraph">
            {{ $t('stakingPage.sectionOneParagraph') }}
          </p>
        </section>
        <section class="staking-section">
          <h4 class="title">
            {{ $t('stakingPage.stakingCrypto') }}
          </h4>

          <p class="paragraph paragraph--black staking-section__paragraph">
            {{ $t('stakingPage.sectionTwoParagraph') }}
          </p>
          <p class="paragraph paragraph--black staking-section__paragraph">
            {{ $t('stakingPage.sectionTwoParagraphPart2') }}
          </p>
        </section>
        <section class="staking-section">
          <h4 class="title">
            {{ $t('stakingPage.howStakingWork') }}
          </h4>

          <p class="paragraph paragraph--black staking-section__paragraph">
            {{ $t('stakingPage.sectionThreeParagraph') }}
          </p>
          <p class="paragraph paragraph--black staking-section__paragraph">
            {{ $t('stakingPage.sectionThreeParagraphPart2') }}
          </p>
        </section>
        <section class="staking-section">
          <h4 class="title">
            {{ $t('stakingPage.isItSafe') }}
          </h4>

          <p class="paragraph paragraph--black staking-section__paragraph">
            {{ $t('stakingPage.sectionFourParagraph') }}
          </p>
        </section>
        <section class="staking-section">
          <h4 class="title">
            {{ $t('stakingPage.whyEverstake') }}
          </h4>

          <p class="paragraph paragraph--black staking-section__paragraph">
            {{ $t('stakingPage.sectionFiveParagraph') }}
          </p>
          <p class="paragraph paragraph--black staking-section__paragraph">
            {{ $t('stakingPage.sectionFiveParagraphPart2') }}
          </p>
          <p class="paragraph paragraph--black staking-section__paragraph">
            {{ $t('stakingPage.sectionFiveParagraphPart3') }}
          </p>

          <div class="coins">
            <div class="coins-grid">
              <div class="coins-grid__item"
                   v-for="(coinObj, index) in coins"
                   :key="index">
                <CoinPresentation>
                  <template slot="icon">
                    <i :class="{ [coinObj.img]: true,
                                 'coin-icon': true, }"></i>
                  </template>
                  <template slot="name">{{ coinObj.name }}</template>
                  <template slot="percent">{{ coinObj.percent }}</template>
                  <template slot="description">
                  </template>
                  <template slot="routerLink">
                    <b-button :to="{ name:  coinObj.name }" :variant="'warning'">
                      <template v-if="coinObj.name === 'Eos'">{{ $t('home.lendNow') }}</template>

                      <template v-else-if="coinObj.name === 'Ethereum 2.0'">
                        {{ $t('home.moreInfo') }}
                      </template>

                      <template v-else>{{ $t('home.stakeNow') }}</template>
                    </b-button>
                  </template>
                </CoinPresentation>
              </div>
            </div>
          </div>
        </section>
      </div>
    </template>
  </BasicLayout>
</template>

<script>
import BasicLayout from '@/components/BasicLayout.vue';
import CoinPresentation from '@/components/CoinPresentation.vue';
import constants from '@/constants';

export default {
  name: 'StakingPage',
  metaInfo: {
    title: 'What is staking | How to stake coins | Everstake — Staking Service Platform',
    meta: [
      {
        vmid: 'og:title',
        property: 'og:title',
        content:
            'What is staking | How to stake coins | Everstake — Staking Service Platform',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'What is staking | How to stake coins | Everstake — Staking Service Platform',
      },
    ],
  },
  components: {
    BasicLayout,
    CoinPresentation,
  },
  computed: {
    coins() {
      return Object.keys(constants.COINS_MAP)
        .filter(coinCode => coinCode !== 'usd')
        .map((coinCode) => {
          const coinName = constants.COINS_MAP[coinCode].name;
          return {
            img: constants.COINS_MAP[coinCode].icon,
            name: coinName,
            percent: constants.COINS_MAP[coinCode].yearlyEarning
              ? `${constants.COINS_MAP[coinCode].yearlyEarning}%`
              : '-----',
            description: this.$t(`home.coinsPresentation.${coinCode}`),
            routerLinkName: coinName,
          };
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  .staking {
    padding: 70px 0 50px;
  }

  .staking-section {
    margin-bottom: 30px;
  }

  .coin-icon {
    color: $black;
    font-size: 60px;
  }

  @media (max-width: 575px) {
    .staking {
      padding-top: 30px;
    }
  }
</style>
