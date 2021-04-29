<template>
  <div class="member">
    <div class="member__photo"
         :style="{ 'background-image': `url(${photo})`}">
    </div>

    <div class="member__description">
      <div class="member__header">
        <div class="member__name">
          <slot name="name"></slot>
        </div>

        <div class="member__position">
          <slot name="position"></slot>
        </div>
      </div>

        <div class="member__vitae">
          <PerfectScrollbar class="scroll-area">
          <slot name="vitae"></slot>
          </PerfectScrollbar>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamMember',
  props: {
    photo: String,
  },
  data() {
    return {
      scrollbarSettings: {
        wheelPropagation: true,
        wheelSpeed: 0.5,
      },
    };
  },
};
</script>

<style lang="scss" scoped>

  .scroll-area {
    max-height: 312px;
    padding: 20px;
  }

  .member {
    border-radius: 6px;
    position: relative;
    backface-visibility: hidden;

    &__photo {
      background-position: top center;
      background-size: cover;
      height: 316px;
      margin-bottom: 20px;
    }

    &__img {
      width: 100%;
    }

    &__header {
      background-color: $yellow;
      color: $black;
      font-family: 'Space Mono', monospace;
      font-weight: 700;
      padding: 20px;
    }

    &__description {
      border: $border-yellow--2px;
      transition: all 0.5s;
    }

    &__position {
      font-size: 23px;
      line-height: 26px;
    }

    &__name {
      font-size: 30px;
      line-height: 32px;
      margin-bottom: 10px;
    }

    &__vitae {
      color: $white;
      font-size: 18px;
      font-weight: 300;
      line-height: 26px;
      min-height: 312px;
    }
  }

  @media (max-width: 1199px) {
    .member {
      &__position {
        font-size: 16px;
        line-height: 21px;
      }

      &__name {
        font-size: 18px;
        line-height: 21px;
      }

      &__description {

        &--expanded {
          height: 100%;
        }
      }

      &__vitae {
        font-size: 14px;
      }
    }
  }

  @media (max-width: 521px) {
    .member__vitae {
      min-height: 196px;
    }
  }
</style>
