# R6API.js

### Node.js wrapper around Rainbow Six: Siege API.

[![NPM](https://nodei.co/npm/r6api.js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/r6api.js/)

### Install

```
npm install r6api.js
```

### Init

To setup this module, you need to provide Ubisoft accounts credentials (email and password).
You don't have to use you real account.

How to create account?

* Go to [temp-mail.org/en](https://temp-mail.org/en).
* Copy your temporal email.
* Go to [account.ubisoft.com/en-GB/login](https://account.ubisoft.com/en-GB/login).
* Provide all details there and remember your email and password.
---

### Setup

```js
const R6API = require('r6api.js');
const r6api = new R6API('email', 'password');
```

---
### Example
```js
const R6API = require('r6api.js');
const r6api = new R6API('example@mail.com', 'eatbigbanan');

const username = 'Daniel.Nt',
      platform = 'uplay';

const id = await r6api.getId(platform, username).then(el => el[0].userId);
const stats = await r6api.getStats(platform, id).then(el => el[0]);

console.log(`${username} has played ${stats.pvp.general.matches} matches.`);
```

```
Daniel.Nt has played 3749 matches.
```
---

### Methods

  * [getId](#getId)
  * [getUsername](#getUsername)
  * [getLevel](#getLevel)
  * [getPlaytime](#getPlaytime)
  * [getRank](#getRank)
  * [getStats](#getStats)
  * [getStatus](#getStatus)
  * [Custom](#Custom)

### Definitions

  * `platform`: Either `uplay` (pc), `xbl` (Xbox Live) or `psn` (PlayStation Network)
---
### [TypeScript integrations](#typescript-integrations-1)
---
### [Changelog](https://github.com/danielwerg/r6api.js/releases)
---
### [Credit](#credit-1)
---
<a name="getId"></a>
* getId(platform: `string`, usernames: `string | string[]`) : `Promise<Array>`

Gets the id of a player from their username.

```js
await r6api.getId('uplay', 'Daniel.Nt');
```

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    userId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    username: 'Daniel.Nt',
    platform: 'uplay'
  }
]
```
---
<a name="getUsername"></a>
* getUsername(platform: `string`, id: `string | string[]`) : `Promise<Array>`

Gets the username of a player from their id.

```js
await r6api.getUsername('uplay', 'ids');
```

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    userid: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    username: 'Daniel.Nt',
    platform: 'uplay'
  }
]
```
---
<a name="getLevel"></a>
* getLevel(platform: `string`, id: `string | string[]`) : `Promise<Array>`

Gets the level, xp and alpha pack drop chance of a player.

```js
await r6api.getLevel('uplay', 'ids');
```

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    level: 254,
    xp: 65886,
    lootboxProbability: { raw: 2060, percent: '20.60%' }
  }
]
```
---
<a name="getPlaytime"></a>
* getPlaytime(platform: `string`, id: `string | string[]`) : `Promise<Array>`

Gets the playtime of a player.

```js
await r6api.getPlaytime(platform, 'ids');
```

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    general: 4402996,
    ranked: 3954804,
    casual: 444947,
    discovery: 3245
  }
]
```
---
<a name="getRank"></a>
* getRank(platform: `string`, id: `string | string[]`, options: `object`) : `Promise<Array>`

Gets seasonal stats for a player.

options:
-  regions: `('ncsa' | 'emea' | 'apac')[]` (by default gets all the regions)
-  seasons: `number[] | 'all'`, with numbers from `6` to `16` (by default it's `-1` - most recent season)


Seasons reference:
```js
6: 'Health', 7: 'Blood Orchid', 8: 'White Noise',
9: 'Chimera', 10: 'Para Bellum', 11: 'Grim Sky',
12: 'Wind Bastion', 13: 'Burnt Horizon', 14: 'Phantom Sight',
15: 'Ember Rise', 16: 'Shifting Tides'
```

```js
await r6api.getRank('uplay', 'ids', { regions: ['emea'] });
```

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    seasons: {
      '16': {
        id: 16,
        name: 'Shifting Tides',
        regions: {
          emea: {
            region: 'emea',
            skillMean: 30.663307433,
            skillStdev: 7.5624420961,
            current: {
              name: 'Unranked',
              id: 0,
              mmr: 3066,
              image: 'https://i.imgur.com/bvnVUEm.png'
            },
            max: {
              name: 'Unranked',
              id: 0,
              mmr: 0,
              image: 'https://i.imgur.com/bvnVUEm.png'
            },
            lastMatch: { mmrChange: 0, won: false, skillStdevChange: -0.0048172252 },
            previousMmr: 0,
            nextMmr: 0,
            topRankPosition: 0,
            kills: 0,
            deaths: 0,
            wins: 0,
            losses: 0,
            matches: 0,
            abandons: 0,
            updateTime: '1970-01-01T00:00:00+00:00'
          }
        }
      }
    }
  }
]
```
---
<a name="getStats"></a>
* getStats(platform: `string`, id: `string | string[]`, raw: `boolean`) : `Promise<Array>`

Gets general stats for a player.

```js
await r6api.getStats('uplay', 'ids');
```
```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    pvp: {
      weapons: [Object],
      operators: [Object],
      general: [Object],
      modes: [Object],
      queue: [Object],
    },
    pve: {
      weapons: [Object],
      operators: [Object],
      general: [Object],
      modes: [Object],
      types: [Object],
    }
  }
]
```
> Note: Ubisoft stopped recording `bulletsFired` long time ago, don't rely on it.

[****Full response****](./doc/getStats-response.json)
---
<a name="getStatus"></a>
* getStatus() : `Promise<Object>`

Gets Rainbow Six Siege servers status.

```js
await r6api.getStatus();
```

```js
{
  PC: {
    AppID: 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40',
    Category: 'Instance',
    Name: 'Rainbow Six Siege - PC - LIVE',
    Platform: 'PC',
    Status: 'Online',
    Maintenance: null
  },
  PS4: {
    AppID: 'fb4cc4c9-2063-461d-a1e8-84a7d36525fc',
    Category: 'Instance',
    Name: 'Rainbow Six Siege - PS4 - LIVE',
    Platform: 'PS4',
    Status: 'Online',
    Maintenance: null
  },
  XBOX: {
    AppID: '4008612d-3baf-49e4-957a-33066726a7bc',
    Category: 'Instance',
    Name: 'Rainbow Six Siege - XBOXONE - LIVE',
    Platform: 'XBOXONE',
    Status: 'Online',
    Maintenance: null
  }
}
```
---
<a name="Custom"></a>
* Custom()

Useful if you're familiar with Rainbow Six Siege's stats API; this method will make a request to a custom URL you would provide with the token in the header.

```js
await r6api.custom(
  `${r6api.constants.URLS('STATS')('uplay', ['0b95544b-0228-49a7-b338-6d15cfbc3d6a'], ['operatorpvp_clash_sloweddown'])}`
);
```

```js
{
  results: {
    '0b95544b-0228-49a7-b338-6d15cfbc3d6a': { 'operatorpvp_clash_sloweddown:3:10:infinite': 1 }
  }
}
```

### TypeScript integrations

This package has type definitions, which means that if you use a compatible editor (such as Visual Studio, Atom and others) it will give you autocomplete and docs directly into the editor.
For a full list of supporting IDEs, please see [here](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support).

Please notice that some editors don't like the fact that we're exporting a class along with types, so if you don't see any type suggestion in your js files you can try using `require('r6api.js').default` as your module import. You can look at the example below:

```js
const R6API = require('r6api.js').default; // Now everything should be typed
const r6api = new R6API('example@mail.com', 'eatbigbanan'); // You can use the module as usual
```

If you're coding in TypeScript you can also use the type-checking functions provided in [`./ts-utils.ts`](ts-utils.ts): you can either copy them into your code or directly importing them from the package.

```ts
import { isWeaponName } from 'r6api.js/ts-utils'

var yourVar; // any
...
if (isWeaponName(yourVar)) {
  // Now your var has the WeaponName type
}
```

### Credit

Originally based on [github.com/r6db/r6api](https://github.com/r6db/r6api).

Operator icons from [marcopixel.eu/r6-operatoricons](https://marcopixel.eu/r6-operatoricons) and available under the CC BY 4.0 license.
