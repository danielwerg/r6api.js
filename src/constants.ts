export const ubiAppId = '3587dcbb-7f81-457c-9781-0e3f29f6f56a';

export const UBISERVICES_URL = 'https://public-ubiservices.ubi.com';
export const STATUS_URL = 'https://game-status-api.ubisoft.com';
export const UBI_URL = 'https://nimbus.ubisoft.com';

export const SPACE_IDS = <const>{
  uplay: '5172a557-50b5-4665-b7db-e3f2e8c5041d',
  psn: '05bfb3f7-6c21-4c42-be1f-97a33fb5cf66',
  xbl: '98a601e5-ca91-4440-b1c5-753f601a2c90'
};
export const SANDBOXES = <const>{
  uplay: 'OSBOR_PC_LNCH_A',
  psn: 'OSBOR_PS4_LNCH_A',
  xbl: 'OSBOR_XBOXONE_LNCH_A'
};

export const AVATARS_URL = 'https://ubisoft-avatars.akamaized.net';
export const CDN_URL = 'https://staticctf.akamaized.net';
export const GITHUB_ASSETS_URL = 'https://github.com/danielwerg/r6api.js/raw/master/assets';

export const PLATFORMS = <const>['uplay', 'psn', 'xbl'];
export const PLATFORMSALL = <const>[...PLATFORMS, 'steam', 'epic', 'amazon'];

// restructure this if pvp_newcomer will still return 500 in season 22
export const BOARDS = <const>{
  'pvp_ranked': { name: 'Ranked', seasonId: 6 },
  'pvp_newcomer': { name: 'Newcomer', seasonId: 12 },
  'pvp_casual': { name: 'Casual', seasonId: 15 },
  'pvp_event': { name: 'Event', seasonId: 16 }
};

export const REGIONS = <const>{
  'emea': 'Europe, Middle East and Africa',
  'ncsa': 'North, Central and South America',
  'apac': 'Asia Pacific'
};

export const OLD_SEASONS = <const>{
  1: {
    name: 'Black Ice',
    color: '#25768f',
    imageId: '67sZXc4UuXK2YPq8uj0mgE/6d0a5e1c6a342f5219cba2fc89e0ba14/r6s-seasons-y1s1',
    releaseDate: new Date('2016-02-02').toISOString()
  },
  2: {
    name: 'Dust Line',
    color: '#997427',
    imageId: '5u2ecpIe98X528KgYQiEt/5833e27e347176f5e041cc533d48ac95/r6s-seasons-y1s2',
    releaseDate: new Date('2016-05-10').toISOString()
  },
  3: {
    name: 'Skull Rain',
    color: '#396e2f',
    imageId: '2X0s4QopJikcMNN4qg9KPS/5ef0ae117679ee7b1342c776a77c9dd4/r6s-seasons-y1s3',
    releaseDate: new Date('2016-08-02').toISOString()
  },
  4: {
    name: 'Red Crow',
    color: '#971823',
    imageId: '66IKfs4aSnSkxaToTmmVBt/1532ccea8dd02b3ea44f254e4fdac27f/r6s-seasons-y1s4',
    releaseDate: new Date('2016-11-17').toISOString()
  },
  5: {
    name: 'Velvet Shell',
    color: '#5b2676',
    imageId: '5OKGWvBbiscdZNmjr0PP9q/f5cff0dae8546193f9601fcf703f7f0e/r6s-seasons-y2s1',
    releaseDate: new Date('2017-02-07').toISOString()
  }
};

export const SEASONS = <const>{
  6: {
    name: 'Health',
    color: '#00408f',
    imageId: '2w0kuPWW4vZS2MvHxpjgKL/527a78f482f03250f48ee05fabb843a9/r6s-seasons-y2s2',
    releaseDate: new Date('2017-06-07').toISOString()
  },
  7: {
    name: 'Blood Orchid',
    color: '#a22b16',
    imageId: '5Is8lRiLLAaU0Uaj46Bu5Z/d46a8652cdf16426b7c9a0d634442be5/r6s-seasons-y2s3',
    releaseDate: new Date('2017-09-05').toISOString()
  },
  8: {
    name: 'White Noise',
    color: '#005136',
    imageId: '6FvQKw65QzOqhVKxbjBg1Z/70ea9eb8865182504f74cfea10f88c0a/r6s-seasons-y2s4',
    releaseDate: new Date('2017-12-05').toISOString()
  },
  9: {
    name: 'Chimera',
    color: '#c18e00',
    imageId: '35ZyIYUW7odr1tiGyGNd8R/8a578688e5c46ed779a382c940bf270b/rainbow6siege-chimera-thumb_318068',
    releaseDate: new Date('2018-03-06').toISOString()
  },
  10: {
    name: 'Para Bellum',
    color: '#767f2e',
    imageId: '522ZBrBzlJMoTi63hrwuna/3f9007ceaa80b8110fa282937309ac1e/rainbow6siege_parabellum_thumb_323480',
    releaseDate: new Date('2018-06-07').toISOString()
  },
  11: {
    name: 'Grim Sky',
    color: '#36526e',
    imageId: '4y07zikRXB4BcyRQy5Anoe/2e6de56c3ea34cadb300326102963340/rainbow6siege_grimsky_thumb_333789',
    releaseDate: new Date('2018-09-04').toISOString()
  },
  12: {
    name: 'Wind Bastion',
    color: '#886a3f',
    imageId: '1VeuGBLdSsadK5MdLfCL9k/b9e213c4aeb8dfe6e1f137968770912a/rainbow6siege_windbastion_thumb_340468',
    releaseDate: new Date('2018-12-04').toISOString()
  },
  13: {
    name: 'Burnt Horizon',
    color: '#a80048',
    imageId: '4J2E0yJ2cZsKgx5OrFGkvR/0f966f31b3d8ad2ef13926b075769334/r6s-seasons-y4s1',
    releaseDate: new Date('2019-03-06').toISOString()
  },
  14: {
    name: 'Phantom Sight',
    color: '#263677',
    imageId: '29ze1Zxf173boRuyaFHuQV/c240df821c3ec407b09118c68a1300c0/r6s-seasons-y4s2',
    releaseDate: new Date('2019-06-11').toISOString()
  },
  15: {
    name: 'Ember Rise',
    color: '#114f07',
    imageId: '1JeHAGdUglVNSUUvSkxSia/1c8b76a4256091ca40434e89addaacf2/r6s-seasons-y4s3',
    releaseDate: new Date('2019-09-11').toISOString()
  },
  16: {
    name: 'Shifting Tides',
    color: '#067e8f',
    imageId: '6uZSbKGZiwF7Zv5egr4zks/5597030f075ad99c0a18a1dcea34ef87/r6s-seasons-y4s4',
    releaseDate: new Date('2019-12-03').toISOString()
  },
  17: {
    name: 'Void Edge',
    color: '#755377',
    imageId: '2584xuwMoCH1FJc9n34jLo/9dfec73fd217a889a7bfe66e1f412cd6/r6s-seasons-y5s1',
    releaseDate: new Date('2020-03-10').toISOString()
  },
  18: {
    name: 'Steel Wave',
    color: '#22667c',
    imageId: '4soZ80QzL9WoLqvq8Hz647/d8d70312ec2849c276b459c3ef0482cd/r6s-seasons-y5s2',
    releaseDate: new Date('2020-06-16').toISOString()
  },
  19: {
    name: 'Shadow Legacy',
    color: '#56840e',
    imageId: '5H87SAzADrzRmroVnJzuUE/2e73c489074b538055df0f793b4e1639/r6s-seasons-y5s3',
    releaseDate: new Date('2020-09-10').toISOString()
  },
  20: {
    name: 'Neon Dawn',
    color: '#a73306',
    imageId: '3vRTyOgSmwcUVxiOk60p3w/e2f41521df1f67704dae051d147a32cc/r6s-seasons-y5s4',
    releaseDate: new Date('2020-12-01').toISOString()
  },
  21: {
    name: 'Crimson Heist',
    color: '#8a0000',
    imageId: '7iKoGngda7z0LyYpTT25zM/116efeb1c65cb9a356a3e9a42abe2ae3/R6_live_Y6S1_CrimsonHeist',
    releaseDate: new Date('2021-03-16').toISOString()
  },
  22: {
    name: 'North Star',
    color: '#007d98',
    imageId: '38Lml8ltnO932wLqhC5xEA/493665084f757da8c91c01a0b99d2be3/r6s-seasons-y6s2',
    releaseDate: new Date('2021-06-14').toISOString()
  },
  23: {
    name: 'Crystal Guard',
    color: '#cc8200',
    imageId: '5Rm9sfgVTz9KdTI1Jh4N6w/c2d66a871b6311fe26198553695e0cd1/r6s-seasons-y6s3',
    releaseDate: new Date('2021-09-07').toISOString()
  },
  24: {
    name: 'High Calibre',
    color: '#465e1d',
    imageId: '4ysWCYtrfV6yEC10unxDeM/cdeb45fc738b78da77bb611b14ae7973/r6s-seasons-y6s4',
    releaseDate: new Date('2021-11-30').toISOString()
  }
};

/** ? Dust Line (2) - Skull Rain (3) */
export const RANKS_V1 = <const>[
  { name: 'Unranked', id: 0, range: [null, null] },
  { name: 'Copper 1', id: 1, range: [-Infinity, 2199] },
  { name: 'Copper 2', id: 2, range: [2200, 2399] },
  { name: 'Copper 3', id: 3, range: [2400, 2549] },
  { name: 'Copper 4', id: 4, range: [2550, 2699] },
  { name: 'Bronze 1', id: 5, range: [2700, 2799] },
  { name: 'Bronze 2', id: 6, range: [2800, 2899] },
  { name: 'Bronze 3', id: 7, range: [2900, 3049] },
  { name: 'Bronze 4', id: 8, range: [3050, 3199] },
  { name: 'Silver 1', id: 9, range: [3200, 3349] },
  { name: 'Silver 2', id: 10, range: [3350, 3519] },
  { name: 'Silver 3', id: 11, range: [3520, 3699] },
  { name: 'Silver 4', id: 12, range: [3700, 3929] },
  { name: 'Gold 1', id: 13, range: [3930, 4159] },
  { name: 'Gold 2', id: 14, range: [4160, 4399] },
  { name: 'Gold 3', id: 15, range: [4400, 4639] },
  { name: 'Gold 4', id: 16, range: [4640, 4899] },
  { name: 'Platinum 1', id: 17, range: [4900, 5159] },
  { name: 'Platinum 2', id: 18, range: [5160, 5449] },
  { name: 'Platinum 3', id: 19, range: [5450, 5999] },
  { name: 'Diamond', id: 20, range: [6000, Infinity] }
];

