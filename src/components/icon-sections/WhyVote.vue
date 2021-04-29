<template>
  <section
    class="why-vote mb-5"
  >
    <div class="why-vote__top">
      <h2 class="title title--lap mb-2">
        {{ $t('icx.whyVote') }}
      </h2>
      <p class="paragraph paragraph--black paragraph--lap mb-0">
        {{ $t('icx.everstakeStrives') }}
      </p>
    </div>

    <b-container class="container--custom-large">
      <b-row>
        <b-col xl="6" class="why-vote__col">
          <div class="why-vote__item">
            <h3 class="title title--medium">
              1. {{ $t('icx.development') }}
            </h3>
            <p class="paragraph paragraph--black paragraph--lap">
              {{ $t('icx.whyVoteDevelopmentP') }}
            </p>

<!--            href="#development"-->
            <b-btn
              tag="a"
              v-scroll-to="'#development'"
              class="btn--black"
              size="large"
            >
              {{ $t('icx.learnMore') }}
            </b-btn>
          </div>
        </b-col>

        <b-col xl="6" class="why-vote__col">
          <div class="why-vote__item">
            <h3 class="title title--medium">
              2. {{ $t('icx.devOperations') }}
            </h3>
            <p class="paragraph paragraph--black paragraph--lap">
              {{ $t('icx.whyVoteDevOpsP') }}
            </p>

<!--            href="#devOps"-->
            <b-btn
              tag="a"
              v-scroll-to="'#devOps'"
              class="btn--black"
              size="large"
            >
              {{ $t('icx.learnMore') }}
            </b-btn>
          </div>
        </b-col>

        <b-col xl="6" class="why-vote__col">
          <div class="why-vote__item">
            <h3 class="title title--medium">
              3. {{ $t('icx.communityGrowth') }}
            </h3>
            <p class="paragraph paragraph--black paragraph--lap">
              {{ $t('icx.whyVoteCommunityGrowthP') }}
            </p>

<!--            href="#community"-->
            <b-btn
              tag="a"
              v-scroll-to="'#community'"
              class="btn--black"
              size="large"
            >
              {{ $t('icx.learnMore') }}
            </b-btn>
          </div>
        </b-col>

        <b-col xl="6">
          <div class="why-vote__item">
            <h3 class="title title--medium">
              4. {{ $t('icx.educationMaterials') }}
            </h3>
            <p class="paragraph paragraph--black paragraph--lap">
              {{ $t('icx.whyVoteEducationMaterialsP') }}
            </p>

<!--            href="#educationalMaterials"-->
            <b-btn
              tag="a"
              v-scroll-to="'#educationalMaterials'"
              class="btn--black"
              size="large"
            >
              {{ $t('icx.learnMore') }}
            </b-btn>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  name: 'WhyVote',
};
</script>

<style lang="scss" scoped>
  .why-vote {
    background-color: $yellow;
    padding: 50px 30px;

    &__top {
      text-align: center;
      margin-bottom: 94px;
    }

    &__col {
      margin-bottom: 100px;
    }

    &__item {
      max-width: 614px;
    }
  }

  @media (max-width: 1440px) {
    .why-vote {
      &__top {
        margin-bottom: 60px;
      }
    
      &__col {
        margin-bottom: 60px;
      }
    }
  }
  
  @media (max-width: 1199px) {
    .why-vote {
      &__top {
        margin-bottom: 40px;
      }

      &__col {
        margin-bottom: 30px;
      }
    }
  }

  @media (max-width: 575px) {
    .why-vote {
      padding: 20px 10px;
    }
  }
</style>
