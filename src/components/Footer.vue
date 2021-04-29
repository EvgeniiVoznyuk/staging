<template>
  <footer class="footer">
    <b-container fluid>
      <b-row>
        <b-col order="1"
               order-xl="1"
               xl="3"
               class="footer__logo d-flex align-items-center">
          <div class="footer__cell">
            <div class="logo">
              <img src="@/assets/img/logo-with-txt.svg" class="logo__img" alt="Everstake">
            </div>
          </div>
        </b-col>
        <b-col order="3"
               order-xl="2"
               xl="9"
               class="footer__socials">
          <div class="footer__cell">
            <b-row no-gutters>
              <b-col cols="12" sm="6" md="" class="d-flex align-items-center">
                <ul class="footer__ul">
                  <li class="footer__li">
                    <a href="https://t.me/everstake_chat"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="link">
                      {{ $t('home.joinTg') }}
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/everstake_pool"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="link">
                      {{ $t('home.followTwitter') }}
                    </a>
                  </li>
                </ul>
              </b-col>
              <b-col cols="12" sm="6" md="" class="d-flex align-items-center">
                <ul class="footer__ul">
                  <li class="footer__li">
                    <a href="https://medium.com/everstake"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="link">
                      {{ $t('home.readMedium') }}
                    </a>
                  </li>
                  <li>
                    <a href="https://www.reddit.com/r/Everstake"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="link">
                      {{ $t('home.upvoteReddit') }}
                    </a>
                  </li>
                </ul>
              </b-col>
              <b-col cols="12" sm="6" md="" class="d-flex align-items-center">
                <ul class="footer__ul">
                  <li class="footer__li">
                    <a href="mailto:inbox@everstake.one" class="link">
                      inbox@everstake.one
                    </a>
                  </li>
                  <li>
                    <!-- <a href="tel:+1 650 360 54 49" class="link">
                      +1 650 360 54 49
                    </a> -->
                  </li>
                </ul>
              </b-col>
              <b-col cols="12" sm="6" md="" class="d-flex align-items-center">
                <ul class="footer__ul">
                  <li class="footer__li">
                    <a href="https://t.me/everstake_chat"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="link">
                      {{ $t('home.support') }}
                    </a>
                  </li>
                  <li>
                    <a href="/terms.pdf"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="link">
                      {{ $t('home.terms') }}
                    </a>
                  </li>
                </ul>
              </b-col>
              <b-col cols="12" lg="" class="d-flex align-items-center">
                <div class="w-100 mt-3" v-if="!isUserLoggedIn">
                  <b-button :to="{ name: 'Sign in' }" :variant="'outline-warning'" class="mr-3" block>
                    {{ $t('common.signIn') }}
                  </b-button>
                  <b-button :to="{ name: 'Sign up' }" :variant="'warning'" block>
                    {{ $t('common.signUp') }}
                  </b-button>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col order="2"
               order-xl="3"
               xl="3"
               class="footer__desc">
          <div class="footer__cell">
            <p>
              {{ $t('home.everstakeHelpsP1') }}
            </p>
            <p>
              {{ $t('home.everstakeHelpsP2') }}
            </p>
            <p class="mb-0">
              {{ $t('home.everstakeHelpsP3') }}
            </p>
          </div>
        </b-col>
        <b-col order="4"
               order-xl="4"
               xl="9"
        >
          <div class="footer__cell">
            <b-row no-gutters>
              <b-col order="1" order-md="1" sm="6" md="" xl="">
                <ul class="footer__ul">
                  <li class="footer__li"
                      v-for="(navObj, index) in footerNav"
                      :key="index">
                    <a href="#"
                       v-scroll-to="navObj.link"
                       rel="noopener noreferrer"
                       class="link"
                       :target="navObj.target">
                      {{ navObj.name }}
                    </a>
                  </li>
                  <li class="footer__li">
                    <router-link :to="{ name: 'Balance' }" class="link">
                      {{ $t('home.dashboard') }}
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'Staking' }" class="link">
                      {{ $t('common.whatIsStaking') }}
                    </router-link>
                  </li>
                </ul>
              </b-col>
              <b-col order="3" order-md="2" sm="6" md="" xl="">
                <ul class="footer__ul">
                  <li class="footer__li">
                    <router-link :to="{ name: 'Blog' }" class="link">
                      {{ $t('common.blog') }}
                    </router-link>
                  </li>
                  <li class="footer__li">
                    <router-link :to="{ name: 'Learning center' }" class="link">
                      {{ $t('common.learningCenter') }}
                    </router-link>
                  </li>
                  <li class="footer__li">
                    <a class="link"
                       href="https://calendly.com/everstake"
                       rel="noopener noreferrer"
                       target="_blank">
                      {{ $t('common.scheduleCall') }}
                    </a>
                  </li>
                  <li class="footer__li">
                    <router-link class="link"
                                 :to="{ name: 'Tezos' }">
                      Tezos
                    </router-link>
                  </li>
                  <li class="footer__li">
                    <router-link class="link"
                                 :to="{ name: 'ICON' }">
                      ICON
                    </router-link>
                  </li>
                </ul>
              </b-col>
              <b-col order="2" order-md="3" sm="6" md="" xl="">
                <ul class="footer__ul">
                  <li class="footer__li">
                    <router-link class="link"
                                 :to="{ name: 'Cosmos' }">
                      Cosmos
                    </router-link>
                  </li>
