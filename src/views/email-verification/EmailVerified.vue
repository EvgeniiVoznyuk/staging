<template>
  <div class="wrapper--auth">
    <b-card class="card--message text-center mb-0" no-body>
      <div>
        <h1 class="fs-50 mb-4">{{ $t('emailVerification.emailVerified') }}</h1>
        <p class="fs-22 grey mb-5">{{ $t('emailVerification.thanksForVerifying') }}</p>
        <b-button variant="warning" class="d-inline-block" :to="{ name: 'Sign in' }">
          {{ $t('common.signIn') }}
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'EmailVerified',
};
</script>

<style lang="scss" scoped>
</style>
