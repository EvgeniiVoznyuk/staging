<template>
  <b-modal id="dashAddressModal"
           :title="$t('balance.addAddress')"
           hide-footer
           centered>
    <AddressForm v-if="currentVerificationStep === 1"
                 :isSingleCoin="true"
                 :coinsOptions="['Dash']"
                 @address="setAddress"
                 @selected-coin="setSelectedCoin"
                 :onSubmitMethod="onAddressSubmit">
      <template slot="submit-btn">
        <b-button class="mt-3"
                  variant="warning"
                  type="submit"
                  :disabled="isCreateDashAddressLoading">
          {{ $t('common.add') }}
        </b-button>
      </template>
    </AddressForm>
    <PayoutsSettings v-else-if="currentVerificationStep === 2"
                     :onSubmitMethod="onPayoutSubmit"
                     @is-enabled="setIsEnabled">
      <template slot="submit-btn">
        <b-button class="mt-3"
                  variant="warning"
                  type="submit"
                  :disabled="isSetDashAutoPayoutLoading">
          {{ $t('common.submit') }}
        </b-button>
      </template>
    </PayoutsSettings>
    <GetAddress
      v-else-if="currentVerificationStep === 3"
      class="align-items-stretch">
    </GetAddress>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AddressForm from '@/components/address/AddressForm.vue';
import PayoutsSettings from '@/components/dash/PayoutsSettings';
import GetAddress from '@/components/dash/GetAddress';
import coinGetter from '@/plugins/mixins/coinGetter';

export default {
  name: 'DashAddressModal',
  mixins: [coinGetter],
  components: {
    AddressForm,
    PayoutsSettings,
    GetAddress,
  },
  notifications: {
    showSuccessfulMsg: {
      type: 'success',
    },
    showErrorMsg: {
      type: 'error',
    },
  },
  data() {
    return {
      // verificationSteps: [1, 2, 3],
      currentVerificationStep: 1,
      address: '',
      selectedCoin: this.isSingleCoin ? this.coinsOptions[0] : '',
      isCreateDashAddressLoading: false,
      dashUserSettings: {},
      isEnabled: false,
      isSetDashAutoPayoutLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      availableAddresses: 'addressService/availableAddresses',
    }),
  },
  methods: {
    ...mapActions({
      getDashUserSettings: 'dashService/getDashUserSettings',
      getAddressesData: 'addressService/getAddressesData',
      requestRates: 'ratesService/requestRates',
      requestDailyTotalRewards: 'rewardsService/requestDailyTotalRewards',
    }),
    setAddress(res) {
      this.address = res;
    },
    setSelectedCoin(res) {
      this.selectedCoin = res;
    },
    setIsEnabled(res) {
      this.isEnabled = res;
    },
    async setDashAutoPayout(isEnabled) {
      try {
        this.isSetDashAutoPayoutLoading = true;
        const response = await this.$dashServiceApi.setDashAutoPayout({ auto_rewards_payout_enabled: isEnabled });
        if (response.data.message === 'success') {
          this.getDashUserSettings();
          this.currentVerificationStep = 3;
        }
      } catch (err) {
        this.$errors.handleErrors(err);
      } finally {
        this.isSetDashAutoPayoutLoading = false;
      }
    },
    async createDashAddress(addressData) {
      try {
        this.isCreateDashAddressLoading = true;
        const response = await this.$addressServiceApi.createAddress(addressData);

        if (response.data.message === 'success') {
          this.showSuccessfulMsg({
            title: this.$t('notifications.success'),
            message: this.$t('notifications.addressCreated'),
          });

          await this.getAddressesData([this.$_getCoinCodeByName(this.selectedCoin)]);
          this.requestDailyTotalRewards({
            addresses: this.availableAddresses,
            currency: this.$_getCoinCodeByName(this.selectedCoin),
          });

          this.currentVerificationStep = 2;
        }
      } catch (err) {
        this.$errors.handleErrors(err);
      } finally {
        this.isCreateDashAddressLoading = false;
      }
    },
    onAddressSubmit() {
      this.createDashAddress({
        // currency: this.$_getCoinCodeByName(this.selectedCoin.toLowerCase()),
        currency: this.$_getCoinCodeByName(this.selectedCoin),
        address: this.address,
      });
    },
    onPayoutSubmit() {
      this.setDashAutoPayout(this.isEnabled);
    },
  },
};
</script>

<style scoped>

</style>
