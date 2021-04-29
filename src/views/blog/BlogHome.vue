<template>
  <BasicLayout class="blog-home"
             data-view>
    <template slot="content">
      <main id="blog-home" class="blog-home__content">
        <h1 class="title title--white">
<!--          {{ page_title }}-->
          {{ $t('common.everstakeBlog') }}
        </h1>

<!--        <b-row class="mb-3">-->
<!--          <b-col xl="3">-->
<!--            <b-form v-on:submit.prevent="handleSearch" novalidate>-->
<!--              <b-form-group>-->
<!--                <b-input-group>-->
<!--                  <b-form-input-->
<!--                    id="searchQuery"-->
<!--                    v-model.lazy.trim="$v.searchQuery.$model"-->
<!--                    :state="chkState('searchQuery')"-->
<!--                    size="lg"-->
<!--                    aria-describedby="searchQueryFeedback"-->
<!--                    type="text"-->
<!--                  />-->
<!--                  <b-btn-->
<!--                    variant="warning"-->
<!--                    @click="handleSearch"-->
<!--                  >-->
<!--                    Search-->
<!--                  </b-btn>-->

<!--                  <b-form-invalid-feedback id="searchQueryFeedback">-->
<!--                    {{ searchQueryErrors[0] }}-->
<!--                  </b-form-invalid-feedback>-->
<!--                </b-input-group>-->
<!--              </b-form-group>-->
<!--            </b-form>-->
<!--          </b-col>-->
<!--        </b-row>-->

        <b-row class="mb-5">
          <b-col xl="3">
            <b-form-group>
              <label for="coins">
                {{ $t('filters.byCoin') }}
              </label>
              <b-form-select
                id="coins"
                v-model.trim="filteredByCoin">
                <option v-for="(coin, index) in coinsLinks"
                        :key="index"
                        :value="coin">
                  {{ coin }}
                </option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>

        <template v-if="firstPost || posts && posts.length">
          <b-row>
            <b-col>
              <div v-if="firstPost" class="post-preview">
                <router-link :to="'/blog/' + firstPost.slug" class="post-preview__link">
                  <article class="d-flex flex-column flex-xl-row">
                    <!--                  <figure class="post-preview__bg mb-lg-0">-->
                    <!--                    <img :src="firstPost.featured_image" alt="" v-if="firstPost.featured_image">-->
                    <!--                    <img src="@/assets/img/everstake-cover.png" alt="Everstake" v-else>-->
                    <!--                  </figure>-->
                    <figure class="post-preview__bg post-preview__bg--first mb-0"
                            :style="{
                            'background-position': 'center',
                            'background-repeat': 'no-repeat',
                            'background-size': 'cover',
                            'background-image': firstPost.featured_image
                                                ? `url(${firstPost.featured_image})`
                                                : `url(${postImage})`
                          }">
                    </figure>
                    <div class="d-flex justify-content-center flex-column post-preview__body post-preview__body--first">
                      <h2 class="title title--white post-preview__title">{{ firstPost.title }}</h2>
                      <p class="post-preview__published">
                        {{ $moment(firstPost.published).format('YYYY-MM-DD HH:mm') }}
                      </p>
                      <p class="paragraph post-preview__paragraph">{{ firstPost.summary }}</p>
                    </div>
                  </article>
                </router-link>
              </div>
            </b-col>
          </b-row>

          <b-row>
            <b-col
              lg="4"
              class="d-flex"
              v-for="(post,index) in posts"
              :key="post.slug + '_' + index"
            >
              <div class="post-preview">
                <router-link :to="'/blog/' + post.slug" class="post-preview__link">
                  <article>
                    <figure class="post-preview__bg mb-0"
                            :style="{
                            'background-position': 'center',
                            'background-repeat': 'no-repeat',
                            'background-size': 'cover',
                            'background-image': post.featured_image
                                                ? `url(${post.featured_image})`
                                                : `url(${postImage})`
                          }">
                    </figure>
                    <div class="post-preview__body">
                      <h2 class="title title--white post-preview__title">{{ post.title }}</h2>
                      <p class="post-preview__published">
                        {{ $moment(post.published).format('YYYY-MM-DD HH:mm') }}
                      </p>
                      <p class="paragraph post-preview__paragraph">{{ post.summary }}</p>
                    </div>
                  </article>
                </router-link>
              </div>
            </b-col>
          </b-row>
        </template>

        <template v-else>
          <b-row>
            <b-col class="text-center fs-20">
              {{ $t('common.noResults') }}
            </b-col>
          </b-row>
        </template>

        <div class="d-flex justify-content-center pagination--brand">
          <b-pagination
            :total-rows="count"
            :per-page="pageSize"
            v-model="page"
           >
          </b-pagination>
        </div>
      </main>
    </template>
  </BasicLayout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import { validationMixin } from 'vuelidate';
// import { minLength, maxLength } from 'vuelidate/lib/validators';
import BasicLayout from '@/components/BasicLayout.vue';
import postImage from '@/assets/img/everstake-cover.png';
import constants from '@/constants';

