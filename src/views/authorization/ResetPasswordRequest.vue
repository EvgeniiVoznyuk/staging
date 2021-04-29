<template>
  <div class="wrapper--auth">
    <b-card no-body class="mb-0 card" v-if="!isResetPassRequestSubmitted">
      <b-card-body class="p-4">
        <b-form @submit.prevent="onSubmit">
          <h1>{{ $t('resetPass.requestPassReset') }}</h1>
          <p class="grey">{{ $t('resetPass.enterEmail') }}</p>
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>@</b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="email"
                          class="form-control"
                          :class="{ 'form-control': true,
                                    'is-invalid': $v.form.email.$error,
                                    'is-valid': !$v.form.email.$invalid }"
                          v-model.trim="$v.form.email.$model"
                          :placeholder="$t('auth.email')"
                          autocomplete="email" />
            <b-form-invalid-feedback id="input1LiveFeedback4">
              {{ $t('auth.emailRequired') }}
            </b-form-invalid-feedback>
          </b-input-group>

          <b-button variant="warning"
                    type="submit"
                    block
                    :disabled="isSubmissionLoading">
            {{ $t('common.submit') }}
          </b-button>
        </b-form>
      </b-card-body>
      <b-card-footer class="p-4">
        <b-row>
          <b-col class="text-center">
            <b-button variant="success"
                      :to="{ name: 'Sign in' }"
                      class="w-100">
              {{ $t('common.signIn') }}
            </b-button>
          </b-col>
        </b-row>
      </b-card-footer>
    </b-card>

    <b-card class="card--message text-center mb-0" no-body v-else>
      <div>
        <h1 class="mb-2">{{ $t('resetPass.confirmResetPass') }}</h1>
        <p class="grey mb-4">{{ $t('emailVerification.checkMail') }}</p>
        <b-button variant="success" class="d-inline-block" :to="{ name: 'Sign in' }">
          {{ $t('common.signIn') }}
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required, email as emailValidation,
} from 'vuelidate/lib/validators';

export default {
  name: 'ResetPassword',
  mixins: [validationMixin],
  validations: {
    form: {
      email: {
        required,
        emailValidation,
      },
    },
  },
  notifications: {
    showSuccessfulMsg: {
      type: 'success',
    },
    showErrorMsg: {
      type: 'error',
    },
  },
  data() {
    return {
      form: {
        email: '',
        captcha: 'mock',
      },
      isSubmissionLoading: false,
      isResetPassRequestSubmitted: false,
    };
  },
  computed: {
    isValid() { return !this.$v.form.$anyError; },
  },
  methods: {
    validate() {
      this.$v.$touch();
      return this.isValid;
    },
    async resetPasswordRequest(userData) {
      try {
        this.isSubmissionLoading = true;

        const response = await this.$userServiceApi.resetPassRequest(userData);
        if (response.data.message === 'success') {
          this.showSuccessfulMsg({
            title: this.$t('notifications.success'),
            message: this.$t('notifications.resetPassRequestSuccess'),
          });

          this.isResetPassRequestSubmitted = true;
        }
      } catch (err) {
        this.$errors.handleErrors(err);
      } finally {
        this.isSubmissionLoading = false;
      }
    },
    onSubmit() {
      if (this.validate()) {
        const {
          email,
          captcha,
        } = this.form;

        this.resetPasswordRequest({
          email,
          captcha,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .card {
    width: 100%;
    max-width: 490px;
  }
</style>
