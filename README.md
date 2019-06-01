

# R6API.js

### Node.js wrapper around Rainbow Six: Siege API.
 Originaly based on  [github.com/r6db/r6api](https://github.com/r6db/r6api)

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

  const username = 'Nt.DNL._.';
  const id = await r6.getById('uplay', username).then(el => el[0].id);
  const stats = await r6.getStats('uplay', id).then(el => el[0]);

  console.log(`${username} has played ${stats.pvp.general.matches} matches`);
```

```
Nt.DNL._. has played 3749 matches
```
---

### METHODS

*   getById(platform: `String`, username: `String` if < 1, `Array` if several) : `Promise` with `Array` Return

Get id of player from username.

```js
let getById = await r6.getById('uplay', 'Nt.DNL._.');
```

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    userId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    username: 'Nt.DNL._.',
    platform: 'uplay'
  }
]
```
---

*    getByUsername(platform: `String`, id: `String` if < 1, `Array` if several) : `Promise` with `Array` Return

Get username of player from id.

```js
let getByUsername = await r6.getByUsername('pc', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    userid: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    username: 'Nt.DNL._.',
    platform: 'uplay'
  }
]
```
---

*   getLevel(platform: `String`, id: `String` if < 1, `Array` if several) : `Promise` with `Array` Return

Get level, xp and alpha pack drop chance.

```js
let getLevel = await r6.getLevel('pc', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    level: 254,
    xp: 65886,
    lootboxProbability: { raw: 2060, procent: '20.60%' }
  }
]
```
---

*   getPlaytime(platform: `String`, id: `String` if < 1, `Array` if several) : `Promise` with `Array` Return

Get playtime of player.

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
    custom: 3245
  }
]
```
---

*    getRank(platform: `String`, id: `String` if < 1, `Array` if several, options: `Object`) : `Promise` with `Array` Return

Get seasonal stats for player.

options:
*  region: `Array`, [`ncsa`, `emea`, `apac`]. (by default all region)
*  season: `Number`, starting from `6`. (by default `-1` which is most recent season)

Seasons reference:
```js
const SEASONS = {
  6: 'Health', 7: 'Blood Orchid', 8: 'White Noise',
  9: 'Chimera', 10: 'Para Bellum', 11: 'Grim Sky',
  12: 'Wind Bastion', 13: 'Burnt Horizon', 14: 'Phantom Sight'
};
```

```js
let getRank = await r6.getRank('pc', '0b95544b-0228-49a7-b338-6d15cfbc3d6a', { regions: ['emea'] });
```

```js
[  
  {  
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    season: 13,
    seasonName: 'Burnt Horizon',
    regions: {  
      emea: {  
        region: 'emea',
        skillMean: 36.5987582848,
        skillStdev: 3.50964840398,
        current: {  
          name: 'Platinum 3',
          id: 17,
          mmr: 3659.87582848,
          image: 'https://i.imgur.com/6AE1DeN.png'
        },
        max: {  
          name: 'Platinum 1',
          id: 19,
          mmr: 4169.99011335,
          image: 'https://i.imgur.com/vM99U2X.png'
        },
        previousMmr: 3300,
        nextMmr: 3700,
        wins: 105,
        losses: 95,
        abandons: 1,
        pastSeasonsAbandons: 5,
        updateTime: '2019-05-31T05:19:15.478000+00:00'
      }
    }
  }
]
```
---

*    getStats(platform: `String`, id: `String` if < 1, `Array` if several, raw: `Boolean`) : `Promise` with `Array` Return

Get general stats for player.

```js
let getStats = await r6.getStats('pc', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```
```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    raw: undefined,
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
#### [Full response](https://gist.github.com/danielwerg/697b0f2a2148f9adceec563314c77d08)
---

*   #### getStatus() : `Promise` with `Object` Return

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
