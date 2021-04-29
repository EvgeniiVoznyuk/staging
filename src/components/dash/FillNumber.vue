<template>
  <b-card
    :header="'2. ' + $t('dash.fillNumber')"
    class="w-100">
    <b-form @submit.prevent="onSubmitPhoneConfirmationRequest">
      <b-form-group>
        <label for="phone">
          {{ $t('dash.pleaseEnterNumber') }}
        </label>
          <vue-tel-input id="phone"
                         v-model.trim="$v.phone.$model"
                         :enabledCountryCode="true"
                         :wrapperClasses="['tel-input-wrapper']"
                         :inputClasses="{'tel-input': true,
                                         'form-control': true,
                                         'is-invalid': $v.phone.$error,
                                         'is-valid': !$v.phone.$invalid}"
                         :validCharactersOnly="true"
                         :disabledFormatting="true"
                         :disabled="isPhoneSent"
                         :maxLen="14"
                         @country-changed="setPhoneCode">
          </vue-tel-input>
<!--        :state="{ 'is-invalid': $v.phone.$error }"-->
          <b-form-invalid-feedback :state="!$v.phone.$error">
            {{ $t('notifications.phoneIsRequired') }}
          </b-form-invalid-feedback>
        <div class="mt-3">
          <b-button type="submit" variant="warning">
            <template v-if="!isPhoneSent">
              {{ $t('common.sendCode') }}
            </template>
            <template v-else>
              {{ $t('common.resendCode') }}
            </template>
          </b-button>
        </div>
      </b-form-group>
    </b-form>

    <b-form v-if="isPhoneSent" @submit.prevent="onSubmitVerificationCode">
      <b-form-group>
        <label for="code">
          {{ $t('dash.verificationCode') }}
        </label>
        <b-form-input
          type="text"
          id="code"
          :class="{'is-invalid': $v.code.$error,
                   'is-valid': !$v.code.$invalid}"
          v-model.trim="$v.code.$model"
          :placeholder="$t('dash.verificationCode')">
        </b-form-input>
        <b-form-invalid-feedback>
          {{ $t('notifications.verificationCodeIsRequired') }}
        </b-form-invalid-feedback>
        <b-button type="submit" variant="warning" class="mt-3">
          {{ $t('dash.validate') }}
        </b-button>
      </b-form-group>
    </b-form>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex';
import VueTelInput from 'vue-tel-input';
import { validationMixin } from 'vuelidate';
import {
  required, maxLength, minLength, numeric,
} from 'vuelidate/lib/validators';

export default {
  name: 'FillNumber',
  mixins: [validationMixin],
  components: {
    VueTelInput,
  },
  validations: {
    phone: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(14),
      numeric,
    },
    code: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(6),
    },
  },
  notifications: {
    showSuccessfulMsg: {
      type: 'success',
    },
  },
  data() {
    return {
      phone: '',
      phoneCode: '',
      code: '',
      token: '',
      isPhoneSent: false,
      // isPhoneSent: true,
    };
  },
  computed: {
    isPhoneNumberValid() {
      return !this.$v.phone.$anyError;
    },
    isVerificationCodeValid() {
      return !this.$v.code.$anyError;
    },
  },
  methods: {
    ...mapActions({
      getPermissions: 'userService/getPermissions',
    }),
    validatePhoneNumber() {
      this.$v.phone.$touch();
      return this.isPhoneNumberValid;
    },
    validateVerificationCode() {
      this.$v.code.$touch();
      return this.isVerificationCodeValid;
    },
    setPhoneCode(val) {
      this.phoneCode = val.dialCode;
    },
    async requestPhoneConfirmation(data) {
      try {
        const response = await this.$userServiceApi.requestPhoneConfirmation(data);
        if (response.data) {
          this.showSuccessfulMsg({
            title: this.$t('notifications.success'),
            message: this.$t('notifications.countryIsVerified'),
          });
          this.isPhoneSent = true;
        }
      } catch (err) {
        this.$errors.handleErrors(err);
      }
    },
    onSubmitPhoneConfirmationRequest() {
      if (this.validatePhoneNumber()) {
        this.requestPhoneConfirmation({
          phone_code: +this.phoneCode,
          phone_number: this.phone,
        });
      }
    },
    async confirmPhone(verificationCode) {
      try {
        const response = await this.$userServiceApi.confirmPhone(verificationCode);
        if (response.data.message === 'success') {
          this.showSuccessfulMsg({
            title: this.$t('notifications.success'),
            message: this.$t('notifications.phoneIsConfirmed'),
          });
          this.getPermissions();
        }
      } catch (err) {
        this.$errors.handleErrors(err);
      }
    },
    onSubmitVerificationCode() {
      if (this.validateVerificationCode()) {
        this.confirmPhone({ verification_code: this.code });
      }
    },
  },
};
</script>

<style scoped>

</style>
