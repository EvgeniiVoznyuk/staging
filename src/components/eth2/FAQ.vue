<template>
  <div class="collapses">
    <b-card
      v-for="(faqItem, indexItem) in faqItems"
      :key="indexItem"
      no-body
      class="mb-2"
    >
      <b-card-header
        header-tag="header"
        class="border-bottom-0 p-0"
        role="tab"
      >
        <h3 class="title title--small title--white mb-0">
          <button class="btn--accordion"
                  block
                  href="#"
                  v-b-toggle="`${indexItem}`"
          >
            {{ faqItem.question }}
          </button>
        </h3>
      </b-card-header>
      <b-collapse
        :id="`${indexItem}`"
        accordion="my-accordion"
        role="tabpanel"
        appear
      >
        <div class="collapse--inner">
          <p
            v-for="(answer, indexAnswer) in faqItem.answer"
            :key="indexAnswer"
            :class="{'mb-0': indexAnswer === faqItem.answer.length - 1 }"
          >
            <slot
              :name="`question-${indexItem}-answer-${indexAnswer}`"
              :answer="answer"
            >
              {{ answer }}
            </slot>
          </p>
        </div>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'FAQ',
  props: {
    faqItems: {
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
    /*color: $yellow;*/
    color: $white;
  }

  .collapse--inner {
    padding: 12px 1.25em;
    border-top: $border-yellow--2px;
  }
</style>
