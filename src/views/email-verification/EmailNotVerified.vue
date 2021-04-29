<template>
<div class="wrapper--auth">
  <b-card class="card--message text-center mb-0" no-body>
    <div>
      <h1 class="fs-50 mb-4">{{ $t('emailVerification.emailNotVerified') }}</h1>
      <p class="fs-22 grey mb-2">{{ $t('emailVerification.checkMail') }}</p>
      <p class="grey mb-5">{{ $t('emailVerification.loginAgain') }}</p>
      <b-button variant="warning" class="d-inline-block" :to="{ name: 'Sign in' }">
        {{ $t('common.signIn') }}
      </b-button>
    </div>
  </b-card>
</div>
</template>

<script>
export default {
  name: 'EmailNotVerified',
  data() {
    return {
      verificationToken: null,
    };
  },
  methods: {
    async verifyEmail(token) {
      try {
        const response = await this.$userServiceApi.verifyEmail(token);
        if (response) {
          this.showSuccessfulMsg({
            title: this.$t('notifications.success'),
            message: this.$t('notifications.emailVerified'),
          });

          this.$router.push({ name: 'Email verified' });
        }
      } catch (err) {
        this.$errors.handleErrors(err);
      }
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
  created() {
    this.verificationToken = this.$route.params.token;

    if (this.verificationToken) {
      this.verifyEmail({ token: this.verificationToken });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
