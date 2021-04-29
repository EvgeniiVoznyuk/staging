<template>
  <div class="coin">
    <div class="coin__icon">
      <slot name="icon"></slot>
    </div>
    <h5 :class="{ 'coin__name': true,
                  'coin__name--disabled': noCoin,
                  'coin__name--dev': underDev}">
      <slot name="name"></slot>
    </h5>
    <div class="coin__percent">
      <slot name="percent"></slot>
    </div>
    <p :class="{ coin__description: true,
                 'mb-0': noLink}">
      <slot name="description"></slot>
    </p>
    <slot name="routerLink"></slot>
  </div>
</template>

<script>
export default {
  name: 'CoinPresentation',
  props: {
    noLink: Boolean,
    noImg: Boolean,
    noCoin: Boolean,
    underDev: Boolean,
  },
};
</script>

<style lang="scss" scoped>
  .coin {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;

    &__icon {
      width: 144px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__name {
      color: $black;
      font-family: 'Space Mono', monospace;
      font-size: 30px;
      font-weight: 700;
      text-align: center;
      transition: all 0.2s;

      &--dev {
        color: $grey;
        font-size: 20px;
      }
    }

    &__percent {
      color: $black;
      font-family: 'Roboto Mono', monospace;
      font-size: 16px;
      line-height: 22px;
    }

    &__description {
      color: $grey;
      transition: all 0.2s;
    }
  }

  @media (max-width: 1199px) {
    .coin {
      &__icon {
        & > img {
          transform: scale(0.75);
        }
      }

      &__description {
        font-size: 14px;
      }
    }
  }

  @media (max-width: 575px) {
    .coin {
      &__name {
        font-size: 30px;

        &--dev {
          font-size: 20px;
        }
      }

      &__description {
        min-height: auto;
        margin-bottom: 22px;
      }
    }
  }
</style>
