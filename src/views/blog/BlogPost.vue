<template>
  <div class="post" data-view>
    <Header :isInternal="true"></Header>
    <main id="blog-home w-100">
      <b-container>
        <div class="post__content">
          <router-link
            :to="'/blog'"
            class="d-inline-block post__link post__link--back"
          >
            <i class="fa fa-chevron-left post__chevron"></i>{{ $t('common.back') }}
          </router-link>
          <div id="blog-post" v-if="post">
            <h1 class="title">
              {{ post.data.title }}
            </h1>
            <p class="post__published">
              {{ $moment(post.data.published).format('YYYY-MM-DD HH:mm') }}
            </p>
            <div v-html="post.data.body" class="p-container"></div>
          </div>
        </div>
      </b-container>

      <div class="post__navigation">
        <router-link
          v-if="post.meta.previous_post"
          :to="/blog/ + post.meta.previous_post.slug"
          class="post__navigation-link"
        >
          <i class="fa fa-chevron-left post__chevron"></i>
          <span class="post__navigation-title">
<!--            {{ post.meta.previous_post.title }}-->
            {{ $t('common.previousPost') }}
          </span>
        </router-link>
        <router-link
          v-if="post.meta.next_post"
          :to="/blog/ + post.meta.next_post.slug"
          class="post__navigation-link"
        >
          <span class="post__navigation-title">
<!--            {{ post.meta.next_post.title }}-->
             {{ $t('common.nextPost') }}
          </span>
          <i class="fa fa-chevron-right post__chevron"></i>
        </router-link>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'blog-post',
  components: {
    Header,
    Footer,
  },
  metaInfo() {
    const title = this.post.data.seo_title;
    const description = this.post.data.meta_description;
    return {
      title,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: description,
        },
        {
          vmid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          vmid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          vmid: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          vmid: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
      ],
    };
  },
  fetch({ store }, slug) {
    // Trigger the action for fetching all
    // the necessary data from the API.
    return store.dispatch('blogService/getPost', slug);
  },
  computed: {
    ...mapGetters({
      post: 'blogService/post',
    }),
    title() {
      if (!this.post && Object.keys(this.post).length === 0) return '';
      return this.post.data.seo_title;
    },
    description() {
      if (!this.post && Object.keys(this.post).length === 0) return '';
      return this.post.data.meta_description;
    },
  },
  methods: {
    ...mapActions({
      getPost: 'blogService/getPost',
    }),
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        this.getPost(this.$route.params.slug);
      },
    },
  },
};
</script>

<style lang="scss" scoped>

  .post {
    background-color: $white;
    display: flex;
    flex-direction: column;
    font-family: 'Roboto Mono', monospace;
    min-height: 100vh;

    &__content {
      padding: 70px 0 50px;
      display: block;
    }

    &__link {
      color: $yellow;
      font-size: 16px;
      font-weight: 700;
      text-decoration: none;
      -webkit-transition: color 0.2s;
      transition: color 0.2s;

      &:hover {
        color: $yellow--dark;
      }

      &--back {
        margin-bottom: 24px;
      }
    }

    &__published {
      color: $grey--dark;
      font-size: 16px;
      margin-bottom: 30px;
    }

    &__navigation {
      background-color: $yellow;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 20px;
    }

    &__navigation-link {
      display: flex;
      align-items: center;
      color: $black;
      font-size: 18px;
      font-weight: 700;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: $yellow--dark;
      }
    }

    &__navigation-title {
      display: inline-block;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__chevron {
      font-size: 14px;
      display: inline-block;
      margin: 0 5px;
      vertical-align: center;
    }
  }

  @media (max-width: 575px) {
    .post {
      &__content {
        padding-top: 20px;
      }

      &__published, &__link {
        font-size: 14px;
      }

      &__link {
        &--back {
          margin-bottom: 20px;
        }
      }

      &__navigation {
        justify-content: space-between;
      }

      &__navigation-link {
        font-size: 14px;
      }
    }
  }
</style>
