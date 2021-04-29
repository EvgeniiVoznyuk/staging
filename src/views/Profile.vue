<template>
  <div class="animated fadeIn">
    <AddAddress :isSingleCoin="false"
                :coinsOptions="coinsOptions">
    </AddAddress>

    <b-modal id="deleteAddressModal"
             :title="$t('deleteAddressModal.deleteAddress')"
             hide-footer
             centered>
      <i18n path="deleteAddressModal.areYouSure" tag="p">
        <span class="text-warning"
              slot="address">
          {{ addressForDeletion }}
        </span>
      </i18n>

      <b-button :variant="'warning'"
                class="mr-2"
                @click="deleteAddress(addressForDeletion, coinCodeForDeletion)"
                :disabled="isDeleteAddressLoading">
        {{ $t('deleteAddressModal.yes') }}
      </b-button>
      <b-button :variant="'warning'"
                @click="$bvModal.hide('deleteAddressModal')"
                :disabled="isDeleteAddressLoading">
        {{ $t('deleteAddressModal.cancel') }}
      </b-button>
    </b-modal>

    <b-row>
      <b-col
        cols="12"
        xl="6"
        class="d-flex">
        <LoadingCard v-if="isAddressesDataLoading"></LoadingCard>

        <b-card class="w-100" v-else>
          <template slot="header">
            <div class="d-flex justify-content-between flex-wrap">
              <div>{{ $t('common.profile') }}</div>
              <strong>{{ userEmail }}</strong>
            </div>
          </template>

          <div v-if="!isUserAddressAvailable" class="text-warning text-center">{{ $t('common.noData') }}</div>
          <b-table
            v-else
            :hover="true"
            :striped="true"
            :outlined="true"
            :fixed="true"
            :responsive="true"
            :items="allAddressesOfAllCoins">
            <template slot="addresses" slot-scope="data">
              <div v-for="(address, index) in data.item.addresses.split(', ')"
                   :key="index"
                   class="mb-1">
                {{ address }}
                 <b-button variant="link"
                           class="p-0 ml-1"
                           v-clipboard:copy="address"
                           v-clipboard:success="onCopy"
                           v-clipboard:error="onCopyError">
                  <i class="fa fa-copy"></i>
                </b-button>
                <b-button variant="link"
                          class="btn-delete p-0 ml-2"
                          v-b-modal.deleteAddressModal
                          @click="setAddressForDeletion(address);
                          setCoinCodeForDeletion(data.item.coin.toLowerCase())">
                  <i class="fa fa-close"></i>
                </b-button>
              </div>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddAddress from '@/components/address/AddAddress';
import LoadingCard from '@/components/LoadingCard';
import constants from '@/constants';

export default {
  name: 'Profile',
  notifications: {
    showSuccessfulMsg: {
      type: 'success',
    },
    showErrorMsg: {
      type: 'error',
    },
  },
  components: {
    AddAddress,
    LoadingCard,
  },
  data() {
    return {
      coinsOptions: constants.AVAILABLE_COINS,
      addressForDeletion: '',
      coinCodeForDeletion: '',
      isDeleteAddressLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
      userEmail: 'userService/userEmail',
      allAddressesOfAllCoins: 'addressService/allAddressesOfAllCoins',
      isAddressesDataLoading: 'addressService/isAddressesDataLoading',
    }),
    isUserAddressAvailable() {
      return this.allAddressesOfAllCoins && this.allAddressesOfAllCoins.length !== 0;
    },
  },
  methods: {
    ...mapActions({
      getAddressesData: 'addressService/getAddressesData',
    }),
    onCopy() {
      this.showSuccessfulMsg({
        title: this.$t('notifications.success'),
        message: this.$t('notifications.copied'),
      });
    },
    onCopyError() {
      this.showErrorMsg({
        title: this.$t('notifications.error'),
        message: this.$t('notifications.failedToCopy'),
      });
    },
    setAddressForDeletion(address) {
      this.addressForDeletion = address;
    },
    setCoinCodeForDeletion(coinCode) {
      this.coinCodeForDeletion = coinCode;
    },
    async deleteAddress(address, coinCode) {
      try {
        this.isDeleteAddressLoading = true;
        const resp = await this.$addressServiceApi.deleteAddress({ address, currency: coinCode });
        if (resp.data.message === 'success') {
          await this.getAddressesData([]);
          this.$bvModal.hide('deleteAddressModal');
        }
      } catch (err) {
        this.$errors.handleErrors(err);
         /*
           FIXME:
             This method should be either a mixin or a store action to call
             it in interceptors, not here, as it
             causes multiple refresh and delete requests when the error is BAD_JWT
        */
        if (this.$errors.isBadJWT(err)) {
          this.deleteAddress(address, coinCode);
        }
      } finally {
        this.isDeleteAddressLoading = false;
      }
    },
  },
  mounted() {
    if (this.isUserLoggedIn) {
      this.getAddressesData([]);
    }
  },
};
</script>

<style lang="scss" scoped>

  .btn-delete {
    color: $danger;
  }
</style>
