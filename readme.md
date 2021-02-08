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

> **Note:** Ubisoft doesn't provide data for seasons before Operation Health

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

> **Note:** `kills`, `deaths`, `kd`, `topRankPosition` and everything under `lastMatch` only available  for seasons including and after Phantom Sight (14) for older seasons it will return `0` or `false` in case of `lastMatch.won`

> **Note:** If player is unranked their max mmr (`max.mmr`) will always be `0`

> **Note:** Since Steal Wave all regions will return same data

> **Note:** Values for `previousMmr`, `nextMmr`, `topRankPosition`, `(current|max).id` and `max.mmr` will always be `0`, `(current|max).name` will always be `Unranked` if `boardId` is `pvp_casual`

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
  total: 1105,
  limit: 1,
  categories: 'all',
  media: 'all',
  skip: 0,
  startIndex: 0,
  placement: '',
  tags: 'BR-rainbow-six GA-siege',
  items: [
    {
      id: '4CpkSOfyxgYhc5a4SbBTx',
      title: 'Dev Blog: Update on Anti-Cheat in Rainbow Six Siege',
      abstract: 'Learn about everything we\'ve done regarding anti-cheat since June',
      thumbnail: {
        url: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6b0uFyrSfDjijSN3C1IAep/8ce1b0eae3e13410dff27e8d6ab797ca/DEVBLOGAntiCheat.jpg',
        description: null
      },
      content: '## Intro\n\nIt’s been about half a year since our [last dev blog](https://www.ubisoft.com/en-ca/game/rainbow-six/siege/news-updates/71mLMFOOVefAO9qlHMLf3O/dev-blog-rainbow-six-sieges-anticheat-war) on the Rainbow Six Siege war against cheats. For the last six months, the team has continued the fight and we would like to share with you a bit about what’s been happening behind the scenes. While we would love to be fully transparent, doing so could hinder our efforts as it could aid in the creation of new cheats. \n\nMost of our changes will be made on the backend, so you may not see them. To summarize our current status, we are actively reinforcing cheat detection by adding to existing security measures and lessening the overall ability to cheat in Rainbow Six Siege.  \n\n### Glossary \n\nThroughout the blog we’ll reference a few different groups of exploiters:\n\n- __Cheaters:__ Players using a 3rd party application, script, or macro to obtain an unfair advantage in-game or in a manner that violates the Terms of Service for Rainbow Six Siege. \n- __Cheat Developers:__ Those developing cheat applications which they then use, sell, or give to cheaters. \n- __Hackers:__ For the context of this article, these are malicious individuals/groups who are taking over accounts that are not theirs and re-selling accounts they do not own. \n\n### The Siege Team’s Approach Towards Cheating\n\n![[R6] DevBlog: Anti-Cheat Approach to Cheating](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/56ljHkq1ZS1qVwpkorMeOt/a35be6a0da53b5c8dccd99d4aed25b90/R6_3PillarStrategy.jpg)\n\nIn our never-ending cat and mouse game with cheaters and cheat developers, we continue to focus our efforts on 3 core points: \n\n- __Detection Improvement__ \n- __Increased Barriers__ to prevent cheaters and novel cheats \n- __Reduction of Impact__ of cheats in-game 	\n\n### 2020 in Numbers\n\n![[R6] BanCharts2021 Total ](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/20I0DHoeINP5Ow8Uy97ETM/d1ec88b30e58cdf23560a5331734c177/R6_BanCharts2021_Total__1_.png)\n\nBy the end of 2020, we confirmed we exceeded our previous annual ban number record by 44.73%. Improved detection, detailed reporting, and data sharing with BattlEye were big factors in this ban increase. With a continually growing population and the increased availability of cheats, new cheats and cheaters regularly keep us on our toes. \n\nIn August, we started issuing a new type of cheating sanction based on player data—something we will go into more detail on below. We used this new data detection model to ban over 4500 players between August and December. Adding this to our cheating sanctions brings us to a total of 52,69% increase in cheating bans.\n\n![[R6] Bans Graph Updated](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/sIAybX30CANLtRwGQNMgE/763d5e499b5d8e34462da6fc83cd28c2/R6_BanCharts2021_Data_V3.png)\n\n## A Look Back at 2020 and Where We Are Heading \n\nThe [June Dev Blog](https://www.ubisoft.com/en-ca/game/rainbow-six/siege/news-updates/71mLMFOOVefAO9qlHMLf3O/dev-blog-rainbow-six-sieges-anticheat-war) described three important topics for 2020: Detection, Blockers, and Vulnerabilities. These continue to be our focus and we have some updates to report. \n\n### 1. IMPROVED CHEAT DETECTION \n\nCheat detection will always be a work in progress, as well as a ‘’hunting’’ process. As cheating is ever-evolving thanks to changing behaviors, the continued bypassing of systems, and more, it will always be impossible to detect 100% of cheaters.\n\nThat’s why we are building new cheat detections based on statistics to uncover our most disruptive cheat users. \n\n### 1.1. USING DATA-BASED DETECTION MODELS FOR EARLY DETECTION AND FLAGGING CHEATS \n\nBans based on player statistics are still new to Rainbow Six Siege. One of the major goals of data-based cheat detection is to sanction cheaters faster. We are happy with the accuracy of our first model, but we are still operating the ban waves manually. This is causing the process to be slower than we would like. Automation for this first model is planned for the beginning of Year 6.    \n\nNew detection models will always launch manually. We start by identifying data that will make our detection model relevant. Next, we launch it on the backend and make sure we are comfortable with the results. The first ban waves are done by hand, allowing us to review each impacted player. This helps us ensure the detections are identifying concrete proof of cheating. We will continue to develop new models that give us better visibility on what is happening live in order to expedite the identification of cheaters and sanctioning them. \n\n### 1.2. IMPROVING BATTLEYE IN SIEGE\n\nFor the last six months, we have been working with BattlEye to improve cheat detections in Siege.  We will continue to ensure that our partnership with BattlEye has a positive impact on the Rainbow Six Siege community. \n\n### 2. INCREASED BARRIERS TO ENTRY AND CHEAT PREVENTION \nCheat detection is only one piece of the anti-cheat puzzle in Siege. We are also working to increase barriers to entry for both cheat developers and their users. Our goal is to cancel any benefit that could be gained from this practice by making it costly for illegitimate players.\n\n### 2.1. MAKING LIFE DIFFICULT FOR CHEATERS  \n\nIn our quest to make cheaters\' lives as difficult as possible, we included APAC regions in the [2-Step Verification Ranked Lock](https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates/5yLMh8r7wyfP4X2hL6twwv/2-step-verification-ranked-lock-update-for-pc). This not only deters cheating, but it helps secure a wider array of accounts from being hacked. Increasing the overall security of accounts is an effective way to help fight instances of account stealing or selling, and makes it harder for Cheaters, Hackers, and Cheat Developers alike.  \n\nAnother tool in the arsenal of cheaters and cheat developers is the creation of burner accounts. To combat this, we have linked BattlEye bans with Steam Vac bans, which prevent banned players from receiving game refunds. \n\nIn the upcoming months, we’ll also be keeping a closer eye on leaderboards. We are aware that cheaters are appearing in the highest rankings and will dedicate efforts to manually cleaning the leaderboards periodically. \n\n### 2.2. MAKING LIFE DIFFICULT FOR CHEAT DEVELOPERS \n\nWhile we can’t offer specifics on this topic, please know we are working to make it harder for cheat developers to analyze and modify our game. With every update we’ve launched for the past few seasons, we have continued to further secure code, making it more difficult for cheat features to keep up.\n\nCheat Developers may only be one part of the equation, but they are the source of the problem. We will continue securing our code and eliminating vulnerabilities in order to make the upkeep of cheats more costly and time-consuming.\n\n### 3. REDUCTION OF VULNERABILITIES, CHEAT OPPORTUNITIES AND IMPACT OF CHEATS \n\nWe are continuing to learn a great deal from our battle against cheating as we fight on multiple fronts, from live issues and fires, to planning the future of Siege’s anti-cheat responses, through to making sure we maintain visibility on our vulnerabilities. \n\n### 3.1. VULNERABILITY ASSESSMENT\n\nCheat developers take advantage of vulnerabilities to create their cheats. For this reason, we assess our vulnerabilities every season to not only detect current vulnerabilities, but also to predict what new loopholes could be found in the future. We keep the Ubisoft game security team close and use their knowledge to plan our initiatives and understand past and present errors. \n\n### 3.2. VULNERABILITY FIXES \n\nIn addition to using software to discover potential risks, we actively keep an eye on social media and work closely with the community team and customer support to concentrate our efforts on issues that matter to our players.  As soon as we discover vulnerabilities, we get to work on fixing them. In some instances, there are no simple solutions, so we complement prevention with detection. \n\n## What is Next? \n\nWe have big plans on the horizon for our team and for the game, and have no intention of slowing down. While we can’t go into full detail at this time, we hope this Dev Blog has helped you understand some of the work we do behind the scenes. This work is rarely user-facing and can be overthrown by new cheat iterations, but we’ll keep pushing to improve on all fronts. \n\nIn the future, the anti-cheat team plans to remain transparent by publishing Dev Blogs when we have notable updates to share.\n\n## Conclusion\n\nFor every wall reinforcement that we deploy, Cheat Developers are trying to breach in another room. But it far from deters our will to rid the game of as many opportunists and cheaters as we can. We are dedicated to making Siege secure and fair for everyone. We look forward to sharing exciting new releases in future Dev Blogs. Until then, keep reporting cheaters in-game and stay safe out there. \n',
      description: undefined,
      categories: [
        'rainbow-six-siege',
        'rainbow-six',
        'community'
      ],
      tag: 'BR-rainbow-six GA-siege',
      placement: [
        'featured-news-article'
      ],
      type: 'news',
      readTime: '8',
      url: 'https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates/4CpkSOfyxgYhc5a4SbBTx/dev-blog-update-on-anticheat-in-rainbow-six-siege',
      date: '2021-02-03T05:00:00.000Z'
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