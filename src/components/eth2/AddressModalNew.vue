<template>
  <b-modal id="AddressModal"
           :title="$t('balance.addAddress')"
           hide-footer
           centered>
    <AddressForm />
  </b-modal>
</template>

<script>
import AddressForm from '@/components/eth2/AddressFormNew.vue';

export default {
  name: 'AddressModalNew',
  components: {
    AddressForm,
  },
};
</script>
