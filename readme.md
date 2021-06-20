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
Daniel.Nt has played 5648 matches.
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

| Param           | Type     | Required | Default | Description                                                           |
| --------------- | -------- | -------- | ------- | --------------------------------------------------------------------- |
| email           | `string` | false    |         | Ubisoft account email                                                 |
| password        | `string` | false    |         | Ubisoft account password                                              |
| ubiAppId        | `string` | false    |         | `Ubi-AppId` header value                                              |
| authFileDirPath | `string` | false    |         | Path for directory where authentication file is stored                |
| authFileName    | `string` | false    |         | Name for authentication file                                          |
| authFilePath    | `string` | false    |         | If set `authFileDirPath` and `authFileName` options are being ignored |

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

| Param     | Type                           | Required | Default                                                           | Description                                                       |
| --------- | ------------------------------ | -------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| seasonIds | `number \| number[] \| string` | false    | `-1`                                                              | Numbers from `6` to `22` or `-1` or `'all'`                       |
| regionIds | `string \| string[]`           | false    | `['emea', 'ncsa', 'apac']`                                        | `'emea'`, `'ncsa'`, `'apac'` or `'all'`                           |
| boardIds  | `string \| string[]`           | false    | `['pvp_ranked'`, `'pvp_casual'`, `'pvp_newcomer'`, `'pvp_event']` | `'pvp_ranked'`, `'pvp_casual'`, `'pvp_newcomer'` or `'pvp_event'` |

<!-- END_SECTION:GETRANKS_OPTIONS -->

#### Seasons reference

<!-- START_SECTION:SEASONS_TABLE -->

| ID   | Name          | ● | ID   | Name           |
| ---- | ------------- | - | ---- | -------------- |
| `6`  | Health        |   | `15` | Ember Rise     |
| `7`  | Blood Orchid  |   | `16` | Shifting Tides |
| `8`  | White Noise   |   | `17` | Void Edge      |
| `9`  | Chimera       |   | `18` | Steel Wave     |
| `10` | Para Bellum   |   | `19` | Shadow Legacy  |
| `11` | Grim Sky      |   | `20` | Neon Dawn      |
| `12` | Wind Bastion  |   | `21` | Crimson Heist  |
| `13` | Burnt Horizon |   | `22` | North Star     |
| `14` | Phantom Sight |   |      |                |

<!-- END_SECTION:SEASONS_TABLE -->

> **Note:** `-1` will always return current season

#### Regions reference

<!-- START_SECTION:REGIONS_TABLE -->

| Shorthand | Meaning                          |
| --------- | -------------------------------- |
| `emea`    | Europe, Middle East and Africa   |
| `ncsa`    | North, Central and South America |
| `apac`    | Asia Pacific                     |

<!-- END_SECTION:REGIONS_TABLE -->

> **Note:** Since Steal Wave (18) all regions will return same data

#### Boards reference

<!-- START_SECTION:BOARDS_TABLE -->

| Minimum Season ID | Board ID       |
| ----------------- | -------------- |
| `6`               | `pvp_ranked`   |
| `12`              | `pvp_newcomer` |
| `15`              | `pvp_casual`   |
| `16`              | `pvp_event`    |

<!-- END_SECTION:BOARDS_TABLE -->

> **Note:** Returns `Error: 500 Uncaught exception` if `boardId` is `pvp_newcomer` and `seasonId` is `21`

> **Note:** `topRankPosition` will always return `0` if board is *not* `'pvp_ranked'`

> **Note:** Ubisoft doesn't provide data for seasons before Operation Health (6) if board is `pvp_ranked`, Ember Rise (15) if board is `pvp_casual`, Wind Bastion (12) if board is `pvp_event` or Shifting Tides (16) if board is `pvp_event`


```js
await r6api.getRanks('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a', { regionIds: 'emea', boardIds: 'pvp_ranked' })
```

