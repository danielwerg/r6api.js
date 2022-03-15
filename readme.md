<div align="center">
  <h1>R6API.js</h1>
  <h3>🍫 Node.js wrapper around Rainbow Six: Siege API</h3>
  <p>
    <a href="https://github.com/danielwerg/r6api.js/blob/master/license"><img
      src="https://img.shields.io/github/license/danielwerg/r6api.js"
      alt="License"
    /></a>
    <a href="https://github.com/danielwerg/r6api.js/releases/latest"><img
      src="https://img.shields.io/github/v/release/danielwerg/r6api.js?label=version"
      alt="Version"
    /></a>
    <a href="https://github.com/danielwerg/r6api.js/releases/latest"><img
      src="https://img.shields.io/github/release-date/danielwerg/r6api.js?label=latest%20release"
      alt="Latest release"
    /></a>
    <a href="https://www.npmjs.com/package/r6api.js"><img
      src="https://img.shields.io/npm/dw/r6api.js"
      alt="NPM weakly downloads"
    /></a>
    <a href="https://discord.gg/hshRpWk"><img
      src="https://img.shields.io/discord/612212753498767360?label=discord&color=5865F2"
      alt="Discord guild"
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

* [GitHub](https://github.com/danielwerg/r6api.js)
* [NPM](https://www.npmjs.com/package/r6api.js)
* [YARN](https://yarnpkg.com/package/r6api.js)
* [Releases](https://github.com/danielwerg/r6api.js/releases)
* [Changelog](https://github.com/danielwerg/r6api.js/blob/master/changelog.md)

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
* [getUserStatus](#getUserStatus)
* [getProfileApplications](#getProfileApplications)
* [getApplications](#getApplications)
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
| seasonIds | `number \| number[] \| string` | false    | `-1`                                                        | Numbers from `6` to `25` or `-1` or `'all'`                       |
| regionIds | `string \| string[]`           | false    | `['emea', 'ncsa', 'apac']`                                  | `'emea'`, `'ncsa'`, `'apac'` or `'all'`                           |
| boardIds  | `string \| string[]`           | false    | `['pvp_ranked', 'pvp_casual', 'pvp_newcomer', 'pvp_event']` | `'pvp_ranked'`, `'pvp_casual'`, `'pvp_newcomer'` or `'pvp_event'` |

<!-- END_SECTION:GETRANKS_OPTIONS -->

#### Seasons reference

<!-- START_SECTION:SEASONS_TABLE -->

| ID   | Name          | ● | ID   | Name           |
| ---- | ------------- | - | ---- | -------------- |
| `6`  | Health        |   | `16` | Shifting Tides |
| `7`  | Blood Orchid  |   | `17` | Void Edge      |
| `8`  | White Noise   |   | `18` | Steel Wave     |
| `9`  | Chimera       |   | `19` | Shadow Legacy  |
| `10` | Para Bellum   |   | `20` | Neon Dawn      |
| `11` | Grim Sky      |   | `21` | Crimson Heist  |
| `12` | Wind Bastion  |   | `22` | North Star     |
| `13` | Burnt Horizon |   | `23` | Crystal Guard  |
| `14` | Phantom Sight |   | `24` | High Calibre   |
| `15` | Ember Rise    |   | `25` | Demon Veil     |

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
      '25': {
        seasonId: 25,
        seasonName: 'Demon Veil',
        seasonColor: '#b27400',
        seasonImage: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6diil0gexoNXNCKtwpPPQZ/ace6f9e6e1e1578a2255ac0e5cb67b7c/r6s-seasons-y7s1.jpg',
        seasonReleaseDate: '2022-03-15T00:00:00.000Z',
        regions: {
          emea: {
            regionId: 'emea',
            regionName: 'Europe, Middle East and Africa',
            boards: {
              pvp_ranked: {
                boardId: 'pvp_ranked',
                boardName: 'Ranked',
                skillMean: 30.4486517674,
                skillStdev: 7.6092138478,
                current: {
                  id: 0,
                  name: 'Unranked',
                  mmr: 3045,
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
                  wins: 2142,
                  losses: 2003,
                  winRate: '51.68%',
                  matches: 4145,
                  abandons: 18
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

[**Full response**](https://github.com/danielwerg/r6api.js/blob/master/docs/methods/getStats.json)

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
    status: 'Interrupted',
    maintenance: true,
    impactedFeatures: []
  },
  {
    appId: '6e3c99c9-6c3f-43f4-b4f6-f1a3143f2764',
    name: 'Rainbow Six Siege - PS5 - LIVE',
    spaceId: '96c1d424-057e-4ff7-860b-6b9c9222bdbf',
    mdm: '25365',
    category: 'Instance',
    platform: 'PS5',
    status: 'Interrupted',
    maintenance: true,
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

### getUserStatus

Get status of a player.

Ids limit: `50`

(id/s, options?) => `Promise<Array>`

#### Options

<!-- START_SECTION:GETUSERSTATUS_OPTIONS -->

| Param             | Type      | Required | Default | Description                                                               |
| ----------------- | --------- | -------- | ------- | ------------------------------------------------------------------------- |
| fetchApplications | `boolean` | false    | `false` | Make another API request to get additional information about applications |

<!-- END_SECTION:GETUSERSTATUS_OPTIONS -->

> Note: Takes `userId` instead of `profileId` (`id`) like most methods

```js
await r6api.getUserStatus('0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- START_SECTION:GETUSERSTATUS_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    userId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    status: 'offline',
    applications: [],
    manuallySet: null
  }
]
```

</details>
<!-- END_SECTION:GETUSERSTATUS_OUTPUT -->

---

### getProfileApplications

Get information about applications of a player.

Ids limit: `100`

(id/s, options?) => `Promise<Array>`

#### Options

<!-- START_SECTION:GETPROFILEAPPLICATIONS_OPTIONS -->

| Param             | Type      | Required | Default | Description                                                               |
| ----------------- | --------- | -------- | ------- | ------------------------------------------------------------------------- |
| fetchApplications | `boolean` | false    | `false` | Make another API request to get additional information about applications |

<!-- END_SECTION:GETPROFILEAPPLICATIONS_OPTIONS -->

```js
await r6api.getProfileApplications('0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- START_SECTION:GETPROFILEAPPLICATIONS_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    applications: [
      {
        id: '46f0b36b-b947-4d9c-b9dc-9a34b52ab59a',
        name: null,
        platform: null,
        sessionsPlayed: 10,
        daysPlayed: 7,
        lastPlayedAt: '2020-10-27T17:11:38.771Z',
        firstPlayedAt: '2019-04-19T22:05:01.850Z'
      },
      {
        id: '87843b9b-516d-4a58-824b-f658d1361ad1',
        name: null,
        platform: null,
        sessionsPlayed: 2,
        daysPlayed: 2,
        lastPlayedAt: '2016-03-21T18:28:25.434Z',
        firstPlayedAt: '2016-03-18T16:18:43.603Z'
      },
      {
        id: 'a427a342-56bb-437b-b835-fa695c75893b',
        name: 'Tom Clancy\'s Rainbow Six Siege - Test Server',
        platform: 'PC',
        sessionsPlayed: 137,
        daysPlayed: 72,
        lastPlayedAt: '2020-11-16T05:35:45.229Z',
        firstPlayedAt: '2017-06-01T20:10:13.424Z'
      },
      {
        id: 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40',
        name: 'Tom Clancy\'s Rainbow Six Siege',
        platform: 'PC',
        sessionsPlayed: 2344,
        daysPlayed: 1221,
        lastPlayedAt: '2021-02-04T12:35:13.173Z',
        firstPlayedAt: '2015-12-01T19:33:41.284Z'
      },
      {
        id: 'f68a4bb5-608a-4ff2-8123-be8ef797e0a6',
        name: null,
        platform: null,
        sessionsPlayed: 1919,
        daysPlayed: 1551,
        lastPlayedAt: '2021-08-01T08:45:05.344Z',
        firstPlayedAt: '2015-12-01T19:31:18.107Z'
      }
    ]
  }
]
```

</details>
<!-- END_SECTION:GETPROFILEAPPLICATIONS_OUTPUT -->

---

### getApplications

Get information about applications.

Ids limit: `50`

(id/s) => `Promise<Array>`

```js
await r6api.getApplications('e3d5ea9e-50bd-43b7-88bf-39794f4e3d40');
```

<!-- START_SECTION:GETAPPLICATIONS_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    id: 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40',
    name: 'Tom Clancy\'s Rainbow Six Siege',
    platform: 'PC',
    spaceId: '5172a557-50b5-4665-b7db-e3f2e8c5041d'
  }
]
```

</details>
<!-- END_SECTION:GETAPPLICATIONS_OUTPUT -->

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
| placement      | `string`  | false    | `''`      | Ex: `'featured-news-article'`                                                     |
| limit          | `number`  | false    | `6`       |                                                                                   |
| skip           | `number`  | false    | `0`       |                                                                                   |
| startIndex     | `number`  | false    | `0`       |                                                                                   |
| locale         | `string`  | false    | `'en-gb'` |                                                                                   |
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
  total: 724,
  limit: 1,
  categories: 'all',
  media: 'all',
  skip: 0,
  startIndex: 0,
  placement: [],
  tags: [
    'BR-rainbow-six GA-siege'
  ],
  items: [
    {
      id: '5uvJIketTRZux4L1T4I3Ij',
      title: 'Y7S1 Demon Veil Patch Notes Addendum',
      abstract: 'Updates and fixes made over the course of the Y7S1 Season Test Server.',
      thumbnail: {
        url: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6DStEARPoulRIUcYj99pjJ/51bd38d385aa73bdb682de74e5a1350f/R6S_Y7S1_PatchNotes_Thumbnail.jpg',
        description: null
      },
      content: 'You can find here the updates and fixes made over the course of the Y7S1 Season Test Server. For the full Demon Veil Patch Notes, follow the link below.\n\nDemon Veil Season Patch Notes: [https://rainbow6.com/](https://rainbow6.com/highcalibre)[demonveil](https://www.ubisoft.com/en-us/game/rainbow-six/siege/game-info/seasons/demonveil).\n\n### Y7S1 PATCH SIZE\n\nFind the download sizes for each platform below.\n\n- Ubisoft Connect: 4.4 GB\n- Steam: 3.8 GB\n- Xbox One: 13.82 GB\n- Xbox Series X: 13.17 GB\n- PS4: 5.17 GB\n- PS5: 4.66 GB\n\n### GAMEPLAY\n\nFIXED - Camera is zoomed out while aiming down sights with the Reflex B sight equipped.\n\nFIXED - Entering Observation Tools will default to security cameras if one of a player\'s Observation Tools was picked up or destroyed.\n\nFIXED - Unable to pick up some devices that are deployed into small spaces.\n\nFIXED - Camera goes out of bounds if watching a kill cam when the end of round replay begins.\n\nFIXED - Windows don\'t break when deploying a device on a barricade.\n\nFIXED - After spawning, crosshairs can sometimes remain visible while aiming down sights.\n\nFIXED - Camera goes out of bounds for Attackers in support mode when the last Attacker is eliminated and there are no Observation Tools on their team.\n\nFIXED - Bulletproof Camera EMP burst disables electronic map objects for 15 seconds instead of 6 seconds.\n\nFIXED - Bulletproof Camera EMP burst can destroy fragile map objects.\n\nFIXED - Crosshairs of the Reflex B sight are obstructed by the iron sights of various weapons.\n\nFIXED - Defuser disappears if an Attacker picks up the defuser and disconnects between Attacker lock and the start of the Action Phase.\n\nFIXED - SPAS-15 shotgun has no reticle for some non-magnifying sights.\n\nFIXED - Enemy AI doesn\'t interact with Azami\'s Kiba Barriers.\\n\n### LEVEL DESIGN\n\nFIXED - Multiple LOD issues on various maps.\n\nFIXED - Azami\'s Kiba Barrier doesn\'t break when the breakable wall it\'s deployed on is completely destroyed.\n\n__BANK__\n\nFIXED - Valkyrie\'s Black Eye doesn\'t lose signal when thrown onto the garage door outside at EXT Garage Ramp on Bank map.\n\n__COASTLINE__\n\nFIXED - Ceiling decals in 1F Blue Bar aren\'t destroyed when destroying the floor in 2F Billiard floor on Coastline map.\n\nFIXED - Valkyrie\'s Black Eye loses signal on the ceilings of various second floor rooms on Coastline map.\n\n__FAVELA__\n\nFIXED - Players can defuse the same bomb site twice to win a Training Grounds match on Favela map.\n\n__KANAL__\n\nFIXED - Valkyrie\'s Black Eye doesn\'t lose signal when thrown outside onto the bottom of 2F Upper Bridge on Kanal map.\n\n__OUTBACK__\n\nFIXED - Azami\'s Kiba Barrier can allow players to get inside the shark on Outback map.\n\n__THEME PARK__\n\nFIXED - Valkyrie\'s Black Eye loses signal at 1F Yellow Corridor drone vent on Theme Park map.\n\n__TOWER__\n\nFIXED - Ace\'s S.E.L.M.A. Aqua Breacher activates when deployed on the indestructible floor in 1F Lounge on Tower map.\n\n### OPERATORS\n\nFIXED - Various Operators are missing some non-magnifying weapon sights.\n\nFIXED - Various modelling and clipping issues.\n\nFIXED - Various animation issues.\n\n__ACE__\n\nFIXED - Ace\'s S.E.L.M.A. Aqua Breacher has no SFX when equipped and held.\n\n__ARUNI__\n\nFIXED - Aruni\'s MK14 EBR is missing Muzzle Brake from weapon barrels.\n\n__AZAMI__\n\nFIXED - Azami\'s Kiba Barrier doesn\'t collapse when an operator stands on it.\n\nFIXED - Azami\'s Kiba Barrier deployment VFX are visible from the other side of walls.\n\nFIXED - Azami\'s Kiba Barrier deployment VFX aren\'t visible when watching a match replay.\n\nFIXED - Azami\'s Kiba Barrier destroys Goyo\'s Volcán Canisters when it expands.\n\nFIXED - Azami\'s Kiba Barrier doesn\'t destroy the canister of Mira\'s Black Mirror when it expands, making the canister indestructible.\n\nFIXED - Azami\'s Kiba Barrier doesn\'t break when an Operator stands on it if it was deployed on a hatch that gets destroyed afterward.\n\nFIXED - Azami\'s Kiba Barrier doesn\'t break when an Attacker exits rappel through the Barrier.\n\nFIXED - Azami\'s Kiba Barrier can sometimes prevent vaulting through windows when it\'s deployed on a ceiling.\n\n__BANDIT__\n\nFIXED - Bandit\'s Shock Wire can\'t be deployed on a reinforced hatch when another device is in the center of it.\n\n__CAPITÃO__\n\nFIXED - Incendiary bolts from Capitão\'s Tactical Crossbow don\'t disappear when Capitão disconnects.\n\n__CAVEIRA__\n\nFIXED - Caveira\'s SPAS-15 Reflex C sight is incorrectly attached to the weapon.\n\n__FLORES__\n\nFIXED - Flores\' RCE-Ratero Charge floats midair when affected by Mute\'s Signal Disruptor while jumping.\n\nFIXED - Activating Flores\' RCE-Ratero Charge changes the Observation Tool that an Operator was viewing.\n\n__FUZE__\n\nFIXED - Fuze\'s AK12 is missing Scope 2.0x from weapon sights.\n\nFIXED - Fuze\'s Cluster Charge can be deployed on an angle where a reinforced and indestructible wall meet.\n\n__GOYO__\n\nFIXED - Defenders lose the round and Goyo gets a Friendly Fire penalty if an Attacker moves the hostage near a Volcán Canister and disconnects after deploying a device to destroy the canister.\n\n__IQ__\n\nFIXED - IQ\'s Electronics Detector can detect Azami\'s Kiba Barrier when the kunai is the environment but undeployed.\n\n__MAESTRO__\n\nFIXED - Bullet impact visuals appear on both of Maestro\'s Evil Eyes when only one is shot.\n\n__MAVERICK__\n\nFIXED - Maverick\'s Breaching Torch is unable to breach a reinforced wall when an Operator\'s shield is pressed against the other side.\n\n__MELUSI__\n\nFIXED - Melusi\'s Banshee detects Operators through Azami\'s Kiba Barrier.\n\n__OSA__\n\nFIXED - Osa\'s Talon-8 Shield remains visible if it\'s destroyed by Maverick\'s Breaching Torch during deployment.\n\n__PULSE__\n\nFIXED - Pulse\'s Cardiac Sensor can\'t be unequipped after a player equips it and immediately swaps to a gadget.\n\n__TACHANKA__\n\nFIXED - Tachanka\'s DP27 has no reticle when aiming down some non-magnifying sights.\n\n__WAMAI__\n\nFIXED - Defenders lose the round and Wamai gets a Friendly Fire penalty if an Attacker moves the hostage near Wamai\'s MAG-Net and disconnects after deploying a device to destroy the MAG-Net.\n\n__YING__\n\nFIXED - Ying is unable to vault while holding a Candela.\n\n__ZERO__\n\nFIXED - Zero\'s SC3000K has access to Scope 2.5x A in weapon sights.\n\n### USER EXPERIENCE\n\nFIXED - Some unique ability previews are missing during the Preparation Phase.\n\nFIXED - Privacy Options can be reset to default while the player is in the middle of a match.\n\nFIXED - "View Fullscreen" button doesn\'t work for unique abilities and victory celebrations when selected using a mouse.\n\nFIXED - Duplicated pop-ups for Team Deathmatch can appear on game launch.\n\nFIXED - The Home section background is sometimes replaced by a black screen after exiting the Notifications section.\n\nFIXED - The last Operator eliminated at the end of a match doesn\'t appear eliminated on the scoreboard.\n\nFIXED - Team Deathmatch playlist pop-up appears before the intro cinematic finishes.\n\nFIXED - Players can join an in-progress Team Deathmatch match when there is less than 2 minutes left in the round or when 3/4 of the total eliminations has been reached.\n\nFIXED - Long delay between the end of a Custom Local Team Deathmatch match and when the MVP starts.\n\nFIXED - Player usernames aren\'t display during the MVP of a Team Deathmatch match.\n\nFIXED - Screen resolution slider for Display options can become unresponsive.\n\nFIXED - Crash occurs when multiple players repeatedly switch Operators while the lobby is paused by the host.\n\nFIXED - Various UI issues.\n\nFIXED - Various localization issues.\n\nFIXED - Various customization issues.\n\nFIXED - Various VFX and SFX issues.\n\nFIXED - Overall game performance.\n\n__MATCH REPLAY__\n\nFIXED - Gunshot audio replays every time a Match Replay is rewound.\n\nFIXED - Player isn\'t returned to the Watch section at the end of a match replay.\n\nFIXED - Match Replay experiences long loading times when transitioning between rounds if the rewind and pause buttons are pressed repeatedly as the round ends.\n\nFIXED - Match Replay recordings aren\'t created for Testing Grounds matches on the Test Server.\n\nFIXED - Various Match Replay camera issues.\n',
      description: undefined,
      categories: [
        'rainbow-six-siege',
        'rainbow-six',
        'patch-notes'
      ],
      tag: 'BR-rainbow-six GA-siege',
      placement: null,
      type: 'news',
      readTime: 8,
      url: 'https://www.ubisoft.com/en-gb/game/rainbow-six/siege/news-updates/5uvJIketTRZux4L1T4I3Ij/y7s1-demon-veil-patch-notes-addendum',
      date: '2022-03-09T14:00:00.000Z'
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
| locale         | `string`  | false    | `'en-gb'` |                          |
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
  total: 3,
  tags: [
    'BR-rainbow-six GA-siege'
  ],
  item: [
    {
      id: '4QAhnXnPk7Ffse8scw3k0Z',
      title: 'Y5S1.2 Patch Notes',
      abstract: 'The Y5S1.2 Patch will deploy to PC and Console in the week of April 20th. ',
      thumbnail: {
        url: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/Gqlz4Wt00TfhvaSH4d8LZ/bdb41b4552ebfda9acf293ece6f50084/y5s1_2_pn-min.png',
        description: ''
      },
      content: 'The Y5S1.2 Patch will deploy to PC and Console in the week of April 20th. Please see our [Designer\'s Notes](https://rainbow6.com/dn_y5s12) for more insight on the balancing changes coming with the update.\n\n# UPDATE\nUpdate - the quick match map pool will remain the same throughout Y5S1 and will rotate again in Y5S2.\n\n# BALANCING\n### BUCK \n*With you til the end of the line.*\n\n- Frag Grenades replaced with Claymores.\n- Increased Skeleton Key Magazine Capacity: \n  - Skeleton Key magazine capacity increased to 5 + 1\n  - Skeleton Key max ammo count is now 25+1\n\n### GOYO\n*Less is more.*\n\n- Reduced number of Volcán shields to 2 (down from 3).\n\n### JÄGER\n*Less of a pain-in-the-schnitzel.*\n\n- Now a 2-speed/2-armor operator.\n\n### MOZZIE\n*Still a shortie.*\n\n- Removed Super Shorty secondary.\n\n### YING\n*Lights, Camera, Action!*\n\n- Increased number of Candelas to 4 (up from 3).\n- Replaced Claymores with Smoke Grenades.\n- Increased T-95 LSW damage to 46 (up from 43).\n\n### M12 (Caveira)\n- Added a Razor Holographic Sight option to her M12.\n\n### TCSG12 (Kaid, Goyo)\n- Added an additional magazine to the TCSG12.\n- Reduced TCSG12 damage to 57 (down from 84).\n\n# BUG FIXES\n- FIXED – Barricade replication issues where the barricade is not destroyed for all players in game except the shooter.\n- FIXED – The Dynamic Play button does not update properly when last match was on an Event/Discovery playlist.\n- FIXED – Players can clip inside the excavator in EXT Construction Site of Oregon.\n- FIXED – Game boots with DX11 when players manually select the Vulkan executable in the steam installation folder.\n- FIXED – Minor menu/shop visual and cosmetic fixes.\n- FIXED – Lighting issue on Consulate map (hotfixed on PC on [March 30](https://twitter.com/rainbow6game/status/1244581743254024192?lang=en)).',
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
      readTime: 2,
      url: 'https://www.ubisoft.com/en-gb/game/rainbow-six/siege/news-updates/4QAhnXnPk7Ffse8scw3k0Z/y5s12-patch-notes',
      date: 'Mon Apr 20 2020 21:00:00 GMT+0000 (Coordinated Universal Time)'
    }
  ]
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