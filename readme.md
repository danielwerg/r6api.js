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

| Param     | Type                           | Required | Default                    | Description                                                       |
| --------- | ------------------------------ | -------- | -------------------------- | ----------------------------------------------------------------- |
| seasonIds | `number \| number[] \| string` | false    | `-1`                       | Numbers from `6` to `20` or `-1` or `'all'`                       |
| regionIds | `string \| string[]`           | false    | `['emea', 'ncsa', 'apac']` | `'emea'`, `'ncsa'`, `'apac'` or `'all'`                           |
| boardIds  | `string` \| string[]`          | false    | `'pvp_ranked'`             | `'pvp_ranked'`, `'pvp_casual'`, `'pvp_newcomer'` or `'pvp_event'` |

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

| Season ID | Board ID     |
| --------- | ------------ |
| 6         | pvp_ranked   |
| 12        | pvp_newcomer |
| 15        | pvp_casual   |
| 16        | pvp_event    |

<!-- END_SECTION:BOARDS_TABLE -->

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
      '20': {
        seasonId: 20,
        seasonName: 'Neon Dawn',
        seasonColor: '#D14007',
        seasonImage: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3vRTyOgSmwcUVxiOk60p3w/e2f41521df1f67704dae051d147a32cc/r6s-seasons-y5s4.jpg',
        seasonReleaseDate: '2020-12-01T00:00:00.000Z',
        regions: {
          emea: {
            regionId: 'emea',
            regionName: 'Europe, Middle East and Africa',
            boards: {
              pvp_ranked: {
                boardId: 'pvp_ranked',
                boardName: 'Ranked',
                skillMean: 38.3491372306,
                skillStdev: 3.9413086329,
                current: {
                  id: 20,
                  name: 'Platinum 2',
                  mmr: 3835,
                  icon: 'https://github.com/danielwerg/r6api.js/raw/typescript/assets/ranks/v3.1/Platinum%202.png'
                },
                max: {
                  id: 20,
                  name: 'Platinum 2',
                  mmr: 3835,
                  icon: 'https://github.com/danielwerg/r6api.js/raw/typescript/assets/ranks/v3.1/Platinum%202.png'
                },
                lastMatch: {
                  result: 'win',
                  mmrChange: 34,
                  skillMeanChange: 0.3435030667,
                  skillStdevChange: -0.0110458855
                },
                previousMmr: 3600,
                nextMmr: 4000,
                topRankPosition: 0,
                kills: 627,
                deaths: 637,
                kd: 0.98,
                wins: 77,
                losses: 60,
                winRate: '56.20%',
                matches: 137,
                abandons: 1,
                updateTime: '2021-03-03T11:26:02.326000+00:00'
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
  total: 1110,
  limit: 1,
  categories: 'all',
  media: 'all',
  skip: 0,
  startIndex: 0,
  placement: '',
  tags: 'BR-rainbow-six GA-siege',
  items: [
    {
      id: '4zp5i0v1Khs1xdVrTFIEJT',
      title: 'Look and Feel Like a Champion with Official Six Invitational Gear',
      abstract: 'Celebrate the upcoming tournament with official gear ranging from jerseys and hoodies to hats.',
      thumbnail: {
        url: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/UiLCBNJjlAa2q2zVRrXKp/27bbe9a89b541b2642768dd3055dc1f6/UPCNewsArticleThumb_SI2021-editorial-jan2021_960x540EN.jpg',
        description: null
      },
      content: '\n[The Six Invitational](https://www.ubisoft.com/en-us/esports/rainbow-six/siege/news-updates/4HSnIBwPcb7V9UFNfhxGic/null) may look a little different this year, but competition will be no less fierce. Neither will your clothing game, because the Ubisoft Store has official Six Invitational gear just for you... and well, everyone. But when we say “just for you,” we mean that too, because this year, you’ll be able to secure your very own customized gear! Got your attention? Great! Check below for more details on that and a selection of other great Six Invitational gear. \n\n### [SHOP NOW](https://merch.ubisoft.com/six-siege/)\n\n---\n\n__Official Six Invitational Jersey__\n\n![[UN] [News] Look and Feel Like a Champion with Official Six Invitational Gear - Six-Invitational-Official-Jersey](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/7FEmkQ3QL5KxNrFkzch42P/d2e2a7ca4d7643ae48cf7c177351cf33/Six-Invitational-Official-Jersey.png)\n\nNo competition is complete without jerseys, but let’s take it one step further: This official Six Invitational jersey not only looks good, but you can add a little extra personality with a brand-new customization feature that lets you personalize the name on the back with custom text. Use a gamertag, your favorite player’s name, your favorite Siege Operator, or even your favorite pet’s name. The only limitation is your imagination... and a set number of characters. [Get it here](https://merch.ubisoft.com/six-invitational-official-jersey/).\n\n---\n\n__Official Six Invitational Bomber Jacket__\n\n![[UN] [News] Look and Feel Like a Champion with Official Six Invitational Gear - Six-Invitational-Official-Bomber-Jacket](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/lDWfBbopN7mcbprjuolrK/40a0ff6a39c2a4dd4fd1320b510c4361/Six-Invitational-Official-Bomber-Jacket.png)\n\nThis sleek bomber features the Six Invitational logo on the front and a subtle geometric design on the back, but let me tell you what you don’t see: the multifaceted nature of bomber jackets. You can wear them when it’s pretty cold, but they also come in handy when it’s a little warm but still cold enough where you really could go either way. That’s just extra value on a great-looking jacket. [Get it here](https://merch.ubisoft.com/invitational-official-bomber-jacket/).\n\n---\n\n__Official Six Invitational Face Mask__\n\n![[UN] [News] Look and Feel Like a Champion with Official Six Invitational Gear - Six-Invitational-Official-Face-Mask](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/lvoEz1MwfJ3ARO1WfqWwV/b952a68c63bb924469a6e5805534496b/Six-Invitational-Official-Face-Mask.png)\n\nThe Ubisoft Store is offering a pair of different Six Invitational face masks. One features the logo and a festive full-color design that says you’re in full hype mode and you don’t care who knows it. The other is more understated, featuring a logo and a light geometric design with light coloring to let everyone know that you are no less hyped, but just perhaps a bit more reserved about it. [Get it here](https://merch.ubisoft.com/invitational-official-face-mask/).\n\n---\n\n__Official Six Invitational Hoodie__\n\n![[UN] [News] Look and Feel Like a Champion with Official Six Invitational Gear - Six-Invitational-Official-Hoodie](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/23pY009wZrFINuSiDVh1tn/88e112e4d0b37283397c14e68189aabb/Six-Invitational-Official-Hoodie.png)\n\nThe hexagon is one of the most powerful symbols known to humanity, and the Official Six Invitational Hoodie knows that with great power comes great responsibility. The colorful, understated hexagonal stylings of the comfy front pocket say, “I know how to wield my powers for good,” while the Six Invitational logo on the chest shows that you could go full hexagon at any time, but have chosen discipline and restraint. People who think that they only used the hexagon design because the shape has six sides and “Six” is literally in the name of this hoodie will never understand. [Get it here](https://merch.ubisoft.com/invitational-official-hoodie/). \n\n---\n\n__Official Six Invitational Embroidered Red T-shirt__\n\n![[UN] [News] Look and Feel Like a Champion with Official Six Invitational Gear - Six-Invitational-Official-Embroidered-Red-T-shirt](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/ezpKRxiVH6OcmnvSS1Wve/4a458411b42983566501f31e4464a7d0/Six-Invitational-Official-Embroidered-Red-T-shirt.png)\n\nWhat’s better than sporting the official Six Invitational logo on a classic white t-shirt? Sporting a classy embroidered logo, of course! This understated design tells the world that you’re ready for competition, but that you’re subtle enough to take a measured approach, giving your opponent the space they need to slip up so you can claim victory with your superior strategy. Are we reading too much into the design, or does it speak to your leadership skills? Guess that’s up to you, boss. [Get it here](https://merch.ubisoft.com/invitational-embroidered-red-t-shirt/).\n\n---\n\n__Official Six Invitational Blue T-Shirt__\n\n![[UN] [News] Look and Feel Like a Champion with Official Six Invitational Gear - Six-Invitational-Official-Blue-T-shirt](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/58XEblGYF6WCNWeXshEdWq/564b2a926c4ec14911816476d65af94e/Six-Invitational-Official-Blue-T-shirt.png)\n\nUnderstated is great, but a less-subtle fashion approach has its merits, too. While others hide and wait for the action to come to them, emblazoning this logo proudly across your chest says that you’re ready to meet any challenge head-on. In addition to putting your enthusiasm front and center, this t-shirt\'s classic white design pairs well with just about anything, making it an ideal centerpiece for any outfit. [Get it here](https://merch.ubisoft.com/the-invitational-blue-t-shirt/).\n\n---\n\n__Official Six Invitational Beanie__\n\n![[UN] [News] Look and Feel Like a Champion with Official Six Invitational Gear - Six-Invitational-Official-Beanie](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1W1ON1s8uMm7wsUUq9FDNI/20ac368289870fbe865a43bd62adb287/Six-Invitational-Official-Beanie.png)\n\nYou know who’s cool, both literally and figuratively? Buck. Luckily, his beanie helps him combat the literal cool while contributing to his figurative cool. All this is meant to say that beanies will keep you warm AND make you look cool, like Buck. The Six Invitational Official Beanie comes in two fashionable colors, and it’s your first step towards cosplaying as Buck. [Get it here](https://merch.ubisoft.com/invitational-official-beanie/). \n\n---\n\n__Official Six Invitational Sweatshirt__\n\n![[UN] [News] Look and Feel Like a Champion with Official Six Invitational Gear - Six-Invitational-Official-Sweatshirt](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/zE29ewCWKhQiw4XQTk3Wt/c646dcb5ed70d0db0bc6d138176762d3/Six-Invitational-Official-Sweatshirt.png)\n\nPeople don’t tend to think of the calming power of a soft, comfortable sweatshirt with subtle, colorful flair when they think of high-level esports competition with millions of dollars at stake. But when your favorite team is taken to a third map that they historically underperform on, and the Operators they excel with are banned, you’ll be grateful for the serenity that this garment provides. [Get it here](https://merch.ubisoft.com/invitational-official-sweatshirt/). \n\n---\n\n__Official Six Invitational Cap__\n\n![[UN] [News] Look and Feel Like a Champion with Official Six Invitational Gear - Hat](//staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5mRtUOAr1344UBYpq4RQc9/076f166b225e36201622c31e496887ca/snapback-white-front-601475f5d321a.png)\n\nMaybe beanies aren’t your style. Maybe you’re trying to cool off, rather than warm up. In that case, the Official Six Invitational Cap is right up your alley. Not only will it keep the sun out of your eyes, but the white color goes with any outfit. Plus, you can turn it backwards and it offers a completely different look. That’s like two hats in one! [Get it here](https://merch.ubisoft.com/invitational-official-cap/). \n\n---\n\n*[Rainbow Six Siege](https://store.ubi.com/us/tom-clancys-rainbow-six-siege/56c494ad88a7e300458b4d5a.html?lang=en_US) is available now for PC at the Ubisoft Store. It is also included with a Ubisoft+ subscription.*\n\nFollow the Ubisoft Store on [Facebook](https://www.facebook.com/UbisoftStore/), [Twitter](https://twitter.com/ubisoftstore) and [Instagram](https://www.instagram.com/ubisoftstore/) to stay updated on current promos, new deals, merch and more about your favorite Ubisoft franchises!',
      description: undefined,
      categories: [
        'store',
        'rainbow-six',
        'rainbow-six-siege',
        'esports'
      ],
      tag: 'BR-rainbow-six GA-siege',
      placement: null,
      type: 'news',
      readTime: '6',
      url: 'https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates/4zp5i0v1Khs1xdVrTFIEJT/look-and-feel-like-a-champion-with-official-six-invitational-gear',
      date: '2021-03-01T17:00:00.000Z'
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