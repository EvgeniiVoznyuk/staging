<template>
  <b-modal id="dashKYCModal"
           :title="$t('common.verifyAccount')"
           hide-footer
           centered>
    <SelectCountry
      v-if="currentVerificationStep === 1"
      class="align-items-stretch">
    </SelectCountry>
    <FillNumber
      v-else-if="currentVerificationStep === 2"
      class="align-items-stretch">
    </FillNumber>
    <AgreeToTerms
      v-else-if="currentVerificationStep === 3"
      class="align-items-stretch">
    </AgreeToTerms>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SelectCountry from '@/components/dash/SelectCountry';
import FillNumber from '@/components/dash/FillNumber';
import AgreeToTerms from '@/components/dash/AgreeToTerms';

export default {
  name: 'DashKYCModal',
  components: {
    SelectCountry,
    FillNumber,
    AgreeToTerms,
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: 'userService/isUserLoggedIn',
      permissions: 'userService/permissions',
    }),
    currentVerificationStep() {
      // verificationSteps: [1, 2, 3],
      if (!this.permissions || Object.keys(this.permissions).length === 0) return 1;

      if (this.permissions.use_dash.need_to_pass.includes('country')) return 1;
      if (this.permissions.use_dash.need_to_pass.includes('phone')) return 2;
      if (this.permissions.use_dash.need_to_pass.includes('dash_terms_of_service')) return 3;

      return 1;
    },
  },
  methods: {
    ...mapActions({
      getPermissions: 'userService/getPermissions',
    }),
  },
  mounted() {
    if (this.isUserLoggedIn) {
      this.getPermissions();
    }
  },
};
</script>

<style scoped>

</style>
