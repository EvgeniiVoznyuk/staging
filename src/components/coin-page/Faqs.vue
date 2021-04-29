<template>
  <div class="collapses faqs">
    <b-card v-for="(item, index) in faq" :key="item.question" no-body class="mb-2">
      <b-card-header header-tag="header" class="border-bottom-0 p-0" role="tab">
        <h3 class="title title--small title--white mb-0">
          <button class="btn--accordion"
            block
            href="#"
            v-b-toggle="`accordion${index}`"
            v-html="item.question"
          />
        </h3>
      </b-card-header>
      <b-collapse
        :id="`accordion${index}`"
        accordion="my-accordion"
        role="tabpanel"
      >
        <div class="collapse--inner">
          <p class="mb-0" v-html="item.answer" />
        </div>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Faqs',
  props: {
    faq: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.btn--accordion {
  width: 100%;
  padding: 12px 1.25em;
  background: transparent;
  border: 0;
  font-size: 18px;
  text-align: left;
  color: $yellow;
}

.collapse--inner {
  padding: 12px 1.25em;
  border-top: $border-yellow--2px;
}
</style>

<style lang="scss">
.faqs img {
  max-width: 100%;
  height: auto;
}
</style>
