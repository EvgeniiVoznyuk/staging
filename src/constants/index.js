// Import images
import Tezos from '../assets/img/coins-presentation/tezos.svg';
import Cosmos from '../assets/img/coins-presentation/cosmos.svg';
// import Iost from '../assets/img/coins-presentation/iost.svg';
// import Irisnet from '../assets/img/coins-presentation/irisnet.svg';
// import Dash from '../assets/img/coins-presentation/dash.svg';
import Icon from '@/assets/img/coins-presentation/icon.svg';

// import Waves from '../assets/img/coins-presentation/waves.svg';
import Eos from '../assets/img/coins-presentation/eos.svg';
import Telos from '../assets/img/coins-presentation/telos.svg';
import Near from '../assets/img/coins-presentation/near.svg';
// import Qtum from '../assets/img/coins-presentation/qtum.svg';
// import Decred from '../assets/img/coins-presentation/decred.svg';
import Fio from '../assets/img/coins-presentation/fio.svg';
// import Ark from '../assets/img/coins-presentation/ark.svg';
// import EtherZero from '../assets/img/coins-presentation/etherZero.svg';
// import Iotex from '../assets/img/coins-presentation/iotex.svg';
// import Algorand from '../assets/img/coins-presentation/algorand.svg';
import Harmony from '../assets/img/coins-presentation/harmony.svg';
// import Nkn from '../assets/img/coins-presentation/nkn.svg';
// import CyberWay from '../assets/img/coins-presentation/cyberway.svg';
import Terra from '../assets/img/coins-presentation/terra.svg';
// import Aion from '../assets/img/coins-presentation/aion.svg';
// import Remme from '../assets/img/coins-presentation/remme.svg';
// import Daobet from '../assets/img/coins-presentation/daobet.svg';
import Kusama from '../assets/img/coins-presentation/kusama.svg';
import Solana from '../assets/img/coins-presentation/solana.svg';
// import Nebulas from '../assets/img/coins-presentation/nebulas.svg';
import Polkadot from '../assets/img/coins-presentation/polkadot.svg';
import Cardano from '../assets/img/coins-presentation/cardano.svg';
import Qtum from '../assets/img/coins-presentation/qtum.svg';
import Elrond from '../assets/img/coins-presentation/elrond.svg';
import Switcheo from '../assets/img/coins-presentation/switcheo.svg';
import Edgeware from '../assets/img/coins-presentation/edgeware.svg';
import Band from '../assets/img/coins-presentation/band.svg';
import Oasis from '../assets/img/coins-presentation/oasis.svg';
import Chainlink from '../assets/img/coins-presentation/chainlink.svg';
import Ethereum from '../assets/img/coins-presentation/ethereum.svg';
import freeTon from '../assets/img/coins-presentation/freeTon.svg';
import Polygon from '../assets/img/coins-presentation/polygon.svg';
import Zilliqa from '../assets/img/coins-presentation/zilliqa.svg';
import Kichain from '../assets/img/coins-presentation/ki.svg';

