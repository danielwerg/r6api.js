<div align="center">
  <h1>R6API.js</h1>
  <h3>🍫 Node.js wrapper around Rainbow Six: Siege API</h3>
  <p>
    <a href="https://github.com/danielwerg/r6api.js/releases"><img
      src="https://img.shields.io/github/v/release/danielwerg/r6api.js?label=version"
      alt="Version"
    /></a>
    <a href="https://github.com/danielwerg/r6api.js/releases"><img
      src="https://img.shields.io/github/release-date/danielwerg/r6api.js?label=last%20release"
      alt="Last release"
    /></a>
    <!-- change "LICENCE" after merging typescript branch to master -->
    <a href="https://github.com/danielwerg/r6api.js/blob/master/LICENCE"><img
      src="https://img.shields.io/github/license/danielwerg/r6api.js"
      alt="License"
    /></a>
    <a href="https://www.npmjs.com/package/r6api.js"><img
      src="https://img.shields.io/npm/dw/r6api.js"
      alt="NPM weakly downloads"
    /></a>
    <a href="https://discord.gg/hshRpWk"><img
      src="https://img.shields.io/discord/612212753498767360?logo=discord&label=R6HUB&color=7289DA"
      alt="R6HUB discord guild"
    /></a>
  </p>
</div>

## Table of Contents

