<template>
  <div class="home" data-view>
    <TopSection></TopSection>
    <main>
      <!-- <CallToActionSection
        id="waitlist"
        :title="$t('home.readyToStake')"
        :text="$t('home.subscribeToReceive')">
      <template slot="button">
        <b-button class="btn--black"
                  href="https://forms.gle/8ixC9J7NHwzxc3va6"
                  target="_blank"
                  rel="noopener noreferrer">
          {{ $t('home.getStarted') }}
        </b-button>
      </template>
      </CallToActionSection> -->
      <!-- <StatisticsSection></StatisticsSection> -->
      <!-- <CallToActionSection :title="$t('home.stayUpdated')"
                           :text="$t('home.takeAdvantage')">
        <template slot="button">
          <b-button class="btn--black"
                    :to="{ name: 'Balance' }">
            {{ $t('home.tryNow') }}
          </b-button>
        </template>
      </CallToActionSection> -->
      <!-- <CoinsSection></CoinsSection>
      <AboutSection></AboutSection> -->
<!--      <FormSection></FormSection>-->
      <CallToActionSection :title="$t('home.gotIssues')"
                           :text="$t('home.wheneverProblem')">
        <template slot="button">
          <b-button class="btn--black"
                    href="https://t.me/everstake_chat"
                    target="_blank"
                    rel="noopener noreferrer">
            {{ $t('home.support') }}
          </b-button>
        </template>
      </CallToActionSection>
    </main>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import TopSection from '@/components/home/sections/TopSection.vue';
// import StatisticsSection from '@/components/home/sections/StatisticsSection.vue';
// import CoinsSection from '@/components/home/sections/CoinsSection.vue';
// import AboutSection from '@/components/home/sections/AboutSection.vue';
// import FormSection from '@/components/home/sections/FormSection.vue';
// import Footer from '@/components/Footer.vue';
import CallToActionSection from '@/components/home/sections/CallToActionSection.vue';
import { initMail } from '@/plugins/mixins/initMail';

export default {
  name: 'home',
  components: {
    TopSection,
    // StatisticsSection,
    // CoinsSection,
    // AboutSection,
    // FormSection,
    // Footer,
    CallToActionSection,
  },
  mixins: [initMail],
  data() {
    return {
      testData: null,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .home {
    font-family: 'Roboto Mono', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
