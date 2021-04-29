import Vue from 'vue';
import constants from '.';

export default {
  xtz: [
    {
      name: 'common.totalStake',
      stakingInfoField: 'total_stake',
      formatFunction: value => (value ? Vue.prototype.$numeral(value).format('0,0') : '-----'),
    },
    {
      name: 'common.rolls',
      stakingInfoField: 'rolls',
      formatFunction: value => (value ? value.toString() : '-----'),
    },
    {
      name: 'common.uptime',
      stakingInfoField: 'uptime',
      formatFunction: (value) => {
        if (value || value === 0) {
          return `${value}%`;
        }
        return '100%';
      },
    },
    {
      name: 'common.rollsShare',
      stakingInfoField: 'rolls_share',
      formatFunction: value => (value ? `${value}%` : '-----'),
    },
    {
      name: 'common.status',
      stakingInfoField: 'status',
      formatFunction: value => value || 'Active',
    },
    {
      name: 'common.price',
      formatFunction: (value, options) => {
        const { usdRate } = options;
        if (!usdRate) {
          return '-----';
        }
        return `${Vue.prototype.$helpers.roundWithPrecision(usdRate, constants.USD_PRECISION)} $`;
      },
    },
  ],
  iost: [
    {
      name: 'common.totalStake',
      stakingInfoField: 'total_stake',
      formatFunction: value => (value ? Vue.prototype.$numeral(value).format('0,0') : '-----'),
    },
    {
      name: 'common.votes',
      stakingInfoField: 'votes',
      formatFunction: value => `${value}%` || '-----',
    },
    {
      name: 'common.uptime',
      stakingInfoField: 'uptime',
      formatFunction: (value) => {
        if (value || value === 0) {
          return `${value}%`;
        }
        return '100%';
      },
    },
    {
      name: 'common.blocksProduced',
      stakingInfoField: 'block_produced',
      formatFunction: value => (value ? Vue.prototype.$numeral(value).format('0,0') : '-----'),
    },
    {
      name: 'common.status',
      stakingInfoField: 'status',
      formatFunction: value => value || 'Active',
    },
    {
      name: 'common.price',
      formatFunction: (value, options) => {
        const { usdRate } = options;
        if (!usdRate) {
          return '-----';
        }
        // standard usd precision = 2
        // return `${Vue.prototype.$helpers.roundWithPrecision(usdRate, constants.USD_PRECISION)} $`;
        // usd precision of 3
        return `${Vue.prototype.$helpers.roundWithPrecision(usdRate, 1000)} $`;
      },
    },
  ],
  atom: [
    {
      name: 'common.totalStake',
      stakingInfoField: 'total_stake',
      formatFunction: value => (value ? Vue.prototype.$numeral(value).format('0,0') : '-----'),
    },
    {
      name: 'common.cumulativeShare',
      stakingInfoField: 'cummulative_share',
      formatFunction: value => (value ? `${value}%` : '-----'),
    },
    {
      name: 'common.uptime',
      stakingInfoField: 'uptime',
      formatFunction: (value) => {
        if (value || value === 0) {
          return `${value}%`;
        }
        return '100%';
      },
    },
    {
      name: 'common.missedBlocks',
      stakingInfoField: 'missed_blocks',
      formatFunction: value => (value ? Vue.prototype.$numeral(value).format('0,0') : '0'),
    },
    {
      name: 'common.status',
      stakingInfoField: 'status',
      formatFunction: value => value || 'Active',
    },
    {
      name: 'common.price',
      formatFunction: (value, options) => {
        const { usdRate } = options;
        if (!usdRate) {
          return '-----';
        }
        return `${Vue.prototype.$helpers.roundWithPrecision(usdRate, constants.USD_PRECISION)} $`;
      },
    },
  ],
  iris: [
    {
      name: 'common.totalStake',
      stakingInfoField: 'total_stake',
      formatFunction: value => (value ? Vue.prototype.$numeral(value).format('0,0') : '-----'),
    },
    {
      name: 'common.delegators',
      stakingInfoField: 'delegators',
      formatFunction: value => ((value || value === 0) ? value.toString() : '-----'),
    },
    {
      name: 'common.uptime',
      stakingInfoField: 'uptime',
      formatFunction: (value) => {
        if (value || value === 0) {
          return `${value}%`;
        }
        return '100%';
      },
    },
    {
      name: 'common.missedBlocks',
      stakingInfoField: 'missed_blocks',
      //TODO: remove hardcode, refactor stakingInfoGenerator to take i18n params for interpolation.
      formatFunction: value => (value ? Vue.prototype.$numeral(value).format('0,0') : '0 in 34560 blocks'),
    },
    {
      name: 'common.status',
      stakingInfoField: 'status',
      formatFunction: value => value || 'Active',
    },
    {
      name: 'common.price',
      formatFunction: (value, options) => {
        const { usdRate } = options;
        if (!usdRate) {
          return '-----';
        }
        return `${Vue.prototype.$helpers.roundWithPrecision(usdRate, constants.USD_PRECISION)} $`;
      },
    },
  ],
  dash: [
    {
      name: 'common.totalStake',
      stakingInfoField: 'cold_balance',
      formatFunction: (value, options) => {
        const { usdRate } = options;
        if (!usdRate) {
          return 0;
        }
        return `${Vue.prototype.$helpers.roundWithPrecision(value * usdRate, constants.USD_PRECISION)} $`;
      },
    },
    {
      name: 'dash.masternodeColdBalance',
      stakingInfoField: 'cold_balance',
      formatFunction: value => value || 5,
    },
    {
      name: 'dash.enabledMasternodes',
      stakingInfoField: 'enabled_master_nodes',
      formatFunction: value => value || 0,
    },
    {
      name: 'common.uptime',
      stakingInfoField: 'uptime',
      formatFunction: (value) => {
        if (value || value === 0) {
          return `${value}%`;
        }
        return '100%';
      },
    },
    {
      name: 'dash.needForMaternode',
      stakingInfoField: 'left_for_new_node',
      formatFunction: value => `${value} progress` || 0,
    },
    {
      name: 'common.price',
      formatFunction: (value, options) => {
        const { usdRate } = options;
        if (!usdRate) {
          return '-----';
        }
        return `${Vue.prototype.$helpers.roundWithPrecision(usdRate, constants.USD_PRECISION)} $`;
      },
    },
  ],
  icx: [
    {
      name: 'common.totalStake',
      stakingInfoField: 'total_stake',
      formatFunction: value => Vue.prototype.$helpers.roundWithPrecision(value, 100) || 5,
    },
    {
      name: 'common.uptime',
      stakingInfoField: 'uptime',
      formatFunction: (value) => {
        if (value || value === 0) {
          return `${value}%`;
        }
        return '100%';
      },
    },
    {
      name: 'common.missedBlocks',
      stakingInfoField: 'missed_blocks',
      formatFunction: value => (value ? Vue.prototype.$numeral(value).format('0,0') : '0'),
    },
    {
      name: 'common.status',
      stakingInfoField: 'status',
      formatFunction: value => value || 'Active',
    },
    {
      name: 'common.price',
      formatFunction: (value, options) => {
        const { usdRate } = options;
        if (!usdRate) {
          return '-----';
        }
        return `${Vue.prototype.$helpers.roundWithPrecision(usdRate, constants.USD_PRECISION)} $`;
      },
    },
  ],
  one: [
    {
      name: 'common.totalStake',
      stakingInfoField: 'total_stake',
      formatFunction: value => Vue.prototype.$numeral(Vue.prototype.$helpers.roundWithPrecision(value, 100)).format('0,0') || 0,
    },
    {
      name: 'common.uptime',
      stakingInfoField: 'uptime',
      formatFunction: (value) => {
        if (value || value === 0) {
          return `${value}%`;
        }
        return '100%';
      },
    },
    {
      name: 'common.status',
      stakingInfoField: 'status',
      formatFunction: value => value || 'Active',
    },
    {
      name: 'common.price',
      formatFunction: (value, options) => {
        const { usdRate } = options;
        if (!usdRate) {
          return '-----';
        }
        return `${Vue.prototype.$helpers.roundWithPrecision(usdRate, 1000)} $`;
      },
    },
  ],
  // iotx: [
  //   {
  //     name: 'common.liveVotes',
  //     stakingInfoField: 'live_votes',
  //     formatFunction: value => value || 0,
  //   },
  //   {
  //     name: 'common.uptime',
  //     stakingInfoField: 'uptime',
  //     formatFunction: (value) => {
  //       if (value || value === 0) {
  //         return `${value}%`;
  //       }
  //       return '100%';
  //     },
  //   },
  //   {
  //     name: 'common.percent',
  //     stakingInfoField: 'percent',
  //     formatFunction: value => (value ? `${value}%` : '-----'),
  //   },
  //   {
  //     name: 'common.rank',
  //     stakingInfoField: 'rank',
  //     formatFunction: value => value || '-----',
  //   },
  //   {
  //     name: 'common.status',
  //     stakingInfoField: 'status',
  //     formatFunction: value => value || 'Active',
  //   },
  //   {
  //     name: 'common.price',
  //     formatFunction: (value, options) => {
  //       const {usdRate} = options;
  //       if (!usdRate) {
  //         return '-----';
  //       }
  //       return `${Vue.prototype.$helpers.roundWithPrecision(usdRate, 1000)} $`;
  //     },
  //   },
  // ],
};
