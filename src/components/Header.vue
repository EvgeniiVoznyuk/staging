<template>
  <header class="header">
    <div class="header__left">
      <router-link :to="{name: 'Home'}">
        <img src="~@/assets/img/logo-white.svg" alt="Everstake" class="logo">
      </router-link>
    </div>

    <div class="header__right h-100 d-flex align-items-center">
      <nav class="nav-wrapper h-100">
        <ul class="nav h-100">
          <li class="nav__li">
            <router-link class="nav__link"
                         :to="{ name: 'Home' }"
                         v-if="isInternal">
              {{ $t('common.home') }}
            </router-link>
            <a href="#" v-scroll-to="'#about'" class="nav__link" v-else>
              {{ $t('home.aboutUs') }}
            </a>
          </li>
          <li class="nav__li">
            <router-link class="nav__link"
                         :to="{ name: 'Balance' }">
              {{ $t('home.dashboard') }}
            </router-link>
          </li>
          <li class="nav__li">
            <CoinsDropdown></CoinsDropdown>
          </li>
          <li class="nav__li">
            <router-link class="nav__link"
                         :to="{ name: 'Blog' }">
              {{ $t('common.blog') }}
            </router-link>
          </li>
          <li class="nav__li">
            <router-link class="nav__link"
                         :to="{ name: 'Learning center' }">
              {{ $t('common.learningCenter') }}
            </router-link>
          </li>
          <!-- <li class="nav__li">
            <router-link :to="{ name: 'Analytics'}" class="nav__link">
              {{ $t('common.analytics') }}
            </router-link>
          </li> -->
          <li class="nav__li">
            <b-dropdown class="custom-dropdown"
                        variant="link"
                        id="contact"
                        right
                        :text="$t('home.contact')">
              <b-dropdown-item href="https://calendly.com/everstake"
                               rel="noopener noreferrer"
                               target="_blank">
                  {{ `01. ${$t('common.scheduleCall')}` }}
              </b-dropdown-item>
              <b-dropdown-item href="mailto:inbox@everstake.one">
                {{ `02. ${$t('home.emailUs')}` }}
              </b-dropdown-item>
              <b-dropdown-item href="https://t.me/everstake_chat"
                               rel="noopener noreferrer"
                               target="_blank">
                {{ `03. ${$t('home.support')}` }}
              </b-dropdown-item>
            </b-dropdown>
          </li>

          <template v-if="!isUserLoggedIn">
          <li class="nav__li">
            <b-button :to="{ name: 'Sign in' }"
                      class="mr-2"
                      :variant="'outline-warning'"
                      outline>
              {{ $t('common.signIn') }}
            </b-button>
            <b-button :to="{ name: 'Sign up' }" :variant="'warning'">
              {{ $t('common.signUp') }}
            </b-button>
          </li>
          </template>
          <template v-else>
            <DropdownAccount class="nav__li" />
          </template>
        </ul>
      </nav>

      <div class="d-flex align-items-center d-xl-none">
        <CoinsDropdown class="mr-3"></CoinsDropdown>
        <MobileMenu class="d-xl-none" :isInternal="isInternal"></MobileMenu>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

import CoinsDropdown from '@/components/CoinsDropdown.vue';
import MobileMenu from '@/components/MobileMenu.vue';
import DropdownAccount from '@/components/DropdownAccount';


export default {
  name: 'Header',
  components: {
    CoinsDropdown,
    MobileMenu,
    DropdownAccount
  },
  props: {
    isInternal: Boolean,
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .header {
    background: $black;
    display: flex;
    font-family: 'Space Mono', monospace;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    height: 56px;
    border-bottom: $border-yellow--2px;

    /* Firefox doesn't render images widthout sizes */
    &__left {
      flex: 1 auto;
    }
  }

  .nav {
    &__li {
      display: flex;
      flex-grow: 1;
      align-items: center;
      padding: 0 15px;
      border-left: $border-yellow--2px;
      position: relative;
      &:last-child {
        padding-right: 0;
      }
    }

    &__link {
      color: $white;
      font-size: 14px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: $yellow;
      }

      &.router-link-exact-active {
        color: $yellow;
      }
    }
  }

  .logo {
    width: 100%;
    max-width: 155px;
  }

  @media (max-width: 1199px) {
    .nav-wrapper {
      display: none;
    }
  }

  @media (max-width: 575px) {
    .header {
      padding: 0 15px;
      &__left {
        max-width: 156px;
      }
    }

    .logo {
      max-width: 156px;
      max-height: 24px;
    }
  }
</style>
