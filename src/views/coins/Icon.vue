<template>
  <div>
    <TopSection />

    <WhyVote id="whyVoteForEverstake" />

    <Development id="development" />

    <DevOperations id="devOps" />

    <Community id="community" />

    <Video />

    <EducationMaterials id="educationalMaterials" />

    <BlockProduction />

    <CallToActionSection
      :title="$t('icx.whyStake')"
      :text="$t('icx.whyStakeParagraph')"
      class="mb-5"
      id="whyStakeIcon"
    >
      <template #title="{ text }">
        <h2 class="title title--lap">{{ text }}</h2>
      </template>

      <template #paragraph="{ text }">
        <b-col lg="9">
          <p class="paragraph paragraph--big paragraph--black text-left mb-0">
            {{ text }}
          </p>
        </b-col>
      </template>
    </CallToActionSection>

    <DelegationInstructions>
      <template slot="instructions">
        <h2 class="fs-20">{{ $t('icx.howToGetStarted') }}</h2>
        <i18n path="icx.howToGetStartedParagraph" tag="p">
          <a place="guide"
             href="https://medium.com/everstake/detailed-guide-to-icon-icx-staking-and-voting-how-things-do-exactly-work-d650e75f5ab9"
             target="_blank"
             rel="noopener noreferrer">
            {{ $t('icx.stakingGuide') }}
          </a>
        </i18n>

        <h2 class="fs-20">{{ $t('coinPages.whyDelegateToValidator', {coinName}) }}</h2>
        <p>{{ $t('icx.whyDelegateParagraph') }}</p>

        <h2 class="fs-20">{{ $t('icx.tutorials', {coinName}) }}</h2>
        <ul
          class="list list--yellow"
        >
          <li
            v-for="(tutorial, index) in tutorials"
            :key="index"
            class="mb-3"
          >
            <a
              :href="tutorial.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ tutorial.title }}
            </a>
          </li>
        </ul>
      </template>
    </DelegationInstructions>

    <FAQIcon class="mb-5"/>

    <CallToActionSection
      :title="$t('home.gotIssues')"
      :text="$t('home.wheneverProblem')"
      class="mb-5"
    >
      <template #title="{ text }">
        <h2 class="title title--lap">{{ text }}</h2>
      </template>
      
      <template slot="button">
        <b-button
          class="btn--black"
          href="https://t.me/everstake_chat"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t('home.support') }}
        </b-button>
      </template>
    </CallToActionSection>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TopSection from '@/components/icon-sections/TopSection.vue';
import WhyVote from '@/components/icon-sections/WhyVote.vue';
import Development from '@/components/icon-sections/Development.vue';
import DevOperations from '@/components/icon-sections/DevOperations.vue';
import Community from '@/components/icon-sections/Community.vue';
import Video from '@/components/icon-sections/Video.vue';
import EducationMaterials from '@/components/icon-sections/EducationMaterials.vue';
import BlockProduction from '@/components/icon-sections/BlockProduction.vue';
import DelegationInstructions from '@/components/coin-page/DelegationInstructions.vue';
import FAQIcon from '@/components/icon-sections/FAQIcon.vue';
import CallToActionSection from '@/components/home/sections/CallToActionSection.vue';
import coinGetter from '@/plugins/mixins/coinGetter';
import { tutorials } from '@/constants/iconEducationMaterials';

export default {
  name: 'Icon',
  metaInfo: {
    title: 'ICON staking with Everstake',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Learn how to stake ICON to grow your ICON stake and yield. Start delegating ICON tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'ICON staking with Everstake',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Learn how to stake ICON to grow your ICON stake and yield. Start delegating ICON tokens with Everstake delegate today in just a few steps.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'ICON staking with Everstake',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Learn how to stake ICON to grow your ICON stake and yield. Start delegating ICON tokens with Everstake delegate today in just a few steps.',
      },
    ],
  },
  components: {
    TopSection,
    WhyVote,
    Development,
    DevOperations,
    Community,
    Video,
    EducationMaterials,
    BlockProduction,
    DelegationInstructions,
    FAQIcon,
    CallToActionSection,
  },
  mixins: [coinGetter],
  data() {
    return {
      coinName: '',
      coinCode: '',
      tutorials,
    };
  },
  created() {
    if (!this.$helpers.isPrerender()) {
      const twitterScript = document.createElement('script');
      twitterScript.setAttribute('id', 'twitterScript');
      twitterScript.innerHTML = `!(function (e, t, n, s, u, a) {
        e.twq || (s = e.twq = function () {
          s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
        }, s.version = '1.1', s.queue = [], u = t.createElement(n), u.async = !0, u.src = '//static.ads-twitter.com/uwt.js',
        a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a));
      }(window, document, 'script'));
      // Insert Twitter Pixel ID and Standard Event data below
      twq('init', 'o3jen');
      twq('track', 'PageView');`;
      document.head.appendChild(twitterScript);
      
      const hotjarScript = document.createElement('script');
      hotjarScript.setAttribute('id', 'hotjarScript');
      hotjarScript.innerHTML = `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:1802855,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;
      document.head.appendChild(hotjarScript);
    }

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
  beforeDestroy() {
    document.head.removeChild(document.getElementById('twitterScript'));
    document.head.removeChild(document.getElementById('hotjarScript'));
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
