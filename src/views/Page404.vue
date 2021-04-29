<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <div class="clearfix">
            <h1 class="float-left display-3 mr-4">404</h1>
            <h4 class="pt-3">{{ $t('page404.lost') }}</h4>
            <p class="grey">{{ $t('page404.pageNotFound') }}</p>
          </div>

          <div class="text-center">
            <b-button variant="warning"
                      :to="{ name: 'Home' }"
                      class="w-50">
              {{ $t('common.home') }}
            </b-button>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404',
};
</script>
