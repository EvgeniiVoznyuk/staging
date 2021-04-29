<template>
  <b-card
    :header="'3. ' + $t('dash.agreeToTerms')"
    class="w-100">
    <b-form @submit.prevent="onSubmit">
      <b-form-group :invalid-feedback="invCheck" :state="checkState('conditionsRead')">
<!--        :state="checkState('conditionsRead')"-->
        <b-form-checkbox
          id="conditionsRead"
          v-model="$v.conditionsRead.$model"
          aria-describedby="input1LiveFeedback7">
          <i18n path="dash.conditionsRead">
            <a place="guide" target="_blank" href="/terms.pdf">
              {{ $t('dash.guide') }}
            </a>
          </i18n>
        </b-form-checkbox>
      </b-form-group>
      <div>
        <b-button type="submit" variant="warning">
          {{ $t('common.submit') }}
        </b-button>
      </div>
    </b-form>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'AgreeToTerms',
  mixins: [validationMixin],
  validations: {
    conditionsRead: {
      required,
      mustAccept(value) {
        return Boolean(value);
      },
    },
  },
  notifications: {
    showSuccessfulMsg: {
      type: 'success',
    },
  },
  data() {
    return {
      conditionsRead: false,
    };
  },
  computed: {
    invCheck() { return this.$t('register.acceptBeforeSubmitting'); },
    isValid() {
      return !this.$v.conditionsRead.$anyError;
    },
  },
  methods: {
    ...mapActions({
      // getPermissions: 'userService/getPermissions',
      getUserData: 'userService/getUserData',
    }),
    checkState(val) {
      const field = this.$v[val];
      return !field.$dirty || !field.$invalid;
    },
    validate() {
      this.$v.$touch();
      return this.isValid;
    },
    async agreeToDashTerms(bool) {
      try {
        const response = await this.$userServiceApi.agreeToDashTerms(bool);

        if (response.data.message === 'success') {
          this.showSuccessfulMsg({
            title: this.$t('notifications.success'),
            message: this.$t('notifications.accountIsVerified'),
          });

          // this.getPermissions();
          this.getUserData();
          this.$bvModal.hide('dashKYCModal');
        }
      } catch (err) {
        this.$errors.handleErrors(err);
      }
    },
    onSubmit() {
      if (this.validate()) {
        this.agreeToDashTerms({ is_agree: this.conditionsRead });
      }
    },
  },
};
</script>

<style scoped>

</style>
