import Vue from 'vue';
import Router from 'vue-router';
import addressService from '../api/addressService';

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer');

// Views
const Home = () => import('@/views/Home');
const Balance = () => import('@/views/Balance');
const Statistics = () => import('@/views/Statistics');
const Page404 = () => import('@/views/Page404');
const SignIn = () => import('@/views/authorization/SignIn');
const SignUp = () => import('@/views/authorization/SignUp');
const EmailNotVerified = () => import('@/views/email-verification/EmailNotVerified');
const EmailVerified = () => import('@/views/email-verification/EmailVerified');
const ResetPasswordRequest = () => import('@/views/authorization/ResetPasswordRequest');
const ResetPassword = () => import('@/views/authorization/ResetPassword');
const Profile = () => import('@/views/Profile');
const StakingPage = () => import('@/views/StakingPage');
const Terms = () => import('@/views/Terms/Terms');
// const Analytics = () => import('@/views/Analytics');
// Coin pages
const Tezos = () => import('@/views/coins/Tezos');
const Cosmos = () => import('@/views/coins/Cosmos');
const Icon = () => import('@/views/coins/Icon');
// Demo coins
const Eos = () => import('@/views/coins/demo-coins/Eos');
const Telos = () => import('@/views/coins/demo-coins/Telos');
const Near = () => import('@/views/coins/demo-coins/Near');
const Qtum = () => import('@/views/coins/demo-coins/Qtum');
const Elrond = () => import('@/views/coins/demo-coins/Elrond');
const Decred = () => import('@/views/coins/demo-coins/Decred');
const Ark = () => import('@/views/coins/demo-coins/Ark');
const Harmony = () => import('@/views/coins/demo-coins/Harmony');
const Terra = () => import('@/views/coins/demo-coins/Terra');
const Aion = () => import('@/views/coins/demo-coins/Aion');
const Kusama = () => import('@/views/coins/demo-coins/Kusama');
const Solana = () => import('@/views/coins/demo-coins/Solana');
const Nebulas = () => import('@/views/coins/demo-coins/Nebulas');
const Polkadot = () => import('@/views/coins/demo-coins/Polkadot');
const Fio = () => import('@/views/coins/demo-coins/Fio');
const Edgeware = () => import('@/views/coins/demo-coins/Edgeware');
const Cardano = () => import('@/views/coins/demo-coins/Cardano');
const Switcheo = () => import('@/views/coins/demo-coins/Switcheo');
const Oasis = () => import('@/views/coins/demo-coins/Oasis');
const Band = () => import('@/views/coins/demo-coins/Band');
const Chainlink = () => import('@/views/coins/demo-coins/Chainlink');
const Ethereum2 = () => import('@/views/coins/Ethereum2');
const Freeton = () => import('@/views/coins/demo-coins/Freeton');
const Skale = () => import('@/views/coins/demo-coins/Skale');
const Polygon = () => import('@/views/coins/demo-coins/Polygon');
const Zilliqa = () => import('@/views/coins/demo-coins/Zilliqa');
const Kichain = () => import('@/views/coins/demo-coins/Kichain');

// Blog
const BlogHome = () => import('@/views/blog/BlogHome');
const BlogPost = () => import('@/views/blog/BlogPost');

