<template>
  <Header class="header" fixed>
    <SidebarToggler class="d-lg-none"
                    display="md"
                    mobile
                    :defaultOpen='false' />
    <b-link class="navbar-brand logo" :to="{ name: 'Home' }">
      <img class="navbar-brand-full"
           src="@/assets/img/logo-white.svg"
           width="155"
           alt="Everstake">
      <img class="navbar-brand-minimized"
           src="@/assets/img/logo-small.svg"
           width="28"
           height="28"
           alt="Everstake">
    </b-link>

<!--    :defaultOpen='false'-->
    <SidebarToggler class="d-md-down-none"
                    display="lg"/>

<!--    <b-navbar-nav class="d-md-down-none">-->
<!--      <b-nav-item class="px-2" :to="{ name: 'Home' }">{{ $t('common.home') }}</b-nav-item>-->
<!--      <b-nav-item class="px-2" :to="{ name: 'Balance' }">{{ $t('common.balance') }}</b-nav-item>-->
<!--      <b-nav-item class="px-2" :to="{ name: 'Statistics' }">{{  $t('common.statistics') }}</b-nav-item>-->
<!--      <b-nav-item class="px-2" :to="{ name: 'Analytics' }">{{ $t('common.analytics') }}</b-nav-item>-->
<!--      <b-nav-item class="px-2" :to="{ name: 'Staking' }">{{  $t('common.whatIsStaking') }}</b-nav-item>-->
<!--      <b-nav-item class="px-2" :to="{ name: 'Blog' }">{{  $t('common.blog') }}</b-nav-item>-->
<!--    </b-navbar-nav>-->

    <b-navbar-nav class="ml-auto h-100">
<!--      <div class="d-md-down-none">-->
        <b-nav-item class="d-lg-down-none header__nav-item"
                    :to="{ name: 'Home' }">
          {{ $t('common.home') }}
        </b-nav-item>
        <b-nav-item class="d-lg-down-none header__nav-item"
                    :to="{ name: 'Balance' }">
          {{ $t('common.balance') }}
        </b-nav-item>
        <b-nav-item class="d-lg-down-none header__nav-item"
                    :to="{ name: 'Statistics' }">
          {{  $t('common.statistics') }}
        </b-nav-item>
        <!-- <b-nav-item class="d-lg-down-none header__nav-item"
                    :to="{ name: 'Analytics' }">
          {{ $t('common.analytics') }}
        </b-nav-item> -->
        <b-nav-item class="d-lg-down-none header__nav-item"
                    :to="{ name: 'Staking' }">
          {{  $t('common.whatIsStaking') }}
        </b-nav-item>
        <b-nav-item class="d-lg-down-none header__nav-item"
                    :to="{ name: 'Blog' }">
          {{  $t('common.blog') }}
        </b-nav-item>
      <b-nav-item class="d-lg-down-none header__nav-item"
                  :to="{ name: 'Learning center' }">
        {{  $t('common.learningCenter') }}
      </b-nav-item>
<!--      </div>-->
      <b-nav-item class="header__nav-item">
        <DropdownAccount v-if="isUserLoggedIn" />
        <div v-else class="d-none d-md-block">
          <b-button :variant="'outline-warning'" class="mr-2" :to="{name: 'Sign in'}">
            {{ $t('common.signIn') }}
          </b-button>
          <b-button :variant="'warning'"
                    :to="{name: 'Sign up'}">
            {{ $t('common.signUp') }}
          </b-button>
        </div>
      </b-nav-item>
    </b-navbar-nav>
  </Header>
</template>

<script>
import { Header, SidebarToggler } from '@coreui/vue';
import { mapGetters } from 'vuex';
import DropdownAccount from '@/components/DropdownAccount';

export default {
  name: 'AppHeader',
  components: {
    Header,
    SidebarToggler,
    DropdownAccount,
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
  },
};

</script>

<style lang="scss" scoped>
  .app-header {
    background-color: $black;
    border-bottom: $border-yellow--2px;
    padding: 0 30px;
    /* Careful!!! */
    height: 56px;

    .navbar-brand {
      height: auto;
    }

    .nav-item {
      min-width: auto;
    }
  }

  .logo {
    margin-right: 1rem;
  }

  .header__nav-item {
    padding: 0 15px;
    border-left: $border-yellow--2px;
    height: 100%;
    display: flex;
    align-items: center;

    &:last-child {
      padding-right: 0;
      border-left: 0;
    }

    &:nth-last-child(2) {
      border-right: $border-yellow--2px;
    }
  }

  @media(max-width: 1319px) {
    .header__nav-item {
      padding: 0 10px;
    }
  }

  @media (min-width: 992px) {
    .brand-minimized .app-header .navbar-brand {
      width: 36px;
    }
  }

  @media (max-width: 991.98px) {
    .app-header {
      .navbar-brand {
        height: auto;
        top: auto;
      }
    }
  }

  @media (max-width: 575px) {
    .header {
      padding: 0 10px;
    }
  }
</style>
