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

<!-- example-start -->
```js
require('dotenv').config();
const R6API = require('r6api.js').default;

// Or ES6 way
// import { config } from 'dotenv';
// config();
// import R6API from 'r6api.js';

const r6api = new R6API({
  email: process.env.UBI_EMAIL,
  password: process.env.UBI_PASSWORD
});

// export default async () => { // ES6
module.exports = async () => {

  const username = 'Daniel.Nt';
  const platform = 'uplay';

  const { 0: { id } } = await r6api.findByUsername(platform, username);
  const { 0: { pvp: { general } } } = await r6api.getStats(platform, id);

  return `${username} has played ${general.matches} matches.`;

};

```
<!-- example-end -->

<!-- exampleOutput-start -->
```
Daniel.Nt has played 4801 matches.
```
<!-- exampleOutput-end -->

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

<!-- findByUsername-start -->
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
      small: 'https://ubisoft-avatars.akamaized.net/0b95544b-0228-49a7-b338-6d15cfbc3d6a/default_146_146.png',
      medium: 'https://ubisoft-avatars.akamaized.net/0b95544b-0228-49a7-b338-6d15cfbc3d6a/default_256_256.png'
    }
  }
]
```

</details>
<!-- findByUsername-end -->

---

### findById

Find player by their id.

(platform | 'all', id/s, options) => `Promise<Array>`

```js
await r6api.findById('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- findById-start -->
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
      small: 'https://ubisoft-avatars.akamaized.net/0b95544b-0228-49a7-b338-6d15cfbc3d6a/default_146_146.png',
      medium: 'https://ubisoft-avatars.akamaized.net/0b95544b-0228-49a7-b338-6d15cfbc3d6a/default_256_256.png'
    }
  }
]
```

</details>
<!-- findById-end -->

---

### getProgression

Get level, xp and alpha pack drop chance for a player.

(platform, id/s) => `Promise<Array>`

```js
await r6api.getProgression('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- getProgression-start -->
<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    level: 283,
    xp: 51033,
    lootboxProbability: {
      raw: 230,
      percent: '2.30%'
    }
  }
]
```

</details>
<!-- getProgression-end -->

---

### getPlaytime

Get playtime for a player.

(platform, id/s) => `Promise<Array>`

```js
await r6api.getPlaytime('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- getPlaytime-start -->
<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    general: 5426599,
    ranked: 4864274,
    casual: 529000,
    other: 33325
  }
]
```

</details>
<!-- getPlaytime-end -->

---

### getRanks

Get seasonal stats for a player.

(platform, id/s, options) => `Promise<Array>`

#### Options

| Param   | Type                          | Required | Default                    | Description                      |
| ------- | ----------------------------- | -------- | -------------------------- | -------------------------------- |
| seasons | `number \| number[] \| 'all'` | false    | `-1`                       | Numbers from `6` to `18` or `-1` |
| regions | `string \| string[]`          | false    | `['emea', 'ncsa', 'apac']` |                                  |

#### Seasons reference

| ID   | Name           | ● | ID   | Name          | ● | ID   | Name           |
| ---- | -------------- | - | ---- | ------------- | - | ---- | -------------- |
| `-1` | Current Season |   | `10` | Para Bellum   |   | `15` | Ember Rise     |
| `6`  | Health         |   | `11` | Grim Sky      |   | `16` | Shifting Tides |
| `7`  | Blood Orchid   |   | `12` | Wind Bastion  |   | `17` | Void Edge      |
| `8`  | White Noise    |   | `13` | Burnt Horizon |   | `18` | Steel Wave     |
| `9`  | Chimera        |   | `14` | Phantom Sight |   |      |                |

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

<!-- getRanks-start -->
<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    seasons: {
      '17': {
        id: 17,
        name: 'Void Edge',
        color: '#946a97',
        image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/2584xuwMoCH1FJc9n34jLo/9dfec73fd217a889a7bfe66e1f412cd6/r6s-seasons-y5s1.jpg',
        regions: {
          emea: {
            name: 'emea',
            skillMean: 36.7168182685,
            skillStdev: 5.4462346375,
            current: {
              id: 20,
              name: 'Platinum 2',
              mmr: 3671,
              icon: 'https://i.imgur.com/TOzOI69.png'
            },
            max: {
              id: 20,
              name: 'Platinum 2',
              mmr: 3727,
              icon: 'https://i.imgur.com/TOzOI69.png'
            },
            lastMatch: {
              won: false,
              mmrChange: -56,
              skillMeanChange: -0.5534372288,
              skillStdevChange: -0.0285959025
            },
            previousMmr: 3600,
            nextMmr: 4000,
            topRankPosition: 0,
            kills: 249,
            deaths: 245,
            kd: 1.02,
            wins: 29,
            losses: 21,
            winRate: '58.00%',
            matches: 50,
            abandons: 0,
            updateTime: '2020-04-22T13:20:09.022000+00:00'
          }
        }
      }
    }
  }
]
```

