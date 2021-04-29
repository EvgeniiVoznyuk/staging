<template>
  <section class="mb-5">
    <h3 class="title title--white title--medium mb-sm-5">
      {{ $t('icx.videoTxt') }}
    </h3>


    <div class="youtube-container">
      <iframe
        width="100%" height="100%"
        src="https://www.youtube.com/embed/DT4IPQ4uDyo"
        frameborder="0"
        allowfullscreen
      >
      </iframe>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Video',
};
</script>

<style lang="scss" scoped>
  .youtube-container {
    max-width: 1140px;
    height: 640px;
    margin: 0 auto;
  }
</style>
