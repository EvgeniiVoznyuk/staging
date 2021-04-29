<template>
  <b-card>
    <template #header>
      <h2 class="title title--small title--white mb-0">
        <i class="fa fa-check grey"></i>
        {{ $t('common.delegationInfo') }}
      </h2>
    </template>
    <slot name="information">
      <div class="delegation">
        <div class="delegation__text-wrap">
          {{ $t('balance.address') }}: {{ address }}

          <b-link :href="$_generateLinkAddress"
             class="p-0 ml-0"
             target="_blank"
          >
            <i class="fa fa-link fs-18"></i>
          </b-link>
        </div>
      </div>
    </slot>
  </b-card>
</template>

<script>

import { mapState } from 'vuex';
import generateLinkAddress from '@/plugins/mixins/generateLinkAddress';

export default {
  name: 'DelegationInfo',
  mixins: [generateLinkAddress],
  computed: {
    ...mapState('ethService', ['address']),
  },
};
</script>

<style lang="scss" scoped>
.delegation {
  display: grid;
  grid-template-columns: fit-content(100%) fit-content(100%);
  grid-gap: 5%;

  @media (max-width: 1500px) {
    grid-template-columns: 1fr;
  }

  &__text-wrap {
    overflow-wrap: anywhere;
  }
}
</style>
