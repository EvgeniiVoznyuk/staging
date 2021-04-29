<template>
  <section class="top">
    <Header></Header>

    <b-container class="container--custom">
      <b-row>
        <b-col md="9" xl="8">
          <div class="intro">
            <div class="intro__header">
              <h2 class="title title--white mb-0">
                {{ $t('home.stakingService') }}
              </h2>
            </div>

            <div class="intro__body">
              <p class="paragraph top__p">
                {{ $t('home.everstakeHelpsP1') }}
              </p>

              <p class="paragraph top__p">
                {{ $t('home.everstakeHelpsP2') }}
              </p>

              <p class="paragraph top__p">
                {{ $t('home.everstakeHelpsP3') }}
              </p>

              <b-button href="#"
                        v-scroll-to="'#coins'"
                        class="top__btn mt-4 mt-xl-5"
                        :variant="'warning'">
                {{ $t('home.stakeNow') }}
              </b-button>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <div class="mouse">
      <img src="~@/assets/img/scroll.svg" alt="Mouse">
    </div>
  </section>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'TopSection',
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>
  .top {
    background: url('~@/assets/img/backgrounds/bg-top.png') top center / cover,
                $black;
    height: 100vh;
    min-height: 750px;
    position: relative;
    overflow: hidden;

    &__p {
      max-width: 680px;
    }

    &__btn {
      width: 148px;
    }
  }

  .intro {
    background-color: $black;
    border: $border-yellow--2px;
    margin-top: 15vh;

    &__header {
      border-bottom: $border-yellow--2px;
      padding: 19px 28px;
    }

    &__body {
      padding: 28px 28px 60px 28px;
    }
  }

  .mouse {
    position: absolute;
    transform: translateX(-50%);
    right: calc(50% - 29px);
    bottom: 20px;
    animation: mouse 1.5s infinite;

    img {
      max-width: 25px;
    }
  }

  @keyframes mouse {
    from {
      opacity: 1;
      bottom: 20px;
    }
    to {
      opacity: 0;
      bottom: 10px;
    }
  }

  @media (max-width: 1199px) {
    .top {
      min-height: 650px;
    }

    .intro {
      margin-top: 10vh;

      &__body {
        padding: 28px;
      }
    }
  }

  @media (max-width: 991px) {
    .top {
      height: auto;
      padding-bottom: 36px;
    }

    .intro {
      margin-top: 36px;
    }

    .mouse {
      display: none;
    }
  }

  @media (max-width: 767px) {
    .top {
      background: url('~@/assets/img/backgrounds/bg-top-mobile.svg') 139% 107% no-repeat / 60%,
      $black;
    }
  }

  @media (max-width: 575px) {
    .top {
      min-height: 516px;
    }

    .intro {
      &__header, &__body {
        padding: 18px 10px;
      }
    }
  }
</style>
