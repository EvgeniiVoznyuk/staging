<template>
  <section
    class="mb-5"
  >
    <h2 class="title title--white title--lap">
      {{ $t('icx.development') }}
    </h2>

    <b-row>
      <b-col xl="8">
        <p class="paragraph paragraph--big mb-5">
          {{ $t('icx.developmentP') }}
        </p>
      </b-col>
    </b-row>

    <CardInfo
      :title="bot.title"
      :texts="bot.texts"
    >
      <template #btns>
        <div class="d-flex flex-column flex-lg-row">
          <b-btn
            tag="a"
            href="https://t.me/everstake_bot"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="warning"
            class="mb-3 mb-lg-0 mr-lg-2"
          >
            {{ $t('icx.tryBot') }}
          </b-btn>

          <b-btn
            tag="a"
            href="https://everstake.one/blog/everstake-releases-the-icon-telegram-bot-v20"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="outline-warning"
          >
            {{ $t('icx.functionalityOverview') }}
          </b-btn>
        </div>
      </template>
    </CardInfo>
    <CardInfo
      :title="dashboard.title"
      :texts="dashboard.texts"
    >
      <template #btns>
        <b-btn
          tag="a"
          href="https://everstake.one/blog/everstake-dashboard-rewards-account-statistics-graphs-and-other"
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          variant="outline-warning"
        >
          {{ $t('icx.dashboardOverview') }}
        </b-btn>
      </template>
    </CardInfo>
    <CardInfo
      :title="voteMonitor.title"
      :texts="voteMonitor.texts"
    >
      <template #btns>
        <div class="d-flex flex-column flex-lg-row">
          <b-btn
            tag="a"
            href="https://iconvotemonitor.com"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="warning"
            class="mb-3 mb-lg-0 mr-lg-2"
          >
            {{ $t('icx.openVoteMonitor') }}
          </b-btn>

<!--          <b-btn-->
<!--            tag="a"-->
<!--            href="https://iconvotemonitor.com"-->
<!--            target="_blank"-->
<!--            rel="noopener noreferrer"-->
<!--            size="lg"-->
<!--            variant="outline-warning"-->
<!--          >-->
<!--            {{ $t('icx.voteMonitorExplanation') }}-->
<!--          </b-btn>-->
        </div>
      </template>
    </CardInfo>
    <CardInfo
      :title="analytics.title"
      :texts="analytics.texts"
    >
      <!-- <template #btns>
        <b-btn
          tag="a"
          href="https://everstake.one/analytics"
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          variant="warning"
        >
          {{ $t('icx.openAnalytics') }}
        </b-btn>
      </template> -->
    </CardInfo>

    <StatsIcon class="mt-5" />
  </section>
</template>

<script>
import CardInfo from '@/components/coin-page/CardInfo.vue';
import StatsIcon from '@/components/icon-sections/StatsIcon.vue';

export default {
  name: 'Development',
  components: {
    CardInfo,
    StatsIcon,
  },
  data() {
    return {
      bot: {
        title: this.$t('icx.bot'),
        texts: [this.$t('icx.botP')],
      },
      dashboard: {
        title: this.$t('icx.dashboard'),
        texts: [this.$t('icx.dashboardP')],
      },
      voteMonitor: {
        title: this.$t('icx.voteMonitor'),
        texts: [this.$t('icx.voteMonitorP')],
      },
      analytics: {
        title: this.$t('icx.analytics'),
        texts: [this.$t('icx.analyticsP')],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