</details>
<!-- getRanks-end -->

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

[**Full response**](./data/methods/getStats.json)

---

### getStatus

Get Rainbow Six: Siege servers status.

() => `Promise<Array>`

```js
await r6api.getStatus();
```

<!-- getStatus-start -->
<details>
<summary>Output</summary>

```js
[
  {
    appId: 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40',
    name: 'Rainbow Six Siege - PC - LIVE',
    spaceId: '5172a557-50b5-4665-b7db-e3f2e8c5041d',
    mdm: '4073',
    category: 'Instance',
    platform: 'PC',
    status: 'Online',
    maintenance: null
  },
  {
    appId: 'fb4cc4c9-2063-461d-a1e8-84a7d36525fc',
    name: 'Rainbow Six Siege - PS4 - LIVE',
    spaceId: '05bfb3f7-6c21-4c42-be1f-97a33fb5cf66',
    mdm: '14922',
    category: 'Instance',
    platform: 'PS4',
    status: 'Online',
    maintenance: null
  },
  {
    appId: '4008612d-3baf-49e4-957a-33066726a7bc',
    name: 'Rainbow Six Siege - XBOXONE - LIVE',
    spaceId: '98a601e5-ca91-4440-b1c5-753f601a2c90',
    mdm: '4075',
    category: 'Instance',
    platform: 'XBOXONE',
    status: 'Online',
    maintenance: null
  },
  {
    appId: '8956241d-236d-4dbd-9e1e-bf6ed133773a',
    name: 'Rainbow Six Siege - China - PC - LIVE',
    spaceId: 'f4a93aa0-e9a9-4b2a-918b-6995a82b8e9b',
    mdm: '23702',
    category: 'Instance',
    platform: 'PC',
    status: 'Online',
    maintenance: null
  }
]
```

</details>
<!-- getStatus-end -->

---

### getNews

Get Rainbow Six: Siege News.

(options) => `Promise<Object>`

#### Options

| Param          | Type      | Required | Default   | Description                                  |
| -------------- | --------- | -------- | --------- | -------------------------------------------- |
| raw            | `boolean` | false    | `false`   | Include raw API response                     |
| category       | `string`  | false    | `'all'`   | all, game-updates, esports, community, store |
| filter         | `string`  | false    | `'all'`   | all, news, videos                            |
| limit          | `number`  | false    | `6`       |                                              |
| skip           | `number`  | false    | `0`       |                                              |
| startIndex     | `number`  | false    | `0`       |                                              |
| locale         | `string`  | false    | `'en-us'` |                                              |
| fallbackLocale | `string`  | false    | `'en-us'` |                                              |

```js
await r6api.getNews({ limit: 1 });
```

<!-- getNews-start -->
<details>
<summary>Output</summary>

