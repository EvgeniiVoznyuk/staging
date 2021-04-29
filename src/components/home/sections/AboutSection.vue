<template>
  <section class="about">
    <div class="crosses d-block d-lg-none"></div>

    <div class="about__choose">
      <b-container class="container--custom">
        <h2 class="title title--white">
          {{ $t('home.whyChooseUs') }}
        </h2>

        <b-row class="d-none d-md-flex">
          <b-col md="8" lg="6" xl="5">
            <ol class="reasons">
              <li v-for="(reason, index) in reasonsSet"
                  :key="index"
                  @click="selectReason(reason)"
                  :class="{'reasons__item': true,
                           'reasons__item--active': selectedReason === reason}">
                {{ `0${index + 1}.`}}
                {{ reason.title }}
              </li>
            </ol>
          </b-col>
          <b-col>
            <div class="reason-desc">
              <p class="paragraph" v-if="isReasonShown">
                  {{ selectedReason.description }}
              </p>
            </div>
          </b-col>
        </b-row>

        <div class="reasons-accordion d-block d-md-none">
          <div>
            <b-button block
                      href="#"
                      v-b-toggle.reason-1
                      class="reasons-accordion__btn">
              {{ `01. ${reasonsSet[0].title}` }}
            </b-button>
            <b-collapse id="reason-1"
                        visible
                        accordion="reasons-accordion"
                        role="tabpanel"
                        class="reasons-accordion__collapse">
              <p class="paragraph">{{ reasonsSet[0].description }}</p>
            </b-collapse>
          </div>
          <div>
            <b-button block
                      href="#"
                      v-b-toggle.reason-2
                      class="reasons-accordion__btn">
              {{ `02.  ${reasonsSet[1].title}` }}
            </b-button>
            <b-collapse id="reason-2"
                        accordion="reasons-accordion"
                        role="tabpanel"
                        class="reasons-accordion__collapse">
              <p class="paragraph">{{ reasonsSet[1].description }}</p>
            </b-collapse>
          </div>
          <div>
            <b-button block
                      href="#"
                      v-b-toggle.reason-3
                      class="reasons-accordion__btn">
              {{ `03. ${reasonsSet[2].title}` }}
            </b-button>
            <b-collapse id="reason-3"
                        accordion="reasons-accordion"
                        role="tabpanel"
                        class="reasons-accordion__collapse">
              <p class="paragraph">{{ reasonsSet[2].description }}</p>
            </b-collapse>
          </div>
          <div>
            <b-button block
                      href="#"
                      v-b-toggle.reason-4
                      class="reasons-accordion__btn">
              {{ `04. ${reasonsSet[3].title}`}}
            </b-button>
            <b-collapse id="reason-4"
                        accordion="reasons-accordion"
                        role="tabpanel"
                        class="reasons-accordion__collapse">
              <p class="paragraph">{{ reasonsSet[3].description }}</p>
            </b-collapse>
          </div>
          <div>
            <b-button block
                      href="#"
                      v-b-toggle.reason-5
                      class="reasons-accordion__btn">
              {{ `05. ${reasonsSet[4].title}` }}
            </b-button>
            <b-collapse id="reason-5"
                        accordion="reasons-accordion"
                        role="tabpanel"
                        class="reasons-accordion__collapse">
              <p class="paragraph">{{ reasonsSet[4].description }}</p>
            </b-collapse>
          </div>
        </div>
      </b-container>
    </div>

    <div class="about__us" id="about">
      <b-container class="container--custom">
        <b-row>
          <b-col md="8" lg="6" xl="5">
            <div class="about__us-txt">
              <h2 class="title title--white about__title">
                {{ $t('home.aboutUs') }}
              </h2>

              <p class="paragraph mb-3 mb-md-5">
                {{ $t('home.everstakeIsATeam') }}
              </p>
              <p class="paragraph mb-0">
                {{ $t('home.weRunHighlySecure') }}
              </p>
            </div>
          </b-col>
          <b-col md="4" xl="7" class="d-none d-lg-flex align-items-center justify-content-center">
            <img src="~@/assets/img/logo-white.svg"
                 alt="Everstake"
                 class="about__everstake-img">
          </b-col>
        </b-row>
      </b-container>
    </div>

    <TeamSection></TeamSection>
  </section>
