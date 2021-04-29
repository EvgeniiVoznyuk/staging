import Vue from 'vue';
import i18n from '../i18n';
import constants from './index';

export default {
  items: [
    {
      name: i18n.t('common.home'),
      url: '/',
      icon: 'icon-home',
    },
    {
      name: i18n.t('common.balance'),
      url: '/balance',
      icon: 'icon-wallet',
    },
    {
      name: i18n.t('common.statistics'),
      url: '/statistics',
      icon: 'icon-list',
    },
    // {
    //   name: i18n.t('common.analytics'),
    //   url: '/analytics',
    //   icon: 'icon-graph',
    // },
    {
      name: i18n.t('common.whatIsStaking'),
      url: '/staking',
      icon: 'icon-question',
    },
    {
      name: i18n.t('common.blog'),
      url: '/blog',
      icon: 'icon-info',
    },
    {
      name: i18n.t('common.learningCenter'),
      url: '/learn-about-staking-wiki',
      icon: 'icon-info',
    },
    {
      name: i18n.t('home.coins'),
      url: '/base',
      icon: 'icon-briefcase',
      class: '',
      children: Object.keys(constants.COINS_MAP)
        .filter(coinCode => coinCode !== 'usd')
        .map(coinCode => ({
          name: constants.COINS_MAP[coinCode].name,
          url: constants.COINS_MAP[coinCode].url,
          icon: constants.COINS_MAP[coinCode].icon,
        })),
    },
    {
      name: i18n.t('common.signIn'),
      url: '/sign-in',
      icon: 'icon-login',
    },
    {
      name: i18n.t('common.signUp'),
      url: '/sign-up',
      icon: 'icon-user-follow',
    },
  ],
};