<!-- START_SECTION:GETRANKS_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    seasons: {
      '22': {
        seasonId: 22,
        seasonName: 'North Star',
        seasonColor: '#009cbe',
        seasonImage: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/38Lml8ltnO932wLqhC5xEA/493665084f757da8c91c01a0b99d2be3/r6s-seasons-y6s2.jpg',
        seasonReleaseDate: '2021-06-14T00:00:00.000Z',
        regions: {
          emea: {
            regionId: 'emea',
            regionName: 'Europe, Middle East and Africa',
            boards: {
              pvp_ranked: {
                boardId: 'pvp_ranked',
                boardName: 'Ranked',
                skillMean: 32.8265071543,
                skillStdev: 7.2555471866,
                current: {
                  id: 0,
                  name: 'Unranked',
                  mmr: 3283,
                  icon: 'https://github.com/danielwerg/r6api.js/raw/typescript/assets/ranks/v3/Unranked.png'
                },
                max: {
                  id: 0,
                  name: 'Unranked',
                  mmr: 0,
                  icon: 'https://github.com/danielwerg/r6api.js/raw/typescript/assets/ranks/v3/Unranked.png'
                },
                lastMatch: {
                  result: 'unknown',
                  mmrChange: 0,
                  skillMeanChange: 0,
                  skillStdevChange: 0
                },
                previousMmr: 0,
                nextMmr: 0,
                topRankPosition: 0,
                kills: 0,
                deaths: 0,
                kd: 0,
                wins: 0,
                losses: 0,
                winRate: '0.00%',
                matches: 0,
                abandons: 0,
                updateTime: '1970-01-01T00:00:00+00:00'
              }
            }
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
    appId: 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40',
    name: 'Rainbow Six Siege - PC - LIVE',
    spaceId: '',
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

| Param          | Type      | Required | Default   | Description                                                                       |
| -------------- | --------- | -------- | --------- | --------------------------------------------------------------------------------- |
| raw            | `boolean` | false    | `false`   | Include raw API response                                                          |
| category       | `string`  | false    | `'all'`   | `'all'`, `'game-updates'`, `'patch-notes'`, `'community'`, `'store'`, `'esports'` |
| media          | `string`  | false    | `'all'`   | `'all'`, `'news'`, `'videos'`                                                     |
| limit          | `number`  | false    | `6`       |                                                                                   |
| skip           | `number`  | false    | `0`       |                                                                                   |
| startIndex     | `number`  | false    | `0`       |                                                                                   |
| locale         | `string`  | false    | `'en-us'` |                                                                                   |
| fallbackLocale | `string`  | false    | `'en-us'` |                                                                                   |

<!-- END_SECTION:GETNEWS_OPTIONS -->

```js
await r6api.getNews({ limit: 1 });
```

<!-- START_SECTION:GETNEWS_OUTPUT -->
<details>
<summary>Output</summary>

```js
{
  total: 1120,
  limit: 1,
  categories: 'all',
  media: 'all',
  skip: 0,
  startIndex: 0,
  placement: '',
  tags: 'BR-rainbow-six GA-siege',
  items: [
    {
      id: '76KxHcLFOo2PdhSS4t1HmZ',
      title: 'Y6S2 PRE-SEASON DESIGNER\'S NOTES',
      abstract: 'In this latest edition of Designer’s Notes, we\'ll go into more detail about the balancing changes that’ll come with the North Star and give you an insight into the reasons behind these changes.',
      thumbnail: {
        url: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4uXfCQGi2ujYC9N6UuU1lc/c5a3850ea1fcf9f1e67570bb40ccb8e0/R6_DesignersNotes_Y6S2_Thumbnail.png',
        description: null
      },
      content: 'In this latest edition of Designer’s Notes, we\'ll go into more detail about the balancing changes that’ll come with North Star and the Y6S2 patch. This season, we have quite a wide range of balancing tweaks and overall reworks (with a number coming exclusively to the Test Server for, well, TESTING). There\'s a ton to cover below, so scroll on for insights into the reasons behind these changes.\n\n# BALANCING MATRIX AND TOP OPERATOR BANS\n## WIN DELTA VS. PRESENCE\n\n![BalancingMatrixAtt Y6S13](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6LdEzBUjina2GF5jVEyjtv/bc61617cdf26ec488bbdb42b1156ff67/BalancingMatrixAtt_Y6S13.png)\n\n![BalancingMatrixDef Y6S13](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/hgFcBjdlsW5N2f7BTb1Fx/fe6bc433e00ce38e08b2f6701f5bb895/BalancingMatrixDef_Y6S13.png)\n\n*Please note that we are using presence to gauge the popularity of an Operator. This notion had to be introduced to reflect the implementation of the pick & ban.*\n\n*Presence definition: pick rate of an Operator when not banned. Win Delta: The Win Delta is aggregated from Operator’s Win Deltas per Bomb Site.*\n\n## OPERATOR BAN RATE\n\n![BanMatrixAtt Y6S13](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6fmu8j47dtq7w25z8yganM/6f3f6a98a6a1f471a639621e92f2d430/BanMatrixAtt_Y6S13.png)\n\n![BanMatrixDef Y6S13](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6aywt8oxRAudJ3bvMveaE5/aca4c8285bcf631d43997f948c1fde2a/BanMatrixDef_Y6S13.png)\n\n# MAJOR REWORKS\n## GAMEPLAY AFTER DEATH (TEST SERVER ONLY)\n\n__Starting off with a big topic, we first want to make it clear that Gameplay After Death will not come to Siege\'s Live servers this season.__ Instead, we want to give you an early look at this rework on the Test Server for two important reasons: \n\n- You have more opportunities to familiarize yourself with theses huge changes before they hit Live.\n- We have more time to get your feedback and adjust things ahead of release, as needed.\n\nOn that note, a survey will be made available via in-game news on the Test Server, running from May 26th to May 28th. Your feedback will be hugely important in the continued development of this feature, so we look forward to hearing your thoughts!\n\n__First, what is the intention behind Gameplay After Death?__\n\nPut simply, we want players to feel invested in their team\'s success, right up until the last second of the round. We want players to be able to feel their impact on the match outcome. In doing so, our goal is to keep players interested and engaged, even after their operator has been eliminated. This means less downtime, and a greater range of gameplay opportunities in Support mode.\n\nUltimately, it\'s essential to us that this is balanced so that players remaining alive in a match is always the superior option.\n\nEven if this change means that getting fragged will be a bit less punishing than it was before, it should still be something players actively avoid, given the threat that loss of utility and support poses.\n\nIn other words: one of the things we want to make certain of before releasing this system is that it is __never__ a valid strategy to initiate careless fights early in the round and not worry about dying.\n\nWe are very aware that this change will likely affect the whole game\'s balance. Operators whose abilities revolve around observational tools in particular will need to be rebalanced as we take this new system into account. We\'ve already begun this task and will continue doing so with the help of your feedback. We know that this feature will bring a fundamental change, but it is a change that we believe will continue to sharpen the Siege experience.\n\nAfter all, you can\'t rework an operator without breaking a couple mounted LMGs.\n\n__What are the changes?__\n\nWe have added a number of gameplay elements for players on both sides to aid them after their operators have died:\n\n__ATTACKERS__\n\n- Dead players can control and drive their own drone, including Twitch’s drone. You cannot drive the drone of another operator.\n- Antennas are shown on regular drones when the owner dies, in order to help opponents know if the drone belongs to a dead or alive operator.\n- The abilities of observation tools and gadgets can be used.\n- i.e. Twitch’s and Zero’s lasers\n- If you died with regular drones in your inventory, they will spawn at your original spawn location.\n- An operator ability like Twitch\'s Shock Drone won’t spawn after death.\n\n__DEFENDERS__\n\nSpecifically for Defenders, we have added new tools to help counter the threat of Attacker drones:\n\n- Bulletproof Camera Rework\n  - The camera can now rotate.\n  - The camera can shoot an EMP burst to disable Attackers\' electronic gadgets and drones for 8 seconds.\n  - The first player in the camera can use the ability to shoot. Unlike operators\' abilities, there is no notion of ownership.\n- Drone Counter\n  - The Drone Counter is displayed exclusively to Defenders to help them track the number of regular drones their team has destroyed or captured.\n  - This is intended to incentivize Defenders to be aware of the importance of destroying drones, especially in a context where dead players can still drone them out.\n  - This counter is not meant to reveal extra intel to Defenders. It only reflects Defenders\' actions and doesn\'t take into account special drones - only regular ones.\n- Echo, Maestro and Mozzie can control and use their abilities after death.\n    - Note for Maestro: Teammates will be able to rotate the turret like any other observation tool, although Maestro will maintain priority over other Defenders.\n\n__Some additional topics to consider about Gameplay After Death:__\n\n- A number of changes released before and during this season will also help player experience in this new context:\n  - Yokai drones no longer have cloaking, limiting the potential source of frustration of dealing with invisible after-death drones. \n  - The bulletproof glass of the Maestro’ Evil Eye can be shattered with a melee to deny vision when it is closed (same of the Bulletproof Camera and more on these below).\n    - The introduction of the GONNE-6 helps a wider range of operators deal with these.\n- While it will not be available in this initial test, Attackers being able to repick their operator in the Prep Phase (coming later in Year 6) will encourage players to more thoroughly scout the objective and Defenders\' setups to collect info, putting their drones at risk.\n- We are actively exploring and looking for more options relating to:\n  - Dokkaebi\'s Logic Bomb affecting dead Defenders.\n  - New secondary gadgets that can help with info denial.\n\nAs mentioned above, we know that there are many questions of how this will affect the game\'s overall balance. This is a big part of why we are turning to the Test Server to test this. We value your feedback and extensive knowledge of the game, and want to make sure we\'re bringing you along on the journey before this officially hits Live servers. We hope all these explanations help to give you context into this change to game flow and invite you to give it a try on the Test Server and let us know what you think – we’ll be paying close attention to your feedback!\n\n## DEATH EXPERIENCE\n\n- Adjusted the flow and content of replays after being fragged\n\nGameplay After Death made it important to improve the flow from the moment a player dies, to when they can control their observation tools. We took this opportunity to revisit the entire death sequence that had remained untouched since the launch of Siege.\n\nOur main focus was to help players understand how they died and keep them in the action. We feel it is important for players to understand exactly what happened in order for there to be an opportubity to learn. Thus, the camera will now look towards what killed the player for a few seconds (note: this can be reduced to two seconds in Custom Game settings) without slow motion or a sudden close-up on the opponent. Then, players can watch the replay to get additional details if needed.\n\nDepending on their needs, players will be able to skip through this death sequence as quickly as they want in order to get into their cameras and help their team. We also wanted to make sure the amount of intel shared during the sequence was fairer. In this way, only relevant details to a given frag will be shared with eliminated players. For example, when dying to a Kapkan trap, players won’t be informed of how much HP Kapkan has, or where he is.\n\n## ELIMINATED OPERATOR ICONS\n\n- When a player is eliminated, a transparent operator icon will appear in place of their body and remain for the duration of the round.\n\nDue to the differences in how the server and the client handle their positioning, the bodies of eliminated players have the potential to create unfair gameplay scenarios. While one player may see an eliminated body laying one way, another player may see it oriented slightly different. This rework should help to even the playing field and ensure consistency between players\' experiences.\n\nThis will guarantee that lines of sight are not unfairly obstructed, that gadgets, defusers or prone operators can\'t be hidden in them, and will make it easier for players to identify which operator was eliminated.\n\n## BULLET HOLES\n\n- Line of sight through bullet holes in soft surfaces has been blocked\n\nWith this rework, players will no longer be able to peek through individual bullet holes in the environment. This previously created unfair gameplay scenarios in which peekers could take out unsuspecting players without them having the tools to effectively identify the potential threat.\n\nNow, players will have to shoot a soft surface multiple times in order to create a hole big enough to peek through, providing those being peeked upon a fairer chance to identify and react to this threat. Please note that bullet holes in thin materials like window glass, barricades, and the inner cores of props are not affected by this change.\n\nSpeaking to barricades specifically, they were excluded from this feature as they work differently than walls. That being said, even though removing bullet holes from walls is a huge step toward addressing the issue, we are acutely aware that bullet holes in barricades will still pose a similar concern. We are currently working on a solution to address this for a future update and will keep you informed as we have more to share.\n\n## HP REPLACING ARMOR (TEST SERVER ONLY)\n\n- Operator armor will be converted to HP:\n  - 3-armor operators will have 125 HP\n  - 2-armor operators will have 110 HP\n  - 1-armor operators will have 100 HP\n- Rook\'s Armor Plates will grant a buff to permanent HP for the round:\n  - Picking up Armor Plates will buff an operator\'s maximum HP by 20 until the end of a round\n- Any heals will heal up to this new maximum value for the duration of the round \n\nAs we\'ve previously mentioned with "hidden" passives, there are certain mechanics in Siege that are difficult to convey in straightforward terms without understanding a number of different variables. Armor is one of those mechanics. It\'s obvious that a 3-armor operator will be harder to take down than a 1-armor, but knowing the exact values requires lab time and isn\'t conducive to quick thinking in a match.\n\nTo streamline this and establish clear health pools for all operators, each armor class has been assigned a different HP total. This should make it easier for players to accurately judge the impact of an offensive play and coordinate accordingly, taking the mystery out of armor values.\n\n__Please note, this is a TEST SERVER ONLY change.__ As this rework nears completion and the team uses this additional time to finetune and tweak it, we wanted to give you a chance to try it out on the Test Server. We\'re excited to hear what you think!\n\n## SHATTERED GLASS\n\n- A melee hit will now shatter the glass of Mira\'s Black Mirror, Maestro\'s Evil Eye, and the Bulletproof Camera\n- Shattered glass is opaque and prevents these devices from being used to spot players\n- When Mira\'s Black Mirror is shattered, vision is denied on both sides\n  - When the canister is destroyed, the device now shatters and explodes (solely a visual effect) instead of falling to the floor\n- When Maestro\'s Evil Eye is shattered, he has to open the device to see through it\n\nIt\'s no secret that there\'s a ton of value to be found in bulletproof utility. Due to their durability and limited counters, they can continue to provide support to their owners long into a match. With Y6S2, we are introducing a new counter to these powerful tools in the form of shattered glass. Now, players will be able to limit the usefulness of bulletproof gadgets with a well-placed melee hit.\n\nAt its most basic, this melee hit will make it impossible for players to see through the shattered glass of their device as it will turn opaque, requiring them to adapt their strategy on the fly. This means opposing players will have more options at their disposal when it comes to dealing with one. Will you use an explosive to guarantee the utility\'s destruction? Risk exposing yourself to shatter it with a melee hit and throw off enemy intel? Avoid it entirely? In addition to the basic act of shattering, different gadgets will react differently to this rework.\n\nFor Mira\'s Black Mirror, shattered glass will hinder the vision of players on both sides of the window and will now explode when the canister is destroyed. This will make aggressive windows in heavily reinforced spaces easier to deny, although well-protected windows will still favour the Defenders given the risk associated with approaching a window.\n\nAs for Maestro\'s Evil Eye, even after being shattered, he will be able to use it as a microphone and can still open the device to use its turret functionalities. This should help even out the risk vs. reward of Evil Eye placement as this new counter will require Maestro players to be more thoughtful with their placement or risk losing part of its utility.\n\nFinally, Bulletproof Cameras are expected to survive longer in matches, albeit with their glass shattered. Since they are now melee-proof from the front but can be shattered with this melee, opposing players will have to make the choice of burning explosive utility to eliminate them, leaving them operational-yet-shattered, or spending time looking for the right angle to destroy them. \n\n## SMOKE PROPOGATION\n\n- Toxic gas from Smoke\'s Remote Gas Grenade will not travel through walls, floors, and ceilings\n- A new sound plays when the canister is detonated\n- Toxic gas damage increased to 15 HP every 0.66 seconds while in area of effect\n\nThanks to his ability to simultaneously flush out choke points and create visual cover, Smoke can be an invaluable addition to team compositions and a ton of fun to play. Somewhat less fun is coming up against Smoke and having his toxic gas travel through walls, creating obstacles that shouldn\'t exist. To combat this, we\'ve reworked his Remote Gas Grenade to release its gas more naturally, filling spaces without leaking through solid walls, floors, and ceilings.\n\nThis helps improve the experience of facing him, as Attackers will be able to better predict the impact and effect of a thrown canister. Not only this, but it should eliminate a number of exploits that made certain bomb sites easier to defend, requiring a more dangerous playstyle that risks denial in order to achieve similar results.\n\nIn addition to changing the behavior of this toxic gas, we\'ve modified the way that its damage is tracked, dealing flat damage over time for the whole duration that someone is in the toxic cloud\'s area of effect. We have also added a new sound for when the canister detonates. This means that even though Smoke\'s gas no longer defies the laws of physics, it will remain a formidable deterrent for approaching Attackers.\n\n## MUZZLE REWORK\n\n- Flash Hider\n  - Reduces the speed and intensity of vertical recoil\n- Compensator\n  - Reduces the speed and intensity of horizontal recoil \n\nIn their previous state, muzzle attachments needed a shake-up. Put simply, it was difficult to grasp exactly what impact each had when equipped. We want you to feel a clear difference between the muzzle attachments, allowing you to make an informed choice in your loadout and understand the distinct advantages each bring to the table. \n\nNow, these two attachments fill more unique roles. The compensator focuses on helping to control horizontal recoil, making it a great choice for weapons with noticeable swing. For the flash hider, the focus is on vertical recoil and limiting vertical spread of bullets. These changes allow players to more closely tailor their loadouts to the needs of the weapons they’re using. \n\nWe expect that this will make some weapons feel easier to control than before once players begin experimenting, so as always, we will be closely monitoring performance and stats, and will adjust as needed. \n\n# OPERATOR BALANCING\n## ASH\n\n- Reduced Breaching Rounds to 2 (from 3)\n- Modified R4-C recoil, harder to control:\n- Increased vertical kick\n  - Horizontal spread will be more constant and stronger to the the right\n  - Long burst recoil will start on the 8th bullet (previously the 12th)\n- Breaching Rounds are now immune to electricity\n\nPopulation targeted by this change: Top Ranked and Pros.\n\nLikely surprising no one, Ash is currently positioned with the highest presence of any Attacker or Defender on the Balancing Matrix. Not only does she have the highest kill-per-round ratio among Attackers, but her Breaching Rounds offer a great deal of flexibility and utility in the heat of combat. At the end of the day, Ash is a great all-around pick who unfortunately outclasses some of her contemporaries.\n\nIn order to bring her more in line with other frag-forward operators like Iana, we have reduced her available Breaching Rounds and increased the recoil of her R4-C. For context, this recoil increase is less intense than that of Jäger in Y6S1.3, but we still want to hear what you think after getting your hands on it on the Test Server.\n\nNow, on to the Breaching Rounds. As you may recall, this reverts a change from Y5S4 that granted Ash an additional one. The original intention for this was to balance out the utility meta and increase the pace of the game in the wake of rebalances to projectiles in attack and catchers in defense. Now, with new denial tools like the GONNE-6 and the brand new rework to Melusi\'s Banshee (more on that below) that reduces the need to burn a Breaching Round to reliably eliminate it, we feel that this change is no longer necessary and by reverting it, it will make other operators more appealing. \n\n## FINKA\n\n- Finka\'s ability will fill up teammates\' base health. The exceeding boost health will be allocated as overheal\n\nCoinciding with the announcement of Thunderbird, our latest operator and owner of a healing gadget, we wanted to make some adjustments to Finka to bring her gadget in line with Thunderbird\'s and Doc\'s. Specifically, we felt it was important to make sure their healing effects were consistent with one another.\n\nNow that the additional health of Finka\'s Adrenal Surge is no longer tied to an active timer, this should help to make it less of a situational tool, encouraging more active usage of it.\n\n## NØKK (TEST SERVER ONLY)\n\n- When HEL Presence Reduction is active:\n  - Proximity-based gadgets are not triggered\n    - Gadgets affected: Ela\'s Grzmot Mine, Melusi’s Banshee, Proximity Alarm, and Metal Detectors\n  - Laser-based gadgets are triggered\n  - Sounds made by Nøkk are no longer muffled\n  - Glitch effect cancels proximity immunity, resulting in the activation of any gadget in range\n\nPopulation targeted by this change: Casual, Top Ranked and Pros.\n\nFollowing up on our last set of tweaks to Nøkk\'s HEL Presence Reduction Device, we wanted to take this experimentation a step further by drilling down to its effect on laser-based gadgets. Now, while use of the HEL will allow Nøkk to bypass proximity gadgets, laser-based gadgets will still pose a threat, activating as normal.\n\nBetween this and the removal of noise reduction on her ability, we want to strike a healthy balance between stealthy counter-intel utility that rewards smart play, and her becoming the embodiment of everyone\'s favorite extraterrestrial hunter from the 80\'s. The use of her HEL should be interesting to use, but not so effective that it bypasses all opposition.\n\n__As a reminder, this is a TEST SERVER ONLY change.__ We will turn it off before releasing the new season to continue working on her. As with the previous change, we have tested this change internally and are interested to hear your feedback so we can iterate as needed before deploying such a notable change to the wider community.\n\n## MELUSI\n\n- Banshees are now deployed closed and will open when triggered, revealing a Banshee Core\n- Banshee Cores are vulnerable to bullets and melee attacks\n- The device now also detects enemies\' feet (previously detected head and hip)\n\nPopulation targeted by this change: Casual, Top Ranked and Pros.\n\nWe promised that we were listening to your Melusi feedback! It\'s no secret that bulletproof gadgets can be difficult and costly to deal with, so adding in the disorienting effects of the Banshee, Melusi had quite a strong gadget on her hands and her extremely high presence in the Balancing Matrix reflects that. In order to better balance its strengths and its weaknesses, we\'ve added a new mechanic to this gadget.\n\nBanshees will now deploy in a closed, bulletproof and melee-proof state. Once a player activates a Banshee, it will open up, revealing its Core, which is its weak point. The Banshee Core can then be destroyed with gunfire or melee attacks, giving players multiple options for approaching and eliminating one outside of relying on explosives.\n\nThis should help to alleviate some of the frustration caused by this gadget, while still rewarding strategic use of it. Since Attackers need to activate the Banshee to reveal its weak point, thoughtful positioning will be more important than ever to unleash its full potential.\n\n## VIGIL\n\n- Modified K1A recoil, harder to control:\n  - Mild increase to vertical kick\n  - Horizontal spread will be more constant and stronger to the the right\n  - Long burst recoil will start on the 6th bullet (previously the 12th)\n\nPopulation targeted by this change: Casual and Top Ranked.\n\nWe don\'t mean to spoil a change coming a little further down this page, but the SMG-12 is getting a buff. That\'s great news for Vigil, as its improved recoil and high fire rate will make it a more desirable kit choice, especially when you take his role as a roamer into account. In order to make sure his loadout doesn\'t become too stacked, however, we have increased the recoil of his K1A slightly. We feel this is a fair compromise for the increased firepower of the SMG-12, but look forward to hearing your thoughts. \n\n## ZERO\n\n- Added same resource management system as Twitch\'s drone to Argus Camera\n  - Cooldown: 15s\n  - Initial/Maximum shots: 1\n\nPopulation targeted by this change: Casual and Top Ranked.\n\nWho says Twitch\'s drones should have all the fun? To add additional utility to Zero\'s Argus Cameras, they now come equipped with an identical resource management system. Not only will this give him better gadget denial value, but this should help incentivize more creative camera placement as players seek to maximize their survival. Specifically, we have noticed that his cams are often destroyed soon after deployment, so while we look forward to seeing more strategic placement, we expect this to keep the increase in denial capability in line.\n\nThis increase in utility is offset by a long cooldown, so players will have to pick their shot carefully to make the most of it. Even so, this addition should help introduce a new layer to Zero\'s strategy for newer players and veterans alike. \n\n# WEAPON BALANCING\n\n## BEARING 9 (HIBANA, ECHO, THUNDERBIRD)\n\n- Modified recoil, easier to control:\n  - Horizontal spread will be more constant and closer to the center\n\nPopulation targeted by this change: Casual and Top Ranked.\n\nWhile Hibana and Echo are relatively close to the center of Win Delta on the Balancing Matrix, their fragging potential could use a buff as we have noticed their kills-per-round fall. By making the Bearing 9 more reliable and consistent on its horizontal axis, this should give both operators the push they need, while also equipping new operator, Thunderbird, with a quality loadout.\n\nFor Echo in particular, this also increases the viability of running a shotgun and SMG combo loadout.\n\n## SMG-12 (VIGIL, DOKKAEBI, WARDEN)\n\n- Modified recoil, easier to control:\n  - Reduced first shot kick\n  - Reduced vertical kick\n  - Horizontal spread will be more predictable and constant to the left\n  - Long burst recoil will start on the 12th bullet (previously the 6th)\n\nPopulation targeted by this change: Casual and Top Ranked.\n\nAs noted before, Vigil, Dokkaebi and Warden will all be getting a buff in the form of reduced recoil for the SMG-12. Its high rate of fire is a force to be reckoned with but it has historically been quite difficult to tame. By reducing the recoil, we feel this should help to make it a more desirable choice, especially for operators like Dokkaebi for whom this is her only close-range option.\n\n# GENERAL BALANCING\n## AREA OF EFFECT\n\n- Operators affected:\n  - Jäger\'s ADS\n  - Ela\'s GRZMOT Mine\n  - Nomad\'s Airjab\n  - Kaid\'s Rtila Electroclaws\n\nPopulation targeted by this change: Casual.\n\nSometimes, it can be difficult to accurately judge the effective area of a proximity-based gadget when placing it. We would much rather players worry about realizing their strategic plans than second-guess whether they should place their GRZMOT Mine a little more to the left.\n\nTo help illustrate their effective range, a visual effect - this is no change to power level - has been added to some operators\' gadgets at the time of placement. This should place more of a focus on creative and strategic deployment as players are able to more quickly and efficiently visualize their gadget\'s effect on the map.\n\n---\n\nTry out the latest Rainbow Six updates on the Test Server and earn an exclusive charm through the [Bug Hunter Program](http://rainbow6.com/bughunterprogram).\n\nFollow us and share your feedback on [Twitter](https://twitter.com/Rainbow6Game), [Reddit](https://www.reddit.com/r/Rainbow6/), [Facebook](https://www.facebook.com/Rainbow6/) and on our [forums](https://forums.ubi.com/forumdisplay.php/64-Rainbow-Six).\n',
      description: undefined,
      categories: [
        'rainbow-six-siege',
        'rainbow-six',
        'news',
        'patch-notes'
      ],
      tag: 'BR-rainbow-six GA-siege',
      placement: [
        'featured-news-article'
      ],
      type: 'news',
      readTime: '23',
      url: 'https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates/76KxHcLFOo2PdhSS4t1HmZ/y6s2-preseason-designers-notes',
      date: '2021-05-24T13:00:00.000Z'
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