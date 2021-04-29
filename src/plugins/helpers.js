import ColorScheme from 'color-scheme';
import Vue from 'vue';
import constants from '@/constants';

export default {
  install(Vue, options) {
    Vue.prototype.$helpers = {
      roundWithPrecision(amount, precision) {
        return Math.round(+amount * +precision) / +precision;
      },
      capitalize(s) {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
      },
      countTill(counter, till = 7) {
        if (counter === till) return 0;
        return ++counter;
      },
      getCookieUuid() {
        const cookieUuid = Vue.prototype.$cookie.get('cookie_uuid');
        if (!cookieUuid) return null;
        return `id=${cookieUuid.split('&')[0]}&expdate=${cookieUuid.split('&')[1]}`;
      },
      formatTimestamp(timestamp) {
        return Vue.prototype.$moment(timestamp * 1000).format('DD.MM.YYYY');
      },
      generatePalette(hueColor) {
        const scheme = new ColorScheme();
        scheme.from_hue(hueColor)
          .scheme('tetrade')
          .distance(1)
          .add_complement(true)
          .variation('soft')
          .web_safe(true);

        const colors = scheme.colors();

        return colors.map(color => `#${color}`);
      },
      generateNColors(...arr) {
        return arr.reduce((acc, currentArg) => acc.concat(this.generatePalette(currentArg)), []);
      },
      hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        } : null;
      },
      generateChartLabels(data) {
        return data[Object.keys(data)[0]].map(point => Vue.prototype.$moment.utc(point.timestamp * 1000).format('DD.MM.YYYY'));
      },
      generateChartData(data) {
        const colors = this.generateNColors(141, 196, 0);

        return Object.keys(data).map((address, index) => {
          const currentRGBColor = this.hexToRgb(colors[index]);
          const { r, g, b } = currentRGBColor;
          return {
            label: address,
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`,
            borderColor: colors[index],
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: data[address].map(point => ({
              x: point.timestamp,
              y: `${point.value}`,
            })),
          };
        });
      },
      generateChartData2(data, labels) {
        const colors = this.generateNColors(141, 43, 196, 360, 60, 246, 111);
        return Object.keys(data).map((currencyCode, index) => {
          const indexBy3StepsAhead = index + 3;
          const currentRGBColor = this.hexToRgb(colors[indexBy3StepsAhead]);
          const { r, g, b } = currentRGBColor;
          return {
            label: currencyCode.toUpperCase(),
            backgroundColor: `rgba(${r}, ${g}, ${b}, 0.07)`,
            borderColor: colors[indexBy3StepsAhead],
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: data[currencyCode]
              .map(point => ({
                x: point.created_at,
                y: `${point.amount}`,
              })),
          };
        });
      },
      generateChartsData(data, coinName) {
        return [{
          label: coinName,
          borderColor: `rgba(${245}, ${190}, ${55}, 1)`,
          backgroundColor: `rgba(${245}, ${190}, ${55}, 0.1)`,
          borderWidth: 2,
          radius: 2,
          data: data.map(total => Number(total.value)),
        }];
      },
      generateChartsLabels(data) {
        return data.map(time => (
          Vue.prototype.$moment.unix(time.time).format('YYYY-MM-DD')
        ));
      },
      isPrerender() {
        if (window.__PRERENDER_INJECTED) return window.__PRERENDER_INJECTED.prerendered;
        return false;
      },
    };
  },
};
