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
* [GitHub](https://github.com/danielwerg/r6api.js)
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

* Go to [temp-mail.org](https://temp-mail.org)
* Copy your temporal email
* Go to [account.ubisoft.com/en-us/login](https://account.ubisoft.com/en-us/login)
* Provide all details there and remember your email and password

## Example

<!-- START:EXAMPLE -->
```js
require('dotenv').config();
const R6API = require('r6api.js').default;

// // Or ES6 way
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

  const { 0: player } = await r6api.findByUsername(platform, username);
  if (!player) return 'Player not found';

  const { 0: stats } = await r6api.getStats(platform, player.id);
  if (!stats) return 'Stats not found';
  const { pvp: { general } } = stats;

  return `${username} has played ${general.matches} matches.`;

};

```
<!-- END:EXAMPLE -->

<!-- START:EXAMPLE_OUTPUT -->
```
Daniel.Nt has played 5005 matches.
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
<!-- END:FINDBYUSERNAME_OUTPUT -->

---

### findById

Find player by their id.

(platform | 'all', id/s, options) => `Promise<Array>`

```js
await r6api.findById('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- START:FINDBYID_OUTPUT -->
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
<!-- END:FINDBYID_OUTPUT -->

---

### getProgression

Get level, xp and alpha pack drop chance for a player.

(platform, id/s) => `Promise<Array>`

```js
await r6api.getProgression('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- START:GETPROGRESSION_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    level: 293,
    xp: 98696,
    lootboxProbability: {
      raw: 230,
      percent: '2.30%'
    }
  }
]
```

</details>
<!-- END:GETPROGRESSION_OUTPUT -->

---

### getPlaytime

Get playtime for a player.

(platform, id/s) => `Promise<Array>`

```js
await r6api.getPlaytime('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a');
```

<!-- START:GETPLAYTIME_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    pvp: {
      general: 5809265,
      ranked: 5173666,
      casual: 590088,
      custom: 974,
      other: 44537
    },
    pve: {
      general: 281436
    }
  }
]
```

</details>
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

| Shorthand | Meaning                          |
| --------- | -------------------------------- |
| `emea`    | Europe, Middle East and Africa   |
| `ncsa`    | North, Central and South America |
| `apac`    | Asia Pacific                     |

```js
await r6api.getRanks('uplay', '0b95544b-0228-49a7-b338-6d15cfbc3d6a', { regions: 'emea' });
```

<!-- START:GETRANKS_OUTPUT -->
<details>
<summary>Output</summary>

```js
[
  {
    id: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    seasons: {
      '19': {
        name: 'Shadow Legacy',
        color: '#6ca511',
        image: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5H87SAzADrzRmroVnJzuUE/2e73c489074b538055df0f793b4e1639/r6s-seasons-y5s3.jpg',
        regions: {
          emea: {
            name: 'Europe, Middle East and Africa',
            skillMean: 30.9286132404,
            skillStdev: 7.5235183431,
            current: {
              id: 0,
              name: 'Unranked',
              mmr: 3093,
              icon: 'https://github.com/danielwerg/r6api.js/raw/typescript/assets/ranks/ranks/0.png'
            },
            max: {
              id: 0,
              name: 'Unranked',
              mmr: 0,
              icon: 'https://github.com/danielwerg/r6api.js/raw/typescript/assets/ranks/ranks/0.png'
            },
            lastMatch: {
              won: false,
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
]
```

</details>
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

<!-- START:GETSTATUS_OUTPUT -->
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
    appId: '',
    name: 'Rainbow Six Siege - PS5 - LIVE',
    spaceId: '',
    mdm: '25365',
    category: 'Instance',
    platform: 'PS5',
    status: 'Online',
    maintenance: null,
    impactedFeatures: []
  },
  {
    appId: '',
    name: 'Rainbow Six Siege - XBOX SERIES X - LIVE',
    spaceId: '',
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
<details>
<summary>Output</summary>

```js
{
  total: 1081,
  limit: 1,
  categories: 'all',
  media: 'all',
  skip: 0,
  startIndex: 0,
  placement: '',
  tags: 'BR-rainbow-six GA-siege',
  items: [
    {
      id: '1YPQ5yw9TaRhQwghjStqn2',
      title: 'Top Issues and Community Concerns',
      abstract: 'We will be updating the following list regularly to outline the status of certain issues that are currently pressing for our community.',
      thumbnail: {
        url: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3Igh9risyDOnxa8nmFKVPW/5fd6b25a6ed43d5b361c736e75fc280f/topissues_349922.png',
        description: null
      },
      content: '__Updated: October 2nd 2020__\n\nWe will be updating the following list regularly to outline the status of certain issues that are currently pressing for our community. Please note that this list is not exhaustive, and should only be used as a reference to give a general idea of where our focus currently is.\n\n# Top Issues\n\n## Map Ban System\n\n### Random selection\n\n__Description:__ We are currently investigating an issue with the random selection of the two remaining maps during the map ban flow.\n\nWe have verified that the map on the left of the interface is always selected. We have already started working on a fix.\n\n__Status: During Y5S3__\n\n### Map pool representation\n\n__Description:__ The representation of maps during the map ban flow favors the presence of certain maps (~10%): Oregon, Coastline, Kanal, Villa, Kafe, and Consulate at the expense of the following ones (~6%): Chalet, Theme Park, Bank, Club House, Border, Outback. We aim to deliver a fix to even the odds and have a more balanced map representation.\n\n__Status: Target Y5S3.2 __\n\n## Inverted Audio \n\n__Description:__ Following the Y5S3.1 update on PC, our teams can no longer reproduce the inverted audio issues. Our latest patch notes mentions a fix for sound effects going missing after using a drone. We believe that the inverted audio was linked to this issue and that both are now fixed.\n\n__Status: Fixed (Y5S3.1)__\n\n## Player Behavior\n\n### Mouse & Keyboard on Consoles\n\n__Description:__ We continue our investigation on the topic, we are currently gathering information as well as technical data to gauge how widespread these adapters are and if we can detect them in a reliable manner.\n\n__Status: Ongoing__\n\n### DDoS on consoles\n\n__Description:__ We are working on mitigation plans with our partners and we are continuously monitoring the situation. We have also recently started to issue sanctions to users responsible for such attacks.\n\n__Status: Ongoing__\n\n### Cheating & Hacking\n\n__Description:__ As we stated in our [Anti-Cheat DevBlog](https://rainbow6.com/anticheatblog), this will be a continuous initiative.\nWe are always striving to improve on our detections and are hard at work on developing more reactive sanctions to keep R6 as fair as possible.\n\nWe started using a new identification method and proceeded to issue ban waves based on those results.\n\nIn the last month we sanctioned around 4000 players ranging from blatant cheaters to closet cheaters.\n\n__Status: Ongoing__\n\n### BattlEye Ticker\n\n__Description:__ The system displaying sanctions being applied to cheaters and toxic users is currently disabled. We are working on a fix and we hope to reactivate it soon.\n\n__Status: Y5S3.2 (PC) / Y5S3.3 (Consoles)__ \n\n# Top Gameplay Topics\n\n## Balancing\n\n### Yellow Ping\n\n__Description:__ We have received extensive feedback about the Yellow Ping feature and we know that it is perceived as strong in certain levels of play when coupled with observation tools. We would like to explore alternatives to make the feature more acceptable for everyone. We are ready to add the Yellow Ping to the in-game replays, in order for everyone to understand that your position was known to the enemy team via this system. We are also exploring additional solutions to try to make the feature feel less one-sided.\n\n__Status: Y5S3.2 on PC / Y5S3.3 on console__\n\n### Blurry Holographic Sight \n\n__Description:__ With Y5S3 we moved away from sights being represented as part of the weapon model. It is now part of the HUD in order to allow for more customization as we described it in the [Weapon Optics blog](https://rainbow6.com/optics).\n\nThis led to having a significantly blurrier Holo sight in certain combinations of aspect ratios, resolution, and anti-aliasing. We are working on the rendering of the sight and hope to offer something closer to what was prior to Shadow Legacy.\n\n__Status: Y5S3.2__\n\n## Runouts\n\n__Description:__ We would like to move away from the timer to replace it with a gauge system, which is more accurate visually speaking.\n\nWe are also looking at potentially tweaking the duration of time of an undetected run-out, but we are still debating the option. \n\n__Status: Target Y5S4__\n\n## Improved Flash detection/consistency\n\n__Description:__ The rework intends to make flash detection more reliable. Enemies are often not affected by flashes due to objects and obstacles. We want to simulate the light ricocheting with the environment, to improve the effectiveness of flashbangs & other similar gadgets. We have recently made some progress on that front. However, it may require additional work.\n\n__Status: Target Y5S4.3 or later__\n\n## Defuser planting detection improvements\n\n__Description:__ Interactions with the defuser could often lead to some issues. In Y5S4 we’ll address the following ones:\n\n- Defuser plant prompt is sometimes missing when the player is on site\n- Defusers can be planted outside of the site when the players sits on the edge of the area.\n- Players could drop the defuser when attempting to plant.\nWhen trying to plant with 0:00 secs left, you may continue to drop the defuser, but this is not considered a bug as the Attackers have simply ran out of time.\n\n__Status: Target Y5S4__\n\n## Defuser retrieval improvements\n\n__Description:__ It is possible to drop the defuser in locations where it cannot be picked up again by running over it. Often outside of the map, in cracks, gaps between objects, holes, etc.\n\nTo fix this, we created a \'Pickup Defuser\' interaction that works at a distance. It will aim for defuser retrieval to act like picking up any other gadget.\n\n__Status: Target Y5S3.3__\n',
      description: null,
      categories: [
        'news',
        'rainbow-six',
        'rainbow-six-siege',
        'patch-notes'
      ],
      tag: 'BR-rainbow-six GA-siege',
      placement: [
        'featured-news-article-emea'
      ],
      type: 'news',
      readTime: '5',
      url: 'https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates/1YPQ5yw9TaRhQwghjStqn2/top-issues-and-community-concerns',
      date: '2020-10-02T16:00:00.000Z'
    }
  ]
}
```

</details>
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
<details>
<summary>Output</summary>

```js
{
  total: 1080,
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
    description: null,
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