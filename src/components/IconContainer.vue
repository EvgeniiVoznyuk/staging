<template>
  <div
    class="icon-container"
    :style="{
      width: size,
      height: size
    }"
  >
    <i
      :class="{
        [icon]: true,
        icon: true
      }"
      :style="{
        'font-size': iconFs
      }"
    >
    </i>
  </div>
</template>

<script>
export default {
  name: 'IconContainer',
  props: {
    icon: {
      type: String,
      default: 'ev-logo',
    },
    iconFs: {
      type: String,
      default: '66px',
    },
    size: {
      type: String,
      default: '136px',
    },
  },
};
</script>

<style lang="scss" scoped>
  .icon-container {
    background-color: $yellow;
    border: 16px solid $yellow--dark;
    border-radius: 50%;
    color: $black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .icon {
    line-height: 0;
  }
</style>
