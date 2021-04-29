export default {
  metaInfo: {
    title: 'Everstake — Staking Service Platform, Staking provider',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Everstake is a staking service platform that helps institutional investors and token holders to'
          + ' profit off their digital assets. Staking as a service.',
      },
      {
        vmid: 'og:title',
        property: 'og:title',
        content: 'Everstake — Staking Service Platform, Staking provider',
      },
      {
        vmid: 'og:description',
        property: 'og:description',
        content: 'Everstake is a staking service platform that helps institutional investors and token holders to'
          + ' profit off their digital assets. Staking as a service.',
      },
      {
        vmid: 'twitter:title',
        name: 'twitter:title',
        content: 'Everstake — Staking Service Platform, Staking provider',
      },
      {
        vmid: 'twitter:description',
        name: 'twitter:description',
        content: 'Everstake is a staking service platform that helps institutional investors and token holders to'
          + ' profit off their digital assets. Staking as a service.',
      },
    ],
    noscript: [
      // Google Tag Manager (noscript)
      {
        vmid: 'gtmNoscript',
        innerHTML:
          '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NWH2235" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
        pbody: true,
      },
      // End Google Tag Manager (noscript)
    ],
  },
  mounted() {
    // There's a big problem with adding external scripts to <head> with prerender.
    // If you try to add these scripts directly into index.html or with the help of VueMeta
    // the scripts are doubled in the output html files and there are a lot of incorrect behaviour
    // and errors (e.g. fbq is not defined or twttr is not defined).
    // This is the only working solution. Here we add all external scripts
    // only on the app level + we check if prerender process is working and we exclude adding
    // these scripts on the level of prerender.
    // <noscript> for google tag manager is added separately in VueMeta.

    // Facebook and Chatbot hack
    if (!this.$helpers.isPrerender()) {
      const gtmScript = document.createElement('script');
      gtmScript.innerHTML = '(function (w, d, s, l, i) {\n'
            + '    if (window._didAsyncInjectGoogleAnalytics) return;\n'
            + '    w[l] = w[l] || [];\n'
            + '    w[l].push({\n'
            + '      \'gtm.start\':\n'
            + '        new Date().getTime(), event: \'gtm.js\'\n'
            + '    });\n'
            + '    var f = d.getElementsByTagName(s)[0],\n'
            + '      j = d.createElement(s), dl = l != \'dataLayer\' ? \'&l=\' + l : \'\';\n'
            + '    j.async = true;\n'
            + '    j.src =\n'
            + '      \'https://www.googletagmanager.com/gtm.js?id=\' + i + dl;\n'
            + '    f.parentNode.insertBefore(j, f);\n'
            + '    window._didAsyncInjectGoogleAnalytics = true;\n'
            + '  })(window, document, \'script\', \'dataLayer\', \'GTM-NWH2235\');';
      document.head.appendChild(gtmScript);

      // Uncomment if the subscription is paid
      // const leadBoosterConfigScript = document.createElement('script');
      // leadBoosterConfigScript.innerHTML = 'window.pipedriveLeadboosterConfig = {base:'
      //   + ' \'leadbooster-chat.pipedrive.com\',companyId: 6016764,playbookId: 4339};';
      // document.head.appendChild(leadBoosterConfigScript);
      //
      // const leadboosterScript = document.createElement('script');
      // leadboosterScript.src = 'https://leadbooster-chat.pipedrive.com/assets/loader.js';
      // document.head.appendChild(leadboosterScript);
    }
    // End Facebook and Chatbot hack
  },
};
