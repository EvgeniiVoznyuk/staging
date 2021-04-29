<template>
  <section class="call-to-action">
    <b-container class="container--custom">
      <slot name="title" :text="title">
        <h2 class="title">{{ title }}</h2>
      </slot>
      <slot name="paragraph" :text="text">
        <p class="fs-18 call-to-action__p">{{ text }}</p>
      </slot>
      <slot name="button"></slot>
    </b-container>
  </section>
</template>

<script>
export default {
  name: 'CallToActionSection',
  props: {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
  .call-to-action {
    background: $yellow;
    color: $black;
    text-align: center;
    padding: 40px 0;

    &__p {
      max-width: 580px;
      margin: 0 auto 50px;
    }
  }

  @media (max-width: 575px) {
    .call-to-action {
      padding: 30px 0;

      &__p {
        font-size: 14px;
        margin-bottom: 20px;
      }
    }
  }
</style>