/** Red Crow (4) */
export const RANKS_V2 = <const>[
  { name: 'Unranked', id: 0, range: [null, null] },
  { name: 'Copper 1', id: 1, range: [-Infinity, 1399] },
  { name: 'Copper 2', id: 2, range: [1400, 1499] },
  { name: 'Copper 3', id: 3, range: [1500, 1599] },
  { name: 'Copper 4', id: 4, range: [1600, 1699] },
  { name: 'Bronze 1', id: 5, range: [1700, 1799] },
  { name: 'Bronze 2', id: 6, range: [1800, 1899] },
  { name: 'Bronze 3', id: 7, range: [1900, 1999] },
  { name: 'Bronze 4', id: 8, range: [2000, 2099] },
  { name: 'Silver 1', id: 9, range: [2100, 2199] },
  { name: 'Silver 2', id: 10, range: [2200, 2299] },
  { name: 'Silver 3', id: 11, range: [2300, 2399] },
  { name: 'Silver 4', id: 12, range: [2400, 2499] },
  { name: 'Gold 1', id: 13, range: [2500, 2599] },
  { name: 'Gold 2', id: 14, range: [2600, 2699] },
  { name: 'Gold 3', id: 15, range: [2700, 2700] },
  { name: 'Gold 4', id: 16, range: [2800, 2999] },
  { name: 'Platinum 1', id: 17, range: [3000, 3199] },
  { name: 'Platinum 2', id: 18, range: [3200, 3399] },
  { name: 'Platinum 3', id: 19, range: [3400, 3699] },
  { name: 'Diamond', id: 20, range: [3700, Infinity] }
];

/** Velvet Shell (5) - Phantom Sight (14) */
export const RANKS_V3 = <const>[
  { name: 'Unranked', id: 0, range: [null, null] },
  { name: 'Copper 4', id: 1, range: [-Infinity, 1399] },
  { name: 'Copper 3', id: 2, range: [1400, 1499] },
  { name: 'Copper 2', id: 3, range: [1500, 1599] },
  { name: 'Copper 1', id: 4, range: [1600, 1699] },
  { name: 'Bronze 4', id: 5, range: [1700, 1799] },
  { name: 'Bronze 3', id: 6, range: [1800, 1899] },
  { name: 'Bronze 2', id: 7, range: [1900, 1999] },
  { name: 'Bronze 1', id: 8, range: [2000, 2099] },
  { name: 'Silver 4', id: 9, range: [2100, 2199] },
  { name: 'Silver 3', id: 10, range: [2200, 2299] },
  { name: 'Silver 2', id: 11, range: [2300, 2399] },
  { name: 'Silver 1', id: 12, range: [2400, 2499] },
  { name: 'Gold 4', id: 13, range: [2500, 2699] },
  { name: 'Gold 3', id: 14, range: [2700, 2899] },
  { name: 'Gold 2', id: 15, range: [2900, 3099] },
  { name: 'Gold 1', id: 16, range: [3100, 3299] },
  { name: 'Platinum 3', id: 17, range: [3300, 3699] },
  { name: 'Platinum 2', id: 18, range: [3700, 4099] },
  { name: 'Platinum 1', id: 19, range: [4100, 4499] },
  { name: 'Diamond', id: 20, range: [4500, Infinity] }
];

/** Ember Rise (15) - North Star (22) */
export const RANKS_V4 = <const>[
  { name: 'Unranked', id: 0, range: [null, null] },
  { name: 'Copper 5', id: 1, range: [-Infinity, 1199] },
  { name: 'Copper 4', id: 2, range: [1200, 1299] },
  { name: 'Copper 3', id: 3, range: [1300, 1399] },
  { name: 'Copper 2', id: 4, range: [1400, 1499] },
  { name: 'Copper 1', id: 5, range: [1500, 1599] },
  { name: 'Bronze 5', id: 6, range: [1600, 1699] },
  { name: 'Bronze 4', id: 7, range: [1700, 1799] },
  { name: 'Bronze 3', id: 8, range: [1800, 1899] },
  { name: 'Bronze 2', id: 9, range: [1900, 1999] },
  { name: 'Bronze 1', id: 10, range: [2000, 2099] },
  { name: 'Silver 5', id: 11, range: [2100, 2199] },
  { name: 'Silver 4', id: 12, range: [2200, 2299] },
  { name: 'Silver 3', id: 13, range: [2300, 2399] },
  { name: 'Silver 2', id: 14, range: [2400, 2499] },
  { name: 'Silver 1', id: 15, range: [2500, 2599] },
  { name: 'Gold 3', id: 16, range: [2600, 2799] },
  { name: 'Gold 2', id: 17, range: [2800, 2999] },
  { name: 'Gold 1', id: 18, range: [3000, 3199] },
  { name: 'Platinum 3', id: 19, range: [3200, 3599] },
  { name: 'Platinum 2', id: 20, range: [3600, 3999] },
  { name: 'Platinum 1', id: 21, range: [4000, 4399] },
  { name: 'Diamond', id: 22, range: [4400, 4999] },
  { name: 'Champions', id: 23, range: [5000, Infinity] }
];

/** Crystal Guard (23) - latest */
export const RANKS_V5 = <const>[
  { name: 'Unranked', id: 0, range: [null, null] },
  { name: 'Copper 5', id: 1, range: [-Infinity, 1199] },
  { name: 'Copper 4', id: 2, range: [1200, 1299] },
  { name: 'Copper 3', id: 3, range: [1300, 1399] },
  { name: 'Copper 2', id: 4, range: [1400, 1499] },
  { name: 'Copper 1', id: 5, range: [1500, 1599] },
  { name: 'Bronze 5', id: 6, range: [1600, 1699] },
  { name: 'Bronze 4', id: 7, range: [1700, 1799] },
  { name: 'Bronze 3', id: 8, range: [1800, 1899] },
  { name: 'Bronze 2', id: 9, range: [1900, 1999] },
  { name: 'Bronze 1', id: 10, range: [2000, 2099] },
  { name: 'Silver 5', id: 11, range: [2100, 2199] },
  { name: 'Silver 4', id: 12, range: [2200, 2299] },
  { name: 'Silver 3', id: 13, range: [2300, 2399] },
  { name: 'Silver 2', id: 14, range: [2400, 2499] },
  { name: 'Silver 1', id: 15, range: [2500, 2599] },
  { name: 'Gold 3', id: 16, range: [2600, 2799] },
  { name: 'Gold 2', id: 17, range: [2800, 2999] },
  { name: 'Gold 1', id: 18, range: [3000, 3199] },
  { name: 'Platinum 3', id: 19, range: [3200, 3499] },
  { name: 'Platinum 2', id: 20, range: [3500, 3799] },
  { name: 'Platinum 1', id: 21, range: [3800, 4099] },
  { name: 'Diamond 3', id: 22, range: [4100, 4399] },
  { name: 'Diamond 2', id: 23, range: [4400, 4699] },
  { name: 'Diamond 1', id: 24, range: [4700, 4999] },
  { name: 'Champions', id: 25, range: [5000, Infinity] }
];

