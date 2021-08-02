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
    <a href="https://github.com/danielwerg/r6api.js/blob/master/license"><img
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

Get playtime of a player.

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

Get level, xp and alpha pack drop chance of a player.

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

Get seasonal stats of a player.

Ids limit: `200`

(platform, id/s, options?) => `Promise<Array>`

#### Options

<!-- START_SECTION:GETRANKS_OPTIONS -->

| Param     | Type                           | Required | Default                                                     | Description                                                       |
| --------- | ------------------------------ | -------- | ----------------------------------------------------------- | ----------------------------------------------------------------- |
| seasonIds | `number \| number[] \| string` | false    | `-1`                                                        | Numbers from `6` to `22` or `-1` or `'all'`                       |
| regionIds | `string \| string[]`           | false    | `['emea', 'ncsa', 'apac']`                                  | `'emea'`, `'ncsa'`, `'apac'` or `'all'`                           |
| boardIds  | `string \| string[]`           | false    | `['pvp_ranked', 'pvp_casual', 'pvp_newcomer', 'pvp_event']` | `'pvp_ranked'`, `'pvp_casual'`, `'pvp_newcomer'` or `'pvp_event'` |

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

> **Note:** Returns empty array if `boardId` is `pvp_newcomer` and `seasonId` is `21` or above

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
                  icon: 'https://github.com/danielwerg/r6api.js/raw/master/assets/ranks/v3/Unranked.png'
                },
                max: {
                  id: 0,
                  name: 'Unranked',
                  mmr: 0,
                  icon: 'https://github.com/danielwerg/r6api.js/raw/master/assets/ranks/v3/Unranked.png'
                },
                lastMatch: {
                  result: 'unknown',
                  mmrChange: 0,
                  skillMeanChange: 0,
                  skillStdevChange: 0
                },
                pastSeasons: {
                  wins: 1881,
                  losses: 1741,
                  winRate: '51.93%',
                  matches: 3622,
                  abandons: 17
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

Get summary stats of a player.

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
    spaceId: '',
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
  total: 1130,
  limit: 1,
  categories: 'all',
  media: 'all',
  skip: 0,
  startIndex: 0,
  placement: '',
  tags: 'BR-rainbow-six GA-siege',
  items: [
    {
      id: '5ZMF9L4RORllBhrRV618tr',
      title: 'Y6S2.2 Patch Notes',
      abstract: 'See the upcoming changes to Rainbow Six Siege with the release of Y6S2.2.',
      thumbnail: {
        url: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6MRTRMkEUAK1edT0v7eqxY/428150de770b89e98e9882eb3d0609b2/R6S_Y6S2.2_PatchNotes.jpg',
        description: null
      },
      content: 'Y6S2.2 will release the week of July 26 on all platforms. For additional information and further details on the balancing changes listed below, please see the [Y6S2.2 Designer\'s Notes](https://rainbow6.com/DN_Y6S22).\n\n## Y6S2.2 PATCH SIZES\n\n- Ubisoft Connect: 1.48 GB\n- Steam: 850 MB\n- Xbox One: 1.28 GB\n- Xbox Series X: 1.61 GB\n- PS4: 1.77 GB\n- PS5: 1.43 GB\n\n## OPERATOR BALANCING\n\n### ALIBI\n\n-   Added 2.0x scope to ACS12 (removed 1.5x scope).\n-   Added 1.5x scope to MX4 Storm.\n\n### FROST\n\n-   Removed 1.5x scope from C1.\n\n### TACHANKA\n\n- Added Deployable Shield (removed Proximity Alarm).\n- Increased Shumikha Launcher grenades to 14 (from 10).\n- Improved DP-27 destruction:\n  - 0 to 4.99m: 0.3 radius hole per shot.\n  - 5 to 7.99m: 0.2 radius hole per shot.\n  - Beyond 8m: 0.2 radius hole after three shots.\n\n### ZOFIA\n\n- Modified M762 recoil so it\'s harder to control:\n  - Increased vertical recoil.\n  - Horizontal spread is stronger to the the left.\n  - Long burst recoil starts on the 8th bullet (was 12th).\n\n## WEAPON BALANCING\n\n### ACS12\n\n-   Increased damage to 69 (from 59).\n\n### TCSG-12\n\n-   Increased damage to 63 (from 57).\n\n## TWEAKS AND IMPROVEMENTS\n\n## PLAYLISTS\n\n__Included Favela map in Ranked and Unranked__\n\n-   Added the reworked Favela map to Ranked and Unranked playlists so players have more opportunities to play and test it.\n\n__Added feature to report players who left the game __\n\n-   In the Post-Action Report, Ranked and Unranked players can now block or report players who disconnected before the last EOR replay. \n\n## BUG FIXES     \n\n### GAMEPLAY\n\n- FIXED - Players can vault through barricades after a single melee hit.       \n\n- FIXED - Operator Selection remains stuck on screen during gameplay.     \n\n- UPDATED - Players can destroy a barricade with certain weapons, causing it to desync and become exploitable. There is an ongoing investigation into this issue to ensure it works as expected for players.  \n\n- FIXED - Players can deploy a reinforcement or barricade while falling through a hatch.     \n\n- FIXED - Players can select the same Operator as another player during a match.  \n\n- UPDATED - Sometimes the Windows cursor remains stuck on screen, blocking camera movement. There is an ongoing investigation into this issue to ensure it works as expected for players.  \n\n- FIXED - Some players above 4400 MMR are unable to Squad queue with other players, despite being within the accepted MMR range.           \n\n- FIXED - Players lose camera control if they play a match while under an Abandon Penalty.             \n\n### LEVEL DESIGN           \n\n- FIXED - Operators can fall out of bounds or clip through the wall to get inside the building after exiting rappel in the gap between vents at EXT Forklift Alley on Kanal map.       \n\n- FIXED - Attackers have unfair LOS into 1F Main Hallway and 2F Landing after vaulting over a bush on Villa map.               \n\n- FIXED - The destructible floor doesn\'t fully break when Sledge uses the Breaching Hammer on the metal support beams on Favela map.  \n\n- FIXED - Two soft walls cannot be reinforced while Defenders are standing on a reinforced hatch in 1F Public Bathroom on Consulate map.    \n\n- FIXED - Gap on top of barricaded doorway allows LOS into EXT Pedestrian Customs on Border Map.          \n\n- FIXED - Several LOD issues on Villa map.\n\n- FIXED - Defuser can be dropped behind indestructible plant pots at EXT Terrace on Villa Map.      \n\n- FIXED - Player movement dips while passing over the triangular gap between PC boxes in 2F Coin Farm on Favela Map.       \n\n- FIXED - Deployable devices float when placed on wooden beams on Kafe Dostoyevsky map.         \n\n### OPERATORS\n\n- FIXED - Fuze starts a round with a default weapon loadout if the player doesn\'t swap between weapons during Operator Selection.        \n\n- FIXED - Jackal stops rappelling for a moment if gadget is enabled or disabled.      \n\n- FIXED - Lights on Ace\'s S.E.L.M.A. Aqua Breacher appear in an incorrect location.\n\n- FIXED - When Kali cancels a reload by switching weapons, the player is unable to ADS.    \n\n- FIXED - When Buck cancels a Skeleton Key reload, the player is unable to ADS.    \n\n- FIXED - Jackal\'s Eyenox Model III continues to ping Defenders after Jackal is eliminated.  \n\n- FIXED - IQ\'s Electronics Detector automatically reequips after IQ places a Breach Charge.\n\n### USER EXPERIENCE   \n\n- FIXED - Multiple localization issues throughout the game.             \n\n- FIXED - Deployment SFX is silent when a player deploys a Frag Grenade or C4, then crouches or goes prone at the same time. \n\n- FIXED - New HUD can be activated through a game console command.   \n\n- FIXED - Popup for redeeming the Sunstark bundle crashes the game.       \n\n- FIXED - Prompts may linger on screen over several rounds.          \n\n- FIXED - The iron sight attachment for the ITA12S and SMG-12 floats in multiple menus.  \n\n- FIXED - Players can create a hole in Castle\'s Armor Panel if they melee a spot near the frame on both sides.               \n\n- FIXED - Rappel SFX is sometimes inaudible.         \n\n- FIXED - Keyboard players who browse the Charms category in the shop experience navigation issues.      \n\n- FIXED - UMP45 has the wrong weapon skin thumbnail for Six Major NA 2021.       \n\n- FIXED - Booster icon is missing from the Booster activation confirmation side-panel.        \n\n- FIXED - Battle Pass tab in Post-Action Report does not immediately update for players who complete the last tier of the Battle Pass.   \n\n### LOCALIZATION          \n\n- FIXED - Incorrect Traditional Chinese character present in Thunderbird\'s Bio.',
      description: undefined,
      categories: [
        'news',
        'rainbow-six-siege',
        'patch-notes'
      ],
      tag: 'BR-rainbow-six GA-siege',
      placement: null,
      type: 'news',
      readTime: '7',
      url: 'https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates/5ZMF9L4RORllBhrRV618tr/y6s22-patch-notes',
      date: '2021-07-27T11:00:00.000Z'
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