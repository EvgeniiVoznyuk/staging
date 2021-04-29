<template>
  <div class="address">
    <AddressModal :isSingleCoin="isSingleCoin"
                  :coinsOptions="coinsOptions">
    </AddressModal>

    <b-row>
      <b-col cols="12" xl="6">
        <b-card>
          <template v-slot:header>
            <h2 class="title title--small title--white mb-0">
              {{ $t('balance.address') }}
            </h2>
          </template>

          <div class="address__row">
            <p class="mb-lg-0">
              <template v-if="!isUserLoggedIn">{{ $t('balance.demo') }} - </template>
              {{ $t('balance.addAddressToStart') }}
            </p>
            <b-button v-if="!isUserLoggedIn"
                      variant="warning"
                      :to="{ name: 'Sign in' }">
              {{ $t('balance.addAddress') }}
            </b-button>
            <b-button v-else
                      variant="warning"
                      v-b-modal.addressModal>
              {{ $t('balance.addAddress') }}
            </b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AddressModal from '@/components/address/AddressModal';

export default {
  name: 'AddAddress',
  props: {
    isSingleCoin: {
      required: true,
      type: Boolean,
      default: false,
    },
    coinsOptions: {
      required: true,
    },
  },
  components: {
    AddressModal,
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
    }),
  },
};
</script>

<style lang="scss" scoped>
  .address__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media(max-width: 991px) {
    .address__row {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