export const OPERATORS = {
  'recruit_sas': {
    name: 'Recruit SAS',
    id: '1:1',
    role: 'recruit',
    unit: 'SAS',
    uniqueAbility: null
  },
  'recruit_fbi': {
    name: 'Recruit FBI SWAT',
    id: '1:2',
    role: 'recruit',
    unit: 'FBI SWAT',
    uniqueAbility: null
  },
  'recruit_gign': {
    name: 'Recruit GIGN',
    id: '1:3',
    role: 'recruit',
    unit: 'GIGN',
    uniqueAbility: null
  },
  'recruit_spetsnaz': {
    name: 'Recruit Spetsnaz',
    id: '1:4',
    role: 'recruit',
    unit: 'Spetsnaz',
    uniqueAbility: null
  },
  'recruit_gsg9': {
    name: 'Recruit GSG 9',
    id: '1:5',
    role: 'recruit',
    unit: 'GSG 9',
    uniqueAbility: null
  },
  'smoke': {
    name: 'Smoke',
    id: '2:1',
    role: 'defender',
    unit: 'SAS',
    uniqueAbility: {
      name: 'Remote Gas Grenade',
      iconId: '3ZbADU6FxBqdvcA8vCpYhn/6c69d61202364fa420e2a319d817c6f3/Remote-Gas-Grenade',
      stats: [
        { name: 'Kills with Poison Gas', id: 'smoke_poisongaskill' }
      ]
    }
  },
  'mute': {
    name: 'Mute',
    id: '3:1',
    role: 'defender',
    unit: 'SAS',
    uniqueAbility: {
      name: 'Signal Disruptor',
      iconId: '1M5fsUELbaAzImzMte2ESa/9de588693ec317c87ef1a2021bd43b86/Signal-Disruptor',
      stats: [
        { name: 'Jammers deployed', id: 'mute_jammerdeployed' },
        { name: 'Gadgets jammed', id: 'mute_gadgetjammed' }
      ]
    }
  },
  'sledge': {
    name: 'Sledge',
    id: '4:1',
    role: 'attacker',
    unit: 'SAS',
    uniqueAbility: {
      name: 'Tactical Breaching Hammer',
      iconId: '2Vyo9CrQ1J7IZe43XpT4pV/4bc02e829d1b1745b9a527ff34f8fafb/Tactical-Breaching-Hammer',
      stats: [
        { name: 'Destruction by Breaching Hammer', id: 'sledge_hammerhole' },
        { name: 'Kills with Breaching Hammer', id: 'sledge_hammerkill' }
      ]
    }
  },
  'thatcher': {
    name: 'Thatcher',
    id: '5:1',
    role: 'attacker',
    unit: 'SAS',
    uniqueAbility: {
      name: 'EMP Grenade',
      iconId: '4p4srpOH4sq55OHryHhn5t/d31728d1432ed28c429ea566caf0e083/EMP-Grenade',
      stats: [
        { name: 'Gadgets disabled by EMP', id: 'thatcher_gadgetdisablewithemp' }
      ]
    }
  },
  'castle': {
    name: 'Castle',
    id: '2:2',
    role: 'defender',
    unit: 'FBI SWAT',
    uniqueAbility: {
      name: 'Armor Panel',
      iconId: '29N9nMqB8ZZxGCPz128ccD/439cb1fcb2f6d5385378cf073a5fbc30/Armor-Panel',
      stats: [
        { name: 'Armor Panels deployed', id: 'castle_kevlarbarricadedeployed' }
      ]
    }
  },
  'pulse': {
    name: 'Pulse',
    id: '4:2',
    role: 'defender',
    unit: 'FBI SWAT',
    uniqueAbility: {
      name: 'Heartbeat Sensor',
      iconId: '7dPXIadD3D2a3uEqrCPvj2/103ad9d0d3b71adee3b92a5db96fe24d/Heartbeat-Sensor',
      stats: [
        { name: 'Enemies spotted by Heartbeat Sensor', id: 'pulse_heartbeatspot' },
        { name: 'Heartbeat Sensor assists', id: 'pulse_heartbeatassist' }
      ]
    }
  },
  'ash': {
    name: 'Ash',
    id: '3:2',
    role: 'attacker',
    unit: 'FBI SWAT',
    uniqueAbility: {
      name: 'Breaching Rounds',
      iconId: '0114WqhzsMsnvaKc4FypkN/5ebb9b86e216a2d9e6b2ea01eb3346e8/Breaching-Rounds',
      stats: [
        { name: 'Kills with Breaching Round', id: 'ash_bonfirekill' },
        { name: 'Destruction by Breaching Round', id: 'ash_bonfirewallbreached' }
      ]
    }
  },
  'thermite': {
    name: 'Thermite',
    id: '5:2',
    role: 'attacker',
    unit: 'FBI SWAT',
    uniqueAbility: {
      name: 'Exothermic Charge',
      iconId: 'R5giHT90R2XOMMuUENZeK/840a5a391ed57a0c62208e72258407a7/Exothermic-Charge',
      stats: [
        { name: 'Exothermic Charge deployed', id: 'thermite_chargedeployed' },
        { name: 'Reinforcements Breached by Exothermic Charge', id: 'thermite_reinforcementbreached' },
        { name: 'Kills with Exothermic Charge', id: 'thermite_chargekill' }
      ]
    }
  },
  'doc': {
    name: 'Doc',
    id: '2:3',
    role: 'defender',
    unit: 'GIGN',
    uniqueAbility: {
      name: 'Stim Pistol',
      iconId: '7njaeUjJj27iYH27HnH6jn/c5533d2d7191b879c313013f278f5f59/Stim-Pistol',
      stats: [
        { name: 'Teammates revived', id: 'doc_teammaterevive' },
        { name: 'Self revives', id: 'doc_selfrevive' },
        { name: 'Hostages revived', id: 'doc_hostagerevive' }
      ]
    }
  },
  'rook': {
    name: 'Rook',
    id: '3:3',
    role: 'defender',
    unit: 'GIGN',
    uniqueAbility: {
      name: 'Armor Pack',
      iconId: 'MeoKw7iPY6EFYvjS07CRg/b2d7eba623f3c63d6b7097a8f2253954/Armor-Pack',
      stats: [
        { name: 'Armor Packs deployed', id: 'rook_armorboxdeployed' },
        { name: 'Armor Plate taken by teammates', id: 'rook_armortakenteammate' },
        { name: 'Armor Plate taken for self', id: 'rook_armortakenourself' }
      ]
    }
  },
  'twitch': {
    name: 'Twitch',
    id: '4:3',
    role: 'attacker',
    unit: 'GIGN',
    uniqueAbility: {
      name: 'Shock Drones',
      iconId: '5dZ9kaUfUSF3piuFIUKf2t/7ebfc51caee42a776492b56251d45d92/Shock-Drones',
      stats: [
        { name: 'Gadgets destroyed by Shock Drone', id: 'twitch_gadgetdestroybyshockdrone' },
        { name: 'Kills with Shock Drone', id: 'twitch_shockdronekill' }
      ]
    }
  },
  'montagne': {
    name: 'Montagne',
    id: '5:3',
    role: 'attacker',
    unit: 'GIGN',
    uniqueAbility: {
      name: 'Extendable Shield',
      iconId: '254sLdgp9a9DMExPZFK0ai/95e8b1c2865f0923fd80e15d8830eb46/Extendable-Shield',
      stats: [
        { name: 'Damage blocked by Extendable Shield', id: 'montagne_shieldblockdamage' }
      ]
    }
  },
  'kapkan': {
    name: 'Kapkan',
    id: '4:4',
    role: 'defender',
    unit: 'Spetsnaz',
    uniqueAbility: {
      name: 'Entry Denial Device',
      iconId: 'FLgwGbMiZTrWcK62KxPq8/d4e584420f85fa61c09e5e57e12d9dd9/Entry-Denial-Device',
      stats: [
        { name: 'EDD deployed', id: 'kapkan_boobytrapdeployed' },
        { name: 'Kills with EDD', id: 'kapkan_boobytrapkill' }
      ]
    }
  },
  'tachanka': {
    name: 'Tachanka',
    id: '5:4',
    role: 'defender',
    unit: 'Spetsnaz',
    uniqueAbility: {
      name: 'Shumikha Launcher',
      iconId: '37wX75QnY7XA6KbjM4aF5n/0ab116d398cf71463e11d43913818ec1/Shumikha-Launcher',
      stats: [
        { name: 'Mounted LMG deployed', id: 'tachanka_turretdeployed' },
        { name: 'Kills with Mounted LMG', id: 'tachanka_turretkill' }
      ]
    }
  },
  'glaz': {
    name: 'Glaz',
    id: '2:4',
    role: 'attacker',
    unit: 'Spetsnaz',
    uniqueAbility: {
      name: 'Flip Sight',
      iconId: '73bNPGhlIuhlWvi497sYqE/b68414436088f62f9da44cd42f702df7/Flip-Sight',
      stats: [
        { name: 'Kills with Sniper Rifle', id: 'glaz_sniperkill' },
        { name: 'Penetration kills with Sniper Rifle', id: 'glaz_sniperpenetrationkill' }
      ]
    }
  },
  'fuze': {
    name: 'Fuze',
    id: '3:4',
    role: 'attacker',
    unit: 'Spetsnaz',
    uniqueAbility: {
      name: 'Cluster Charge',
      iconId: '3YaoPPUbFYeVSCemdj57EL/a4a4a8c0a935640f7d9a1d1ea82bc48c/Cluster-Charge',
      stats: [
        { name: 'Kills with Cluster Charge', id: 'fuze_clusterchargekill' }
      ]
    }
  },
  'jager': {
    name: 'Jäger',
    id: '4:5',
    role: 'defender',
    unit: 'GSG 9',
    uniqueAbility: {
      name: 'Active Defense System',
      iconId: '1YCujceutAcJ7F10yhHC41/c5f870e7789b6396c9997ed45ccd3beb/Active-Defense-System',
      stats: [
        { name: 'Gadget destroyed by ADS', id: 'jager_gadgetdestroybycatcher' }
      ]
    }
  },
  'bandit': {
    name: 'Bandit',
    id: '5:5',
    role: 'defender',
    unit: 'GSG 9',
    uniqueAbility: {
      name: 'Shock Wire',
      iconId: '129HTNU2A5kIcMj0KZ5UjU/858b60dd0e9b8692e2dc693eded50e14/Shock-Wire',
      stats: [
        { name: 'Kills with Shock Wire', id: 'bandit_batterykill' }
      ]
    }
  },
  'blitz': {
    name: 'Blitz',
    id: '2:5',
    role: 'attacker',
    unit: 'GSG 9',
    uniqueAbility: {
      name: 'Flash Shield',
      iconId: '7EXDIOjPFMhPKZWY5OcEQC/f2df48ebe5673dca7773d81efd940b66/Flash-Shield',
      stats: [
        { name: 'Enemies blinded by Flash Shield', id: 'blitz_flashedenemy' },
        { name: 'Post-flash follow up kills', id: 'blitz_flashfollowupkills' },
        { name: 'Post-flash assisted kills', id: 'blitz_flashshieldassist' }
      ]
    }
  },
  'iq': {
    name: 'IQ',
    id: '3:5',
    role: 'attacker',
    unit: 'GSG 9',
    uniqueAbility: {
      name: 'Electronics Detector',
      iconId: '23Nk2ie06rb3DcZnStryIY/e06226196dd582c905c33fad87dfdd63/Electronics-Detector',
      stats: [
        { name: 'Gadgets spotted by Electronics Detector', id: 'iq_gadgetspotbyef' }
      ]
    }
  },
  'frost': {
    name: 'Frost',
    id: '3:6',
    role: 'defender',
    unit: 'JTF2',
    uniqueAbility: {
      name: 'Welcome Mat',
      iconId: 'xsIzH7XCAqvn7F3tEfAPe/c41e59a9d7f2ed7ee38b16ed0a882351/Welcome-Mate',
      stats: [
        { name: 'Enemies caught in Welcome Mats', id: 'frost_dbno' },
        { name: 'Kills with Welcome Mats', id: 'frost_beartrap_kill' } // pve only
      ]
    }
  },
  'buck': {
    name: 'Buck',
    id: '2:6',
    role: 'attacker',
    unit: 'JTF2',
    uniqueAbility: {
      name: 'Skeleton Key',
      iconId: '2w8EQtN4FFtEMa9lBYyWGg/36bbc6d819761c11418c868d2e483991/Skeleton-Key',
      stats: [
        { name: 'Kills with Skeleton Key', id: 'buck_kill' }
      ]
    }
  },
  'valkyrie': {
    name: 'Valkyrie',
    id: '3:7',
    role: 'defender',
    unit: 'Navy SEALs',
    uniqueAbility: {
      name: 'Black Eye',
      iconId: '1EPfd4xeuMpt5nItOYm2Eb/b59223248a508d205264ece3c3553d36/Black-Eye',
      stats: [
        { name: 'Black Eye cameras deployed', id: 'valkyrie_camdeployed' }
      ]
    }
  },
  'blackbeard': {
    name: 'Blackbeard',
    id: '2:7',
    role: 'attacker',
    unit: 'Navy SEALs',
    uniqueAbility: {
      name: 'Rifle Shield',
      iconId: '2dZeBTlDDdFQKb4PYb8F5v/162d60178a75cde9f65be362eacc880a/Rifle-Shield',
      stats: [
        { name: 'Damage blocked by Rifle Shield', id: 'blackbeard_gunshieldblockdamage' }
      ]
    }
  },
  'caveira': {
    name: 'Caveira',
    id: '3:8',
    role: 'defender',
    unit: 'BOPE',
    uniqueAbility: {
      name: 'Silent Step',
      iconId: '6PTsBBBGTT5oixxzvYv1Y4/18e31c74ba1ca73ed2694134acd9c078/Silent-Step',
      stats: [
        { name: 'Successful interrogations performed', id: 'caveira_interrogations' },
        { name: 'AI killed in stealth', id: 'caveira_aikilledinstealth' } // pve only
      ]
    }
  },
  'capitao': {
    name: 'Capitão',
    id: '2:8',
    role: 'attacker',
    unit: 'BOPE',
    uniqueAbility: {
      name: 'Tactical Crossbow',
      iconId: '5ur3NZUGos3i2HR8f0HIzj/46cf23c97453ebfedeaa42a1088ff32f/Tactical-Crossbow',
      stats: [
        { name: 'Kills with Incendiary Bolts', id: 'capitao_lethaldartkills' }
      ]
    }
  },
  'echo': {
    name: 'Echo',
    id: '3:9',
    role: 'defender',
    unit: 'SAT',
    uniqueAbility: {
      name: 'Yokai',
      iconId: 'TdDZyrKpjt9EQo8tHpIJk/d987db4da22046a0663be8be82dcda88/Yokai',
      stats: [
        { name: 'Enemies disoriented by Yokai drone', id: 'echo_enemy_sonicburst_affected' }
      ]
    }
  },
  'hibana': {
    name: 'Hibana',
    id: '2:9',
    role: 'attacker',
    unit: 'SAT',
    uniqueAbility: {
      name: 'X-Kairos',
      iconId: '1QSzVxpGhswXix3vn8XGKj/c4f64fa0895bdaf164448e3ae49950a0/X-Kairos',
      stats: [
        { name: 'X-Kairos pellets detonated', id: 'hibana_detonate_projectile' }
      ]
    }
  },
  'mira': {
    name: 'Mira',
    id: '3:A',
    role: 'defender',
    unit: 'GEO',
    uniqueAbility: {
      name: 'Black Mirror',
      iconId: '1a1w8epOhWE8VtzvvCJG9d/b20cbb221f7d45e5838f839ce042f409/Black-mirror',
      stats: [
        { name: 'Black Mirrors deployed', id: 'black_mirror_gadget_deployed' }
      ]
    }
  },
  'jackal': {
    name: 'Jackal',
    id: '2:A',
    role: 'attacker',
    unit: 'GEO',
    uniqueAbility: {
      name: 'Eyenox Model III',
      iconId: '2gexf5zLDsa74J7urCoDxk/50da09626395cbe1bf2a58e00a57a514/Eyenox-Model-III',
      stats: [
        { name: 'Eyenox tracking assist', id: 'cazador_assist_kill' }
      ]
    }
  },
  'lesion': {
    name: 'Lesion',
    id: '3:B',
    role: 'defender',
    unit: 'SDU',
    uniqueAbility: {
      name: 'Gu Mines',
      iconId: '6PJv86R8CtQCWA7a24sJE2/24f3751b2ed941ce80a4c1ef394ab7d5/Gu-mines',
      stats: [
        { name: 'Enemies poisoned by Gu Mines', id: 'caltrop_enemy_affected' }
      ]
    }
  },
  'ying': {
    name: 'Ying',
    id: '2:B',
    role: 'attacker',
    unit: 'SDU',
    uniqueAbility: {
      name: 'Candela',
      iconId: '4vpN9vu5wD9dyb2knMosTy/430796de3c0c2a5c2eb2ac6f4217eba0/Candela',
      stats: [
        { name: 'Candela devices detonated', id: 'dazzler_gadget_detonate' }
      ]
    }
  },
  'ela': {
    name: 'Ela',
    id: '2:C',
    role: 'defender',
    unit: 'GROM',
    uniqueAbility: {
      name: 'Grzmot Mine',
      iconId: '10Md7ccaUO0pE0nCWimeoZ/35dddc67a4141e844d7904051a0314dc/Grzmot-Mine',
      stats: [
        { name: 'Grzmot Mines detonated', id: 'concussionmine_detonate' }
      ]
    }
  },
  'zofia': {
    name: 'Zofia',
    id: '3:C',
    role: 'attacker',
    unit: 'GROM',
    uniqueAbility: {
      name: 'KS79 Lifeline',
      iconId: '1elqIEWJ6XsXKAbMNd0Cai/0b4c0591bad284d957e652cdae0b706b/KS79-Lifeline',
      stats: [
        { name: 'Concussion Grenades detonated', id: 'concussiongrenade_detonate' }
      ]
    }
  },
  'vigil': {
    name: 'Vigil',
    id: '3:D',
    role: 'defender',
    unit: '707th SMB',
    uniqueAbility: {
      name: 'ERC-7',
      iconId: '6WbhiNk0evsKWChPneCES6/af08476e2f917878e0326727d2d5fb8a/ERC-7',
      stats: [
        { name: 'Drones deceived', id: 'attackerdrone_diminishedrealitymode' }
      ]
    }
  },
  'dokkaebi': {
    name: 'Dokkaebi',
    id: '2:D',
    role: 'attacker',
    unit: '707th SMB',
    uniqueAbility: {
      name: 'Logic Bomb',
      iconId: '5ej2g1iCMHdfjn8h8qgfmU/bf07fef4b063a46389ca650ed02b292a/Logic-Bomb',
      stats: [
        { name: 'Phones hacked', id: 'phoneshacked' }
      ]
    }
  },
  'lion': {
    name: 'Lion',
    id: '3:E',
    role: 'attacker',
    unit: 'CBRN',
    uniqueAbility: {
      name: 'EE-ONE-D',
      iconId: '7fRknnWl2K2qjKle1t79j/0506d25798aeb0691c8a576665050f7d/EE-ONE-D',
      stats: [
        { name: 'Enemies marked by EE-ONE-D drone', id: 'tagger_tagdevice_spot' }
      ]
    }
  },
  'finka': {
    name: 'Finka',
    id: '4:E',
    role: 'attacker',
    unit: 'CBRN',
    uniqueAbility: {
      name: 'Adrenal Surge',
      iconId: '9xGRNPNznBKssvgQAtQNQ/9352fc88f2911ab40789412856b3e20e/Adrenal-Surge',
      stats: [
        { name: 'Adrenal Surge bonus', id: 'rush_adrenalinerush' }
      ]
    }
  },
  'maestro': {
    name: 'Maestro',
    id: '2:F',
    role: 'defender',
    unit: 'GIS',
    uniqueAbility: {
      name: 'Evil Eye',
      iconId: 'n2rfPidCv630jQEfnEWwb/42d454d0771218eb8f27f6d17d8a073e/Evil-Eye',
      stats: [
        { name: 'Enemies killed by Evil Eye', id: 'barrage_killswithturret' }
      ]
    }
  },
  'alibi': {
    name: 'Alibi',
    id: '3:F',
    role: 'defender',
    unit: 'GIS',
    uniqueAbility: {
      name: 'Prisma',
      iconId: '7sJYir66zAPq2omSvYeT2u/8fbe3370d32fb5433fb6d3a86d46a1b9/Prisma',
      stats: [
        { name: 'Enemies tricked by Prisma', id: 'deceiver_revealedattackers' }
      ]
    }
  },
  'clash': {
    name: 'Clash',
    id: '3:10',
    role: 'defender',
    unit: 'GSUTR',
    uniqueAbility: {
      name: 'CCE Shield',
      iconId: '1jck6fnzAMbMQrUMVsnA0M/d04a60eab0132e6bcc202a4f99186cdd/CCE-Shield',
      stats: [
        { name: 'Enemies killed while slowed down by CCE Shield', id: 'clash_sloweddown' }
      ]
    }
  },
  'maverick': {
    name: 'Maverick',
    id: '2:10',
    role: 'attacker',
    unit: 'GSUTR',
    uniqueAbility: {
      name: 'Breaching Torch',
      iconId: '4rPBvxDKsKiQCMjt7GxJMw/09e45c68bbc41c1721acbbe0257e2465/Breaching-Torch',
      stats: [
        { name: 'Walls breached with Breaching Torch', id: 'maverick_wallbreached' }
      ]
    }
  },
  'kaid': {
    name: 'Kaid',
    id: '3:11',
    role: 'defender',
    unit: 'GIGR',
    uniqueAbility: {
      name: '"Rtila" Electroclaw',
      iconId: '7rUOk2LhYIUjvYLot7GT8Y/94b72bfbbfdf50c2c807cdbf9f5b276e/Rtila-Electroclaw',
      stats: [
        { name: '"Rtila" Electroclaws successfully deployed', id: 'kaid_electroclawelectrify' }
      ]
    }
  },
  'nomad': {
    name: 'Nomad',
    id: '2:11',
    role: 'attacker',
    unit: 'GIGR',
    uniqueAbility: {
      name: 'Airjab Launcher',
      iconId: '6d0LN1QWzviEkcYu3mTn6v/e49511a479756f71224f14225ad9cbd8/Airjab-Launcher',
      stats: [
        { name: 'Airjabs detonated', id: 'nomad_airjabdetonate' }
      ]
    }
  },
  'mozzie': {
    name: 'Mozzie',
    id: '2:12',
    role: 'defender',
    unit: 'SASR',
    uniqueAbility: {
      name: 'Pest Launcher',
      iconId: '5L0fFKVOwozKMcmJoenfef/56e4efdf77363556b35a76fd4e0e60f6/Pest-Launcher',
      stats: [
        { name: 'Drones hacked', id: 'mozzie_droneshacked' }
      ]
    }
  },
  'gridlock': {
    name: 'Gridlock',
    id: '3:12',
    role: 'attacker',
    unit: 'SASR',
    uniqueAbility: {
      name: 'Trax Stingers',
      iconId: 'QGVvmZeZ91FC2X4mvMzgn/601fa45e635872aea31f15ffebb9c366/Trax-Stingers',
      stats: [
        { name: 'Trax Stingers deployed', id: 'gridlock_traxdeployed' }
      ]
    }
  },
  'warden': {
    name: 'Warden',
    id: '2:14',
    role: 'defender',
    unit: 'Secret Service',
    uniqueAbility: {
      name: 'Glance Smart Glasses',
      iconId: '40RkJUEmmBCf7bmfTL8ao1/1d973adfe4d002c94655d9818776fb41/Glance-Smart-Glasses',
      stats: [
        { name: 'Kills while using Glance Smart Glasses', id: 'warden_killswithglasses' }
      ]
    }
  },
  'nokk': {
    name: 'Nøkk',
    id: '2:13',
    role: 'attacker',
    unit: 'Jaeger Corps',
    uniqueAbility: {
      name: 'HEL Presence Reduction',
      iconId: '57miqbOn8xWBh7ne7za3CV/35364108d49380a0ed33998f970e104f/HEL-Presence-Reduction',
      stats: [
        { name: 'Observation tools deceived', id: 'nokk_observationtooldeceived' }
      ]
    }
  },
  'goyo': {
    name: 'Goyo',
    id: '2:15',
    role: 'defender',
    unit: 'FES',
    uniqueAbility: {
      name: 'Volcan Shield',
      iconId: '1JqlRdbaVA73jDq8y46vX4/82e89f39c479526ace294ba246d0b085/Volcan-Shield',
      stats: [
        { name: 'Volcan Shield detonated by your team', id: 'goyo_volcandetonate' }
      ]
    }
  },
  'amaru': {
    name: 'Amaru',
    id: '2:16',
    role: 'attacker',
    unit: 'APCA',
    uniqueAbility: {
      name: 'Garra Hook',
      iconId: '3WejtMAtiITfpjDMuq6j4t/b52e58da6b2625839aa23f940c8e6639/Garra-Hook',
      stats: [
        { name: 'Distance reeled with Garra Hook', id: 'amaru_distancereeled' }
      ]
    }
  },
  'wamai': {
    name: 'Wamai',
    id: '3:17',
    role: 'defender',
    unit: 'NIGHTHAVEN',
    uniqueAbility: {
      name: 'Mag-net System',
      iconId: '1IKNZzLv63AJd9vlbXj3Bo/883371432ffb22e5bf35bc82dd706384/Mag-net_System',
      stats: [
        { name: 'Projectiles captured by Mag-net System', id: 'wamai_gadgetdestroybymagnet' }
      ]
    }
  },
  'kali': {
    name: 'Kali',
    id: '2:17',
    role: 'attacker',
    unit: 'NIGHTHAVEN',
    uniqueAbility: {
      name: 'LV Explosive Lance',
      iconId: '75eebt48ELO4eGGdIMVMpY/9533c7dc8f36651f5b5ad50c8ccb6c5a/LV_Explosive_Lance',
      stats: [
        { name: 'Gadgets destroyed with LV Explosive Lance', id: 'kali_gadgetdestroywithexplosivelance' }
      ]
    }
  },
  'oryx': {
    name: 'Oryx',
    id: '2:18',
    role: 'defender',
    unit: 'Unaffiliated',
    uniqueAbility: {
      name: 'Remah Dash',
      iconId: '3dM2B3qCdU0woydIbiy2xn/55aa99443002ad794d3f78dada26d035/r6s-operator-ability-oryx',
      stats: [
        { name: 'Kills after Remah Dash', id: 'oryx_killsafterdash' }
      ]
    }
  },
  'iana': {
    name: 'Iana',
    id: '2:19',
    role: 'attacker',
    unit: 'REU',
    uniqueAbility: {
      name: 'Gemini Replicator',
      iconId: 'K8E4EHWbD8wTjVqro6wVl/62339b2fbe1d3a2319dcd320f7a0b070/r6s-operator-ability-iana',
      stats: [
        { name: 'Kills after using Gemini Replicator', id: 'iana_killsafterreplicator' }
      ]
    }
  },
  'melusi': {
    name: 'Melusi',
    id: '2:1A',
    role: 'defender',
    unit: 'Inkaba Task Force',
    uniqueAbility: {
      name: 'Banshee Sonic Defense',
      iconId: '49ixqWhGgjvHu0Ay8JzeSH/c6a3fe584847850186e15c7fb4244385/r6s-operator-ability-melusi',
      stats: [
        { name: 'Enemies slowed by Banshee Sonic Defense', id: 'melusi_sloweddown' }
      ]
    }
  },
  'ace': {
    name: 'Ace',
    id: '4:17',
    role: 'attacker',
    unit: 'NIGHTHAVEN',
    uniqueAbility: {
      name: 'S.E.L.M.A. Aqua Breacher',
      iconId: '2sjKOnwHeOX2xn3iIpja2A/e265f675c905ac25c23ed11fc85589bb/r6s-operator-ability-ace',
      stats: [
        { name: 'S.E.L.M.A. Aqua Breacher detonations', id: 'ace_selmadetonate' }
      ]
    }
  },
  'zero': {
    name: 'Zero',
    id: '1:1B',
    role: 'attacker',
    unit: 'ROS',
    uniqueAbility: {
      name: 'ARGUS Launcher',
      iconId: '6h4hyVSzG8IwAmEl1Objrd/6e51e64eeffcc68746b8ff59445fb103/r6s-operator-ability-zero',
      stats: [
        { name: 'Gadgets destroyed by ARGUS Camera', id: 'zero_gadgetsdestroyed' }
      ]
    }
  },
  'aruni': {
    name: 'Aruni',
    id: '5:17',
    role: 'defender',
    unit: 'NIGHTHAVEN',
    uniqueAbility: {
      name: 'Surya Gate',
      iconId: '4hLJAAVKrf50wosG0471od/cde1867daf863c03754969f159ac00de/r6s-operator-ability-aruni',
      stats: [
        { name: 'Surya Gates deployed', id: 'aruni_gatesdeployed' }
      ]
    }
  },
  'flores': {
    name: 'Flores',
    id: '3:18',
    role: 'attacker',
    unit: 'Unaffiliated',
    uniqueAbility: {
      name: 'RCE-Ratero Charge',
      iconId: '1z7eSI5D8IRIOHi0PJu4yq/3c4a273098a840957a248583f73fa8ff/r6s-operator-ability-flores',
      stats: [
        { name: 'Gadgets destroyed with RCE-Ratero Charge', id: 'flores_gadgetdestroywithrceratero' }
      ]
    }
  },
  'thunderbird': {
    name: 'Thunderbird',
    id: '1:1C',
    role: 'defender',
    unit: 'Unaffiliated',
    uniqueAbility: {
      name: 'KÓNA Station',
      iconId: '67J9QnmuA4TMI3rBxoA3Jz/4ec42d8c1bb61dadc5f36893f93142e8/r6s-operator-ability-thunderbird',
      stats: [
        { name: 'KÓNA Station heals', id: 'thunderbird_heals' }
      ]
    }
  },
  'osa': {
    name: 'Osa',
    id: '6:17',
    role: 'attacker',
    unit: 'NIGHTHAVEN',
    uniqueAbility: {
      name: 'TALON-8 Clear Shield',
      iconId: '71VBmyDtBAx788WnNJfEgo/1e6d78a81f8dc381bf4244b87970038f/r6s-operator-ability-osa',
      stats: [
        { name: 'TALON-8 Clear Shields deployed', id: 'osa_shieldsdeployed' }
      ]
    }
  },
  'thorn': {
    name: 'Thorn',
    id: '',
    role: 'defender',
    unit: 'Garda ERU',
    uniqueAbility: {
      name: 'Razorbloom Shell',
      iconId: '38hUQdWTb1vgs0Yg8eQHFC/0d7f05420068a41392342a1b38c57c2e/r6s-operator-ability-thorn',
      stats: null
    }
  }
};

