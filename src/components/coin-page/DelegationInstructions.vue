<template>
  <b-card no-body>
   <template v-slot:header>
    <h2 class="title title--small title--white mb-0">
      {{ isVoting ? $t('common.votingByStep') : $t('common.delegationByStep') }}
    </h2>
  </template>

    <PerfectScrollbar class="scroll-area p-0" :settings="scrollbarSettings">
      <b-card-body>
        <div>
          <slot name="instructions"></slot>
        </div>
      </b-card-body>
    </PerfectScrollbar>
  </b-card>
</template>

<script>
export default {
  name: 'DelegationInstructions',
  props: {
    isVoting: {
      type: Boolean,
    },
  },
  data() {
    return {
      scrollbarSettings: {
        wheelPropagation: true,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
  .scroll-area {
    max-height: 684px;
    padding: 1.25rem 0;
  }
</style>
