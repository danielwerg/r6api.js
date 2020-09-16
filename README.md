<div align="center">
  <h1>
    R6API.js
  </h1>
  <h3>
    Node.js wrapper around Rainbow Six: Siege API
  </h3>
  <p>
    <a href="https://www.npmjs.com/package/r6api.js">
      <img
        src="https://nodei.co/npm/r6api.js.png?downloads=true&downloadRank=true&stars=true"
        alt="NPM"
      />
    </a>
  </p>
  <p>
    <a href="https://www.npmjs.com/package/r6api.js">
      <img
        src="https://img.shields.io/npm/dt/r6api.svg?maxAge=3600"
        alt="NPM downloads"
      />
    </a>
    <a href="https://david-dm.org/danielwerg/r6api.js">
      <img
        src="https://img.shields.io/david/danielwerg/r6api.js.svg?maxAge=3600"
        alt="Dependencies"
      />
    </a>
    <a href="https://discord.gg/hshRpWk">
      <img
        src="https://discordapp.com/api/guilds/612212753498767360/embed.png"
        alt="Discord guild"
      />
    </a>
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
* [Github](https://github.com/danielwerg/r6api.js)  
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

* Go to [temp-mail.org/en](https://temp-mail.org/en)
* Copy your temporal email
* Go to [account.ubisoft.com/en-us/login](https://account.ubisoft.com/en-us/login)
* Provide all details there and remember your email and password

## Example

<!-- START:EXAMPLE -->
```js
require('dotenv').config();
const R6API = require('r6api.js').default;

// Or ES6 way
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

  const { 0: { id } } = await r6api.findByUsername(platform, username);
  const { 0: { pvp: { general } } } = await r6api.getStats(platform, id);

  return `${username} has played ${general.matches} matches.`;

};

```
<!-- END:EXAMPLE -->

<!-- START:EXAMPLE_OUTPUT -->
```
Daniel.Nt has played 4998 matches.
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
<!-- END:FINDBYUSERNAME_OUTPUT -->

---

### findById

Find player by their id.

(platform | 'all', id/s, options) => `Promise<Array>`

```js
await r6api.findById('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- START:FINDBYID_OUTPUT -->
<!-- END:FINDBYID_OUTPUT -->

---

### getProgression

Get level, xp and alpha pack drop chance for a player.

(platform, id/s) => `Promise<Array>`

```js
await r6api.getProgression('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- START:GETPROGRESSION_OUTPUT -->
<!-- END:GETPROGRESSION_OUTPUT -->

---

### getPlaytime

Get playtime for a player.

(platform, id/s) => `Promise<Array>`

```js
await r6api.getPlaytime('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- START:GETPLAYTIME_OUTPUT -->
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

| Shorthand | Meaning                        |
| --------- | ------------------------------ |
| `emea`    | Europe, Middle East and Africa |
| `ncsa`    | North, Central, South America  |
| `apac`    | Asia and Pacific               |

```js
await r6api.getRanks('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a', { regions: 'emea' });
```

<!-- START:GETRANKS_OUTPUT -->
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

> **Note:** Ubisoft stopped recording `bulletsFired` long time ago, don't rely on it

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