export default {
  name: 'BlogHome',
  components: {
    BasicLayout,
  },
  // mixins: [validationMixin],
  // validations: {
  //   searchQuery: {
  //     minLength: minLength(3),
  //     maxLength: maxLength(100),
  //   },
  // },
  fetch({ store }) {
    // Do not load data again if already in store.
    if (store.state.blogService.allPosts
        && store.state.blogService.allPosts.length !== 0) return;

    // Trigger the action for fetching all
    // the necessary data from the API.
    return store.dispatch('blogService/getAllPosts', { page: 1, page_size: 7 });
  },
  data() {
    return {
      page_title: 'Blog',
      page: 1,
      pageSize: 7,
      postImage,
      maxPageSize: 1000,
      defaultPageSize: 7,
      firstPage: 1,
      // searchQuery: '',
      filteredByCoin: 'All',
    };
  },
  computed: {
    ...mapGetters({
      allPosts: 'blogService/allPosts',
      foundPosts: 'blogService/foundPosts',
    }),
    posts() {
      if (!this.allPosts || this.allPosts.length === 0) return [];
      return this.allPosts.data.filter((post, index) => index !== 0);
    },
    firstPost() {
      if (!this.allPosts || this.allPosts.length === 0) return [];
      return this.allPosts.data[0];
    },
    count() {
      if (!this.allPosts || this.allPosts.length === 0) return 0;
      return this.allPosts.meta.count;
    },
    // searchQueryErrors() {
    //   const errors = [];
    //   if (!this.$v.searchQuery.$dirty) return errors;
    //
    //   !this.$v.searchQuery.minLength
    //   && errors.push(this.$t('notifications.minString', { num: 3 }));
    //
    //   !this.$v.searchQuery.maxLength
    //   && errors.push(this.$t('notifications.maxString', { num: 100 }));
    //
    //   return errors;
    // },
    coinsLinks() {
      return [].concat(
        ['All'],
        Object.keys(constants.COINS_MAP)
          .filter(coinCode => coinCode !== 'usd')
          .map(coinCode => this.$helpers.capitalize(constants.COINS_MAP[coinCode].name)),
      );
    },
  },
  watch: {
    page: {
      immediate: true,
      handler(val) {
        if (this.filteredByCoin === 'All') {
          const payload = {
            page: val,
            page_size: this.pageSize,
            exclude_body: true,
          };


          this.getAllPosts(payload);
        }
      },
    },
    filteredByCoin: {
      handler(val) {
        this.page = this.firstPage;

        const payload = {
          page: this.page,
          exclude_body: true,
        };

        if (val !== 'All') {
          this.pageSize = this.maxPageSize;
          payload.page_size = this.pageSize;
          payload.tag_slug = val.toLowerCase();
        } else {
          this.pageSize = this.defaultPageSize;1
          payload.page_size = this.pageSize;
        }

        this.getAllPosts(payload);
      },
    },
  },
  methods: {
    ...mapActions({
      getAllPosts: 'blogService/getAllPosts',
      searchPosts: 'blogService/searchPosts',
    }),
    // chkState(val) {
    //   const field = this.$v[val];
    //   return field.$dirty && field.$model ? !field.$dirty || !field.$invalid : null;
    // },
    // validate() {
    //   this.$v.$touch();
    //   return !this.$v.$anyError;
    // },
    // async reloadPosts() {
    //   this.page = this.firstPage;
    //
    //   const payload = {
    //     page: this.page,
    //     page_size: this.pageSize,
    //     exclude_body: true
    //   }
    //
    //   if (this.filteredByCoin !== 'All') {
    //     this.pageSize = this.maxPageSize;
    //     payload.page_size = this.pageSize;
    //     payload.tag_slug = this.filteredByCoin.toLowerCase();
    //   } else {
    //     this.pageSize = this.defaultPageSize;
    //     payload.page_size = this.pageSize;
    //     delete payload.tag_slug;
    //   }
    //
    //   this.getAllPosts(payload);
    //
    //   this.$v.searchQuery.$reset();
    // },
    // async handleSearch() {
    //   if (this.validate() && this.searchQuery) {
    //     this.pageSize = this.maxPageSize;
    //     this.page = this.firstPage;
    //
    //     const payload = {
    //       query: this.searchQuery,
    //       params: {
    //         page: this.page,
    //         page_size: this.pageSize,
    //         exclude_body: true,
    //       },
    //     }
    //
    //     if (this.filteredByCoin !== 'All') {
    //       payload.params.tag_slug = this.filteredByCoin.toLowerCase();
    //     }
    //
    //     await this.searchPosts(payload);
    //
    //     return;
    //   }
    //
    //   if (!this.searchQuery) {
    //     this.reloadPosts();
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>

  .blog-home {
    background: url('~@/assets/img/backgrounds/bg-top.png') top center  no-repeat / 100%,
                $black;
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    &__content {
      padding: 70px 0 0 0;
    }
  }

  .post-preview {
    background-color: $black;
    border: $border-yellow--2px;
    color: $white;
    transition: all 0.2s ease-in-out;
    position: relative;
    margin-bottom: 60px;

    &:hover {
      transform: translateY(-3%);
    }

    &__bg {
      overflow: hidden;
      height: 200px;

      img {
        width: 100%;
        height: auto;
      }

      &--first {
        height: auto;
        width: 66%;
      }
    }

    &__title {
      font-size: 18px;
      margin-bottom: 15px;
    }

    &__paragraph {
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 0;
    }

    &__link:hover {
      text-decoration: none;
    }

    &__published {
      color: $grey--dark;
    }

    &__body {
      padding: 20px;

      &--first {
        width: 33%;
      }
    }
  }

  @media (max-width: 1199px) {
    .post-preview {
      margin-bottom: 30px;

      &__bg--first {
        min-height: 300px;
        width: 100%;
      }

      &__body--first {
        width: 100%;
      }

      &__paragraph {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 991px) {
    .post-preview {
      &__bg--first {
        min-height: 200px;
      }
    }
   }

  @media(max-width: 767px) {
    .blog-home {
      background: $black;
    }
  }

  @media(max-width: 575px) {
    .blog-home {
      &__content {
        padding: 30px 0 0 0;
      }
    }

    .post-preview {
      &__title {
        font-size: 20px;
      }

      &__paragraph {
        font-size: 14px;
      }

      &__body {
        padding: 15px;
      }
    }
  }
</style>