export const WEAPONTYPES = <const>{
  '1': { id: 'assault', name: 'Assault Rifle' },
  '2': { id: 'smg', name: 'Submachine Gun' },
  '3': { id: 'lmg', name: 'Light Machine Gun' },
  '4': { id: 'marksman', name: 'Marksman Rifle' },
  '5': { id: 'pistol', name: 'Handgun' },
  '6': { id: 'shotgun', name: 'Shotgun' },
  '7': { id: 'mp', name: 'Machine Pistol' },
  '8': { id: 'shield', name: 'Shield' },
  '9': { id: 'launcher', name: 'Launcher' },
  'B': { id: 'utility', name: 'Utility' }
};

export const WEAPONS = <const>{
  // assault
  'l85a2': {
    name: 'L85A2', id: 'B79310C6', category: 'assault',
    iconId: '5vYQpoyk36foDzDq49jBd0/1479a2d7189e545555ceccecf6bd7cc3/L85A2'
  },
  'ar33': {
    name: 'AR33', id: 'B79310D8', category: 'assault',
    iconId: '16U6xEvX8I5xQd9duveBLN/45d22960872cfa3fb6be9eb47fa0be4e/AR33'
  },
  'g36c': {
    name: 'G36C', id: 'B79310DE', category: 'assault',
    iconId: '2SZoqSXKoNPvZFIJsFsDE5/cb109885bf19c8697abf832f10cfd9a6/G36C'
  },
  'r4-c': {
    name: 'R4-C', id: 'B79310D2', category: 'assault',
    iconId: 'dQbqK9VxczuiscwBDSkT8/777a062f6095dde0371eab5200dcb451/R4-C'
  },
  '556xi': {
    name: '556XI', id: 'B79310D4', category: 'assault',
    iconId: '2dgpAeAWb3SkZV7rxDbVdQ/fa32323256b7c6f8a1977d3f71e7d4b2/556xi'
  },
  'f2': {
    name: 'F2', id: '9B2CA14F', category: 'assault',
    iconId: '5HTvw1cJInVAGxOLXR0war/2f142437f5c0944fdcfcce8a03c37676/F2'
  },
  'ak-12': {
    name: 'AK-12', id: '106FE7150', category: 'assault',
    iconId: '7KAZZgnpqD07y47jVVXEuh/e0d7e67101f8f966aa6e1c59e835454f/AK-12'
  },
  'aug_a2': {
    name: 'AUG A2', id: '9B2CA14A', category: 'assault',
    iconId: '1eO39zRe8XxJXH1KZiIWhM/02049ced0fbfa630833e8b0d3c03de07/AUG_A2'
  },
  '552_commando': {
    name: '552 Commando', id: 'B79310D3', category: 'assault',
    iconId: '1LT0N89YaOHvRwn3Pphr8K/02d4a3da9cda132d8201fd134f24fede/552_Commando'
  },
  '416-c_carbine': {
    name: '416-C CARBINE', id: '106FE714D', category: 'assault',
    iconId: '2I86r2a2QD8EHTZVZnxcxy/2913450ba952a16c29fac1f5ce58ba1a/416-C_Carbine'
  },
  'c8-sfw': {
    name: 'C8-SFW', id: '2CEABF00B', category: 'assault',
    iconId: '1itXpz2GnvdwwRyhX1SYa2/b58ff71048fa3bb5ed09d5d935dc90f4/C8-SFW'
  },
  'mk17_cqb': {
    name: 'MK17 CQB', id: '2CEAAA814', category: 'assault',
    iconId: '4LytczDQmu0M63gO2WtCCm/331ef3b1938352ae71d7c0bd23de3596/Mk17_CQB'
  },
  'para-308': {
    name: 'PARA-308', id: '8ACBED9B8', category: 'assault',
    iconId: '6ub8y2Cs5EYhVPfDWuVVkW/82ca131a41ee4ba2e0b75f2dc52ed9e3/PARA-308'
  },
  'type-89': {
    name: 'Type-89', id: '9A25C4B26', category: 'assault',
    iconId: '7wLf325q9amF8bnVP1QGr0/2faff1a197f90dcded4472852a317d6b/Type-89'
  },
  'c7e': {
    name: 'C7E', id: 'A3038BA91', category: 'assault',
    iconId: '63vTDjkXeKq7rOoSBhoJD4/08603e6603d564e0fa38af9ec86b7c1f/C7E'
  },
  'm762': {
    name: 'M762', id: 'E50FB57FB', category: 'assault',
    iconId: '4oWAgi7tgQP1Tq0HooRtye/9109a74921ee17610d4bd85a61582823/M762'
  },
  'v308': {
    name: 'V308', id: 'BE9996F2D', category: 'assault',
    iconId: '5YBZe76NUDO32eF66wW90g/488c315743d59230962a4d67618223d6/V308'
  },
  'spear_.308': {
    name: 'SPEAR .308', id: 'BE99AD3BD', category: 'assault',
    iconId: '29LjYuJ4s6yA8k9Uv2u28C/89ec812559e7d74b7c269279f4c46d92/Spear_.308'
  },
  'ar-15.50': {
    name: 'AR-15.50', id: '1EFE80F033', category: 'assault',
    iconId: '4lGGEGZLkbldz114Wl5hCo/78a04c46654f80fae03e730bd79f3563/AR-15.50'
  },
  'm4': {
    name: 'M4', id: '1EFE81B5D5', category: 'assault',
    iconId: '3jhi90ycmuc8mAiuSXFoCi/bcf354459e7becd6ede52ee97917c832/M4'
  },
  'ak-74m': {
    name: 'AK-74M', id: '23D027C51C', category: 'assault',
    iconId: '1j5HiQP8aFphTe65fqDdg0/23eecb5c603c5ba9f59fc6cbc5e4a531/AK-74M'
  },
  'arx200': {
    name: 'ARX200', id: '2418EC4362', category: 'assault',
    iconId: '6VgkPBsr1WApI3rWc9kcM0/b18b8e25f3e951e8e722213f2ee59eb0/ARX200'
  },
  'f90': {
    name: 'F90', id: '2902BBFED9', category: 'assault',
    iconId: '62tE3th2ThcGHlrcqWkmEX/d69c9de199542e25fa55f6d293f15671/r6-operator-weapon-ar-f90'
  },
  'commando_9': {
    name: 'Commando 9', id: 'BE998B05E', category: 'assault',
    iconId: '4P9dpUph5w3MSsLNnW6be/04baba24990fcb75a9c0bcfd01b7d190/Commando_9'
  },
  'sc3000k': {
    name: 'SC3000K', id: '40705ECFA4', category: 'assault',
    iconId: '7x7eDTm2NNpfGiFMrfQqEX/9898e74c780537be3ca6d88db32ea21e/F2000'
  },

  // smg
  'fmg-9': {
    name: 'FMG-9', id: 'B79310D0', category: 'smg',
    iconId: '0oneJNsBR06QjuowxwtHG/bd3b391c6eec2bd615f2ed83197a13ac/FMG-9'
  },
  'mp5k': {
    name: 'MP5K', id: 'B79310D1', category: 'smg',
    iconId: '1pk8nOI7ybQjYOSI4fuzOm/fcd78df0f729be545e75c09aae85c360/MP5K'
  },
  'ump45': {
    name: 'UMP45', id: 'B79310CF', category: 'smg',
    iconId: '6X2EZPq2s8UKrP67uxz5FI/f0df4c57d5890c79311e4eb62d4470e7/UMP45'
  },
  'mp5': {
    name: 'MP5', id: 'B79310C1', category: 'smg',
    iconId: '60YbOvSBQt6ZUlu8YDXoZm/51ef3857b2986de700262432e8433714/MP5'
  },
  'p90': {
    name: 'P90', id: 'B79310C7', category: 'smg',
    iconId: '4nGrNspOvII2oS3lEMkg5x/2398a493c298bc654f97c58767aa40f3/P90'
  },
  '9x19vsn': {
    name: '9x19VSN', id: '106FE7151', category: 'smg',
    iconId: '42gH96xTTYaTZsfXI3c0wL/a7edbf11af97091ee884b68e59fe6a4f/9x19VSN'
  },
  'mp7': {
    name: 'MP7', id: '106FE714F', category: 'smg',
    iconId: '3a4dgTWGdiJqALhtRp4pKy/f2568d3de3cfe7e4b53179e8653cd2a2/MP7'
  },
  '9mm_c1': {
    name: '9mm C1', id: '2CEABC77A', category: 'smg',
    iconId: '60sbThKtOpNOwKu3OP0oGV/672fd9263f7786402a0d855273473a6f/9mm_C1'
  },
  'mpx': {
    name: 'MPX', id: '5BD3A85FC', category: 'smg',
    iconId: '5HFewpAJ8npDDCKFnEadhL/d398bb477d6b56fe41bfdb5862ed31c0/MPX'
  },
  'm12': {
    name: 'M12', id: '8ACBEC5F2', category: 'smg',
    iconId: '4FxqA5pa8JY9QQ7FEcjwPw/ffc779fcde5b970e7b95db6653637dab/M12'
  },
  'mp5sd': {
    name: 'MP5SD', id: '99EB07773', category: 'smg',
    iconId: '5HaMldwFltBwiiyDDfkPpD/6de3aa9aaa17458e7f6186ba59b8deff/MP5SD'
  },
  'pdw9': {
    name: 'PDW9', id: 'A3038BA94', category: 'smg',
    iconId: '4yYCuRnduMq35CTHfq6wwU/b7d49cdbcb05917e014c99efeaadd33b/PDW9'
  },
  'vector_.45_acp': {
    name: 'Vector .45 ACP', id: 'A3038BA92', category: 'smg',
    iconId: '7D1cDf13FqUhoLihzvuPln/068aa7e507155598449c58c0a49a90d6/Vector_.45_ACP'
  },
  't-5_smg': {
    name: 'T-5 SMG', id: 'B699FDA28', category: 'smg',
    iconId: '1Ne8bvX8BdCALevWKMllQN/4baa3e79d323de134dd182e0272b9c3b/T-5_SMG'
  },
  'scorpion_evo_3_a1': {
    name: 'Scorpion EVO 3 A1', id: 'E50FA8B51', category: 'smg',
    iconId: '6OdwaLWxcnFvhlVwWbP2Du/4f7e94bdb6d34d5c0aa7b7b147b4092e/Scorpion_EVO_3_A1'
  },
  'k1a': {
    name: 'K1A', id: '128C51CBEF', category: 'smg',
    iconId: '5mUa2p8WXbiyD71qUI8sGk/ed753b6f0ae30ab5737486dfcf32ee9f/K1A'
  },
  'mx4_storm': {
    name: 'Mx4 Storm', id: '172522E967', category: 'smg',
    iconId: '4qRh1frGkQZxNyeKA4D6n1/20f89cd1d9953f06207b7340ea77fb17/Mx4_Storm'
  },
  'aug_a3': {
    name: 'AUG A3', id: '2418EC6F2C', category: 'smg',
    iconId: '3W9XJdMOgpHSw55HfwRSAv/cf8f220678d503e6c3e535c00b2e636a/AUG_A3'
  },
  'p10_roni': {
    name: 'P10 RONI', id: '2902BB46BB', category: 'smg',
    iconId: '7K86OBjL3zmYWt0ZvUcCLj/16a947334e39f27da177d787773593e4/r6-operator-weapon-smg-p10roni'
  },

  // lmg
  '6p41': {
    name: '6P41', id: 'B79310DA', category: 'lmg',
    iconId: '1wxS2HOCvoPAfnJEDFWjfw/7feddb98582ec37b500243d3f3e19eca/6P41'
  },
  'g8a1': {
    name: 'G8A1', id: '106FE714C', category: 'lmg',
    iconId: '4TIb7oeJesaROOOfTlCBaZ/ffd6a802f9a779a0d39b2122c49b3254/G8A1'
  },
  'm249': {
    name: 'M249', id: '8ACBE8797', category: 'lmg',
    iconId: '7z8UpVPS3P14OC1oL9dDIn/39c0c657f154218003fd4b2a9250b92f/M249'
  },
  't-95_lsw': {
    name: 'T-95 LSW', id: 'B699FDA29', category: 'lmg',
    iconId: '23HCxaNTRUHBlFAvCTMZQm/fe319cc164fac034a29e9b114ae7d5cb/T-95_LSW'
  },
  'lmg-e': {
    name: 'LMG-E', id: 'E50FB57FC', category: 'lmg',
    iconId: '7JVJIew6t3iKwgByvrFXyi/7ba44dfda28b525506633e453104a604/LMG-E'
  },
  'alda_5.56': {
    name: 'ALDA 5.56', id: '172522E96A', category: 'lmg',
    iconId: '39yB6TFl9ph6Rb4bDV4lqK/7f9b3abf8dff19bacc026a7212849ca4/ALDA_5.56'
  },
  'm249_saw': {
    name: 'M249 SAW', id: '2902BB7B8C', category: 'lmg',
    iconId: '7z8UpVPS3P14OC1oL9dDIn/39c0c657f154218003fd4b2a9250b92f/M249'
  },
  'dp27': {
    name: 'DP27', id: '296F8FC698', category: 'lmg',
    iconId: '7LoT7yAe0LK7bDOeq6MZZM/33995bc704667674af1b73fe962d4c7c/Primary_gun_DP27'
  },

  // marksman
  '417': {
    name: '417', id: 'B79310C0', category: 'marksman',
    iconId: '5djkS4YtAtOF0vBmg0T60x/ea2b1ff7e5367e66c99bc7ad7e95bfe3/417'
  },
  'ots-03': {
    name: 'OTs-03', id: '106FE7152', category: 'marksman',
    iconId: '4fXznwDtLt61VCF8QIF4N3/34e2e6d6c33d4c504c945bdd13c322f6/OTs-03'
  },
  'camrs': {
    name: 'CAMRS', id: '2CEAAB41D', category: 'marksman',
    iconId: '4dBzqVVmnpv1DZi91LAnEN/e374b4ea289fc992280b943cdbb94d60/CAMRS'
  },
  'sr-25': {
    name: 'SR-25', id: '2CEABFB43', category: 'marksman',
    iconId: '3H3sICdj6BK8LhtQPRd2aJ/26826ebba73e0e5fd503256d069f3256/SR-25'
  },
  'mk_14_ebr': {
    name: 'Mk 14 EBR', id: '128C5259FA', category: 'marksman',
    iconId: '6KIMqp5dA95z1RI3PrG9jv/eb939638169811a3fa858a44e6e5d97e/Mk_14_EBR'
  },
  'csrx_300': {
    name: 'CSRX 300', id: '33E28FCCA0', category: 'marksman',
    iconId: '7tUB9ZNXJhdN6ejAkCEeFQ/99691bcc19f641cf872925905d08a539/CSRX_300'
  },

  // pistol
  'p226_mk_25': {
    name: 'P226 MK 25', id: 'B79310CA', category: 'pistol',
    iconId: 'RTQvPQcywlRwUS1FjIKCX/6fc72fee2191c2e723276bc10ae4114e/P226_Mk_25'
  },
  'm45_meusoc': {
    name: 'M45 MEUSOC', id: 'B79310D7', category: 'pistol',
    iconId: '3u5cecgWYl3WuJK50mKEGd/a4a0eb15c710edfc0d29e98c2ee7ea33/M45_MEUSOC'
  },
  '5.7_usg': {
    name: '5.7 USG', id: '9B2CA14C', category: 'pistol',
    iconId: 'tkYcSAJSe5yGkeUhzZqBO/e81feb86df4a7eb6951052bec26b6ed7/5.7_USG'
  },
  'p9': {
    name: 'P9', id: 'B79310D9', category: 'pistol',
    iconId: '6Fd1cl17KA0CtgodEiiY6v/d0f145ea72f2aacbd04260ba7d8f1c74/P9'
  },
  'lfp586': {
    name: 'LFP586', id: 'B79310C8', category: 'pistol',
    iconId: '1zc7UtdBfCZakwbiYqBvSz/1fd3f1584de38ca7c9315d498f094276/LFP586'
  },
  'gsh-18': {
    name: 'GSH-18', id: '106FE7153', category: 'pistol',
    iconId: '5s5Q33j3MNcXf9lwfxfd7m/4eb3a6af1d431481b6ddcec44fbc7602/GSh-18'
  },
  'pmm': {
    name: 'PMM', id: '9B2CB308', category: 'pistol',
    iconId: '3y4LIwwm8YNQHAv8oOkWCK/a2375901cee34e68fa39c976d85de8aa/PMM'
  },
  'p12': {
    name: 'P12', id: 'B79310CB', category: 'pistol',
    iconId: '2mpM7rah7rwEW0bViIirUC/ed9caa4db58421519fa4db390b1aa164/P12'
  },
  'mk1_9mm': {
    name: 'MK1 9mm', id: '37ACC03F7', category: 'pistol',
    iconId: '3tWoNeF3jQYs3w4EOydQYs/434409c96693df1fd3e969d778e70795/Mk1_9mm_BI'
  },
  'd-50': {
    name: 'D-50', id: '53AEC9396', category: 'pistol',
    iconId: '6mMQRDsrComRFa7bC6cNkG/8cd17e545e3d28dcc11a040d000cfa16/D-50'
  },
  'prb92': {
    name: 'PRB92', id: '8ACBEC355', category: 'pistol',
    iconId: 'dl28J1HsE7mzhj66pmd5D/b8d8fc48d2dde13154047de94abbd8ca/PRB92'
  },
  'p229': {
    name: 'P229', id: '959B5DBD4', category: 'pistol',
    iconId: '76ja0RxqzHW9PpvWgpG7Sk/cb753b50b20fe67deaef54d8b2a46b54/P229'
  },
  'usp40': {
    name: 'USP40', id: 'A3038BA93', category: 'pistol',
    iconId: '7FxemzWRtlpAhK9MyKp1Gp/817cc25b6b7c3575dc1ba53a6a8170a9/USP40'
  },
  'q-929': {
    name: 'Q-929', id: 'B699FDA2A', category: 'pistol',
    iconId: '2fRVszR5yGDHbV0AL8muso/0838dac90b66aa810daa49d36382fb64/Q-929'
  },
  'rg15': {
    name: 'RG15', id: 'E50FB57FD', category: 'pistol',
    iconId: '2LNSsp7B7wUnnPUweir7Jm/9f66d53be7a63a17a55253a0bea6eec1/RG15'
  },
  'bailiff_410': {
    name: 'Bailiff 410', id: '172522E96B', category: 'pistol',
    iconId: 'N8FLbo4fsNyBe8msKgRhT/8f403dc0b58087bcafab786dd95ba33f/Bailiff_410'
  },
  'keratos_.357': {
    name: 'Keratos .357', id: '199D70994A', category: 'pistol',
    iconId: '4niSMDCeiryoMBXJZq60Vv/48339331d05e289868cf4050c49b1b2b/D-40'
  },
  '1911_tacops': {
    name: '1911 TACOPS', id: '1EFE81B5D4', category: 'pistol',
    iconId: '189UukZ6fVnvQR6LJtLYry/6eec29603d5b7b0ca8cab6ac0ef083ac/1911_TACOPS'
  },
  'p-10c': {
    name: 'P-10C', id: '1EFE80F702', category: 'pistol',
    iconId: '2l4qwB50zSFhFZVYRLNwqg/20df8114f69f96f2adc54779ccc5bbaa/P-10C'
  },
  '.44_mag_semi-auto': {
    name: '.44 Mag Semi-Auto', id: '2418EC5F35', category: 'pistol',
    iconId: '6W3Jz0YcQzbZ6BOPr7VVel/4c67f342964132a652f7d5821e887050/.44_Mag_Semi-Auto'
  },
  'sdp_9mm': {
    name: 'SDP 9mm', id: '2A69013364', category: 'pistol',
    iconId: 'Tgsdyz3XEqmgUYi9aZZgb/6755f4da7af7a7179ffab92acf8d477e/SDP_9mm'
  },

  // shotgun
  'm590a1': {
    name: 'M590A1', id: '9B2CA14E', category: 'shotgun',
    iconId: '2zRHmgqENNiZqXQxC9Rsbj/e6542407c642f9b7c5a4546afb6db30a/M590A1'
  },
  'm1014': {
    name: 'M1014', id: 'B79310CC', category: 'shotgun',
    iconId: '2pUiVbwNnQnDTesmWXktqW/f27c1fab9a354bb89cbe309a688f5e02/M1014'
  },
  'sg-cqb': {
    name: 'SG-CQB', id: '9B2CA14B', category: 'shotgun',
    iconId: '5JoL3b36Fsztt9Q2XYmrbJ/dacec96948d3f8fe92914a69b9aac593/SG-CQB'
  },
  'sasg-12': {
    name: 'SASG-12', id: '9B2CB313', category: 'shotgun',
    iconId: '2Q6mL4CbifmIgifV2yV3Hi/2bb2b323f055b03a2c1ba516c262c24e/SASG-12'
  },
  'm870': {
    name: 'M870', id: '106FE714E', category: 'shotgun',
    iconId: '2rkU6g4Rlg0e0U4rczWGTV/a51589a54c43f476d8eb984c0ea881e9/M870'
  },
  'super_90': {
    name: 'Super 90', id: '2CEABFF54', category: 'shotgun',
    iconId: '1TLWSu0xHJlAsfEfafeC9X/f9647e70a18962bf1627095c8b46832e/Super_90'
  },
  'spas-12': {
    name: 'SPAS-12', id: '2CEABF739', category: 'shotgun',
    iconId: '7Hp6Fbss6uI59OT4nZNB6e/a4d09954803cb2580353cfa03e8c778b/SPAS-12'
  },
  'spas-15': {
    name: 'SPAS-15', id: '8ACBEBD23', category: 'shotgun',
    iconId: 'CyofBgipHq4RTafvPFWd4/bc3d0ecc871b70e57735855f852efacf/SPAS-15'
  },
  'supernova': {
    name: 'Supernova', id: '959B746E6', category: 'shotgun',
    iconId: '2tpjCRFLcc3hogjJGbKDsi/5ad0ab63b7245022aca5c1c1fb42d473/SuperNova'
  },
  'ita12l': {
    name: 'ITA12L', id: 'A3038B5A5', category: 'shotgun',
    iconId: '4Y6ziRzm9RiPii83fm8BV1/1f472744d2c2dec8d9206f4d8733d92c/ITA12L'
  },
  'ita12s': {
    name: 'ITA12S', id: 'A3038BA90', category: 'shotgun',
    iconId: '5G4DroaSdqHzJWCe7qqbHZ/5dd2e03f853182c78a1e7fcbc642f0cf/ITA12S'
  },
  'six12': {
    name: 'SIX12', id: 'B699FDA2B', category: 'shotgun',
    iconId: '2v6MwsHwjOZ5Muid53lyfN/e5f1c4997db93abfe3ac356fce23376c/SIX12'
  },
  'six12_sd': {
    name: 'SIX12 SD', id: 'B699FDA2C', category: 'shotgun',
    iconId: '1GTua079Xbtkpjhx96sRsW/079ed1a71a0d12b5e48e1b0d40b87110/SIX12_SD'
  },
  'fo-12': {
    name: 'FO-12', id: 'E50FB57FA', category: 'shotgun',
    iconId: '4TDWnhbgvLkc6HBWDJp2ST/f50cbd83d6d295ab59f17f7e21d713bc/FO-12'
  },
  'bosg.12.2': {
    name: 'BOSG.12.2', id: '128C51DEC8', category: 'shotgun',
    iconId: '2ZjVndetsX8WEn5ZfyUQa0/e3a781be7eab22876d25f748e8fd0f5a/BOSG.12.2'
  },
  'acs12': {
    name: 'ACS12', id: 'BE99AD3BE', category: 'shotgun',
    iconId: '13z63kT1NLzn1U99o7WC4T/8655d3200f24b87246c36f2622603457/ACS12_PB'
  },
  'tcsg12': {
    name: 'TCSG12', id: '2418EC7D3A', category: 'shotgun',
    iconId: '2NDbY7BTBJ9R09LUilTlRf/3728337cd3ba14ed6ab9de0c22e879af/TCSG12'
  },
  'super_shorty': {
    name: 'Super Shorty', id: '1EFE80F701', category: 'shotgun',
    iconId: '7Dq8LDmIxAveRqXM17orUW/cbd96b47cd8ca74a7827b16ef73fe7cf/r6-operator-weapon-sa-supershorty'
  },

  // mp
  'smg-11': {
    name: 'SMG-11', id: 'B79310CE', category: 'mp',
    iconId: '3WExw7Kepz9uAiWAbWW457/875fc631a3cf9fcc2849d9db2989cbcd/SMG-11'
  },
  'bearing_9': {
    name: 'Bearing 9', id: '99EB0571E', category: 'mp',
    iconId: '4mdftEOh5Vu9KhhpgKLKrT/abedcc75868774018295ec2a08a7b3de/Bearing_9'
  },
  'c75_auto': {
    name: 'C75 Auto', id: '128C51DEC6', category: 'mp',
    iconId: '3wUuefwPjU705mZkTdJ9UH/8ccb11884cfa34c176ac5500af139177/C75_Auto'
  },
  'smg-12': {
    name: 'SMG-12', id: '128C51CBED', category: 'mp',
    iconId: 'EwJgB7KdgOb6dDm7ro33u/b73f0890f992c1a365210f08efcc6db5/SMG-12'
  },
  'spsmg9': {
    name: 'SPSMG9', id: '1EFE81B5D6', category: 'mp',
    iconId: '5EtwSgylXckBNg4n6gDR9J/bc6fc6c5c12ae11da59aee95828ebd76/SPSMG9'
  }

  // shield
  // 'g52-tactical_shield': {
  //   name: 'G52-Tactical Shield', id: '', category: 'shield',
  //   iconId: '7qmWjGZayvK4t6E80Gvu7g/8b789d6d639744dce100c2cfb9709e6a/G52-Tactical_Shield'
  // },
  // 'le_roc': {
  //   name: 'Le Roc', id: '', category: 'shield',
  //   iconId: '4XLgMhsaiz20Gd5JJp80lW/40af7e3fafc77831bd761a02af83927c/Extendable-Shield'
  // },
  // 'ballistic_shield': {
  //   name: 'Ballistic Shield', id: '', category: 'shield',
  //   iconId: '2C21gwsjOka5Rwp8qSM5hA/a38937032260bce4f690fb9bb8adf4c0/Ballistic_Shield'
  // },
  // 'cce_shield': {
  //   name: 'CCE Shield', id: '', category: 'shield',
  //   iconId: '5mmGgrYdJJHw2moBIEW9An/64e9727d959d7afdbb4fb06e2f75574a/CCE_Shield'
  // },

  // launcher
  // utility
};

