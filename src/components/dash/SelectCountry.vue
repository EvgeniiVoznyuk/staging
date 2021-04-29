<template>
  <b-card
    :header="'1. ' + $t('dash.selectCountry')"
    class="w-100">
    <b-form @submit.prevent="onSubmit">
      <b-form-group>
        <label for="countries">
          {{ $t('dash.pleaseSelectCountry') }}
        </label>
<!--        :options="countries"-->
        <b-form-select
          id="countries"
          v-model.trim="$v.selectedCountry.$model"
          :class="{ 'is-invalid': $v.selectedCountry.$error,
                    'is-valid': !$v.selectedCountry.$invalid }">
          <option v-for="(item, index) in countries"
                  :key="index"
                  :value="item">
            {{ item.name }}
          </option>
        </b-form-select>
        <b-form-invalid-feedback>
          {{ $t('notifications.countryIsRequired') }}
        </b-form-invalid-feedback>
        <div class="my-2">
          {{ $t('dash.weAskForCountry') }}
        </div>
        <div>
          <b-button type="submit" variant="warning">
            {{ $t('common.save') }}
          </b-button>
        </div>
      </b-form-group>
    </b-form>
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'SelectCountry',
  mixins: [validationMixin],
  validations: {
    selectedCountry: {
      required,
    },
  },
  notifications: {
    showSuccessfulMsg: {
      type: 'success',
    },
  },
  data() {
    return {
      selectedCountry: '',
    };
  },
  computed: {
    ...mapGetters({
      countries: 'userService/countries',
    }),
    selectedCountryCode() {
      return typeof this.selectedCountry === 'object' ? this.selectedCountry.iso : '';
    },
    isValid() {
      return !this.$v.selectedCountry.$anyError;
    },
  },
  methods: {
    ...mapActions({
      getCountries: 'userService/getCountries',
      getPermissions: 'userService/getPermissions',
    }),
    validate() {
      this.$v.$touch();
      return this.isValid;
    },
    async saveCountry(countryCode) {
      try {
        const response = await this.$userServiceApi.saveCountry({ country: countryCode });
        if (response.data.message === 'success') {
          this.showSuccessfulMsg({
            title: this.$t('notifications.success'),
            message: this.$t('notifications.countryIsVerified'),
          });
          this.getPermissions();
        }
      } catch (err) {
        this.$errors.handleErrors(err);
      }
    },
    onSubmit() {
      if (this.validate()) {
        this.saveCountry(this.selectedCountryCode);
      }
    },
  },
  mounted() {
    this.getCountries();
  },
};
</script>

<style scoped>

</style>
