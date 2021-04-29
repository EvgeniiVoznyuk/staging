import Vue from 'vue';

function subtractDaysFromToday(days) {
  const today = Vue.prototype.$moment.utc().startOf('day');
  return today.subtract(days, 'days').unix();
}

export default {
  xtz: [
    { amount: '3023.481', date: subtractDaysFromToday('31') },
    { amount: '2029.478', date: subtractDaysFromToday('30') },
    { amount: '2229.411', date: subtractDaysFromToday('29') },
    { amount: '2742.489', date: subtractDaysFromToday('28') },
    { amount: '1239.784', date: subtractDaysFromToday('27') },
    { amount: '2239.592', date: subtractDaysFromToday('26') },
    { amount: '1924.962', date: subtractDaysFromToday('25') },
    { amount: '2924.254', date: subtractDaysFromToday('24') },
    { amount: '1035.783', date: subtractDaysFromToday('23') },
    { amount: '1435.895', date: subtractDaysFromToday('22') },
    { amount: '1235.943', date: subtractDaysFromToday('21') },
    { amount: '1825.921', date: subtractDaysFromToday('20') },
    { amount: '1825.591', date: subtractDaysFromToday('19') },
    { amount: '2892.843', date: subtractDaysFromToday('18') },
    { amount: '2325.591', date: subtractDaysFromToday('17') },
    { amount: '2082.932', date: subtractDaysFromToday('16') },
    { amount: '2666.932', date: subtractDaysFromToday('15') },
    { amount: '3863.921', date: subtractDaysFromToday('14') },
    { amount: '3231.742', date: subtractDaysFromToday('13') },
    { amount: '3431.032', date: subtractDaysFromToday('12') },
    { amount: '4431.042', date: subtractDaysFromToday('11') },
    { amount: '3431.783', date: subtractDaysFromToday('10') },
    { amount: '2431.631', date: subtractDaysFromToday('9') },
    { amount: '1431.212', date: subtractDaysFromToday('8') },
    { amount: '2175.425', date: subtractDaysFromToday('7') },
    { amount: '1175.832', date: subtractDaysFromToday('6') },
    { amount: '912.983', date: subtractDaysFromToday('5') },
    { amount: '612.231', date: subtractDaysFromToday('4') },
    { amount: '0', date: subtractDaysFromToday('3') },
    { amount: '0', date: subtractDaysFromToday('2') },
    { amount: '213.452', date: subtractDaysFromToday('1') },
  ],
  atom: [
    { amount: '748.322', date: subtractDaysFromToday('31') },
    { amount: '793.462', date: subtractDaysFromToday('30') },
    { amount: '848.8952', date: subtractDaysFromToday('29') },
    { amount: '620.99344', date: subtractDaysFromToday('28') },
    { amount: '493.745', date: subtractDaysFromToday('27') },
    { amount: '493.745', date: subtractDaysFromToday('26') },
    { amount: '493.745', date: subtractDaysFromToday('25') },
    { amount: '523.355', date: subtractDaysFromToday('24') },
    { amount: '634.221', date: subtractDaysFromToday('23') },
    { amount: '756.255', date: subtractDaysFromToday('22') },
    { amount: '923.123', date: subtractDaysFromToday('21') },
    { amount: '978.883', date: subtractDaysFromToday('20') },
    { amount: '728.991', date: subtractDaysFromToday('19') },
    { amount: '877.821', date: subtractDaysFromToday('18') },
    { amount: '1027.195', date: subtractDaysFromToday('17') },
    { amount: '1234.235', date: subtractDaysFromToday('16') },
    { amount: '1127.347', date: subtractDaysFromToday('15') },
    { amount: '1010.678', date: subtractDaysFromToday('14') },
    { amount: '1310.295', date: subtractDaysFromToday('13') },
    { amount: '1231.219', date: subtractDaysFromToday('12') },
    { amount: '1477.834', date: subtractDaysFromToday('11') },
    { amount: '1677.722', date: subtractDaysFromToday('10') },
    { amount: '1507.754', date: subtractDaysFromToday('9') },
    { amount: '1602.992', date: subtractDaysFromToday('8') },
    { amount: '1823.954', date: subtractDaysFromToday('7') },
    { amount: '1665.832', date: subtractDaysFromToday('6') },
    { amount: '1577.952', date: subtractDaysFromToday('5') },
    { amount: '1899.241', date: subtractDaysFromToday('4') },
    { amount: '1988.764', date: subtractDaysFromToday('3') },
    { amount: '2125.466', date: subtractDaysFromToday('2') },
    { amount: '2460.644', date: subtractDaysFromToday('1') },
  ],
  // iris: [
  //   { amount: '1100.953', date: subtractDaysFromToday('31') },
  //   { amount: '1203.594', date: subtractDaysFromToday('30') },
  //   { amount: '1402.399', date: subtractDaysFromToday('29') },
  //   { amount: '942.233', date: subtractDaysFromToday('28') },
  //   { amount: '484.049', date: subtractDaysFromToday('27') },
  //   { amount: '800.322', date: subtractDaysFromToday('26') },
  //   { amount: '833.532', date: subtractDaysFromToday('25') },
  //   { amount: '623.293', date: subtractDaysFromToday('24') },
  //   { amount: '291.346', date: subtractDaysFromToday('23') },
  //   { amount: '249.864', date: subtractDaysFromToday('22') },
  //   { amount: '320.341', date: subtractDaysFromToday('21') },
  //   { amount: '790.356', date: subtractDaysFromToday('20') },
  //   { amount: '901.749', date: subtractDaysFromToday('19') },
  //   { amount: '877.821', date: subtractDaysFromToday('18') },
  //   { amount: '1424.721', date: subtractDaysFromToday('17') },
  //   { amount: '1361.218', date: subtractDaysFromToday('16') },
  //   { amount: '1406.674', date: subtractDaysFromToday('15') },
  //   { amount: '1602.282', date: subtractDaysFromToday('14') },
  //   { amount: '1032.673', date: subtractDaysFromToday('13') },
  //   { amount: '1753.281', date: subtractDaysFromToday('12') },
  //   { amount: '1345.931', date: subtractDaysFromToday('11') },
  //   { amount: '1489.732', date: subtractDaysFromToday('10') },
  //   { amount: '1524.983', date: subtractDaysFromToday('9') },
  //   { amount: '1621.422', date: subtractDaysFromToday('8') },
  //   { amount: '1883.632', date: subtractDaysFromToday('7') },
  //   { amount: '1890.785', date: subtractDaysFromToday('6') },
  //   { amount: '2021.353', date: subtractDaysFromToday('5') },
  //   { amount: '2102.731', date: subtractDaysFromToday('4') },
  //   { amount: '2302.674', date: subtractDaysFromToday('3') },
  //   { amount: '2011.954', date: subtractDaysFromToday('2') },
  //   { amount: '3002.632', date: subtractDaysFromToday('1') },
  // ],
};