const STATS = {
  pvp: {
    general: [
      'generalpvp_bulletfired',
      'generalpvp_bullethit',
      'generalpvp_headshot',
      'generalpvp_death',
      'generalpvp_killassists',
      'generalpvp_kills',
      'generalpvp_matchlost',
      'generalpvp_matchplayed',
      'generalpvp_matchwon',
      'generalpvp_meleekills',
      'generalpvp_penetrationkills',
      'generalpvp_revive',
      'generalpvp_timeplayed',
      'generalpvp_blindkills',
      'generalpvp_dbno',
      'generalpvp_dbnoassists',
      'generalpvp_gadgetdestroy',
      'generalpvp_barricadedeployed',
      'generalpvp_reinforcementdeploy',
      'generalpvp_rappelbreach',
      'generalpvp_suicide',
      'generalpvp_distancetravelled',
      'generalpvp_totalxp',
      'generalpvp_hostagedefense',
      'generalpvp_hostagerescue',
      'generalpvp_revivedenied',
      'generalpvp_serveraggression',
      'generalpvp_serverdefender',
      'generalpvp_servershacked'
    ],
    operators: [
      'operatorpvp_kills',
      'operatorpvp_death',
      'operatorpvp_roundwon',
      'operatorpvp_roundlost',
      'operatorpvp_headshot',
      'operatorpvp_meleekills',
      'operatorpvp_dbno',
      'operatorpvp_totalxp',
      'operatorpvp_timeplayed'
    ],
    weapons: [
      'weaponpvp_kills',
      'weaponpvp_death',
      'weaponpvp_headshot',
      'weaponpvp_bulletfired',
      'weaponpvp_bullethit',
      'weaponpvp_chosen'
    ],
    weaponTypes: [
      'weapontypepvp_kills',
      'weapontypepvp_death',
      'weapontypepvp_headshot',
      'weapontypepvp_bulletfired',
      'weapontypepvp_bullethit',
      'weapontypepvp_chosen'
    ],
    queues: {
      ranked: [
        'rankedpvp_kills',
        'rankedpvp_death',
        'rankedpvp_matchlost',
        'rankedpvp_matchplayed',
        'rankedpvp_matchwon',
        'rankedpvp_timeplayed'
      ],
      casual: [
        'casualpvp_kills',
        'casualpvp_death',
        'casualpvp_matchlost',
        'casualpvp_matchplayed',
        'casualpvp_matchwon',
        'casualpvp_timeplayed'
      ],
      custom: [
        'custompvp_timeplayed'
      ]
    },
    modes: {
      bomb: [
        'plantbombpvp_bestscore',
        'plantbombpvp_matchlost',
        'plantbombpvp_matchplayed',
        'plantbombpvp_matchwon',
        'plantbombpvp_timeplayed'
      ],
      secureArea: [
        'secureareapvp_bestscore',
        'secureareapvp_matchlost',
        'secureareapvp_matchplayed',
        'secureareapvp_matchwon',
        'secureareapvp_timeplayed'
      ],
      hostage: [
        'rescuehostagepvp_bestscore',
        'rescuehostagepvp_matchlost',
        'rescuehostagepvp_matchplayed',
        'rescuehostagepvp_matchwon',
        'rescuehostagepvp_timeplayed'
      ]
    }
  },
  pve: {
    general: [
      'generalpve_bulletfired',
      'generalpve_bullethit',
      'generalpve_headshot',
      'generalpve_death',
      'generalpve_killassists',
      'generalpve_kills',
      'generalpve_matchlost',
      'generalpve_matchplayed',
      'generalpve_matchwon',
      'generalpve_meleekills',
      'generalpve_penetrationkills',
      'generalpve_revive',
      'generalpve_timeplayed',
      'generalpve_blindkills',
      'generalpve_gadgetdestroy',
      'generalpve_barricadedeployed',
      'generalpve_reinforcementdeploy',
      'generalpve_rappelbreach',
      'generalpve_suicide',
      'generalpve_distancetravelled',
      'generalpve_totalxp',
      'generalpve_hostagedefense',
      'generalpve_hostagerescue',
      'generalpve_revivedenied',
      'generalpve_serveraggression',
      'generalpve_serverdefender',
      'generalpve_servershacked'
    ],
    operators: [
      'operatorpve_kills',
      'operatorpve_death',
      'operatorpve_roundwon',
      'operatorpve_roundlost',
      'operatorpve_headshot',
      'operatorpve_meleekills',
      'operatorpve_totalxp',
      'operatorpve_timeplayed'
    ],
    weapons: [
      'weaponpve_kills',
      'weaponpve_death',
      'weaponpve_headshot',
      'weaponpve_bulletfired',
      'weaponpve_bullethit',
      'weaponpve_chosen'
    ],
    weaponTypes: [
      'weapontypepve_kills',
      'weapontypepve_death',
      'weapontypepve_headshot',
      'weapontypepve_bulletfired',
      'weapontypepve_bullethit',
      'weapontypepve_chosen'
    ],
    queues: {
      local: {
        normal: [
          'allterrohuntsolo_normal_bestscore'
        ],
        hard: [
          'allterrohuntsolo_hard_bestscore'
        ],
        realistic: [
          'allterrohuntsolo_realistic_bestscore'
        ]
      },
      coop: {
        normal: [
          'allterrohuntcoop_normal_bestscore'
        ],
        hard: [
          'allterrohuntcoop_hard_bestscore'
        ],
        realistic: [
          'allterrohuntcoop_realistic_bestscore'
        ]
      }
    },
    modes: {
      elimination: [
        'terrohuntclassicpve_matchwon',
        'terrohuntclassicpve_matchlost',
        'terrohuntclassicpve_matchplayed',
        'terrohuntclassicpve_bestscore'
      ],
      disarmBomb: [
        'plantbombpve_matchwon',
        'plantbombpve_matchlost',
        'plantbombpve_matchplayed',
        'plantbombpve_bestscore'
      ],
      protectHostage: [
        'protecthostagepve_matchwon',
        'protecthostagepve_matchlost',
        'protecthostagepve_matchplayed',
        'protecthostagepve_bestscore'
      ],
      extractHostage: [
        'rescuehostagepve_matchwon',
        'rescuehostagepve_matchlost',
        'rescuehostagepve_matchplayed',
        'rescuehostagepve_bestscore'
      ]
    }
  }
};
(['pvp', 'pve'] as const).map(type =>
  Object.values(OPERATORS).map(operator =>
    operator.uniqueAbility && operator.uniqueAbility.stats
    && operator.uniqueAbility.stats.map(ability =>
      STATS[type].operators.push(`operator${type}_${ability.id}`)
    )
  )
);

