<template>
  <b-modal id="addressModal"
           :title="$t('balance.addAddress')"
           hide-footer
           centered>
    <AddressForm :isSingleCoin="isSingleCoin"
                 :coinsOptions="coinsOptions"
                 @address="setAddress"
                 @selected-coin="setSelectedCoin"
                 :onSubmitMethod="onSubmit">
      <template slot="submit-btn">
        <b-button class="mt-3"
                  variant="warning"
                  type="submit"
                  :disabled="isCreateAddressLoading">
          {{ $t('common.add') }}
        </b-button>
      </template>
    </AddressForm>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddressForm from '@/components/address/AddressForm.vue';
import coinGetter from '@/plugins/mixins/coinGetter';

export default {
  name: 'AddressModal',
  mixins: [coinGetter],
  components: {
    AddressForm,
  },
  notifications: {
    showSuccessfulMsg: {
      type: 'success',
    },
    showErrorMsg: {
      type: 'error',
    },
  },
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
  data() {
    return {
      address: '',
      selectedCoin: this.isSingleCoin ? this.coinsOptions[0] : '',
      isCreateAddressLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      availableAddresses: 'addressService/availableAddresses',
    }),
  },
  methods: {
    ...mapActions({
      getAddressesData: 'addressService/getAddressesData',
      requestDailyTotalRewards: 'rewardsService/requestDailyTotalRewards',
      requestRewardsByPeriod: 'rewardsServiceNew/requestRewardsByPeriod',
      requestRewardsHistory: 'rewardsServiceNew/requestRewardsHistory',
    }),
    setAddress(res) {
      this.address = res;
    },
    setSelectedCoin(res) {
      this.selectedCoin = res;
    },
    async createAddress(addressData) {
      try {
        this.isCreateAddressLoading = true;
        const response = await this.$addressServiceApi.createAddress(addressData);

        if (response.data.message === 'success') {
          this.showSuccessfulMsg({
            title: this.$t('notifications.success'),
            message: this.$t('notifications.addressCreated'),
          });

          if (this.isSingleCoin) {
            await this.getAddressesData([this.$_getCoinCodeByName(this.selectedCoin)]);
            this.requestDailyTotalRewards({
              addresses: this.availableAddresses,
              currency: this.$_getCoinCodeByName(this.selectedCoin),
            });
            if (this.$_getCoinCodeByName(this.selectedCoin) === 'xtz') {
              // the request is here instead of the dedicated component because it has to wait asynchronous change of the addresses!
              this.requestRewardsByPeriod({
                coinName: this.selectedCoin.toLowerCase(),
                params: {
                  period: 'month',
                  date_to: this.$moment(this.$moment().endOf('day')).utc().unix(),
                  date_from: this.$moment(this.$moment().startOf('day').subtract(30, 'months')).utc().unix(),
                  addresses: this.availableAddresses,
                },
              });
              // the request is here instead of the dedicated component because it has to wait asynchronous change of the addresses!
              this.requestRewardsHistory({
                coinName: this.selectedCoin.toLowerCase(),
                params: {
                  limit: 5,
                  offset: 0,
                  addresses: this.availableAddresses,
                },
              });
            }
          } else {
            await this.getAddressesData([]);
          }

          this.$bvModal.hide('addressModal');
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
          this.createAddress(addressData);
        }
      } finally {
        this.isCreateAddressLoading = false;
      }
    },
    onSubmit() {
      this.createAddress({
        currency: this.$_getCoinCodeByName(this.selectedCoin),
        address: this.address,
      });
    },
  },
};
</script>

<style scoped>

</style>