```js
{
  total: 1085,
  limit: 1,
  categories: 'all',
  media: 'all',
  skip: 0,
  startIndex: 0,
  placement: '',
  tags: 'BR-rainbow-six GA-siege',
  items: [
    {
      id: 'wGEvGabrPvs',
      title: 'Rainbow Six Siege: 5 Quick Tips From King George | Ubisoft',
      abstract: undefined,
      thumbnail: {
        url: 'https://i.ytimg.com/vi/wGEvGabrPvs/maxresdefault.jpg',
        description: 'Rainbow Six Siege: 5 Quick Tips From King George | Ubisoft'
      },
      content: '[video](https://www.youtube.com/embed/wGEvGabrPvs)',
      description: 'Former professional player and current content creator, King George, has five quick tips for Rainbow Six Siege Operation Steel Wave. Learn a great spot to place Melusi\'s Banshee on the House map rework. Get an idea of how a high level player uses Proximity Alarms. Bypass Mute Jammers with Ace\'s gadget, and more.\n\n#R6S\n\nPlease SUBSCRIBE: http://bit.ly/UbisoftYouTubeChannel\n \nVisit our official channels to stay up to date with Rainbow Six Siege:\nhttps://rainbow6.ubisoft.com/\nhttps://www.facebook.com/rainbow6usa/\nhttps://www.instagram.com/rainbow6gam...\nhttps://twitter.com/Rainbow6Game\nhttps://www.youtube.com/UbisoftNA\n \nDiscover all our Rainbow Six products and exclusive items on the Ubisoft Store: https://ubi.li/DZNaP\n \nABOUT RAINBOW SIX SIEGE:\nRainbow Six Siege is an exciting, new approach to the first-person shooter experience that puts tactical combat and masterful destruction at the center of the action. Lead your team of unique, counter-terrorist Rainbow operators through tense and thrilling combat scenarios, and achieve victory through smart preparation and strategic improvisation. Rainbow Six Siege is available now on Xbox One, PlayStation® 4 and PC.\n  \n KEY FEATURES:\n  \n -THE RULES OF SIEGE: Five versus Five. Attack versus Defend. Infiltrate versus Fortify. Team-based strategy meets intense, tactical combat.\n -WORLD\'S ELITE COUNTER-TERRORIST OPERATORS: Choose your Operator and wield their unique ability to breach or defend the objective as a part of an elite team.\n -DESTRUCTION AS A TOOL: Walls can be shattered; floors and ceilings can be breached. Mastering the tactical use of destruction is the key to victory.\n -CLOSE-QUARTERS COMBAT: With tight spaces shaping all combat arenas, tense encounters and up-close-and-personal firefights abound within every Siege.\n\nABOUT UBISOFT:\nUbisoft is a creator of worlds, committed to enriching players\' lives with original and memorable gaming experiences. Our rich portfolio of world-renowned brands includes: Assassin’s Creed, Far Cry, For Honor, Just Dance, Watch Dogs, Tom Clancy’s video game series including Ghost Recon, Rainbow Six and The Division.  We are dedicated to delivering original and memorable gaming experiences across all popular platforms, including consoles, mobile phones, tablets and PCs. To learn more, please visit www.ubisoft.com.\n \n© 2020 Ubisoft Entertainment. All Rights Reserved. Ubisoft, and the Ubisoft logo are registered or unregistered trademarks of Ubisoft Entertainment in the US and/or other countries.\n\nRainbow Six Siege: 5 Quick Tips From King George | Ubisoft [NA]\nhttp://www.youtube.com/UbisoftNA',
      categories: [
        'videos'
      ],
      tag: undefined,
      placement: undefined,
      type: 'videos',
      readTime: undefined,
      url: 'https://www.youtube.com/watch?v=wGEvGabrPvs',
      date: '2020-05-28T13:26:12.000Z'
    }
  ]
}
```

</details>
<!-- getNews-end -->

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

<!-- getNewsById-start -->
<details>
<summary>Output</summary>

```js
{
  total: 1085,
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
      'game-updates',
      'news',
      'rainbow-six',
      'rainbow-six-siege'
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
<!-- getNewsById-end -->

---

### custom

Useful if you're familiar with Rainbow Six Siege's API; this method will make a request to a custom URL you would provide with the token in the header.

(url: `string`, params: `any`) => `Promise<T>`

```js
await r6api.custom(
  r6api.utils.URLS.STATS(
    'uplay', ['0b95544b-0228-49a7-b338-6d15cfbc3d6a'],
    'operatorpvp_clash_sloweddown'
  )
);
```

<!-- custom-start -->
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
<!-- custom-end -->

---

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

Operator icons from [r6operators.marcopixel.eu](https://r6operators.marcopixel.eu)