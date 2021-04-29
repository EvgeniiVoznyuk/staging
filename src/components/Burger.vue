<template>
  <button :class="{ burger: true,
                    'burger--black': variant === 'black' }">
    <span class="burger__line"></span>
    <span class="burger__line"></span>
    <span class="burger__line"></span>
  </button>
</template>

<script>
export default {
  name: 'Burger',
  props: {
    variant: {
      type: String,
    },
  },
  onClick: {
    type: Function,
  },
};
</script>

<style lang="scss" scoped>
  .burger {
    background: none;
    border: none;
    cursor: pointer;
    width: 20px;
    height: 16px;
    padding: 0;
    align-self: center;
    margin-top: 7px;

    &__line {
      display: block;
      background: $white;
      border-radius: 6px;
      height: 3px;
      width: 100%;
      margin-bottom: 3px;
      transition: all 0.2s;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &:focus {
      outline: none;
    }

    &:hover {
      .burger__line {
        background: $yellow;
      }
    }

    &--black {
      .burger__line {
        background: $black;
      }
    }
  }

  @media (max-width: 575px) {
    .burger {
      max-height: 22px;
      max-width: 27px;

      &__line {
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
