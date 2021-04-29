<template>
  <div class="stats-card">
    <div class="stats-card__sum">
      <slot name="sum"></slot>
    </div>
    <h6 class="stats-card__name">
      <slot name="title"></slot>
    </h6>
  </div>
</template>

<script>

export default {
  name: 'StatsCard',
};
</script>

<style lang="scss" scoped>
  .stats-card {
    display: flex;
    flex-direction: column;
    font-weight: 700;

    &__sum {
      font-size: 30px;
      color: $black;
    }

    &__name {
      color: $black;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 0;
    }
  }

  @media (max-width: 1199px) {
    .stats-card {
      &__sum, &__name  {
        font-size: 20px;
      }
    }
  }

  @media (max-width: 575px) {
    .stats-card {
      &__sum, &__name {
        font-size: 18px;
      }
    }
  }
</style>
