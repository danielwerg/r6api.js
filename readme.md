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
* [Initialization](#Initialization)
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

## Initialization

To setup this package, you need to provide Ubisoft account credentials (email and password). Credentials should be handled as you would handle any other secure value, it is recommended to use [dotenv](https://github.com/motdotla/dotenv) package to load environment variables from a `.env`.

**Do not** use your real Ubisoft account. It is highly recommended to create a new account for using this package. Visit [account.ubisoft.com/login](https://account.ubisoft.com/login) to create new account.

## Example

<!-- START_SECTION:EXAMPLE -->
```js
require('dotenv').config();
const R6API = require('r6api.js').default;

// // Or ES6 way
// import * as dotenv from 'dotenv';
// dotenv.config();
// import R6API from 'r6api.js';

const { UBI_EMAIL: email = '', UBI_PASSWORD: password = '' } = process.env;
const r6api = new R6API({ email, password });

// export default async () => { // ES6
exports.default = async () => {

  const username = 'Daniel.Nt';
  const platform = 'uplay';

  const { 0: player } = await r6api.findByUsername(platform, username);
  if (!player) return 'Player not found';

  const { 0: stats } = await r6api.getStats(platform, player.id);
  if (!stats) return 'Stats not found';
  const { pvp: { general } } = stats;

  return `${player.username} has played ${general.matches} matches.`;

};

```
<!-- END_SECTION:EXAMPLE -->

<!-- START_SECTION:EXAMPLE_OUTPUT -->
```
Daniel.Nt has played 5205 matches.
```
<!-- END_SECTION:EXAMPLE_OUTPUT -->

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
* [validateUsername](#validateUsername)
* [getNews](#getNews)
* [getNewsById](#getNewsById)
* [custom](#custom)

### Definitions

| Param       | Type                 | Description                                                           |
| ----------- | -------------------- | --------------------------------------------------------------------- |
| platform    | `string`             | Either `uplay` (pc), `xbl` (Xbox Live) or `psn` (PlayStation Network) |
| platformAll | `string`             | `platform`, `steam`, `epic` or `amazon`                               |
| username/s  | `string \| string[]` |                                                                       |
| id/s        | `string \| string[]` |                                                                       |

---

### constructor

#### Options

| Param    | Type     | Description              |
| -------- | -------- | ------------------------ |
| email    | `string` | Ubisoft account email    |
| password | `string` | Ubisoft account password |

```js
const { UBI_EMAIL: email = '', UBI_PASSWORD: password = '' } = process.env;
const r6api = new R6API({ email, password });
```

---

### findByUsername

Find player by their username.

Usernames limit: `50`

(platformAll, username/s) => `Promise<Array>`

```js
await r6api.findByUsername('uplay', 'Daniel.Nt');
```

<!-- START_SECTION:FINDBYUSERNAME_OUTPUT -->
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
<!-- END_SECTION:FINDBYUSERNAME_OUTPUT -->

---

### findById

Find player by their id.

Ids limit: `50`

(platformAll | 'all', id/s, options?) => `Promise<Array>`

#### Options

<!-- START_SECTION:FINDBYID_OPTIONS -->

| Param    | Type      | Required | Default | Description                     |
| -------- | --------- | -------- | ------- | ------------------------------- |
| isUserId | `boolean` | false    | `false` | Whether `id` is `userId` or not |

<!-- END_SECTION:FINDBYID_OPTIONS -->

```js
// search by profileId (id)
await r6api.findById('all', '91477729-b5ac-463c-9618-03ca154764f5');
// search by userId
await r6api.findById('all', '1baf5bf8-90cd-4ead-8b90-9a11cb2b8adf', { isUserId: true });
// search by idOnPlatform
await r6api.findById('xbl', '2535406338711362');
```

```js
await r6api.findById('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- START_SECTION:FINDBYID_OUTPUT -->
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
<!-- END_SECTION:FINDBYID_OUTPUT -->

---

### getPlaytime

Get playtime for a player.

Ids limit: `200`

(platform, id/s) => `Promise<Array>`

```js
await r6api.getPlaytime('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- START_SECTION:GETPLAYTIME_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    pvp: {
      general: 5984372,
      ranked: 5312097,
      casual: 614423,
      custom: 974,
      other: 56878
    },
    pve: {
      general: 292574
    }
  }
]
```

</details>
<!-- END_SECTION:GETPLAYTIME_OUTPUT -->

---

### getProgression

Get level, xp and alpha pack drop chance for a player.

Ids limit: `200`

(platform, id/s) => `Promise<Array>`

```js
await r6api.getProgression('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- START_SECTION:GETPROGRESSION_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    level: 297,
    xp: 73534,
    lootboxProbability: {
      raw: 820,
      percent: '8.20%'
    }
  }
]
```

</details>
<!-- END_SECTION:GETPROGRESSION_OUTPUT -->

---

### getRanks

Get seasonal stats for a player.

Ids limit: `200`

(platform, id/s, options?) => `Promise<Array>`

#### Options

<!-- START_SECTION:GETRANKS_OPTIONS -->

| Param   | Type                           | Required | Default                    | Description                      |
| ------- | ------------------------------ | -------- | -------------------------- | -------------------------------- |
| seasons | `number \| number[] \| 'all'`  | false    | `-1`                       | Numbers from `6` to `20` or `-1` |
| regions | `string \| string[]`           | false    | `['emea', 'ncsa', 'apac']` |                                  |
| board   | `'pvp_ranked' \| 'pvp_casual'` | false    | `'pvp_ranked'`             |                                  |

<!-- END_SECTION:GETRANKS_OPTIONS -->

#### Seasons reference

<!-- START_SECTION:SEASONS_TABLE -->

| ID   | Name         | ● | ID   | Name          | ● | ID   | Name           |
| ---- | ------------ | - | ---- | ------------- | - | ---- | -------------- |
| `6`  | Health       |   | `11` | Grim Sky      |   | `16` | Shifting Tides |
| `7`  | Blood Orchid |   | `12` | Wind Bastion  |   | `17` | Void Edge      |
| `8`  | White Noise  |   | `13` | Burnt Horizon |   | `18` | Steel Wave     |
| `9`  | Chimera      |   | `14` | Phantom Sight |   | `19` | Shadow Legacy  |
| `10` | Para Bellum  |   | `15` | Ember Rise    |   | `20` | Neon Dawn      |

<!-- END_SECTION:SEASONS_TABLE -->

> **Note:** `-1` will always return current season

> **Note:** Ubisoft doesn't provide data for seasons before Operation Health (6) if board is `pvp_ranked` or Ember Rise (15) if board is `pvp_casual`

#### Regions reference

<!-- START_SECTION:REGIONS_TABLE -->

| Shorthand | Meaning                          |
| --------- | -------------------------------- |
| `emea`    | Europe, Middle East and Africa   |
| `ncsa`    | North, Central and South America |
| `apac`    | Asia Pacific                     |

<!-- END_SECTION:REGIONS_TABLE -->

```js
await r6api.getRanks('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a', { regions: 'emea' });
```

<!-- START_SECTION:GETRANKS_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    boardId: 'pvp_ranked',
    boardName: 'Ranked',
    seasons: {
      '20': {
        id: 20,
        name: 'Neon Dawn',
        color: '#D14007',
        image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3vRTyOgSmwcUVxiOk60p3w/e2f41521df1f67704dae051d147a32cc/r6s-seasons-y5s4.jpg',
        releaseDate: '2020-12-01T00:00:00.000Z',
        regions: {
          emea: {
            id: 'emea',
            name: 'Europe, Middle East and Africa',
            skillMean: 31.0012849098,
            skillStdev: 6.2625554853,
            current: {
              id: 18,
              name: 'Gold 1',
              mmr: 3100,
              icon: 'https://github.com/danielwerg/r6api.js/raw/typescript/assets/ranks/v3/Gold%201.png'
            },
            max: {
              id: 19,
              name: 'Platinum 3',
              mmr: 3396,
              icon: 'https://github.com/danielwerg/r6api.js/raw/typescript/assets/ranks/v3.1/Platinum%203.png'
            },
            lastMatch: {
              result: 'loss',
              mmrChange: -65,
              skillMeanChange: -0.6529273971,
              skillStdevChange: -0.0395949962
            },
            previousMmr: 3000,
            nextMmr: 3200,
            topRankPosition: 0,
            kills: 123,
            deaths: 114,
            kd: 1.08,
            wins: 12,
            losses: 13,
            winRate: '48.00%',
            matches: 25,
            abandons: 0,
            updateTime: '2020-12-28T16:30:07.288000+00:00'
          }
        }
      }
    }
  }
]
```

</details>
<!-- END_SECTION:GETRANKS_OUTPUT -->

> **Note:** `kills`, `deaths`, `kd`, `topRankPosition` and everything under `lastMatch` only available  for seasons including and after Phantom Sight (14) for older seasons it will return `0` or `'unknown'` in case of `lastMatch.result`

> **Note:** If player is unranked their max mmr (`max.mmr`) will always be `0` (it's always `0` for casual)

> **Note:** Since Steal Wave (18) all regions will return same data

> **Note:** Values for `previousMmr`, `nextMmr`, `topRankPosition`, `max.id` and `max.mmr` will always be `0`, `max.name` will always be `Unranked` if `boardId` is `pvp_casual`

---

### getStats

Get summary stats for a player.

Ids limit: `200`

(platform, id/s, options?) => `Promise<Array>`

#### Options

<!-- START_SECTION:GETSTATS_OPTIONS -->

| Param      | Type       | Required | Default      | Description              |
| ---------- | ---------- | -------- | ------------ | ------------------------ |
| raw        | `boolean`  | false    | `false`      | Include raw API response |
| categories | `string[]` | false    | Requests all | Categories to request    |

<!-- END_SECTION:GETSTATS_OPTIONS -->

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

<!-- START_SECTION:GETSTATUS_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    appId: '8956241d-236d-4dbd-9e1e-bf6ed133773a',
    name: 'Rainbow Six Siege - China - PC - LIVE',
    spaceId: 'f4a93aa0-e9a9-4b2a-918b-6995a82b8e9b',
    mdm: '23702',
    category: 'Instance',
    platform: 'PC',
    status: 'Online',
    maintenance: null,
    impactedFeatures: []
  },
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
    appId: '6e3c99c9-6c3f-43f4-b4f6-f1a3143f2764',
    name: 'Rainbow Six Siege - PS5 - LIVE',
    spaceId: '96c1d424-057e-4ff7-860b-6b9c9222bdbf',
    mdm: '25365',
    category: 'Instance',
    platform: 'PS5',
    status: 'Online',
    maintenance: null,
    impactedFeatures: []
  },
  {
    appId: '76f580d5-7f50-47cc-bbc1-152d000bfe59',
    name: 'Rainbow Six Siege - XBOX SERIES X - LIVE',
    spaceId: '631d8095-c443-4e21-b301-4af1a0929c27',
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
<!-- END_SECTION:GETSTATUS_OUTPUT -->

---

### validateUsername

Validate username.

(username) => `Promise<Object>`

```js
await r6api.validateUsername('gamerflick360');
```

<!-- START_SECTION:VALIDATEUSERNAME_OUTPUT -->
<details>
<summary>Output</summary>

```js
{
  valid: false,
  validationReports: [
    {
      message: '\'flick\' matches \'flick\'',
      categories: [
        'global-username',
        'vulgarity'
      ],
      severity: 'high',
      locale: 'en-US',
      errorCode: 1013,
      suggestions: null
    }
  ]
}
```

</details>
<!-- END_SECTION:VALIDATEUSERNAME_OUTPUT -->

---

### getNews

Get Rainbow Six: Siege News.

(options?) => `Promise<Object>`

#### Options

<!-- START_SECTION:GETNEWS_OPTIONS -->

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

<!-- END_SECTION:GETNEWS_OPTIONS -->

```js
await r6api.getNews({ limit: 1 });
```

<!-- START_SECTION:GETNEWS_OUTPUT -->
<details>
<summary>Output</summary>

```js
{
  total: 1108,
  limit: 1,
  categories: 'all',
  media: 'all',
  skip: 0,
  startIndex: 0,
  placement: '',
  tags: 'BR-rainbow-six GA-siege',
  items: [
    {
      id: 'dgqT0JSmCGnA7wjReE3LC',
      title: 'Y6S1 PRE-SEASON DESIGNER\'S NOTES',
      abstract: 'In this latest edition of Designer’s Notes, we\'ll go into more detail about the balancing changes that’ll come with the Crimson Heist patch and give you an insight into the reasons behind these changes.',
      thumbnail: {
        url: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5njbiYMWcZreMHWLm9jWY9/200fc861d792fa0a4274bc83215b9305/R6_DesignersNotes_Y6S1_1920X1080_Title.png',
        description: null
      },
      content: 'In this latest edition of Designer’s Notes, we\'ll go into more detail about the balancing changes that’ll come with the Crimson Heist patch and give you an insight into the reasons behind these changes.\n\n# BALANCING MATRIX AND TOP OPERATOR BANS\n\n__WIN DELTA VS. PRESENCE__\n\n![Y5S4.3 Matrix Attackers (1)](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6maHoyjNF23VeYlPqVAzoR/51d529647cfc2d1e77c745269b8bf9e9/Y5S4.3_Matrix_Attackers__1_.jpg)\n\n![Y5S4.3 Matrix Defenders](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4CMDiusILMnCU1E2URvbmR/8588f897afc258fa6b20114e7940cb09/Y5S4.3_Matrix_Defenders.jpg)\n\n*Please note that we are using presence to gauge the popularity of an Operator. This notion had to be introduced to reflect the implementation of the pick & ban.*\n\n*Presence definition: pick rate of an Operator when not banned. Win Delta: The Win Delta is aggregated from Operator\'s Win Deltas per Bomb Site.*\n\n__OPERATOR BAN RATE__\n\n![BanMatrixAttY5S4.3](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1u1oIZyuQsmvUxv8HqNRM4/951ac835344c7441b35bdab3e23ca504/BanMatrixAttY5S4.3.png)\n\n![BanMatrixdefY5S4.3](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/gbj5zgZQATEOdBn6k3r7S/086035bd9f7e282126870e13a9aa1475/BanMatrixdefY5S4.3.png)\n\n# OPERATOR BALANCING\n\n### KALI\n\n- Increased CSRX 300 damage to 127 (from 122)\n  - 1 body shot will kill a 3-speed Operator\n  - 1 body shot will DBNO a 2-speed Operator\n  - 1 body shot will DBNO a 1-speed Operator\n  - Wearing Rook Vest\n    - 1 body shot will DBNO a 3-speed Operator\n    - 2 body shots will DBNO a 2-speed Operator\n    - 2 body shots will DBNO a 1-speed Operator\n\nPopulation targeted by this change: Casual, Top Ranked and Pros.\n\nOur main objective with Kali is to make her a viable and balanced operator. In general, this requires us to strike the right balance between ability (LV Explosive Lance) and loadout. For Kali in particular, this depends on two main elements. The first is that Kali brings a great amount of utility to the game. The LV Explosive Lance can deal with gadgets, including bulletproof gadgets and ones behind electrified reinforcements. The second element is the CSRX 300. This primary weapon is in charge of most of her killing potential, and keeping this weapon in line is key to avoiding an overpowered operator.\n\nUnsurprisingly, finding the right balance for a one-shot-kill weapon can take a number of iterations. We noticed that on release, Kali was perceived as overpowered, but the power perception has been slowly drifting towards "underperforming." In the previous patch, we took our first step in finding the sweet spot for the CSRX 300. We have looked at your feedback and we are making new changes.\n\n__What we\'ve done so far:__\n\nWe started by identifying the 1-shot-DBNO mechanic as one of the main issues. The mechanic was perceived as frustrating and it did not allow us to tweak the weapon power level, so we decided to transform the CSRX 300 into a normal weapon. Now, we can modify the weapon damage and iterate until we find the sweet spot.\n\nWith this change, we\'ve also tackled the lack of counter for Kali\'s CSRX 300. For example, now, wearing Rook\'s Armor Plates can now help Operators to survive a body shot.\n\nWe also wanted to keep the damage modifiers caused by bullets getting through walls or hitting Operators limbs\', as this helps to prevent lucky shots that can kill or put Operators in to DBNO. This also ensures good aim is rewarded.\nThe first iteration set the damage at 122. With this value, we had a compromise where 3-speed Operators would die from a chest shot and 1-speeds would survive it. This compromise took into account that 1-speed Operators do not represent a majority in a defensive line-up, especially on Pro League. This approach has been perceived as too weak, though, and we are making new changes to address that.\n\n__What we\'re doing now:__\n\nOur next step is to increase the weapon damage to make 1-speed Operators also fall into DBNO. Like last time, we will be monitoring your feedback and the game data to ensure we continue tracking towards finding that sweet spot for Kali. For some Operators, balance is a process that takes iteration, so we appreciate the feedback and insight the community has shared here!\n\n__Additional insight into Kali\'s interaction with Rook\'s Armor Plate:__\n\nWith the above change in mind, we want Rook\'s ability to be relevant against Kali\'s CSRX 300. We are not creating any specific rules for the interaction, but we want to clarify how Rook\'s Armor works:\n\nWhen an operator is wearing Rook\'s Armor Plate, their armor gains an extra 15% protection. This means that:\n\n- A 3-speed Operator will have 15% damage reduction.\n- A 2-speed Operator will have 25% damage reduction.\n- A 1-speed Operator will have 35% damage reduction.\n\nThis means that with the new damage value, only 3-speed operators will fall into DBNO when receiving a CSRX 300 body shot. The rest of the 2 and 3-speed Operators will survive that shot.\n\n### BLACKBEARD\n\n- Reduced Shield HP to 20 (from 50)\n- Reduced MK17 damage to 40 (from 49)\n\nPopulation targeted by this change: Casual, Top Ranked and Pros.\n\nAccording to the Balancing Matrix, Blackbeard continues to be a force to reckon with, sporting the highest Attacker win delta. Between the great utility afforded by his Rifle Shields and a loadout with strong damage capabilities that has earned him a high K/D, he is a point of frustration for Defenders.\n\nBy reducing the HP of his shields and damage of his MK17, this will slightly reduce both his killing potential and survivability. Given that the majority of the time, Blackbeard ends matches with shield economy to spare, this change should be fair to both sides as it brings him more in line with other Attackers.\n\n### DOKKAEBI\n\n- Added Gonne-6 (Removed C75)\n- Added Stun Grenades (Removed Frag Grenades)\n\nPopulation targeted by this change: Casual, Top Ranked and Pros.\n\nDokkaebi is the first of two Operators who will be encountering a loadout shakeup this patch to make way for the newest gun in the Siege armoury. The Gonne-6 will replace the C75 as her secondary weapon, providing highly accurate explosive utility for dealing with gadgets, abilities and Operators. As a result, her gadgets have also been tweaked to limit the number of explosives at her disposal.\n\nIt\'s no secret that Dokkaebi has received a number of loadout changes in the past year. The initial intention for giving her Frag Grenades was to offer more utility against bulletproof devices rather than to increase killing potential. By switching to Stun Grenades, she will retain this utility against bulletproof devices while also empowering her with a wider range of tools to better adapt to her surroundings while disrupting Defenders.\n\n### FINKA\n\n- Added Gonne-6 (Removed GSH-18)\n- Added Stun Grenades (Removed Frag Grenades)\n\nPopulation targeted by this change: Casual, Top Ranked and Pros.\n\nLike Dokkaebi, Finka is also receiving an update to her loadout, gaining the Gonne-6 secondary weapon and replacing her Frag Grenades with Stun Grenades. Given her strong win delta compared to other Attackers on the Balancing Matrix, the slight reduction in AoE damage capabilities is not expected to have a significant effect on her performance, particularly now that she is able to accurately deny many Defenders’ tools with the Gonne-6.\n\n### MOZZIE\n\n- Warning will hint at the distance to Pests by modifying its blinking speed\n\nPopulation targeted by this change: Top Ranked and Pros.\n\nIn its current state, Mozzie’s Pest lacks clear counters and often forces Attackers to waste time and resources in order to avoid or mitigate obvious traps. The difficulty countering him has made Mozzie a particularly useful Operator, and has contributed to driving up his presence in the Balancing Matrix.\n\nBy adding a proximity warning to Pests, this provides Attackers with a tool to more effectively avoid or deal with clear traps. While this change will not fundamentally change Mozzie’s moment-to-moment actions, it will encourage more creative placement of Pests to get the jump on Attackers.  \n\n### NØKK\n\n- While HEL Presence Reduction is active, Nøkk won\'t activate proximity-based gadgets\n  - Gadgets affected: Ela\'s Grzmot Mine, Melusi’s Banshee, Kapkan’s Entry Denial Device, Proximity Alarm, and Metal Detectors\n- Nøkk\'s glitch effect will cancel the proximity immunity, resulting in the activation of any gadget in range\n- The color of the HEL device on Nøkk’s hand will change colour when bypassing any proximity device\n\nPopulation targeted by this change: Top Ranked and Pros.\n\nNøkk was initially designed as a counter-intel Operator, but not every intel tool is a camera. Devices triggered by proximity give very useful information as the activation’s sound cue provides information without requiring players to lower their weapon. We want to make Nøkk\'s gadget more interesting to play and useful against more defensive setups.\n\n__Please note, this is a TEST SERVER ONLY change.__ We will turn it off before releasing the new season to continue working on her. We have tested this change internally and while we feel it adds an interesting dynamic to her play, there are still some unanswered questions. Therefore, we would like to hear your feedback and iterate before deploying this to the wider community.\n\n### TWITCH\n\n- Added Smoke Grenades (Removed Stun Grenades)\n\nPopulation targeted by this change: Top Ranked.\n\nTwitch continues to have a high presence in the Balancing Matrix. This is due in part to her high killing potential and aggressive playstyle as a secondary entry fragger.\n\nBy replacing her Stun Grenades with Smoke Grenades, this removes one of the tools that empowers such aggressive play and opens up additional role opportunities for players who would rather hang back and provide support. We will continue to monitor how this affects her playstyle to ensure any changes retain the core of why players love Twitch.\n\n# WEAPON BALANCING\n\n### G36\n\n- Improved recoil\n\nPopulation targeted by this change: Casual, Top Ranked and Pros.\n\nIt\'s no secret that the G36 has been overshadowed by the R4C and ARX and is in need of a tweak. In order to make it feel better to use while bringing it more in line with the effectiveness of its contemporaries, this assault rifle\'s recoil has been updated.\n\nPlayers should notice an immediate change in its handling. Specifically, recoil will no longer drift horizontally, making it more reliable. Like anything relating to the handling of weapons, though, it\'s important to note that we are continuing to look at how we can further improve the feel of different weapons in players\' loadouts.\n\n# OTHER CHANGES\n\n### DISABLED STATE FOR ELECTRONIC GADGETS\n\nWith Year 6 Season 1, when a gadget is disabled by Mute, there will be proper feedback showcased to players. \n\nExpect feedback when the following gadgets are disabled while in play:\n\n- Attacker drones\n- Breach Charges\n- Hibana\'s X-Kairos\n- Fuze\'s Cluster Charge\n- Thermite\'s Exothermic Charge\n- Zero\'s ARGUS Cameras\n- Claymores\n- Nomad\'s Airjabs\n\n---\n\nTry out the latest Rainbow Six updates on the Test Server and earn an exclusive charm through the [Bug Hunter Program](http://rainbow6.com/bughunterprogram).\n\nFollow us and share your feedback on [Twitter](https://twitter.com/Rainbow6Game), [Reddit](https://www.reddit.com/r/Rainbow6/), [Facebook](https://www.facebook.com/Rainbow6/) and on our [forums](https://forums.ubi.com/forumdisplay.php/64-Rainbow-Six).\n',
      description: undefined,
      categories: [
        'rainbow-six',
        'rainbow-six-siege'
      ],
      tag: 'BR-rainbow-six GA-siege',
      placement: null,
      type: 'news',
      readTime: '10',
      url: 'https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates/dgqT0JSmCGnA7wjReE3LC/y6s1-preseason-designers-notes',
      date: '2021-02-22T17:00:00.000Z'
    }
  ]
}
```

</details>
<!-- END_SECTION:GETNEWS_OUTPUT -->

---

### getNewsById

Get Rainbow Six: Siege News by ID.

(id: `string`, options?) => `Promise<Object>`

#### Options

<!-- START_SECTION:GETNEWSBYID_OPTIONS -->

| Param          | Type      | Required | Default   | Description              |
| -------------- | --------- | -------- | --------- | ------------------------ |
| raw            | `boolean` | false    | `false`   | Include raw API response |
| locale         | `string`  | false    | `'en-us'` |                          |
| fallbackLocale | `string`  | false    | `'en-us'` |                          |

<!-- END_SECTION:GETNEWSBYID_OPTIONS -->

```js
await r6api.getNewsById('4QAhnXnPk7Ffse8scw3k0Z');
```

<!-- START_SECTION:GETNEWSBYID_OUTPUT -->
<details>
<summary>Output</summary>

```js
{
  total: 1094,
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
    description: undefined,
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
<!-- END_SECTION:GETNEWSBYID_OUTPUT -->

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

<!-- START_SECTION:CUSTOM_OUTPUT -->
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
<!-- END_SECTION:CUSTOM_OUTPUT -->

---

### TypeScript integrations

This package is developed in TypeScript, and the typings are shipped along with the built package: that means that your editor should automatically detect them and give you the static type info.
For a full list of supporting IDEs, please see [here](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support).

If you're coding in TypeScript you can also import the typings and use the type-checking functions provided in the utils.

```ts
import R6API, { utils, typings, constants } from 'r6api.js'

const yourVar = 'r4-c'; // any

if (utils.isWeaponName(yourVar)) {
  // Now your var has the WeaponName type
}

const platform = constants.PLATFORMS as typings.Platform[];
```

### Credit

Operator Icons from [r6operators.marcopixel.eu](https://r6operators.marcopixel.eu)