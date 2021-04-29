import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('ethService', ['address']),
    $_generateLinkAddress() {
      return `https://beaconscan.com/validator/${this.address}`;
    },
  },
};