</template>

<script>
import TeamSection from '@/components/home/sections/TeamSection.vue';

export default {
  name: 'AboutSection',
  components: {
    TeamSection,
  },
  data() {
    return {
      reasonsSet: [
        {
          title: this.$t('home.reasons.one.title'),
          description: this.$t('home.reasons.one.description'),
          alias: 'gear',
        },
        {
          title: this.$t('home.reasons.two.title'),
          description: this.$t('home.reasons.two.description'),
          alias: 'trackRecord',
        },
        {
          title: this.$t('home.reasons.three.title'),
          description: this.$t('home.reasons.three.description'),
          alias: 'payouts',
        },
        {
          title: this.$t('home.reasons.four.title'),
          description: this.$t('home.reasons.four.description'),
          alias: 'transparency',
        },
        {
          title: this.$t('home.reasons.five.title'),
          description: this.$t('home.reasons.five.description'),
          alias: 'support',
        },
      ],
      selectedReason: null,
      isReasonShown: true,
    };
  },
  methods: {
    selectReason(reason) {
      this.selectedReason = reason;
    },
  },
  created() {
    this.selectReason(this.reasonsSet[0]);
  },
};
</script>

<style lang="scss" scoped>
  .about {
    background: url('~@/assets/img/backgrounds/bg-team.png') top center;
    background-repeat: no-repeat;
    padding: 108px 0 130px;
    overflow: hidden;
    position: relative;

    &__title {
      margin-bottom: 90px;
    }

    &__us {
      padding-top: 126px;
      padding-bottom: 120px;
      position: relative;
    }

    &__us-txt {
      position: relative;
      /*z-index: 2;*/
    }

    &__everstake-img {
      margin-top: 50px;
      width: 480px;
    }
  }

  .reasons {
    color: $white;
    font-size: 26px;
    font-weight: 700;
    list-style: none;
    padding: 0;

    &__item {
      cursor: pointer;
      padding: 20px;
      transition: all 0.2s;

      &:hover, &--active {
        background-color: $black--2;
        color: $yellow;
      }
    }
  }

  .reason-desc {
    margin-top: 55px;
    margin-left: auto;
    max-width: 410px;
  }

  .reasons-accordion {
    &__btn {
      background-color: transparent;
      border: none;
      font-family: 'Roboto Mono', monospace;
      font-size: 18px;
      font-weight: 700;
      text-align: left;
      padding-top: 14px;
      padding-bottom: 14px;

      &:hover,
      &:active,
      &:not(:disabled):not(.disabled):active,
      &:focus,
      &[aria-expanded="true"] {
        background-color: $black--2;
        border: none;
        outline: none;
        box-shadow: none;
        color: $yellow;
      }
    }
    &__collapse {
      padding: 0 .75rem;
    }
  }

  .crosses {
    background-image: url('~@/assets/img/backgrounds/plus-pattern.svg');
    background-repeat: repeat;
    height: 1000px;
    width: 80px;
    position: absolute;
    right: 0;
    top: 300px;
  }

  @media (max-width: 1199px) {
    .about {
      padding: 106px 0 42px;
      overflow: hidden;

      &__title {
        margin-bottom: 46px;
      }
    }
  }

  @media (max-width: 991px) {
    .about {
      &__img {
        display: none;
      }
    }
  }

  @media (max-width: 767px) {
    .about {
      padding: 50px 0;

      &__title {
        margin-bottom: 22px;
      }

      &__us {
        padding: 48px 0;
      }
    }
  }
</style>
