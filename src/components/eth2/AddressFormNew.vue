<template>
  <b-form action="#" @submit.prevent="onSubmit">
    <b-form-group>
      <b-input-group>
        <b-form-input type="text"
                      id="address"
                      name="address"
                      v-model.trim="$v.address.$model"
                      :class="{ 'form-control': true,
                                  'is-invalid': $v.address.$error,
                                  'is-valid': !$v.address.$invalid }"
                      :placeholder="$t('addAddress.enterAddress')"
                      autocomplete="off"
        />
        <b-form-invalid-feedback>
          {{ addressError[0] }}
        </b-form-invalid-feedback>
      </b-input-group>
      <b-button class="mt-3"
                variant="warning"
                type="submit"
                :disabled="$v.address.$anyError">
        {{ $t('common.add') }}
      </b-button>
    </b-form-group>
  </b-form>
</template>

<script>
import { mapMutations } from 'vuex';
import { validationMixin } from 'vuelidate';
import {
  required, minLength, maxLength, helpers,
} from 'vuelidate/lib/validators';

export default {
  name: 'AddressFormNew',
  mixins: [validationMixin],
  validations: {
    address: {
      required,
      startsWith: helpers.regex('latin', /^0x/),
      minLength: minLength(96),
      maxLength: maxLength(98),
      latin: helpers.regex('latin',
        /^[a-z0-9]+$/),
    },
  },
  data() {
    return {
      address: '',
    };
  },
  computed: {
    addressError() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;

      !this.$v.address.required && errors.push(this.$t('notifications.fieldRequired'));
      !this.$v.address.startsWith && errors.push(this.$t('notifications.ethStart'));
      !this.$v.address.latin && errors.push(this.$t('notifications.invalidAddress'));
      !this.$v.address.minLength && errors.push(this.$t('notifications.minmaxStringAddressEth'));
      !this.$v.address.maxLength && errors.push(this.$t('notifications.minmaxStringAddressEth'));
      return errors;
    },
    isValid() {
      return !this.$v.address.$anyError;
    },
  },
  methods: {
    ...mapMutations({
      setAddress: 'ethService/setAddress',
    }),
    validate() {
      this.$v.$touch();
      return this.isValid;
    },
    onSubmit() {
      if (this.validate()) {
        this.setAddress(this.address);
        this.$bvModal.hide('AddressModal');
      }
    },
  },
};
</script>