<!--                  <li class="footer__li">-->
<!--                    <router-link class="link"-->
<!--                                 :to="{ name: 'IRISnet' }">-->
<!--                      IRISnet-->
<!--                    </router-link>-->
<!--                  </li>-->
<!--                  <li class="footer__li">-->
<!--                    <router-link class="link"-->
<!--                                 :to="{ name: 'Dash' }">-->
<!--                      Dash-->
<!--                    </router-link>-->
<!--                  </li>-->
                  <li class="footer__li">
                    <router-link class="link"
                                 :to="{ name: 'Eos' }">
                      EOS
                    </router-link>
                  </li>
<!--                  <li class="footer__li">-->
<!--                    <router-link class="link"-->
<!--                                 :to="{ name: 'IOST' }">-->
<!--                      IOST-->
<!--                    </router-link>-->
<!--                  </li>-->
<!--                  <li>-->
<!--                    <router-link class="link"-->
<!--                                 :to="{ name: 'Decred' }">-->
<!--                      Decred-->
<!--                    </router-link>-->
<!--                  </li>-->
                </ul>
              </b-col>
              <b-col order="4" order-md="4" sm="6" md="" xl="">
                <ul class="footer__ul">
<!--                  <li>-->
<!--                    <router-link class="link"-->
<!--                                 :to="{ name: 'Decred' }">-->
<!--                      Decred-->
<!--                    </router-link>-->
<!--                  </li>-->
<!--                  <li class="footer__li">-->
<!--                    <router-link class="link"-->
<!--                                 :to="{ name: 'ARK' }">-->
<!--                      ARK-->
<!--                    </router-link>-->
<!--                  </li>-->
                  <li class="footer__li">
                    <router-link class="link"
                                 :to="{ name: 'IoTeX' }">
                      IoTeX
                    </router-link>
                  </li>
<!--                  <li class="footer__li">-->
<!--                    <router-link class="link"-->
<!--                                 :to="{ name: 'Algorand' }">-->
<!--                      Algorand-->
<!--                    </router-link>-->
<!--                  </li>-->
<!--                  <li class="footer__li">-->
<!--                    <router-link class="link"-->
<!--                                 :to="{ name: 'Harmony' }">-->
<!--                      Harmony-->
<!--                    </router-link>-->
<!--                  </li>-->
                  <!-- <li>
                    <router-link class="link"
                                 :to="{ name: 'Analytics' }">
                      {{ $t('common.analytics') }}
                    </router-link>
                  </li> -->
                </ul>
              </b-col>
              <b-col order="5" order-md="5" cols="12" xl="">
                <ul class="footer__ul align-self-start mt-4 mt-xl-0 footer__copyright">
                  <li>(c) Everstake.{{ currentYear }}</li>
                </ul>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Footer',
  data() {
    return {
      footerNav: [
        {
          link: '#about',
          name: this.$t('home.aboutUs'),
        },
        {
          link: '#coins',
          name: this.$t('home.coins'),
        },
        {
          link: '#team',
          name: this.$t('home.team'),
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped>
  .footer {
    background: $black;
    border: $border-yellow--2px;
    margin-top: 114px;

    &__top-row {
      border-bottom: $border-yellow--2px;
    }

    &__left-col {
      border-right: $border-yellow--2px;
    }

    &__cell {
      padding: 30px 0;
    }

    &__ul {
      font-family: 'Space Mono', monospace;
      padding: 0;
      list-style-type: none;
      margin-bottom: 0;
    }

    &__li {
      margin-bottom: 10px;
    }

    &__logo, &__socials {
      border-bottom: $border-yellow--2px;
    }

    &__logo, &__desc {
      border-right: $border-yellow--2px;
    }
  }

  .logo {
    &__img {
      width: 270px;
    }
  }

  @media (max-width: 1199px) {
    .footer {
      margin-top: 52px;

      &__desc {
        border-bottom: $border-yellow--2px;
      }

      &__logo, &__desc {
        border-right: none;
      }
    }
  }

  @media (max-width: 767px) {
    .footer {
      &__ul {
        margin-bottom: 10px;
      }

      &__copyright {
        margin-bottom: 0;
      }
    }
  }

  @media (max-width: 575px) {
    .logo {
      &__img {
        width: 100%;
        max-width: 250px;
      }
    }
  }
</style>
