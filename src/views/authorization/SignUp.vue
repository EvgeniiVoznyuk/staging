<template>
  <div class="wrapper--auth" data-view>
    <b-card no-body class="mb-0 card">
      <b-card-body class="p-4">
        <b-form @submit.prevent="onSubmit">
          <h1>{{ $t('common.signUp') }}</h1>
          <p class="grey">{{ $t('register.createYourAccount') }}</p>
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

          <b-input-group class="mb-3">
            <b-input-group-prepend>
              <b-input-group-text>
                <i class="icon-lock"></i>
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input id="password"
                          type="password"
                          :class="{ 'form-control': true,
                                    'is-invalid': $v.form.password.$error,
                                    'is-valid': !$v.form.password.$invalid }"
                          v-model.trim="$v.form.password.$model"
                          :placeholder="$t('auth.password')"
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
                          v-model.trim="$v.form.passwordRepeated.$model"
                          :class="{ 'form-control': true,
                                    'is-invalid': $v.form.passwordRepeated.$error,
                                    'is-valid': !$v.form.passwordRepeated.$invalid }"
                          :placeholder="$t('register.repeatPassword')"
                          autocomplete="new-password" />
            <b-form-invalid-feedback id="input1LiveFeedback6">
              {{ $t('auth.passwordsMustMatch') }}
            </b-form-invalid-feedback>
          </b-input-group>

          <b-form-group :invalid-feedback="invCheck" :state="checkState('termsAgreed')">
            <b-form-checkbox id="termsAgreed"
                             v-model="$v.form.termsAgreed.$model"
                             :state="checkState('termsAgreed')"
                             aria-describedby="input1LiveFeedback7">
              <a href="/terms.pdf"
                   target="_blank"
                   class="link"
                   rel="noopener noreferrer">
                {{ $t('register.acceptTerms') }}
              </a>
            </b-form-checkbox>
          </b-form-group>

          <b-button variant="warning"
                    type="submit"
                    block
                    :disabled="isSubmissionLoading">
            {{ $t('register.createAccount') }}
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
  required, minLength, email as emailValidation, sameAs, helpers,
} from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
  name: 'SignUp',
  mixins: [validationMixin],
  validations: {
    form: {
      email: {
        required,
        emailValidation,
      },
      password: {
        required,
        minLength: minLength(8),
        // strongPass: helpers.regex('strongPass', /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/),
        strongPass: helpers.regex('strongPass',
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[`~!@#$%&*\-=+\\|<,.>/?;:'"[{\]}()^_])(?=.*[^\W_]).{8,}/),
      },
      passwordRepeated: {
        required,
        sameAsPassword: sameAs('password'),
      },
      termsAgreed: {
        required,
        mustAccept(value) {
          return Boolean(value);
        },
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
        password: '',
        passwordRepeated: '',
        termsAgreed: false,
      },
      isSubmissionLoading: false,
    };
  },
  computed: {
    isValid() { return !this.$v.form.$anyError; },
    invCheck() { return this.$t('register.acceptBeforeSubmitting'); },
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
  },
  methods: {
    checkState(val) {
      const field = this.$v.form[val];
      return !field.$dirty || !field.$invalid;
    },
    validate() {
      this.$v.$touch();
      return this.isValid;
    },
    resetForm() {
      Object.keys(this.form).forEach((formKey) => {
        if (typeof formKey === 'boolean') {
          this.form[formKey] = false;
        }
        this.form[formKey] = '';
      });
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    async register(userData) {
      try {
        this.isSubmissionLoading = true;

        const response = await this.$userServiceApi.register(userData);
        if (response) {
          this.showSuccessfulMsg({
            title: this.$t('notifications.success'),
            message: this.$t('notifications.successfulRegistration'),
          });

          this.$router.push({ name: 'Email not verified' });
          this.resetForm();
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
          password,
          termsAgreed: terms_agreed,
        } = this.form;

        this.register({
          email,
          password,
          terms_agreed,
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
