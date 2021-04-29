<template>
  <div class="wrapper--auth" data-view>
    <b-card-group class="card-group">
      <b-card no-body>
        <b-card-body>
          <b-form @submit.prevent="onSubmit">
            <h1>{{ $t('common.signIn') }}</h1>
            <p class="grey">{{ $t('login.signIn') }}</p>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-input-group-text>
                  <i class="icon-user"></i>
                </b-input-group-text>
              </b-input-group-prepend>
              <b-form-input type="email"
                            id="email"
                            :class="{ 'form-control': true,
                                      'is-invalid': $v.form.email.$error,
                                      'is-valid': !$v.form.email.$invalid }"
                            v-model.trim="$v.form.email.$model"
                            :placeholder="$t('auth.email')"
                            autocomplete="email"/>
              <b-form-invalid-feedback id="input1LiveFeedback4">
                {{ $t('auth.emailRequired') }}
              </b-form-invalid-feedback>
            </b-input-group>
            <b-input-group class="mb-4">
              <b-input-group-prepend>
                <b-input-group-text>
                  <i class="icon-lock"></i>
                </b-input-group-text>
              </b-input-group-prepend>
              <b-form-input type="password"
                            id="password"
                            :class="{ 'form-control': true,
                                      'is-invalid': $v.form.password.$error,
                                      'is-valid': !$v.form.password.$invalid }"
                            v-model.trim="$v.form.password.$model"
                            :placeholder="$t('auth.password')"
                            autocomplete="current-password"/>
              <b-form-invalid-feedback id="input1LiveFeedback5">
                {{ $t('auth.passwordRequired') }}
              </b-form-invalid-feedback>
            </b-input-group>
            <b-row>
              <b-col cols="6 d-flex align-items-center">
                <b-button variant="warning"
                          type="submit"
                          class="px-4"
                          :disabled="isLoginSubmitting">
                  {{ $t('common.signIn') }}
                </b-button>
              </b-col>
              <b-col cols="6" class="d-flex align-items-center">
                <b-button variant="link"
                          class="text-right p-0"
                          :to="{ name: 'Reset password request' }">
                  {{ $t('login.forgotPassword') }}
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-card-body>
      </b-card>
      <b-card no-body
              class="text-black bg-warning py-5 d-md-down-none"
              style="width:44%">
        <b-card-body class="text-center">
          <div>
            <h2>{{ $t('common.signUp') }}</h2>
            <p>
              {{ $t('login.noAccount') }}
            </p>
            <b-button class="btn--black mt-3"
                      :to="{ name: 'Sign up' }">
              {{ $t('login.registerNow') }}
            </b-button>
          </div>
        </b-card-body>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required, minLength, email as emailValidation, helpers,
} from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SignIn',
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
      },
    };
  },
  computed: {
    ...mapGetters({
      isLoginSubmitting: 'userService/isLoginSubmitting',
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
    isValid() { return !this.$v.form.$anyError; },
  },
  methods: {
    ...mapActions({
      login: 'userService/login',
    }),
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
    onSubmit() {
      if (this.validate()) {
        const {
          email,
          password,
        } = this.form;

        const data = {
          payload: { email, password },
          // TODO: What's the best way to manage notifications functions?
          // Helper factory functions to pass args, and get notifications. ({type, message, silent, position})
          onSuccess: () => this.showSuccessfulMsg({
            title: this.$t('notifications.success'),
            message: this.$t('notifications.successfulLogin'),
          }),
          onFail: () => this.showErrorMsg({
            title: this.$t('notifications.error'),
            message: this.$t('notifications.failedLogin'),
          }),
        };

        this.login(data);
      }
    },
  },
};
</script>

<style lang="scss">
  .card-group {
    max-width: 730px;
    margin: 0 auto;
  }
</style>
