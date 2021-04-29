<template>
  <HeaderDropdown
    right
    no-caret
    class="d-flex align-items-center">
    <template slot="header">
      <span class="d-flex align-items-center">
        <span class="mr-2 user-email">{{ userEmail }}</span>
        <span class="avatar">{{ userEmailFirstLetter }}</span>
      </span>
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center">
        <strong>{{ $t('dropdownAccount.account') }}</strong>
      </b-dropdown-header>
      <b-dropdown-item :to="{ name: 'Profile' }">
          <i class="fa fa-user" />
        {{ $t('common.profile') }}
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item @click="logout">
        <i class="fa fa-sign-out" />
        {{ $t('dropdownAccount.logout') }}
      </b-dropdown-item>
    </template>
  </HeaderDropdown>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { HeaderDropdown } from '@coreui/vue';

export default {
  name: 'DropdownAccount',
  components: {
    HeaderDropdown,
  },
  computed: {
    ...mapGetters({
      userEmail: 'userService/userEmail',
    }),
    userEmailFirstLetter() {
      if (!this.userEmail) return '';

      return this.userEmail[0];
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
  .avatar {
    height: 35px;
    margin: 0 0 0 10px;
    max-width: 100%;
    border-radius: 50%;
    background: $yellow;
    color: $white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /deep/ .nav-link {
    padding: 0;
  }

  /deep/ .dropdown-toggle {
    color: $white;

    &:hover, &:focus {
      color: $yellow;
    }
  }

  /deep/ .dropdown-menu {
    font-family: 'Space Mono', monospace;
    border: $border-yellow--2px;
    border-radius: 0;
  }

  .dropdown-header {
    background: $black--2;
    color: $white;
    font-size: 14px;
  }

  /deep/ .dropdown-item {
    background-color: $yellow;
    color: $black;
    font-size: 18px;
    transition: background-color 0.2s;
    border-radius: 0;
    font-weight: 700;

    &:hover, &.router-link-exact-active {
      background-color: $yellow--dark;
    }

    i {
      color: $black;
    }
  }

  .dropdown-divider {
    display: none;
  }

  @media (max-width: 1299px) {
    .user-email {
      display: none;
    }

    .avatar {
      margin-left: auto;
    }
  }
</style>
