<template>
  <div class="wrapper--auth">
    <b-card no-body class="mb-0 card">
      <b-card-body class="p-4">
        <b-form @submit.prevent="onSubmit">
          <h1>{{ $t('resetPass.resetPass') }}</h1>
          <p class="grey">{{ $t('resetPass.createNewPass') }}</p>
          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>
                <i class="icon-lock"></i>
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input id="newPass"
                          type="password"
                          :class="{ 'form-control': true,
                                    'is-invalid': $v.form.newPass.$error,
                                    'is-valid': !$v.form.newPass.$invalid }"
                          v-model.trim="$v.form.newPass.$model"
                          :placeholder="$t('resetPass.newPass')"
                          aria-describedby="input1LiveFeedback5"
                          autocomplete="new-password" />
            <b-form-invalid-feedback id="input1LiveFeedback5">
              {{ $t('auth.passwordRequired') }}
            </b-form-invalid-feedback>
          </b-input-group>

          <b-input-group class="mb-4">
            <b-input-group-prepend>
              <b-input-group-text>
                <i class="icon-lock"></i>
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input type="password"
                          class="form-control"
                          v-model.trim="$v.form.newPassRepeated.$model"
                          :class="{ 'form-control': true,
                                    'is-invalid': $v.form.newPassRepeated.$error,
                                    'is-valid': !$v.form.newPassRepeated.$invalid }"
                          :placeholder="$t('resetPass.confirmNewPass')"
                          autocomplete="new-password" />
            <b-form-invalid-feedback id="input1LiveFeedback6">
              {{ $t('auth.passwordsMustMatch') }}
            </b-form-invalid-feedback>
          </b-input-group>

          <b-button variant="warning"
                    type="submit"
                    block
                    :disabled="isSubmissionLoading">
            {{ $t('resetPass.resetPass') }}
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
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required, minLength, helpers, sameAs,
} from 'vuelidate/lib/validators';

export default {
  name: 'ResetPassword',
  mixins: [validationMixin],
  validations: {
    form: {
      newPass: {
        required,
        minLength: minLength(8),
        // strongPass: helpers.regex('strongPass', /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/),
        strongPass: helpers.regex('strongPass',
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[`~!@#$%&*\-=+\\|<,.>/?;:'"[{\]}()^_])(?=.*[^\W_]).{8,}/),
      },
      newPassRepeated: {
        required,
        sameAsPassword: sameAs('newPass'),
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
        newPass: '',
        newPassRepeated: '',
        captcha: 'mock',
      },
      verificationToken: null,
      isSubmissionLoading: false,
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
    // resetForm() {
    //   Object.keys(this.form).forEach((formKey) => {
    //     if (typeof formKey === 'boolean') {
    //       this.form[formKey] = false;
    //     }
    //     this.form[formKey] = '';
    //   });
    //   this.$nextTick(() => {
    //     this.$v.$reset();
    //   });
    // },
    async resetPassword(userData) {
      try {
        this.isSubmissionLoading = true;

        const response = await this.$userServiceApi.resetPass(userData);
        if (response.data.message === 'success') {
          this.showSuccessfulMsg({
            title: this.$t('notifications.success'),
            message: this.$t('notifications.resetPassSuccess'),
          });
          this.$router.push({ name: 'Sign in' });
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
          captcha,
          newPass: new_password,
        } = this.form;

        this.resetPassword({
          captcha,
          new_password,
          token: this.verificationToken,
        });
      }
    },
  },
  created() {
    this.verificationToken = this.$route.params.token;
  },
};
</script>

<style lang="scss" scoped>
  .card {
    width: 100%;
    max-width: 490px;
  }
</style>
