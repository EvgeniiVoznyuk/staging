<template>
  <div :class="{ 'learning-center': true,
                 'overflow-hidden': isMobileSidebarShown }"
       data-view>
    <div class="learning-center__content">
      <Header :isInternal="true"></Header>
      <transition name="slide">
        <div class="learning-center__sidebar learning-center__sidebar--mobile d-xl-none"
             v-click-outside="closeMobileSidebar"
             v-if="isMobileSidebarShown">
          <button class="close"
                  @click="closeMobileSidebar">
            <i class="fa fa-close"></i>
          </button>
          <PerfectScrollbar class="scroll-area scroll-area--mobile" :settings="scrollbarSettings">
            <ul class="lc-sidebar">
              <li v-for="(article, index) in articles"
                  :key="index"
                  class="lc-sidebar__li">
                <router-link :to="`/learn-about-staking-wiki/${article.slug}`"
                             class="lc-sidebar__link"
                             @click.native="toggleMobileSidebar()">
                  {{ (`0${index + 1}.`) }} {{ article.title }}
                </router-link>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </transition>

      <b-container :class="{ 'container--custom': true,
                             'overlay': isMobileSidebarShown}">
        <main class="learning-center__main">
          <router-view>

          </router-view>
          <Burger :variant="'black'"
                  ref="burger"
                  @click.native="toggleMobileSidebar"
                  class="d-xl-none learning-center__sidebar-toggler"></Burger>

          <h1 class="title learning-center__title">
            {{ $t('common.everstakeLearningCenter') }}
          </h1>
          <div class="learning-center__main-content">
            <aside class="learning-center__sidebar d-none d-xl-block">
              <PerfectScrollbar class="scroll-area" :settings="scrollbarSettings">
                <ul class="lc-sidebar">
                  <li v-for="(article, index) in articles"
                      :key="index"
                      class="lc-sidebar__li">
                    <router-link :to="`/learn-about-staking-wiki/${article.slug}`"
                                 class="lc-sidebar__link">
                      {{ (`0${index + 1}.`) }} {{ article.title }}
                    </router-link>
                  </li>
                </ul>
              </PerfectScrollbar>
            </aside>
            <section class="learning-center__article">
              <h1 class="title fs-30">
                {{ currentArticle.title }}
              </h1>
              <div v-for="(section, index) in currentArticle.sections"
                   :key="index"
                   class="learning-center__article-section">
                <h2 class="title fs-18">
                  {{ section.subtitle }}
                </h2>
                <p v-for="(paragraph, indexP) in  section.paragraphs"
                   :key="indexP"
                   class="paragraph paragraph--black mb-5 fs-18"
                   v-html="paragraph">
                </p>
                <div v-if="index !== currentArticle.sections.length - 1"
                     class="crosses">
                  <span>+</span>
                  <span>+</span>
                  <span>+</span>
                  <span>+</span>
                  <span>+</span>
                </div>
              </div>
            </section>
          </div>
        </main>
      </b-container>
    </div>
    <Footer class="mt-0"></Footer>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Burger from '@/components/Burger.vue';
import articles from '@/constants/learningCenterArticles';

export default {
  name: 'LearningCenter',
  components: {
    Header,
    Footer,
    Burger,
  },
  data() {
    return {
      articles,
      currentSlug: '',
      isMobileSidebarShown: false,
      scrollbarSettings: {
        wheelPropagation: true,
      },
    };
  },
  computed: {
    currentArticle() {
      return this.articles.filter(article => article.slug === this.currentSlug)[0];
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        this.currentSlug = this.$route.params.slug;
      },
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    toggleMobileSidebar() {
      this.isMobileSidebarShown = !this.isMobileSidebarShown;
    },
    closeMobileSidebar() {
      this.isMobileSidebarShown = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .slide-enter-active, .slide-leave-active {
    transition: all .5s;
    transform: translateX(0);
  }
  .slide-enter, .slide-leave-to {
    transform: translateX(-500px);
  }

  .overflow-hidden {
    overflow: hidden;
  }

  .learning-center {
    display: flex;
    /*min-height: 100px;*/
    height: 100vh;
    flex-direction: column;

    &__content {
      background-color: $white;
      flex: 1 0 auto;
      position: relative;
    }

    &__main {
      padding: 80px 0 54px 0;
      position: relative;
    }

    &__main-content {
        display: flex;
        position: relative;
    }

    &__sidebar {
      background-color: $white;
      border: $border-yellow--2px;
      /*padding: 20px;*/
      max-width: 400px;
      width: 100%;
      /*height: 100%;*/
      max-height: 1300px;

      &--mobile {
        border-top: 0;
        position: absolute;
        left: 0;
        z-index: 2;
        /*max-width: 100%;*/
      }
    }

    &__article {
      color: $black;
      padding: 20px 0 0 50px;
      max-width: 820px;
      word-break: break-word;
    }

    &__sidebar-toggler {
      position: absolute;
      top: 28px;
      left: 0;
    }
  }

  .close {
    position: absolute;
    right: 15px;
    top: 10px;
    z-index: 3;
  }

  .scroll-area {
    max-height: 1300px;
    padding: 20px 20px 0 20px;

    &--mobile {
      padding-top: 40px;
      max-height: calc(100vh - 58px);
    }
  }

  .lc-sidebar {
    list-style-type: none;
    padding: 0;
    margin-bottom: 0;

    &__link {
      font-size: 21px;
      font-weight: 700;
      color: $black;

      &:hover, &:focus, &:active, &.router-link-exact-active {
        color: $yellow;
      }
    }

    &__li {
      margin-bottom: 40px;
    }
  }

  .crosses {
    margin: 28px auto 52px;
    color: $yellow;
    font-size: 25px;
    width: 256px;
    display: flex;
    justify-content: space-between;
  }

  .overlay {
    opacity: 0.2;
  }

  .container--custom {
    transition: all 0.5s;
  }

  @media (max-widtH: 1199px) {
    .learning-center {
      &__main {
        display: block;
      }

      &__article {
        padding: 0;
        max-width: 100%;
      }

      .lc-sidebar {
        &__li {
          margin-bottom: 18px;
        }

        &__link {
          font-size: 18px;
        }
      }

      &__sidebar--mobile {
        max-width: 300px;
      }
    }
  }

  @media (max-width: 575px) {
    .crosses {
      font-size: 20px;
      width: 180px;
    }

    .learning-center__title {
      font-size: 40px;
    }
  }
</style>