export default {
  USD_PRECISION: 100,
  CRYPTO_MAX_PRECISION: 100000000,
  MAX_CHART_FIELDS: 31,
  MIN_USD_AMOUNT: 0.01,
  DASH_MASTERNODE_THRESHOLD: 1000,
  VARIANTS: [
    'success',
    'info',
    'secondary',
    // 'dark',
    'warning',
    'primary',
    'danger',
  ],
  AVAILABLE_COINS: [
    'Tezos',
    'Cosmos',
    // 'IOST',
    // 'IRISnet',
    // 'IoTeX',
    'ICON',
  ],
  REWARDS_CHART_COINS: [
    'xtz',
    'atom',
    // 'iost',
    // 'iris',
    'icx',
    'one',
  ],
  COINS_MAP: {
    xtz: {
      name: 'Tezos',
      // delegationAddress: 'tz1MXFrtZoaXckE41bjUCSjAjAap3AFDSr3N',
      delegationAddress: 'tz1aRoaRhSpRYvFdyvgWLL6TGyRoGF51wDjM',
      minDelegation: '10 XTZ',
      payoutsFrom: '0.001 XTZ',
      fee: '8%',
      yearlyEarning: 6.2,
      url: '/tezos',
      icon: 'ev-tezos',
      img: Tezos,
      addressLength: 36,
    },
    atom: {
      name: 'Cosmos',
      delegationAddress: 'cosmosvaloper1tflk30mq5vgqjdly92kkhhq3raev2hnz6eete3',
      fee: '5%',
      yearlyEarning: 9,
      url: '/cosmos',
      icon: 'ev-cosmos',
      img: Cosmos,
      addressLength: 45,
    },
    icx: {
      name: 'ICON',
      delegationAddress: 'hx8e6dcffdf06f850af5d372ac96389135e17d56d3',
      url: '/icon',
      img: Icon,
      fee: '0',
      icon: 'ev-icon',
      yearlyEarning: 12,
      addressLength: 42,
    },
    dot: {
      name: 'Polkadot',
      delegationAddress: '15XQrm3X1UtiBF1qBpwb5y9kMMyfK7PxgWhotAJPqv2r6YCD',
      yearlyEarning: 15,
      url: '/polkadot',
      icon: 'ev-polkadot',
      img: Polkadot,
    },
    ada: {
      name: 'Cardano',
      icon: 'ev-cardano',
      delegationAddress: 'e4abcf4408584601e7c707a8902996c0c291e1a3c8300b327ae3f6ab',
      img: Cardano,
      url: '/cardano',
      fee: '3%',
      yearlyEarning: 5.3,
    },
    near: {
      name: 'Near',
      yearlyEarning: 10,
      fee: '5%',
      url: '/near',
      icon: 'ev-near',
      img: Near,
    },
    ksm: {
      name: 'Kusama',
      delegationAddress: 'ESRBbWstgpPV1pVBsqjMo717rA8HLrtQvEUVwAGeFZyKcia',
      yearlyEarning: 15,
      fee: '10%',
      url: '/kusama',
      icon: 'ev-kusama',
      img: Kusama,
    },
    link: {
      name: 'Chainlink',
      url: '/chainlink',
      icon: 'ev-chainlink',
      img: Chainlink,
    },
    band: {
      name: 'Band',
      url: '/band',
      icon: 'ev-band',
      delegationAddress: 'bandvaloper1jyze35artdzs5nhvalt6jnatzhg5z88rfpmv27',
      img: Band,
      fee: '10%',
      yearlyEarning: 12,
    },
    rose: {
      name: 'Oasis',
      url: '/oasis',
      icon: 'ev-oasis',
      delegationAddress: 'oasis1qz8u0zqhcmgxalnjgwj6m0sg6wuy2vrsgyna2z7t',
      img: Oasis,
      fee: '15%',
      yearlyEarning: 10,
    },
    one: {
      name: 'Harmony',
      delegationAddress: 'one1aagrkq9vg49jm5xx22fvm4leg0lt48qeupexvu',
      fee: '12%',
      yearlyEarning: 12,
      url: '/harmony',
      icon: 'ev-harmony',
      img: Harmony,
    },
    sol: {
      name: 'Solana',
      yearlyEarning: 13,
      fee: '7%',
      url: '/solana',
      icon: 'ev-solana',
      delegationAddress: '9QU2QSxhb24FUX3Tu2FpczXjpK3VYrvRudywSZaM29mF',
      img: Solana,
    },
    egld: {
      name: 'Elrond',
      fee: '15%',
      // yearlyEarning: 29,
      url: '/elrond',
      icon: 'ev-elrond',
      img: Elrond,
    },
    // nas: {
    //   name: 'Nebulas',
    //   yearlyEarning: 3.3,
    //   url: '/nebulas',
    //   icon: 'ev-nebulas',
    //   delegationAddress: 'n1Jkdiq1H1HSXYJXtvDDkYm84Tmapo4hhMv',
    //   img: Nebulas,
    // },
    // iotx: {
    //   name: 'IoTeX',
    //   delegationAddress: '<a'
    //     + ' class="text-break"'
    //     + ' href="https://member.iotex.io/delegate/5cfe57253324884dff6c209f"'
    //     + ' target="_blank"'
    //     + ' rel="noopener noreferrer">member.iotex.io/delegate/5cfe57253324884dff6c209f</a>',
    //   fee: '10%',
    //   yearlyEarning: 7.95,
    //   url: '/iotex',
    //   icon: 'ev-iotex',
    //   img: Iotex,
    // },
    // iost: {
    //   name: 'IOST',
    //   delegationAddress: 'atticlab',
    //   fee: '4X',
    //   yearlyEarning: 11.36,
    //   url: '/iost',
    //   icon: 'ev-iost',
    //   img: Iost,
    // },
    swth: {
      name: 'Switcheo',
      delegationAddress: 'swthvaloper1re38akp4r4lx4aw3mnrergfz62cayp9pdvd0uq',
      yearlyEarning: 38,
      fee: '5%',
      url: 'switcheo',
      icon: 'ev-switcheo',
      img: Switcheo,
    },
    fio: {
      name: 'Fio',
      url: '/fio',
      icon: 'ev-fio',
      img: Fio,
    },
    edg: {
      name: 'Edgeware',
      url: '/edgeware',
      fee: '0%',
      delegationAddress: 'jjbqiv1Ruzqd6wg47Tf5FazyrYDHdaoTCirmJosiiLMKNg9',
      yearlyEarning: 20,
      icon: 'ev-edgeware',
      img: Edgeware,
    },
    // iris: {
    //   name: 'IRISnet',
    //   delegationAddress: 'iva1as5xxstv0kaay3dppuwau0mvyrxcqkad4vfzya',
    //   fee: '10%',
    //   yearlyEarning: 14.49,
    //   url: '/irisnet',
    //   icon: 'ev-irisnet',
    //   img: Irisnet,
    // },
    // cyber: {
    //   name: 'CyberWay',
    //   delegationAddress: 'atticlabcway',
    //   url: '/cyberway',
    //   img: CyberWay,
    //   fee: '10%',
    //   icon: 'ev-cyberway',
    //   // yearlyEarning: 12,
    //   minOwnStaked: '50.00k CYBER',
    // },
    // dash: {
    //   name: 'Dash',
    //   minDelegation: '10 DASH',
    //   fee: '15%',
    //   yearlyEarning: 6.41,
    //   url: '/dash',
    //   icon: 'ev-dash',
    //   img: Dash,
    // },
    eos: {
      name: 'Eos',
      yearlyEarning: 3,
      fee: '10%',
      url: '/eos',
      icon: 'ev-eos',
      img: Eos,
    },
    tlos: {
      name: 'Telos',
      yearlyEarning: 11,
      fee: '0%',
      url: '/telos',
      icon: 'ev-telos',
      img: Telos,
    },
    qtum: {
      name: 'QTUM',
      fee: '10%',
      yearlyEarning: 7.30,
      url: '/qtum',
      icon: 'ev-qtum',
      img: Qtum,
      delegationAddress: 'Qd2MmLh2skxSBF1mtzZYq9KCZWz8kY5dh3',
    },
    // ark: {
    //   name: 'ARK',
    //   delegationAddress: 'AafG8m3PvqrPfFHjJJGLYRa8B1XjVWEErq',
    //   fee: '5%',
    //   yearlyEarning: 8.75,
    //   url: '/ark',
    //   icon: 'ev-ark',
    //   img: Ark,
    // },
    // algo: {
    //   name: 'Algorand',
    //   yearlyEarning: 5.57,
    //   url: '/algorand',
    //   icon: 'ev-algorand',
    //   img: Algorand,
    // },
    // nkn: {
    //   name: 'NKN',
    //   delegationAddress: 'NKNXK58ahaCfaCs1x25hyZaz5ht7Qtpvj6Hz',
    //   fee: '5%',
    //   // templates
    //   // yearlyEarning: 1,
    //   url: '/nkn',
    //   icon: 'ev-nkn',
    //   img: Nkn,
    // },
    // etz: {
    //   name: 'EtherZero',
    //   // template
    //   // yearlyEarning: 1,
    //   url: '/ether-zero',
    //   icon: 'ev-etherzero',
    //   img: EtherZero,
    // },
    luna: {
      name: 'Terra',
      delegationAddress: 'terra13g7z3qq6f00qww3u4mpcs3xw5jhqwraswv3q3t',
      fee: '10%',
      yearlyEarning: 11,
      url: '/terra',
      icon: 'ev-terra',
      img: Terra,
    },
    // aion: {
    //   name: 'Aion',
    //   delegationAddress: '0xa0183ee3af2dace33798e309aa59f955cce7c1dd234bd1bdcf50098c91df7f39',
    //   // fee: '3%',
    //   yearlyEarning: 5.8,
    //   url: '/aion',
    //   icon: 'ev-aion',
    //   img: Aion,
    // },
    // rem: {
    //   name: 'Remme',
    //   delegationAddress: 'everstakerem',
    //   // fee: '3%',
    //   // yearlyEarning: 9.27,
    //   url: '/remme',
    //   icon: 'ev-remme',
    //   img: Remme,
    // },
    // bet: {
    //   name: 'DAOBet',
    //   delegationAddress: 'everstakedao',
    //   // fee: '3%',
    //   // yearlyEarning: 9.27,
    //   url: '/daobet',
    //   icon: 'ev-daobet',
    //   img: Daobet,
    // },
    eth: {
      name: 'ETH 2.0',
      delegationAddress: '',
      fee: '10%',
      yearlyEarning: 8,
      url: '/eth2',
      icon: 'ev-eth',
      img: Ethereum,
    },
    ton: {
      name: 'Free TON',
      delegationAddress: '',
      // fee: '10%',
      // yearlyEarning: 21,
      url: '/freeton',
      icon: 'ev-ton',
      img: freeTon,
    },
    skale: {
      name: 'Skale',
      delegationAddress: 'analytics.skalelabs.com',
      fee: '10%',
      yearlyEarning: 11,
      url: '/skale',
      icon: 'ev-skale',
      img: freeTon,
    },
    polygon: {
      name: 'Polygon',
      delegationAddress: 'wallet.matic.network/staking/validators/77',
      fee: '10%',
      yearlyEarning: 20,
      url: '/polygon',
      icon: 'ev-polygon',
      img: Polygon,
    },
    zilliqa: {
      name: 'Zilliqa',
      delegationAddress: 'zil1v4c80wxunfsrqr7gqh24ns99a7dam999xxkxnd',
      fee: '5%',
      yearlyEarning: 15,
      url: '/zilliqa',
      icon: 'ev-zilliqa',
      img: Zilliqa,
    },
    kichain: {
      name: 'Kichain',
      delegationAddress: 'kivaloper1dm98ttse9xefpgfzvl2wnq6hcrhx8ndxd4stz8',
      fee: '10%',
      yearlyEarning: 35,
      url: '/kichain',
      icon: 'ev-kichain',
      img: Kichain,
    },
    usd: {
      name: 'usd',
    },
  },
};