export const STATS_CATEGORIES = {
  pvp: [
    STATS.pvp.general,
    STATS.pvp.operators,
    STATS.pvp.weapons,
    STATS.pvp.weaponTypes,
    STATS.pvp.queues.ranked,
    STATS.pvp.queues.casual,
    STATS.pvp.queues.custom,
    STATS.pvp.modes.bomb,
    STATS.pvp.modes.secureArea,
    STATS.pvp.modes.hostage
  ],
  pve: [
    STATS.pve.general,
    STATS.pve.operators,
    STATS.pve.weapons,
    STATS.pve.weaponTypes,
    STATS.pve.queues.local.normal,
    STATS.pve.queues.local.hard,
    STATS.pve.queues.local.realistic,
    STATS.pve.queues.coop.normal,
    STATS.pve.queues.coop.hard,
    STATS.pve.queues.coop.realistic,
    STATS.pve.modes.elimination,
    STATS.pve.modes.disarmBomb,
    STATS.pve.modes.protectHostage,
    STATS.pve.modes.extractHostage
  ],
  general: [
    STATS.pvp.general,
    STATS.pve.general
  ],
  generalpvp: [
    STATS.pvp.general
  ],
  generalpve: [
    STATS.pve.general
  ],
  operators: [
    STATS.pvp.operators,
    STATS.pve.operators
  ],
  operatorspvp: [
    STATS.pvp.operators
  ],
  operatorspve: [
    STATS.pve.operators
  ],
  weapons: [
    STATS.pvp.weapons,
    STATS.pvp.weaponTypes,
    STATS.pve.weapons,
    STATS.pve.weaponTypes
  ],
  weaponspvp: [
    STATS.pvp.weapons,
    STATS.pvp.weaponTypes
  ],
  weaponspve: [
    STATS.pve.weapons,
    STATS.pve.weaponTypes
  ],
  queues: [
    STATS.pvp.queues.ranked,
    STATS.pvp.queues.casual,
    STATS.pvp.queues.custom,
    STATS.pve.queues.local.normal,
    STATS.pve.queues.local.hard,
    STATS.pve.queues.local.realistic,
    STATS.pve.queues.coop.normal,
    STATS.pve.queues.coop.hard,
    STATS.pve.queues.coop.realistic
  ],
  queuespvp: [
    STATS.pvp.queues.ranked,
    STATS.pvp.queues.casual,
    STATS.pvp.queues.custom
  ],
  queuespve: [
    STATS.pve.queues.local.normal,
    STATS.pve.queues.local.hard,
    STATS.pve.queues.local.realistic,
    STATS.pve.queues.coop.normal,
    STATS.pve.queues.coop.hard,
    STATS.pve.queues.coop.realistic
  ],
  modes: [
    STATS.pvp.modes.bomb,
    STATS.pvp.modes.secureArea,
    STATS.pvp.modes.hostage,
    STATS.pve.modes.elimination,
    STATS.pve.modes.disarmBomb,
    STATS.pve.modes.protectHostage,
    STATS.pve.modes.extractHostage
  ],
  modespvp: [
    STATS.pvp.modes.bomb,
    STATS.pvp.modes.secureArea,
    STATS.pvp.modes.hostage
  ],
  modespve: [
    STATS.pve.modes.elimination,
    STATS.pve.modes.disarmBomb,
    STATS.pve.modes.protectHostage,
    STATS.pve.modes.extractHostage
  ],
  ranked: [
    STATS.pvp.queues.ranked
  ],
  casual: [
    STATS.pvp.queues.casual
  ],
  custom: [
    STATS.pvp.queues.custom
  ],
  local: [
    STATS.pve.queues.local.normal,
    STATS.pve.queues.local.hard,
    STATS.pve.queues.local.realistic
  ],
  coop: [
    STATS.pve.queues.coop.normal,
    STATS.pve.queues.coop.hard,
    STATS.pve.queues.coop.realistic
  ],
  normal: [
    STATS.pve.queues.local.normal,
    STATS.pve.queues.coop.normal
  ],
  hard: [
    STATS.pve.queues.local.hard,
    STATS.pve.queues.coop.hard
  ],
  realistic: [
    STATS.pve.queues.local.realistic,
    STATS.pve.queues.coop.realistic
  ],
  normallocal: [
    STATS.pve.queues.local.normal
  ],
  hardlocal: [
    STATS.pve.queues.local.hard
  ],
  realisticlocal: [
    STATS.pve.queues.local.realistic
  ],
  normalcoop: [
    STATS.pve.queues.coop.normal
  ],
  hardcoop: [
    STATS.pve.queues.coop.hard
  ],
  realisticcoop: [
    STATS.pve.queues.coop.realistic
  ],
  bomb: [
    STATS.pvp.modes.bomb
  ],
  secureArea: [
    STATS.pvp.modes.secureArea
  ],
  hostage: [
    STATS.pvp.modes.hostage
  ],
  elimination: [
    STATS.pve.modes.elimination
  ],
  disarmBomb: [
    STATS.pve.modes.disarmBomb
  ],
  protectHostage: [
    STATS.pve.modes.protectHostage
  ],
  extractHostage: [
    STATS.pve.modes.extractHostage
  ]
};