// Learning center
const LearningCenter = () => import('@/views/LearningCenter');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/index',
      redirect: '/',
      name: 'Index',
      component: DefaultContainer,
      children: [
        {
          path: '/sign-in',
          name: 'Sign in',
          component: SignIn,
        },
        {
          path: '/sign-up',
          name: 'Sign up',
          component: SignUp,
        },
        {
          path: '/email-not-verified/:token',
          name: 'Email not verified',
          component: EmailNotVerified,
        },
        {
          path: '/email-verified',
          name: 'Email verified',
          component: EmailVerified,
        },
        {
          path: '/reset-password-request',
          name: 'Reset password request',
          component: ResetPasswordRequest,
        },
        {
          path: '/reset-password/:token',
          name: 'Reset password',
          component: ResetPassword,
        },
        {
          path: '/balance',
          name: 'Balance',
          component: Balance,
        },
        {
          path: '/terms',
          name: 'Terms',
          component: Terms,
        },
        {
          path: '/statistics',
          name: 'Statistics',
          component: Statistics,
        },
        {
          path: '/profile',
          name: 'Profile',
          meta: {
            isAuthRequired: true,
          },
          component: Profile,
        },
        {
          path: '/tezos',
          name: 'Tezos',
          component: Tezos,
        },
        {
          path: '/cosmos',
          name: 'Cosmos',
          component: Cosmos,
        },
        {
          path: '/eos',
          name: 'Eos',
          component: Eos,
        },
        {
          path: '/telos',
          name: 'Telos',
          component: Telos,
          meta: {
            coinCode: 'tlos',
          },
        },
        {
          path: '/near',
          name: 'Near',
          component: Near,
          meta: {
            coinCode: 'near',
          },
        },
        {
          path: '/qtum',
          name: 'QTUM',
          component: Qtum,
          meta: {
            coinCode: 'qtum',
          },
        },
        {
          path: '/elrond',
          name: 'Elrond',
          component: Elrond,
          meta: {
            coinCode: 'egld',
          },
        },
        {
          path: '/decred',
          name: 'Decred',
          component: Decred,
        },
        {
          path: '/ark',
          name: 'ARK',
          component: Ark,
        },
        {
          path: '/harmony',
          name: 'Harmony',
          component: Harmony,
        },
        {
          path: '/icon',
          name: 'ICON',
          component: Icon,
          meta: {
            coinCode: 'icx',
          },
        },
        {
          path: '/terra',
          name: 'Terra',
          component: Terra,
          meta: {
            coinCode: 'luna',
          },
        },
        {
          path: '/aion',
          name: 'Aion',
          component: Aion,
        },
        {
          path: '/kusama',
          name: 'Kusama',
          component: Kusama,
          meta: {
            coinCode: 'ksm',
          },
        },
        {
          path: '/solana',
          name: 'Solana',
          component: Solana,
          meta: {
            coinCode: 'sol',
          },
        },
        {
          path: '/nebulas',
          name: 'Nebulas',
          component: Nebulas,
          meta: {
            coinCode: 'nas',
          },
        },
        {
          path: '/polkadot',
          name: 'Polkadot',
          component: Polkadot,
          meta: {
            coinCode: 'dot',
          },
        },
        {
          path: '/fio',
          name: 'Fio',
          component: Fio,
          meta: {
            coinCode: 'fio',
          },
        },
        {
          path: '/edgeware',
          name: 'Edgeware',
          component: Edgeware,
          meta: {
            coinCode: 'edg',
          },
        },
        {
          path: '/band',
          name: 'Band',
          component: Band,
          meta: {
            coinCode: 'band',
          },
        },
        {
          path: '/chainlink',
          name: 'Chainlink',
          component: Chainlink,
          meta: {
            coinCode: 'link',
          },
        },
        {
          path: '/cardano',
          name: 'Cardano',
          component: Cardano,
          meta: {
            coinCode: 'ada',
          },
        },
        {
          path: '/switcheo',
          name: 'Switcheo',
          component: Switcheo,
          meta: {
            coinCode: 'swth',
          },
        },
        {
          path: '/oasis',
          name: 'Oasis',
          component: Oasis,
          meta: {
            coinCode: 'rose',
          },
        },
        {
          path: '/eth2',
          name: 'ETH 2.0',
          component: Ethereum2,
        },
        {
          path: '/freeton',
          name: 'Free TON',
          component: Freeton,
          meta: {
            coinCode: 'ton',
          },
        },
        {
          path: '/skale',
          name: 'Skale',
          component: Skale,
          meta: {
            coinCode: 'skale',
          },
        },
        {
          path: '/polygon',
          name: 'Polygon',
          component: Polygon,
          meta: {
            coinCode: 'polygon',
          },
        },
        {
          path: '/zilliqa',
          name: 'Zilliqa',
          component: Zilliqa,
          meta: {
            coinCode: 'zilliqa',
          },
        },
        {
          path: '/kichain',
          name: 'Kichain',
          component: Kichain,
          meta: {
            coinCode: 'kichain',
          },
        },
      ],
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/staking',
      name: 'Staking',
      component: StakingPage,
    },
    {
      path: '/404',
      name: 'Page404',
      component: Page404,
    },
    {
      path: '/blog/',
      name: 'Blog',
      component: BlogHome,
    },
    {
      path: '/blog/:slug',
      name: 'BlogPost',
      component: BlogPost,
    },
    {
      path: '/learn-about-staking-wiki',
      redirect: 'learn-about-staking-wiki/about-everstake',
      name: 'Learning center',
      component: LearningCenter,
    },
    {
      path: '/learn-about-staking-wiki/:slug',
      name: 'Learning center article',
      component: LearningCenter,
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
});

const routesNamesRestrictedAfterLogin = [
  'Sign in',
  'Sign up',
  // 'Home',
  'Email not verified',
  'Email verified',
  'Reset password request',
  'Reset password',
];
/*
 There's an action dispatch of restoreJWT()
 in main.js to try to get JWT tokens before initializing the app
 */
router.beforeEach((to, from, next) => {
  // const isUserLoggedIn = store.getters['userService/isUserLoggedIn'];
  addressService.clearPendingRequests();
  const isUserLoggedIn = Vue.prototype.$store.getters['userService/isUserLoggedIn'];
  if (routesNamesRestrictedAfterLogin.includes(to.name)) {
    if (isUserLoggedIn) {
      next('/balance');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.isAuthRequired)) {
    if (!isUserLoggedIn) {
      next('/sign-in');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
