<template>
  <b-form action="#" @submit.prevent="onSubmit">
    <b-form-group>
      <b-form-select
        id="selectCoins"
        :options="coinsOptions"
        v-model.trim="$v.selectedCoin.$model"
        :class="{ 'is-invalid': $v.selectedCoin.$error,
                    'is-valid': !$v.selectedCoin.$invalid }"
        :plain="false"
        :disabled="isSingleCoin">
        <option disabled hidden value="">{{ $t('common.selectCoin') }}</option>
      </b-form-select>
      <b-form-invalid-feedback>
        {{ $t('notifications.countryIsRequired') }}
      </b-form-invalid-feedback>
    </b-form-group>

    <b-form-group>
      <b-input-group>
        <b-form-input type="text"
                      id="address"
                      v-model.trim="$v.address.$model"
                      :class="{ 'form-control': true,
                                  'is-invalid': $v.address.$error,
                                  'is-valid': !$v.address.$invalid }"
                      :placeholder="$t('addAddress.enterAddress')"
                      autocomplete="off"/>
        <b-form-invalid-feedback>
          {{ $t('addAddress.addressRequired') }}
          {{this.selectedCoin ? `and must contain ${this.validLength} characters` : '' }}
        </b-form-invalid-feedback>
      </b-input-group>
      <slot name="submit-btn"></slot>
    </b-form-group>
  </b-form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import constants from '@/constants';
import coinGetter from '@/plugins/mixins/coinGetter';

export default {
  name: 'AddressForm',
  mixins: [validationMixin, coinGetter],
  props: {
    isSingleCoin: {
      required: true,
      type: Boolean,
      default: false,
    },
    coinsOptions: {
      required: true,
    },
    onSubmitMethod: {

    },
  },
  validations() {
    if (this.selectedCoin) {
      return {
        address: {
          required,
          minLength: minLength(this.validLength),
          maxLength: maxLength(this.validLength),
        },
        selectedCoin: {
          required,
        },
      };
    }
    return {
      address: {
        required,
      },
      selectedCoin: {
        required,
      },
    };
  },
  data() {
    return {
      address: '',
      selectedCoin: this.isSingleCoin ? this.coinsOptions[0] : '',
    };
  },
  computed: {
    isValid() {
      return !this.$v.address.$anyError && !this.$v.selectedCoin.$anyError;
    },
    validLength() {
      return constants.COINS_MAP[this.coinCode].addressLength;
    },
    coinCode() {
      return this.$_getCoinCodeByName(this.selectedCoin);
    },
  },
  watch: {
    address: {
      immediate: true,
      handler(val) {
        this.$emit('address', val);
      },
    },
    selectedCoin: {
      immediate: true,
      handler(val) {
        this.$emit('selected-coin', val);
      },
    },
  },
  methods: {
    validate() {
      this.$v.$touch();
      return this.isValid;
    },
    onSubmit() {
      if (this.validate()) {
        this.onSubmitMethod();
      }
    },
  },
};
</script>

<style scoped>

</style>
