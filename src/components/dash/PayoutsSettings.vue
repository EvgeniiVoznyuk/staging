<template>
  <b-card
    :header="$t('dash.rewardsPayout')"
    class="w-100">
    <b-form @submit.prevent="onSubmitMethod">
      <b-form-group>
        <b-form-radio-group
          id="basicRadiosCustom"
          value="1"
          stacked>
          <div class="custom-control custom-radio">
            <input type="radio"
                   id="fourWeeks"
                   name="fourWeeks"
                   class="custom-control-input"
                   v-model="automaticPayout"
                   checked
                   :value="true">
            <label class="custom-control-label"
                   for="fourWeeks">
              {{ $t('dash.payFourWeeks') }}
            </label>
          </div>
          <div class="custom-control custom-radio">
            <input type="radio"
                   id="reinvest"
                   name="reinvest"
                   v-model="automaticPayout"
                   class="custom-control-input"
                   :value="false">
            <label class="custom-control-label"
                   for="reinvest">
              {{ $t('dash.reinvest') }}
            </label>
          </div>
        </b-form-radio-group>

        <slot name="submit-btn">

        </slot>
      </b-form-group>
    </b-form>
  </b-card>
</template>

<script>
export default {
  name: 'PayoutsSettings',
  props: {
    onSubmitMethod: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      automaticPayout: false,
    };
  },
  watch: {
    automaticPayout: {
      immediate: true,
      handler(val) {
        this.$emit('is-enabled', val);
      },
    },
  },

};
</script>

<style scoped>

</style>
