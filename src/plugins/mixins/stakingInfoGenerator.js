import stakingInfoStructures from '../../constants/stakingInfoStructures';

export default {
  methods: {
    $_generateStakingInfo(coinCode, stakingInfoResponse, rates) {
      const usdRate = rates[coinCode] ? rates[coinCode].usd : '';
      return (stakingInfoStructures[coinCode] || []).map(coinField => ({
        name: this.$t(coinField.name),
        result: coinField.formatFunction(stakingInfoResponse[coinField.stakingInfoField], { usdRate }),
      }));
    },
  },
};