* [Links](#Links)
* [Installation](#Installation)
* [Init](#Init)
* [Example](#Example)
* [API](#API)
* [Typescript Integrations](#TypeScript-integrations)
* [Credit](#Credit)

## Links

* [Changelog](https://github.com/danielwerg/r6api.js/releases)
* [GitHub](https://github.com/danielwerg/r6api.js)
* [YARN](https://yarnpkg.com/package/r6api.js)
* [NPM](https://www.npmjs.com/package/r6api.js)

## Installation

```sh
$ yarn add r6api.js
# OR
$ npm install r6api.js
```

## Init

To setup this module, you need to provide Ubisoft accounts credentials (email and password).
You don't have to use you real account.

How to create account?

* Go to [temp-mail.org](https://temp-mail.org)
* Copy your temporal email
* Go to [account.ubisoft.com/en-us/login](https://account.ubisoft.com/en-us/login)
* Provide all details there and remember your email and password

## Example

<!-- START:EXAMPLE -->
```js
require('dotenv').config();
const R6API = require('r6api.js').default;

// // Or ES6 way
// import * as dotenv from 'dotenv';
// dotenv.config();
// import R6API from 'r6api.js';

const r6api = new R6API({
  email: process.env.UBI_EMAIL,
  password: process.env.UBI_PASSWORD
});

// export default async () => { // ES6
exports.default = async () => {

  const username = 'Daniel.Nt';
  const platform = 'uplay';

  const { 0: player } = await r6api.findByUsername(platform, username);
  if (!player) return 'Player not found';

  const { 0: stats } = await r6api.getStats(platform, player.id);
  if (!stats) return 'Stats not found';
  const { pvp: { general } } = stats;

  return `${username} has played ${general.matches} matches.`;

};

```
<!-- END:EXAMPLE -->

<!-- START:EXAMPLE_OUTPUT -->
```
Daniel.Nt has played 5138 matches.
```
<!-- END:EXAMPLE_OUTPUT -->

## API

### Table of Contents

* [Definitions](#Definitions)
* [constructor](#constructor)
* [findByUsername](#findByUsername)
* [findById](#findById)
* [getProgression](#getProgression)
* [getPlaytime](#getPlaytime)
* [getRanks](#getRanks)
* [getStats](#getStats)
* [getStatus](#getStatus)
* [getNews](#getNews)
* [getNewsById](#getNewsById)
* [custom](#custom)

### Definitions

| Param      | Type                 | Description                                                           |
| ---------- | -------------------- | --------------------------------------------------------------------- |
| platform   | `string`             | Either `uplay` (pc), `xbl` (Xbox Live) or `psn` (PlayStation Network) |
| username/s | `string \| string[]` |                                                                       |
| id/s       | `string \| string[]` |                                                                       |

---

### constructor

#### Options

| Param    | Type     | Description              |
| -------- | -------- | ------------------------ |
| email    | `string` | Ubisoft account email    |
| password | `string` | Ubisoft account password |

```js
const r6api = new R6API(process.env.email, process.env.password);
```

---

### findByUsername

Find player by their username.

(platform, username/s) => `Promise<Array>`

```js
await r6api.findByUsername('uplay', 'Daniel.Nt');
```

<!-- START:FINDBYUSERNAME_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    userId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    idOnPlatform: '0B95544B-0228-49A7-B338-6D15CFBC3D6A',
    platform: 'uplay',
    username: 'Daniel.Nt',
    avatar: {
      '146': 'https://ubisoft-avatars.akamaized.net/0b95544b-0228-49a7-b338-6d15cfbc3d6a/default_146_146.png',
      '256': 'https://ubisoft-avatars.akamaized.net/0b95544b-0228-49a7-b338-6d15cfbc3d6a/default_256_256.png',
      '500': 'https://ubisoft-avatars.akamaized.net/0b95544b-0228-49a7-b338-6d15cfbc3d6a/default_tall.png'
    }
  }
]
```

</details>
<!-- END:FINDBYUSERNAME_OUTPUT -->

---

### findById

Find player by their id.

(platform | 'all', id/s, options) => `Promise<Array>`

```js
await r6api.findById('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- START:FINDBYID_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    userId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    idOnPlatform: '0B95544B-0228-49A7-B338-6D15CFBC3D6A',
    platform: 'uplay',
    username: 'Daniel.Nt',
    avatar: {
      '146': 'https://ubisoft-avatars.akamaized.net/0b95544b-0228-49a7-b338-6d15cfbc3d6a/default_146_146.png',
      '256': 'https://ubisoft-avatars.akamaized.net/0b95544b-0228-49a7-b338-6d15cfbc3d6a/default_256_256.png',
      '500': 'https://ubisoft-avatars.akamaized.net/0b95544b-0228-49a7-b338-6d15cfbc3d6a/default_tall.png'
    }
  }
]
```

</details>
<!-- END:FINDBYID_OUTPUT -->

---

### getProgression

Get level, xp and alpha pack drop chance for a player.

(platform, id/s) => `Promise<Array>`

```js
await r6api.getProgression('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- START:GETPROGRESSION_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    level: 293,
    xp: 98696,
    lootboxProbability: {
      raw: 230,
      percent: '2.30%'
    }
  }
]
```

</details>
<!-- END:GETPROGRESSION_OUTPUT -->

---

### getPlaytime

Get playtime for a player.

(platform, id/s) => `Promise<Array>`

```js
await r6api.getPlaytime('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- START:GETPLAYTIME_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    pvp: {
      general: 5809265,
      ranked: 5173666,
      casual: 590088,
      custom: 974,
      other: 44537
    },
    pve: {
      general: 281436
    }
  }
]
```

</details>
<!-- END:GETPLAYTIME_OUTPUT -->

---

### getRanks

Get seasonal stats for a player.

(platform, id/s, options) => `Promise<Array>`

#### Options

| Param   | Type                          | Required | Default                    | Description                      |
| ------- | ----------------------------- | -------- | -------------------------- | -------------------------------- |
| seasons | `number \| number[] \| 'all'` | false    | `-1`                       | Numbers from `6` to `19` or `-1` |
| regions | `string \| string[]`          | false    | `['emea', 'ncsa', 'apac']` |                                  |

#### Seasons reference

| ID   | Name           | ● | ID   | Name          | ● | ID   | Name           |
| ---- | -------------- | - | ---- | ------------- | - | ---- | -------------- |
| `-1` | Current Season |   | `10` | Para Bellum   |   | `15` | Ember Rise     |
| `6`  | Health         |   | `11` | Grim Sky      |   | `16` | Shifting Tides |
| `7`  | Blood Orchid   |   | `12` | Wind Bastion  |   | `17` | Void Edge      |
| `8`  | White Noise    |   | `13` | Burnt Horizon |   | `18` | Steel Wave     |
| `9`  | Chimera        |   | `14` | Phantom Sight |   | `19` | Shadow Legacy  |

> **Note:** Ubisoft doesn't provide data for seasons before Operation Health.

#### Regions reference

| Shorthand | Meaning                          |
| --------- | -------------------------------- |
| `emea`    | Europe, Middle East and Africa   |
| `ncsa`    | North, Central and South America |
| `apac`    | Asia Pacific                     |

```js
await r6api.getRanks('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a', { regions: 'emea' });
```

<!-- START:GETRANKS_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    seasons: {
      '19': {
        id: 19,
        name: 'Shadow Legacy',
        color: '#6ca511',
        image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5H87SAzADrzRmroVnJzuUE/2e73c489074b538055df0f793b4e1639/r6s-seasons-y5s3.jpg',
        regions: {
          emea: {
            id: 'emea',
            name: 'Europe, Middle East and Africa',
            skillMean: 33.084937863,
            skillStdev: 4.6365855331,
            current: {
              id: 19,
              name: 'Platinum 3',
              mmr: 3308,
              icon: 'https://github.com/danielwerg/r6api.js/raw/typescript/assets/ranks/ranks/19.png'
            },
            max: {
              id: 19,
              name: 'Platinum 3',
              mmr: 3470,
              icon: 'https://github.com/danielwerg/r6api.js/raw/typescript/assets/ranks/ranks/19.png'
            },
            lastMatch: {
              result: 'win',
              mmrChange: 40,
              skillMeanChange: 0.4044478743,
              skillStdevChange: -0.0169066275
            },
            previousMmr: 3200,
            nextMmr: 3600,
            topRankPosition: 0,
            kills: 382,
            deaths: 368,
            kd: 1.04,
            wins: 44,
            losses: 40,
            winRate: '52.38%',
            matches: 84,
            abandons: 1,
            updateTime: '2020-11-17T21:17:58.545000+00:00'
          }
        }
      }
    }
  }
]
```

</details>
<!-- END:GETRANKS_OUTPUT -->

> **Note:** `kills`, `deaths`, `kd`, `topRankPosition` and everything under `lastMatch` only available  for seasons including and after Phantom Sight (14) for older seasons it will return `0` or `false` in case of `lastMatch.won`

> **Note:** If player is unranked their max mmr (`max.mmr`) will always be `0`

> **Note:** Since Steal Wave all regions will return same data

---

### getStats

Get summary stats for a player.

(platform, id/s, options) => `Promise<Array>`

#### Options

| Param      | Type       | Required | Default      | Description              |
| ---------- | ---------- | -------- | ------------ | ------------------------ |
| raw        | `boolean`  | false    | `false`      | Include raw API response |
| categories | `string[]` | false    | Requests all | Categories to request    |

#### Categories reference

`pvp` `pve`

`general` `generalpvp` `generalpve`

`operators` `operatorspvp` `operatorspve`

`weapons` `weaponspvp` `weaponspve`

`queues` `queuespvp` `queuespve` `modes` `modespvp` `modespve`

`ranked` `casual` `custom`

`local` `coop` `normal` `hard` `realistic` `normallocal` `hardlocal` `realisticlocal` `normalcoop` `hardcoop` `realisticcoop`

`bomb` `secureArea` `hostage` `elimination`

`disarmBomb` `protectHostage` `extractHostage`

```js
await r6api.getStats('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    pvp: {
      general: [Object],
      operators: [Object],
      weapons: [Object],
      queues: [Object],
      modes: [Object]
    },
    pve: {
      general: [Object],
      operators: [Object],
      weapons: [Object],
      queues: [Object],
      modes: [Object]
    }
  }
]
```

</details>

> **Note:** Ubisoft stopped recording `bulletsFired` for `pvp` long time ago, don't rely on it

> **Note:** `distanceTravelled` value might be overflowed due to Ubisoft storing it in 32-bit int

[**Full response**](./docs/methods/getStats.json)

---

### getStatus

Get Rainbow Six: Siege servers status.

() => `Promise<Array>`

```js
await r6api.getStatus();
```

<!-- START:GETSTATUS_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    appId: 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40',
    name: 'Rainbow Six Siege - PC - LIVE',
    spaceId: '5172a557-50b5-4665-b7db-e3f2e8c5041d',
    mdm: '4073',
    category: 'Instance',
    platform: 'PC',
    status: 'Online',
    maintenance: null,
    impactedFeatures: []
  },
  {
    appId: 'fb4cc4c9-2063-461d-a1e8-84a7d36525fc',
    name: 'Rainbow Six Siege - PS4 - LIVE',
    spaceId: '05bfb3f7-6c21-4c42-be1f-97a33fb5cf66',
    mdm: '14922',
    category: 'Instance',
    platform: 'PS4',
    status: 'Online',
    maintenance: null,
    impactedFeatures: []
  },
  {
    appId: '',
    name: 'Rainbow Six Siege - PS5 - LIVE',
    spaceId: '',
    mdm: '25365',
    category: 'Instance',
    platform: 'PS5',
    status: 'Online',
    maintenance: null,
    impactedFeatures: []
  },
  {
    appId: '',
    name: 'Rainbow Six Siege - XBOX SERIES X - LIVE',
    spaceId: '',
    mdm: '25366',
    category: 'Instance',
    platform: 'XBOX SERIES X',
    status: 'Online',
    maintenance: null,
    impactedFeatures: []
  },
  {
    appId: '4008612d-3baf-49e4-957a-33066726a7bc',
    name: 'Rainbow Six Siege - XBOXONE - LIVE',
    spaceId: '98a601e5-ca91-4440-b1c5-753f601a2c90',
    mdm: '4075',
    category: 'Instance',
    platform: 'XBOXONE',
    status: 'Online',
    maintenance: null,
    impactedFeatures: []
  }
]
```

</details>
<!-- END:GETSTATUS_OUTPUT -->

---

### getNews

Get Rainbow Six: Siege News.

(options) => `Promise<Object>`

#### Options

| Param          | Type      | Required | Default   | Description                                               |
| -------------- | --------- | -------- | --------- | --------------------------------------------------------- |
| raw            | `boolean` | false    | `false`   | Include raw API response                                  |
| category       | `string`  | false    | `'all'`   | all, game-updates, patch-notes, community, store, esports |
| media          | `string`  | false    | `'all'`   | all, news, videos                                         |
| limit          | `number`  | false    | `6`       |                                                           |
| skip           | `number`  | false    | `0`       |                                                           |
| startIndex     | `number`  | false    | `0`       |                                                           |
| locale         | `string`  | false    | `'en-us'` |                                                           |
| fallbackLocale | `string`  | false    | `'en-us'` |                                                           |

```js
await r6api.getNews({ limit: 1 });
```

<!-- START:GETNEWS_OUTPUT -->
<details>
<summary>Output</summary>

```js
{
  total: 1093,
  limit: 1,
  categories: 'all',
  media: 'all',
  skip: 0,
  startIndex: 0,
  placement: '',
  tags: 'BR-rainbow-six GA-siege',
  items: [
    {
      id: '4qcvHDulgxm5CC565Bo042',
      title: 'Tom Clancy\'s Rainbow Six Siege – Next-Generation Consoles',
      abstract: 'Rainbow Six Siege is coming to Next-Gen consoles with enhanced performance.',
      thumbnail: {
        url: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4njiQIf5ZM8VWD7BuGfbJD/f02603f39e30bdf6738dcc293bdc5137/tu331_tachanka_patch_notes.jpg',
        description: null
      },
      content: 'We are glad to announce that Tom Clancy’s Rainbow Six Siege will be available on the next generation consoles, and that you will have the opportunity to play the PS5 and Xbox Series X|S versions of the game starting December 1st.  \n\nThis next generation brings innovations that allow us to continue enhancing the Rainbow Six Siege experience, and we are excited to share with you today more information on what you can look forward to on new consoles.\n\n## Easily Transition to Next-Gen\nIf you currently own a copy of Rainbow Six Siege on PS4 or Xbox One, and plan to stay within the same console family, you will be able to upgrade your game at no extra cost*. In addition, all players will be able to keep their progression and in-game items when transitioning between console generations. Please remember that physical game copies will not be able to transfer to discless console versions.\n\n## Enjoy Cross-Generation Play and Progression \nIf you are looking to get a next-gen console, don’t worry about your Rainbow Six Siege progression and in-game items when transitioning: we’ve got you covered. With the new Ubisoft Connect ecosystem, you will keep your progression and in-game items when switching between devices within the same family of consoles: from PS4 to PS5 and from Xbox One to Xbox Series X|S.\n\nAs previously announced, cross-play will also be available for players within the same console family, so that you can keep playing with your friends no matter what generation they are playing from.\n\nAs for cross-progression and cross-play between PC and consoles, or between consoles from different families, we are continuously listening to your feedback and we know this is something important to you. While these features will not be available at launch on next-gen versions, we are exploring the possibilities. We want to make sure we are taking all necessary elements into consideration to ensure we continue providing all of you with the best technical and well-rounded experience. This type of implementation needs to be thoroughly thought-through, and this is where we stand right now. We will be sure to update you in the future when we have more news to share. \n\n## Play with Enhanced Graphics and Performance on Next-Gen\nGet ready to experience the thrill of enjoying the highest level of graphical enhancements that the game has to offer on console. To make sure we cater to all needs, you will be able to choose between different options, whether you wish to prioritize the best framerate, or the highest resolution, granted that you are equipped with a compatible screen device:\n- __Performance Mode:__ Target 120 FPS with 4K Dynamic Resolution Scaling (PS5, Xbox Series X) / Target 120 FPS at 1080p (Xbox Series S)\n- __Resolution Mode:__ Target 60 FPS with 4K resolution (PS5, Xbox Series X) / Target 60 FPS at 1728p (Xbox Series S)\n\nFor PS5 owners, you will also enjoy: \n- Deeper immersion with your DualSense controller capabilities: haptic feedback, adaptive triggers, and controller sound output.\n- Activities support for Ranked, Unranked, Newcomer, Quick Match & Events so players can dive into the game faster. \n\nFor Xbox Series X|S owners, you will find:\n- Quick Resume ability that enables you to switch between multiple titles and resume instantly from where you last left off.\n\nAdditional features are also coming on all platforms with this next-gen launch, such as accessibility features (readability options and text-to-speech and speech-to-text), quick start options and the all new Ubisoft Connect overlay.\n\nThese are exciting times to be a Rainbow Six Siege player, and we hope that you are as eager as we are for what’s coming. We will see you soon!\n\n-Rainbow 6 Siege Dev Team       \n\n*Conditions and restrictions apply. To upgrade eligible physical disc copies, a console with a disc drive is required. Visit https://ubi.li/5z5Hk for details.\n',
      description: null,
      categories: [
        'rainbow-six-siege',
        'rainbow-six',
        'community',
        'news',
        'game-updates'
      ],
      tag: 'BR-rainbow-six GA-siege',
      placement: [
        ''
      ],
      type: 'news',
      readTime: '4',
      url: 'https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates/4qcvHDulgxm5CC565Bo042/tom-clancys-rainbow-six-siege-nextgeneration-consoles',
      date: '2020-11-24T22:00:00.000Z'
    }
  ]
}
```

</details>
<!-- END:GETNEWS_OUTPUT -->

---

### getNewsById

Get Rainbow Six: Siege News by ID.

(id: `string`, options) => `Promise<Object>`

#### Options

| Param          | Type      | Required | Default   | Description              |
| -------------- | --------- | -------- | --------- | ------------------------ |
| raw            | `boolean` | false    | `false`   | Include raw API response |
| locale         | `string`  | false    | `'en-us'` |                          |
| fallbackLocale | `string`  | false    | `'en-us'` |                          |

```js
await r6api.getNewsById('4QAhnXnPk7Ffse8scw3k0Z');
```

<!-- START:GETNEWSBYID_OUTPUT -->
<details>
<summary>Output</summary>

```js
{
  total: 1080,
  limit: 0,
  categories: 'all',
  media: 'all',
  skip: 0,
  startIndex: 0,
  placement: '',
  tags: 'BR-rainbow-six GA-siege',
  item: {
    id: '4QAhnXnPk7Ffse8scw3k0Z',
    title: 'Y5S1.2 Patch Notes',
    abstract: 'The Y5S1.2 Patch will deploy to PC and Console in the week of April 20th. ',
    thumbnail: {
      url: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/Gqlz4Wt00TfhvaSH4d8LZ/0e7f0e99e9f2845dc323a60ce3825aa1/y5s1_2_pn-min.png',
      description: null
    },
    content: 'The Y5S1.2 Patch will deploy to PC and Console in the week of April 20th. Please see our [Designer\'s Notes](https://rainbow6.com/dn_y5s12) for more insight on the balancing changes coming with the update.\n\n# UPDATE\nUpdate - the quick match map pool will remain the same throughout Y5S1 and will rotate again in Y5S2.\n\n# BALANCING\n### BUCK \n*With you til the end of the line.*\n\n- Frag Grenades replaced with Claymores.\n- Increased Skeleton Key Magazine Capacity: \n  - Skeleton Key magazine capacity increased to 5 + 1\n  - Skeleton Key max ammo count is now 25+1\n\n### GOYO\n*Less is more.*\n\n- Reduced number of Volcán shields to 2 (down from 3).\n\n### JÄGER\n*Less of a pain-in-the-schnitzel.*\n\n- Now a 2-speed/2-armor operator.\n\n### MOZZIE\n*Still a shortie.*\n\n- Removed Super Shorty secondary.\n\n### YING\n*Lights, Camera, Action!*\n\n- Increased number of Candelas to 4 (up from 3).\n- Replaced Claymores with Smoke Grenades.\n- Increased T-95 LSW damage to 46 (up from 43).\n\n### M12 (Caveira)\n- Added a Razor Holographic Sight option to her M12.\n\n### TCSG12 (Kaid, Goyo)\n- Added an additional magazine to the TCSG12.\n- Reduced TCSG12 damage to 57 (down from 84).\n\n# BUG FIXES\n- FIXED – Barricade replication issues where the barricade is not destroyed for all players in game except the shooter.\n- FIXED – The Dynamic Play button does not update properly when last match was on an Event/Discovery playlist.\n- FIXED – Players can clip inside the excavator in EXT Construction Site of Oregon.\n- FIXED – Game boots with DX11 when players manually select the Vulkan executable in the steam installation folder.\n- FIXED – Minor menu/shop visual and cosmetic fixes.\n- FIXED – Lighting issue on Consulate map for consoles (hotfixed on PC on [March 30](https://twitter.com/rainbow6game/status/1244581743254024192?lang=en)).',
    description: null,
    categories: [
      'news',
      'rainbow-six',
      'rainbow-six-siege',
      'patch-notes'
    ],
    tag: 'BR-rainbow-six GA-siege',
    placement: [
      'featured-news-article'
    ],
    type: 'news',
    readTime: '2',
    url: 'https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates/4QAhnXnPk7Ffse8scw3k0Z/y5s12-patch-notes',
    date: '2020-04-20T21:00:00.000Z'
  }
}
```

</details>
<!-- END:GETNEWSBYID_OUTPUT -->

---

### custom

Useful if you're familiar with Rainbow Six Siege's API; this method will make a request to a custom URL you would provide with the token in the header.

(url: `string`, params: `any`) => `Promise<T>`

```js
await r6api.custom(
  utils.URLS.STATS(
    'uplay', ['0b95544b-0228-49a7-b338-6d15cfbc3d6a'],
    'operatorpvp_clash_sloweddown'
  )
);
```

<!-- START:CUSTOM_OUTPUT -->
<details>
<summary>Output</summary>

```js
{
  results: {
    '0b95544b-0228-49a7-b338-6d15cfbc3d6a': {
      'operatorpvp_clash_sloweddown:3:10:infinite': 2
    }
  }
}
```

</details>
<!-- END:CUSTOM_OUTPUT -->

---

### TypeScript integrations

This package is developed in TypeScript, and the typings are shipped along with the built package: that means that your editor should automatically detect them and give you the static type info.
For a full list of supporting IDEs, please see [here](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support).

If you're coding in TypeScript you can also import the typings and use the type-checking functions provided in the utils.

```ts
import R6API, { utils, typings, constants } from 'r6api.js'

var yourVar; // any
...
if (utils.isWeaponName(yourVar)) {
  // Now your var has the WeaponName type
}

const platform = constants.PLATFORMS as typings.Platform[];
```

### Credit

Operator Icons from [r6operators.marcopixel.eu](https://r6operators.marcopixel.eu)