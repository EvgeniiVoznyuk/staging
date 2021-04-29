module.exports = {
  publicPath: '/',
  lintOnSave: true,
  runtimeCompiler: true,
  productionSourceMap: false,

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },

  },

  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/_variables.scss";
        `,
      },
    },
  },
};
