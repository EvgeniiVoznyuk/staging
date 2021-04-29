<template>
  <b-card class="w-100"
          no-body
          :header="$t('common.loading')">
    <b-card-body class="d-flex align-items-center h-100">
      <CircleSpinner></CircleSpinner>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'LoadingCard',
};
</script>

<style lang="scss" scoped>

</style>
