<template>
  <b-card>
    <b-container
      fluid
    >
      <div class="d-flex flex-column flex-md-row">
        <div class="card-info__left">
          <IconContainer
            :icon="icon"
          />
        </div>

        <div>
          <h3 class="title title--white title--medium mb-3">{{ title }}</h3>

          <p
            v-for="(text, index) in texts"
            :key="index"
            class="paragraph paragraph--big paragraph--grey mb-4"
          >
            {{ text }}
          </p>
          
          <div class="card-info__btns">
            <slot name="btns" />
          </div>
        </div>
      </div>
    </b-container>
  </b-card>
</template>

<script>
import IconContainer from '@/components/IconContainer.vue';

export default {
  name: 'CardInfo',
  components: {
    IconContainer,
  },
  props: {
    title: {
      type: String,
      default() {
        return this.$t('cardInfo.defaultTitle');
      },
    },
    texts: {
      type: Array,
      default() {
        return [
          this.$t('cardInfo.defaultParagraph'),
        ];
      },
    },
    icon: {
      type: String,
      default: 'ev-logo',
    },
  },
};
</script>

<style lang="scss" scoped>
  .card-info {
    &__left {
      margin-right: 46px;
      
      @media (max-width: 767px) {
        margin-right: 0;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
      }
    }
  }
</style>
