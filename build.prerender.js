module.exports = (api, options) => {
  api.registerCommand('build:prerender', async (args) => {
    const PrerenderSPAPlugin = require('prerender-spa-plugin');
    const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
    const path = require('path');
    const Butter = require('buttercms');
    const butter = Butter(process.env.VUE_APP_BUTTERCMS_API_TOKEN,
      false,
      process.env.VUE_APP_REQUEST_TIMEOUT);
    const learningCenterArticles = require('./src/constants/learningCenterArticles');

    // Trying to fetch all slugs of blog posts from ButterCMS
    // to include the slugs in routes for prerendering
    let blogRoutes = [];
    try {
      const res = await butter.post.list({ page_size: 200 });
      if (!res && res.length === 0) blogRoutes = [];
      blogRoutes = res.data.data.map(post => `/blog/${post.slug}`);
    } catch (err) {
      console.error(err);
    }

    const learningCenterSlugs = learningCenterArticles.map(article => `/learn-about-staking-wiki/${article.slug}`);

    api.chainWebpack((config) => {
      if (process.env.NODE_ENV !== 'production') return;
      config
        .plugin('html')
        .tap((args) => {
          args[0].template = path.join(__dirname, 'public', 'index.html');
          args[0].filename = 'app.html';
          return args;
        });
      config.plugin('prerender').use(PrerenderSPAPlugin, [{
        staticDir: path.join(__dirname, 'dist'), // The path to the folder where index.html is.
        indexPath: path.join(__dirname, './dist', 'app.html'),
        routes: [
          '/staking',
          '/sign-in',
          '/sign-up',
          '/tezos',
          '/cosmos',
          '/eos',
          '/decred',
          '/ark',
          '/harmony',
          '/icon',
          '/terra',
          '/kusama',
          '/solana',
          '/nebulas',
          '/fio',
          '/polkadot',
          '/eth2',
          '/blog',
        ].concat(blogRoutes).concat(learningCenterSlugs), // List of routes to prerender and adding the routes for blog posts.
        ignoreJSErrors: true,
        postProcess(context) {
          context.html = context.html.replace('id="app"', 'id="app" data-server-rendered="true"');
          return context;
        },
        renderer: new Renderer({
          renderAfterElementExists: '[data-view]',
          maxConcurrentRoutes: 1,
          // renderAfterTime: 5000,
          injectProperty: '__PRERENDER_INJECTED',
          inject: {
            prerendered: true,
          },
        }),
      }]);
    });

    await api.service.run('build', args);
  });
};

module.exports.defaultModes = {
  'build:prerender': 'production',
};
