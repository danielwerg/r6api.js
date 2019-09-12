# R6API.js

### Node.js wrapper around Rainbow Six: Siege API.
 Originaly based on  [github.com/r6db/r6api](https://github.com/r6db/r6api)

 Operator icons from [marcopixel.eu/r6-operatoricons](https://marcopixel.eu/r6-operatoricons) and available under the CC BY 4.0 license.

## Install

```
npm install r6api.js
```

### INIT

To setup this module, you need to provide Ubisoft accounts credentials (email and password).
You don't have to use you real account.

How to create account?

*   Go to [temp-mail.org/en](https://temp-mail.org/en).
*   Copy your temporal email.
*   Go to [account.ubisoft.com/en-GB/login](https://account.ubisoft.com/en-GB/login).
*   Provide all details there and remember your email and password.
---

### SETUP

```js
const R6API = require('r6api.js');
const r6 = new R6API('email', 'password');
```

---
### Example
```js
const R6API = require('r6api.js');
const r6 = new R6API('example@mail.com', 'eatbigbanan');

const username = 'Daniel.Nt';
const id = await r6.getId('uplay', username).then(el => el[0].id);
const stats = await r6.getStats('uplay', id).then(el => el[0]);

console.log(`${username} has played ${stats.pvp.general.matches} matches`);
```

```
Daniel.Nt has played 3749 matches
```
---

### METHODS

  * [getId](#getId)
  * [getUsername](#getUsername)
  * [getLevel](#getLevel)
  * [getPlaytime](#getPlaytime)
  * [getRank](#getRank)
  * [getStats](#getStats)
  * [getStatus](#getStatus)
  * [Custom](#Custom)
---
### [Changelog](#Changelog)
---
### [TypeScript integrations](#typescript-integrations)
---
<a name="getId"></a>
*   getId(platform: `string`, usernames: `string | string[]`): `Promise<Array>`

Gets the id of a player from their username.

```js
let getId = await r6.getId('uplay', 'Daniel.Nt');
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
*    getUsername(platform: `string`, id: `string | string[]`): `Promise<Array>`

Gets the username of a player from their id.

```js
let getUsername = await r6.getUsername('pc', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
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
*   getLevel(platform: `string`, id: `string | string[]`): `Promise<Array>`

Gets a player's level, xp and alpha pack drop chance.

```js
let getLevel = await r6.getLevel('pc', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
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
*   getPlaytime(platform: `string`, id: `string | string[]`) : `Promise<Array>`

Gets the playtime of a player.

```js
let getPlaytime = await r6.getPlaytime(platform, ids);
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
*    getRank(platform: `string`, id: `string | string[]`, options: `object`) : `Promise<Array>`

Gets seasonal stats for a player.

options:
-  regions: `('ncsa' | 'emea' | 'apac')[]` (by default gets all the regions)
-  seasons: `number[] | 'all'`, with numbers from `6` to `15` (by default `-1`  is most recent season)

Seasons reference:
```js
6: 'Health', 7: 'Blood Orchid', 8: 'White Noise',
9: 'Chimera', 10: 'Para Bellum', 11: 'Grim Sky',
12: 'Wind Bastion', 13: 'Burnt Horizon', 14: 'Phantom Sight',
15: 'Burnt Horizon'
```

```js
let getRank = await r6.getRank('pc', '0b95544b-0228-49a7-b338-6d15cfbc3d6a', { regions: ['emea'] });
```

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    season: 14,
    seasonName: 'Phantom Sight',
    regions : {
      emea : {
        region: 'emea',
        skillMean: 34.314824008,
        skillStdev: 5.7171431154,
        current : {
          name: 'Platinum 3',
          id: 17,
          mmr: 3431,
          image: 'https://i.imgur.com/27k46er.png'
        },
        max : {
          name: 'Platinum 3',
          id: 17,
          mmr: 3493,
          image: 'https://i.imgur.com/27k46er.png'
        },
        lastMatch : {
          mmrChange: -59,
          result: 2,
          skillStdevChange: -0.0308566215
        },
        previousMmr: 3300,
        nextMmr: 3700,
        nextRankMatchesNeeded: 4.559322033898305,
        kills: 215,
        deaths: 178,
        wins: 22,
        losses: 18,
        abandons: 0,
        updateTime: '2019-06-18T06:06:16.818000+00:00'
      }
    }
  }
]
```
---
<a name="getStats"></a>
*    getStats(platform: `String`, id: `String` if < 1, `Array` if several, raw: `Boolean`) : `Promise` with `Array` Return

Get general stats for player.

```js
let getStats = await r6.getStats('pc', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```
```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    pvp: {
      weapons: [Object],
      operators: [Object],
      general: [Object],
      queue: [Object],
      mode: [Object]
    },
    pve: {
      weapons: [Object],
      operators: [Object],
      general: [Object],
      type: [Object],
      mode: [Object]
    }
  }
]
```
[****Full response****](./doc/stats-response.json)
---
<a name="getStatus"></a>
*  getStatus() : `Promise` with `Object` Return

Get rainbow6 servers status.

```js
let getStatus = await r6.getStatus();
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
*   Custom()

If you familiar with rainbow6 api this method will make request to custom url you would provide with token in header.

```js
let custom = await r6.custom(
  `${r6.constants.URLS('STATS')('uplay', ['0b95544b-0228-49a7-b338-6d15cfbc3d6a'], ['operatorpvp_clash_sloweddown'])}`
);
```

```js
{
  results: {
    '0b95544b-0228-49a7-b338-6d15cfbc3d6a': { 'operatorpvp_clash_sloweddown:3:10:infinite': 1 }
  }
}
```
<a name="typescript-integrations"></a>
## TypeScript integrations

This package has type definitions, which means that if you use a compatible editor (such as Visual Studio, Atom and others) it will give you autocomplete and docs directly into the editor.  
For a full list of supporting IDEs, please see [here](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support).  
Please notice that some editors dont' like the fact that we're exporting a class along with types, so if you don't see any type suggestion in your js files you can try using `require('r6api.js').default` as your module import. You can look at the example below:

```js
const R6API = require('r6api.js').default; // Now everything should be typed
const r6 = new R6API('example@mail.com', 'eatbigbanan'); // You can use the module as usual
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

<a name="Changelog"></a>
## Changelog:

****0.0.28****
* bug fix, now if you provide `{ seasons: 'all' }` option to `getRank` it should return stats for every season.

****0.0.27****
* Added unique gadget ids and indexes.

****0.0.26****
* `GetRank`

  * Added multi season checking.
  * `season` is now `seasons`.
  * Added `topRankPosition`, not completely sure what it is, probably number in leaderboard for champions rank.


* ids and usernames limit changes

  `getId` and `getUsername` limit is still `50`.

  `getLevel`, `getPlaytime`, `getRank`, `getStats` limit is now `200`.

  I might add option to remove limit checking later.

* for those who interact with `constants.js`

  * `URLS` structure completely changed to make it easier to get endpoint url.
  * `STATS` is now bunch of functions which returning arrays, it's easier to read since it categorized.

* `getStats`

  `mode` now `modes` in `pvp` and `pve`.

  more changes coming in next update, options to remove `pve` or `pvp` stats, etc.

****0.0.25****
* [EndBug](https://github.com/EndBug) added ts-utils file which contains type-checking functions

****0.0.24****
* Now recruits gadget is `null`
* Added next season operators info, still missing `fullIndex` and unique gadget id

****0.0.21****
* [EndBug](https://github.com/EndBug) added TypeScript definitions and fixed typos.

****0.0.20****
* Renamed `custom` to `discovery` in `getPlaytime` and `other` to `discovery` in `getStats`
* Fixed typos in readme
* Added changelog ✔