export const APPLICATIONS = [
  {
    id: 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40',
    name: 'Tom Clancy\'s Rainbow Six Siege',
    platform: 'PC'
  },
  {
    id: 'fb4cc4c9-2063-461d-a1e8-84a7d36525fc',
    name: 'Tom Clancy\'s Rainbow Six Siege',
    platform: 'ORBIS'
  },
  {
    id: '6e3c99c9-6c3f-43f4-b4f6-f1a3143f2764',
    name: 'Tom Clancy\'s Rainbow Six Siege',
    platform: 'PS5'
  },
  {
    id: '4008612d-3baf-49e4-957a-33066726a7bc',
    name: 'Tom Clancy\'s Rainbow Six Siege',
    platform: 'DURANGO'
  },
  {
    id: '76f580d5-7f50-47cc-bbc1-152d000bfe59',
    name: 'Tom Clancy\'s Rainbow Six Siege',
    platform: 'XboxScarlett'
  },
  {
    id: '8956241d-236d-4dbd-9e1e-bf6ed133773a',
    name: 'Tom Clancy\'s Rainbow Six Siege China',
    platform: 'PCChina'
  },
  {
    id: 'a427a342-56bb-437b-b835-fa695c75893b',
    name: 'Tom Clancy\'s Rainbow Six Siege - Test Server',
    platform: 'PC'
  }
];
