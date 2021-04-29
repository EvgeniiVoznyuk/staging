<template>
  <div v-show="!isAlertClosed">
    <b-alert show variant="warning"
             :class="{'alert--custom': true,
                      'animated': true,
                      'fadeIn': true,
                      'd-none': true,
                      'd-block': !isUserLoggedIn}">
      {{ $t('notLoggedIn.signUpToGetStarted') }}
      <button class="close"
              @click="closeAlert()">
        <i class="fa fa-close"></i>
      </button>
    </b-alert>
    <b-alert
      show variant="warning"
      :class="{'alert--custom': true,
               'animated': true,
               'fadeIn': true,
               'd-none': true,
               'd-block': !isUserAddressAvailable
                          && !isAddressesDataLoading
                          && isUserLoggedIn}">
      {{ $t('common.pleaseAddAddress') }}
      <button class="close"
              @click="closeAlert()">
        <i class="fa fa-close"></i>
      </button>
    </b-alert>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AlertBeforeWork',
  data() {
    return {
      isAlertClosed: false,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
      isUserAddressAvailable: 'addressService/isUserAddressAvailable',
      isAddressesDataLoading: 'addressService/isAddressesDataLoading',
    }),
  },
  methods: {
    closeAlert() {
      this.isAlertClosed = true;
    },
  },
};
</script>

<style lang="scss" scoped>
  .alert--custom {
    text-align: center;
    position: relative;
    padding: .75rem 2rem;

    &.alert-warning {
      background-color: $yellow;
      color: $black;
      border: none;
    }
  }

  .close {
    background: none;
    border: none;
    color: $danger;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 7px;
  }
</style>
