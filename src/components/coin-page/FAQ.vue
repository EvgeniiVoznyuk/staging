<template>
  <div class="collapses">
    <b-card no-body class="mb-2">
      <b-card-header header-tag="header" class="border-bottom-0 p-0" role="tab">
        <h3 class="title title--small title--white mb-0">
          <button class="btn--accordion"
                  block
                  href="#"
                  v-b-toggle.accordion1>
            {{ accordionOneTitle }}
          </button>
        </h3>
      </b-card-header>
      <b-collapse  id="accordion1" accordion="my-accordion" role="tabpanel">
        <div class="collapse--inner">
          <p class="mb-0">
            {{ accordionOneTxt }}
          </p>
        </div>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-2">
      <b-card-header header-tag="header" class="border-bottom-0 p-0" role="tab">
        <h3 class="titile--small mb-0">
          <button class="btn--accordion"
                  block
                  href="#"
                  v-b-toggle.accordion2>
            {{ accordionTwoTitle }}
          </button>
        </h3>
      </b-card-header>
      <b-collapse  id="accordion2" accordion="my-accordion" role="tabpanel">
        <div class="collapse--inner">
          <p class="mb-0">
            <slot name="accordionTwoCustomTxt">
              {{ accordionTwoTxt }}
            </slot>
            <slot name="botLink"></slot>
          </p>
        </div>
      </b-collapse>
    </b-card>

    <b-card no-body v-if="accordionThreeTitle && accordionThreeTxt">
      <b-card-header header-tag="header" class="border-bottom-0 p-0" role="tab">
        <h3 class="title title--small title--white mb-0">
        <button class="btn--accordion"
                block
                href="#"
                v-b-toggle.accordion3>
          {{ accordionThreeTitle }}
        </button>
        </h3>
      </b-card-header>
      <b-collapse  id="accordion3" accordion="my-accordion" role="tabpanel">
        <div class="collapse--inner">
          <p class="mb-0">
            {{ accordionThreeTxt }}
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
    accordionOneTitle: {
      type: String,
    },
    accordionOneTxt: {
      type: String,
    },
    accordionTwoTitle: {
      type: String,
    },
    accordionTwoTxt: {
      type: String,
    },
    accordionThreeTitle: {
      type: String,
    },
    accordionThreeTxt: {
      type: String,
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
