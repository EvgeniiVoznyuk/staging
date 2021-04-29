<template>
<!-- The iframe from which all the needed data for the custom form are taken -->
<!--  <iframe-->
<!--    class="analytics-form"-->
<!--    src="https://docs.google.com/forms/d/e/1FAIpQLScZJrmU3zB1C8Kcnr_MsEqwZlJA5fa9H6deUraljnCtrqfu2A/viewform?embedded=true"-->
<!--    width="100%"-->
<!--    height="710"-->
<!--    frameborder="0"-->
<!--    marginheight="0"-->
<!--    marginwidth="0">-->
<!--    Loading…-->
<!--  </iframe>-->
  <b-card class="text-left mb-0">
    <form
      action="https://docs.google.com/forms/d/e/1FAIpQLScZJrmU3zB1C8Kcnr_MsEqwZlJA5fa9H6deUraljnCtrqfu2A/formResponse?embedded=true"
      class="c-form">
      <h2 class="mb-5">
        {{ $t('googleFormAnalytics.helpUs') }}
      </h2>

      <div class="mb-4">
        <label role="heading"
             aria-level="2"
             aria-describedby="i.desc.2100939675">
          {{ $t('googleFormAnalytics.howHelpful') }}
        </label>
        <div class="d-flex flex-column flex-sm-row">
          <div class="d-flex align-items-end justify-content-sm-center mr-3 mb-3 mb-sm-0">
            {{ $t('googleFormAnalytics.notHelpful') }}
          </div>
          <b-form-radio-group class="mr-3 text-sm-center">
            <label for="e1" class="d-sm-block mr-1 mr-sm-0">1</label>
            <input type="radio" name="entry.1659571550" id="e1" value="1" v-model="grade"/>
          </b-form-radio-group>
          <b-form-radio-group class="mr-3 text-sm-center">
            <label for="e2" class="d-sm-block mr-1 mr-sm-0">2</label>
            <input type="radio" name="entry.1659571550" id="e2" value="2" v-model="grade"/>
          </b-form-radio-group>
          <b-form-radio-group class="mr-3 text-sm-center">
            <label for="e3" class="d-sm-block mr-1 mr-sm-0">3</label>
            <input type="radio" name="entry.1659571550" id="e3" value="3" v-model="grade"/>
          </b-form-radio-group>
          <b-form-radio-group class="mr-3 text-sm-center">
            <label for="e4" class="d-sm-block mr-1 mr-sm-0">4</label>
            <input type="radio" name="entry.1659571550" id="e4" value="4" v-model="grade"/>
          </b-form-radio-group>
          <b-form-radio-group class="mr-3 text-sm-center">
            <label for="e5" class="d-sm-block mr-1 mr-sm-0">5</label>
            <input type="radio" name="entry.1659571550" id="e5" value="5" v-model="grade"/>
          </b-form-radio-group>
          <div class="d-flex align-items-end justify-content-sm-center">
            {{ $t('googleFormAnalytics.veryHelpful') }}
          </div>
        </div>
        <div v-if="!grade" class="text-danger">{{ $t('googleFormAnalytics.requiredQuestion') }}</div>
        <input type="hidden" name="entry.1659571550">
      </div>

      <b-form-group class="mb-4">
        <label role="heading"
               aria-level="2"
               aria-describedby="i.desc.1554351076">
          {{ $t('googleFormAnalytics.whatBlockchainsToAdd') }}
        </label>
        <b-form-input type="text"
                      autocomplete="off"
                      tabindex="0"
                      aria-label="What blockchain networks would you like us to add?"
                      name="entry.1081972101">
        </b-form-input>
      </b-form-group>

      <b-form-group class="mb-4">
        <label role="heading"
               aria-level="2"
               aria-describedby="i.desc.254187365">
          {{ $t('googleFormAnalytics.whatMetricsToAdd') }}
        </label>
        <b-form-input type="text"
                      autocomplete="off"
                      tabindex="0"
                      aria-label="What metrics would you like us to add?"
                      name="entry.1785514707">
        </b-form-input>
      </b-form-group>

      <b-button block type="submit" size="sm" variant="warning" :disabled="!grade">
        <i class="fa fa-dot-circle-o"></i> {{ $t('common.submit') }}
      </b-button>
    </form>
  </b-card>
</template>

<script>
export default {
  name: 'GoogleForm',
  data() {
    return {
      grade: '',
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
