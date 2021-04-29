<template>
  <section
    class="mb-5"
  >
    <h2 class="title title--white title--lap mb-sm-5">
      {{ $t('icx.communityGrowth') }}
    </h2>

    <b-row class="mb-5">
      <b-col md="6">
        <p class="paragraph paragraph--big">
          {{ $t('icx.communityGrowthP') }}
        </p>
      </b-col>

      <b-col md="6">
        <ul
          class="list list--yellow"
        >
          <li
            v-for="(link, index) in links"
            :key="index"
            class="mb-3"
          >
            <a
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.title }}
            </a>
          </li>
        </ul>
      </b-col>
    </b-row>

    <CardInfo
      :title="cardBounty.title"
      :texts="cardBounty.texts"
    >
      <template #btns>
        <b-btn
          tag="a"
          href="http://bit.ly/ICX_BUGbounty"
          target="_blank"
          rel="noopener noreferrer"
          variant="warning"
          size="lg"
        >
         {{ $t('icx.bugBountyParticipate') }}
        </b-btn>
      </template>
    </CardInfo>
  
    <CardInfo
      :title="cardWebinar.title"
      :texts="cardWebinar.texts"
    >
      <template #btns>
        <b-btn
          tag="a"
          href="https://www.icon-europe.community/event-details/icon-europe-webinar/form"
          target="_blank"
          rel="noopener noreferrer"
          variant="warning"
          size="lg"
        >
          {{ $t('icx.registerHere') }}
        </b-btn>
      </template>
    </CardInfo>
  </section>
</template>

<script>
import CardInfo from '@/components/coin-page/CardInfo.vue';

export default {
  name: 'Community',
  components: {
    CardInfo,
  },
  data() {
    return {
      links: [
        {
          title: 'Everstake ICON AMA Session August 2019',
          href: 'https://medium.com/everstake/everstake-icon-ama-4c6fbc5fdfa6',
        },
        {
          title: 'Everstake AMA Session with Crypto Nation',
          href: 'https://medium.com/@CryptoNationIN/recap-everstake-x-crypto-nation-ama-72a39cf3a010',
        },
        {
          title: 'The first ICON presentation for Ukrainian students',
          href: 'https://twitter.com/everstake_pool/status/1230140451061207040',
        },
      ],
      cardBounty: {
        title: this.$t('icx.bugBounty'),
        texts: [this.$t('icx.bugBountyP')],
      },
      cardWebinar: {
        title: this.$t('icx.webinar'),
        texts: [this.$t('icx.webinarP')],
      },
    };
  },
};
</script>

<style scoped>

</style>
