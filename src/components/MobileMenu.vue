<template>
  <div>
    <b-dropdown id="mobileDropdown"
                class="custom-dropdown custom-dropdown--mobile-menu"
                variant="link"
                right
                no-caret>
      <template slot="button-content">
        <Burger></Burger>
      </template>
      <div v-for="(navObj, index) in navLinks"
           :key="index">
        <b-dropdown-item v-if="navObj.type === 'routerLink'"
                         :to="{ name: navObj.to }">
          {{ `0${index + 1}. ${navObj.name}`}}
        </b-dropdown-item>
        <b-dropdown-item v-if="navObj.type === 'externalLink'"
                         :href="navObj.link"
                         :target="navObj.target"
                         rel="noopener noreferrer">
          {{ `0${index + 1}. ${navObj.name}`}}
        </b-dropdown-item>
        <b-dropdown-item v-if="navObj.type === 'internalLink'"
                         href="#"
                         :target="navObj.target"
                         v-scroll-to="navObj.hash">
          {{ `0${index + 1}. ${navObj.name}`}}
        </b-dropdown-item>
        <b-dropdown-item v-if="!isUserLoggedIn && navObj.type === 'routerLinkNotLoggedIn'"
                         :to="{ name: navObj.to }">
          {{ `0${index + 1}. ${navObj.name}`}}
        </b-dropdown-item>
      </div>
      <template v-if="isUserLoggedIn">
        <b-dropdown-item :to="{ name: 'Profile' }">
          <i class="fa fa-user" />
          {{ $t('common.profile') }}
        </b-dropdown-item>
        <b-dropdown-item @click="logout">
          <i class="fa fa-sign-out" />
          {{ $t('dropdownAccount.logout') }}
        </b-dropdown-item>
      </template>
    </b-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Burger from '@/components/Burger.vue';

export default {
  name: 'MobileMenu',
  components: {
    Burger,
  },
  props: {
    isInternal: Boolean,
  },
  data() {
    return {
      navLinks: [
        {
          type: 'internalLink',
          hash: '#about',
          name: this.$t('home.aboutUs'),
          target: '_self',
        },
        {
          type: 'routerLink',
          to: 'Balance',
          name: this.$t('home.dashboard'),
        },
        {
          type: 'routerLink',
          to: 'Blog',
          name: this.$t('common.blog'),
        },
        {
          type: 'routerLink',
          to: 'Learning center',
          name: this.$t('common.learningCenter'),
        },
        // {
        //   type: 'routerLink',
        //   to: 'Analytics',
        //   name: this.$t('common.analytics'),
        // },
        {
          type: 'externalLink',
          link: 'https://calendly.com/everstake',
          name: this.$t('common.scheduleCall'),
          target: '_blank',
        },
        {
          type: 'externalLink',
          link: 'mailto:inbox@everstake.one',
          name: this.$t('home.emailUs'),
          target: '_self',
        },
        {
          type: 'externalLink',
          link: 'https://t.me/everstake_chat',
          name: this.$t('home.support'),
          target: '_blank',
        },
        {
          type: 'routerLinkNotLoggedIn',
          to: 'Sign in',
          name: this.$t('common.signIn'),
        },
        {
          type: 'routerLinkNotLoggedIn',
          to: 'Sign up',
          name: this.$t('common.signUp'),
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
  },
  watch: {
    isInternal: {
      immediate: true,
      handler(val) {
        if (val) {
          // change about anchor to home link
          this.navLinks[0] = {
            type: 'routerLink',
            to: 'Home',
            name: this.$t('common.home'),
          };
        }
      },
    },
  },
  methods: {
    ...mapActions({
      logout: 'userService/logout',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .fa-sign-out, .fa-user {
    color: $black;
    margin-left: 0;
  }
</style>
