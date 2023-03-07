<div align="center">
  <img src="https://i.imgur.com/Tet0qAn.png" alt="R6API.js logo" />
  <p>
    <a href="https://github.com/danielwerg/r6api.js/blob/master/license"><img
      src="https://img.shields.io/github/license/danielwerg/r6api.js?style=for-the-badge"
      alt="License"
    /></a>
    <a href="https://github.com/danielwerg/r6api.js/releases/latest"><img
      src="https://img.shields.io/github/v/release/danielwerg/r6api.js?style=for-the-badge&label=version"
      alt="Version"
    /></a>
    <a href="https://github.com/danielwerg/r6api.js/releases/latest"><img
      src="https://img.shields.io/github/release-date/danielwerg/r6api.js?style=for-the-badge&label=latest%20release"
      alt="Latest release"
    /></a>
    <a href="https://www.npmjs.com/package/r6api.js"><img
      src="https://img.shields.io/npm/dw/r6api.js?style=for-the-badge"
      alt="NPM weakly downloads"
    /></a>
    <a href="https://discord.gg/hshRpWk"><img
      src="https://img.shields.io/discord/612212753498767360?style=for-the-badge&label=discord&color=5865F2"
      alt="Discord guild"
    /></a>
  </p>
  <p>
    <a href="https://github.com/danielwerg/r6api.js"><img
      src="https://img.shields.io/static/v1?style=flat-square&logo=github&label=GitHub&message=%20&color=gray"
      alt="GitHub"
    /></a>
    <a href="https://www.npmjs.com/package/r6api.js"><img
      src="https://img.shields.io/static/v1?style=flat-square&logo=npm&label=NPM&message=%20&color=gray"
      alt="NPM"
    /></a>
    <a href="https://yarnpkg.com/package/r6api.js"><img
      src="https://img.shields.io/static/v1?style=flat-square&logo=yarn&label=Yarn&message=%20&color=gray"
      alt="Yarn"
    /></a>
    <a href="https://github.com/danielwerg/r6api.js/releases"><img
      src="https://img.shields.io/static/v1?style=flat-square&logo=github&label=Releases&message=%20&color=gray"
      alt="Releases"
    /></a>
    <a href="https://github.com/danielwerg/r6api.js/blob/master/changelog.md"><img
      src="https://img.shields.io/static/v1?style=flat-square&logo=github&label=Changelog&message=%20&color=gray"
      alt="Changelog"
    /></a>
  </p>
</div>

## 📖 Table of Contents

- [💾 Installation](#-installation)
- [🍴 Initialization](#-initialization)
- [👀 Example](#-example)
- [🧩 API](#-api)
- [🔌 Custom methods](#-custom-methods)
- [💌 Acknowledgments](#-acknowledgments)

## 💾 Installation

```sh
yarn add r6api.js
```

or

```sh
npm install r6api.js
```

## 🍴 Initialization

To setup this package, you need to provide Ubisoft account credentials (email and password). Credentials should be handled as you would handle any other secure value, it is recommended to use [dotenv](https://github.com/motdotla/dotenv) package to load environment variables from a `.env`.

**Do not** use your real Ubisoft account. It is highly recommended to create a new account for using this package. Visit [account.ubisoft.com/login](https://account.ubisoft.com/login) to create new account.

## 👀 Example

```ts
import R6API from 'r6api.js';

const { email = '', password = '' } = process.env;
const r6api = new R6API({ email, password });

const user = await r6api
  .findUserByUsername({ platform: 'uplay', usernames: ['Daniel.Nt'] })
  .catch(console.error);

if (!user) console.log('User not found');
else console.log(user);
```

## 🧩 API

### Table of Contents

- [References](#References)
- [constructor](#constructor)
- [findUserByUsername](#findUserByUsername)
- [findUserById](#findUserById)
- [getUserProgression](#getUserProgression)
- [getUserSeasonal](#getUserSeasonal)
- [getUserSeasonalv2](#getUserSeasonalv2)
- [getUserStats](#getUserStats)
- [getUserStatus](#getUserStatus)
- [getUserApplications](#getUserApplications)
- [getUserGamesPlayed](#getUserGamesPlayed)
- [getApplications](#getApplications)
- [getServiceStatus](#getServiceStatus)
- [getNews](#getNews)
- [getNewsById](#getNewsById)

### References

#### Services

<!-- prettier-ignore-start -->
<!-- SERVICES:START -->

`uplay`, `xbl`, `psn`

<!-- SERVICES:END -->
<!-- prettier-ignore-end-->

#### Services Extended

<!-- prettier-ignore-start -->
<!-- SERVICES_EXTENDED:START -->

`uplay`, `xbl`, `psn`, `steam`, `epic`, `amazon`, `amazonstream`, `googlestream`, `switch`, `ubimobile`, `wiiu`, `apple`

<!-- SERVICES_EXTENDED:END -->
<!-- prettier-ignore-end-->

#### Services and Crossplay

<!-- prettier-ignore-start -->
<!-- SERVICES_AND_CROSSPLAY:START -->

`uplay`, `xbl`, `psn`, `crossplay`

<!-- SERVICES_AND_CROSSPLAY:END -->
<!-- prettier-ignore-end-->

#### Platforms

<!-- prettier-ignore-start -->
<!-- PLATFORMS:START -->

`pc`, `xone`, `ps4`

<!-- PLATFORMS:END -->
<!-- prettier-ignore-end-->

#### Platform Families

<!-- prettier-ignore-start -->
<!-- PLATFORM_FAMILIES:START -->

`pc`, `console`

<!-- PLATFORM_FAMILIES:END -->
<!-- prettier-ignore-end-->

### constructor

#### Options

<!-- prettier-ignore-start -->
<!-- R6API_OPTIONS:START -->

| Parameter    | Type     | Required | Default                                  | Description                                                                                                      |
| ------------ | -------- | -------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| email        | `string` | ✖        | `undefined`                              | Ubisoft account's email                                                                                          |
| password     | `string` | ✖        | `undefined`                              | Ubisoft account's password                                                                                       |
| ubiAppId     | `string` | ✖        | `'3587dcbb-7f81-457c-9781-0e3f29f6f56a'` | `Ubi-AppId` header for every request                                                                             |
| profileId    | `string` | ✖        | `undefined`                              | Will be used in auth file name                                                                                   |
| authDirPath  | `string` | ✖        | `node:os.tmpdir()`                       | Directory where auth is stored                                                                                   |
| authFileName | `string` | ✖        | `'r6api.js-auth'`                        | Name for auth file without extension, if `profileId` paremeter provided appends `-${profileId}`                  |
| authFilePath | `string` | ✖        | `undefined`                              | Overrides `authDirPath` and `authFileName` parameters, if `profileId` paremeter provided appends `-${profileId}` |

<!-- R6API_OPTIONS:END -->
<!-- prettier-ignore-end-->

---

### findUserByUsername

Find user by their username.

#### Options

<!-- prettier-ignore-start -->
<!-- FINDUSERBYUSERNAME_OPTIONS:START -->

| Parameter | Type              | Required | Default | Description                    |
| --------- | ----------------- | -------- | ------- | ------------------------------ |
| platform  | `ServiceExtended` | ✔        |         | [Reference](#Platforms-Search) |
| usernames | `string[]`        | ✔        |         | Usernames (50 max)             |

<!-- FINDUSERBYUSERNAME_OPTIONS:END -->
<!-- prettier-ignore-end-->

```ts
await r6api.findUserByUsername({ platform: 'uplay', usernames: ['Daniel.Nt'] });
```

<!-- prettier-ignore-start -->
<!-- FINDUSERBYUSERNAME_OUTPUT:START -->

<details>
<summary>Output</summary>

```ts
[
  {
    profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    userId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    idOnPlatform: '0B95544B-0228-49A7-B338-6D15CFBC3D6A',
    username: 'Daniel.Nt',
    platform: 'uplay',
    avatars: {
      '146': 'https://ubisoft-avatars.akamaized.net/0b95544b-0228-49a7-b338-6d15cfbc3d6a/default_146_146.png',
      '256': 'https://ubisoft-avatars.akamaized.net/0b95544b-0228-49a7-b338-6d15cfbc3d6a/default_256_256.png',
      '500': 'https://ubisoft-avatars.akamaized.net/0b95544b-0228-49a7-b338-6d15cfbc3d6a/default_tall.png'
    }
  }
]
```

</details>

<!-- FINDUSERBYUSERNAME_OUTPUT:END -->
<!-- prettier-ignore-end-->

---

### findUserById

Find user by their `profileId` or `userId` or `idOnPlatform`.

#### Options

<!-- prettier-ignore-start -->
<!-- FINDUSERBYID_OPTIONS:START -->

| Parameter | Type                       | Required | Default | Description                                                                          |
| --------- | -------------------------- | -------- | ------- | ------------------------------------------------------------------------------------ |
| platform  | `ServiceExtended \| 'all'` | ✔        |         | [Reference](#Platforms-Search)                                                       |
| ids       | `string[]`                 | ✔        |         | `profileIds` or `idOnPlatforms` or `userId` if `isUserId` parameter is true (50 max) |
| isUserIds | `boolean`                  | ✖        | `false` | Whether `ids` are userIds                                                            |

<!-- FINDUSERBYID_OPTIONS:END -->
<!-- prettier-ignore-end-->

```ts
await r6api.findUserById({
  platform: 'uplay',
  ids: ['0b95544b-0228-49a7-b338-6d15cfbc3d6a']
});
```

<!-- prettier-ignore-start -->
<!-- FINDUSERBYID_OUTPUT:START -->

<details>
<summary>Output</summary>

```ts
[
  {
    profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    userId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    idOnPlatform: '0B95544B-0228-49A7-B338-6D15CFBC3D6A',
    username: 'Daniel.Nt',
    platform: 'uplay',
    avatars: {
      '146': 'https://ubisoft-avatars.akamaized.net/0b95544b-0228-49a7-b338-6d15cfbc3d6a/default_146_146.png',
      '256': 'https://ubisoft-avatars.akamaized.net/0b95544b-0228-49a7-b338-6d15cfbc3d6a/default_256_256.png',
      '500': 'https://ubisoft-avatars.akamaized.net/0b95544b-0228-49a7-b338-6d15cfbc3d6a/default_tall.png'
    }
  }
]
```

</details>

<!-- FINDUSERBYID_OUTPUT:END -->
<!-- prettier-ignore-end-->

---

### getUserProgression

Get user progression (level, xp and alpha pack drop chance).

#### Options

<!-- prettier-ignore-start -->
<!-- GETUSERPROGRESSION_OPTIONS:START -->

| Parameter    | Type                                  | Required | Default                                                                                                                                                                                          | Description                           |
| ------------ | ------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| platform     | `ServiceAndCrossplay`                 | ✔        |                                                                                                                                                                                                  | [Reference](#Platforms-And-CrossPlay) |
| profileIds   | `string[]`                            | ✔        |                                                                                                                                                                                                  | `profileIds` (200 max)                |
| spacesIds    | `Record<ServiceAndCrossplay, string>` | ✖        | `{ uplay: '5172a557-50b5-4665-b7db-e3f2e8c5041d', psn: '05bfb3f7-6c21-4c42-be1f-97a33fb5cf66', xbl: '98a601e5-ca91-4440-b1c5-753f601a2c90', crossplay: '0d2ae42d-4c27-4cb7-af6c-2099062302bb' }` |                                       |
| sandboxesIds | `Record<ServiceAndCrossplay, string>` | ✖        | `{ uplay: 'OSBOR_PC_LNCH_A', psn: 'OSBOR_PS4_LNCH_A', xbl: 'OSBOR_XBOXONE_LNCH_A', crossplay: 'OSBOR_XPLAY_LNCH_A' }`                                                                            |                                       |

<!-- GETUSERPROGRESSION_OPTIONS:END -->
<!-- prettier-ignore-end-->

```ts
await r6api.getUserProgression({
  platform: 'uplay',
  profileIds: ['0b95544b-0228-49a7-b338-6d15cfbc3d6a']
});
```

<!-- prettier-ignore-start -->
<!-- GETUSERPROGRESSION_OUTPUT:START -->

<details>
<summary>Output</summary>

```ts
[
  {
    profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    level: 347,
    xp: 62368,
    lootboxProbability: { raw: 3000, percent: '30.00%' }
  }
]
```

</details>

<!-- GETUSERPROGRESSION_OUTPUT:END -->
<!-- prettier-ignore-end-->

---

### getUserSeasonal

Get user seasonal stats.

#### Options

<!-- prettier-ignore-start -->
<!-- GETUSERSEASONAL_OPTIONS:START -->

| Parameter      | Type                                  | Required | Default                                                                                                                                                                                          | Description                                                                                  |
| -------------- | ------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| platform       | `ServiceAndCrossplay`                 | ✔        |                                                                                                                                                                                                  | [Reference](#Platforms-And-CrossPlay)                                                        |
| profileIds     | `string[]`                            | ✔        |                                                                                                                                                                                                  | `profileIds` (200 max)                                                                       |
| seasonIds      | `number[]`                            | ✖        | `[-1]`                                                                                                                                                                                           | Numbers from `1`\*¹ to `27` it's crossplay, then from `28` to `28`, `-1` or `'all'`          |
| regionSlugs    | `string \| string[]`                  | ✖        | `'global'\*²`                                                                                                                                                                                    | `('emea' \| 'ncsa' \| 'apac')[] \| 'global' \| 'all'`                                        |
| boardLongSlugs | `string[]`                            | ✖        | `['pvp_ranked']`                                                                                                                                                                                 | `('pvp_ranked' \| 'pvp_casual' \| 'pvp_event' \| 'pvp_newcomer' \| 'pvp_warmup')[] \| 'all'` |
| spacesIds      | `Record<ServiceAndCrossplay, string>` | ✖        | `{ uplay: '5172a557-50b5-4665-b7db-e3f2e8c5041d', psn: '05bfb3f7-6c21-4c42-be1f-97a33fb5cf66', xbl: '98a601e5-ca91-4440-b1c5-753f601a2c90', crossplay: '0d2ae42d-4c27-4cb7-af6c-2099062302bb' }` |                                                                                              |
| sandboxesIds   | `Record<ServiceAndCrossplay, string>` | ✖        | `{ uplay: 'OSBOR_PC_LNCH_A', psn: 'OSBOR_PS4_LNCH_A', xbl: 'OSBOR_XBOXONE_LNCH_A', crossplay: 'OSBOR_XPLAY_LNCH_A' }`                                                                            |                                                                                              |

<!-- GETUSERSEASONAL_OPTIONS:END -->
<!-- prettier-ignore-end-->

> \*¹ Seasons with id `1..5` will _not_ return any meangfull data

> \*² `'global'` will be replaced with `['emea', 'ncsa', 'apac']` when season id <= `17` (Void Edge)

##### Seasons reference

<!-- prettier-ignore-start -->
<!-- SEASONS_SHORT:START -->

| ID   | Name          | ·   | ID   | Name           |
| ---- | ------------- | --- | ---- | -------------- |
| `1`  | Black Ice     |     | `15` | Ember Rise     |
| `2`  | Dust Line     |     | `16` | Shifting Tides |
| `3`  | Skull Rain    |     | `17` | Void Edge      |
| `4`  | Red Crow      |     | `18` | Steel Wave     |
| `5`  | Velvet Shell  |     | `19` | Shadow Legacy  |
| `6`  | Health        |     | `20` | Neon Dawn      |
| `7`  | Blood Orchid  |     | `21` | Crimson Heist  |
| `8`  | White Noise   |     | `22` | North Star     |
| `9`  | Chimera       |     | `23` | Crystal Guard  |
| `10` | Para Bellum   |     | `24` | High Calibre   |
| `11` | Grim Sky      |     | `25` | Demon Veil     |
| `12` | Wind Bastion  |     | `26` | Vector Glare   |
| `13` | Burnt Horizon |     | `27` | Brutal Swarm   |
| `14` | Phantom Sight |     | `28` | Solar Raid     |

<!-- SEASONS_SHORT:END -->
<!-- prettier-ignore-end-->

##### Regions reference

<!-- prettier-ignore-start -->
<!-- REGIONS:START -->

| ID       | Name                             |
| -------- | -------------------------------- |
| `global` | Global                           |
| `emea`   | Europe, Middle East and Africa   |
| `ncsa`   | North, Central and South America |
| `apac`   | Asia Pacific                     |

<!-- REGIONS:END -->
<!-- prettier-ignore-end-->

##### Boards reference

<!-- prettier-ignore-start -->
<!-- BOARDS:START -->

| Board                 | Minimum Season        |
| --------------------- | --------------------- |
| Ranked (`ranked`)     | Health (`6`)          |
| Casual (`casual`)     | Ember Rise (`15`)     |
| Deathmatch (`warmup`) | Demon Veil (`25`)     |
| Event (`event`)       | Shifting Tides (`16`) |
| Newcomer (`newcomer`) | Wind Bastion (`12`)   |

<!-- BOARDS:END -->
<!-- prettier-ignore-end-->

> NOTE: Unranked uses casual's board

```ts
await r6api.getUserSeasonal({
  platform: 'crossplay',
  profileIds: ['0b95544b-0228-49a7-b338-6d15cfbc3d6a']
});
```

<!-- prettier-ignore-start -->
<!-- GETUSERSEASONAL_OUTPUT:START -->

<details>
<summary>Output</summary>

```ts
[
  {
    profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    season: {
      id: 28,
      shorthand: 'Y7S4',
      slug: 'solar_raid',
      name: 'Solar Raid',
      hexColorCode: '#d03314',
      thumbnail: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/seasons/y7s4.jpg',
      thumbnailOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1ZSXgYK6dLal6jI7JRN85T/7aa312f549948b8a19c9afb5fae12776/R6S_Live_Y7S4_SolarRaid_Keyart.jpg',
      releaseDate: '2022-12-06T00:00:00.000Z'
    },
    region: { slug: 'global', name: 'Global' },
    board: { slug: 'pvp_ranked', name: 'Ranked' },
    rank: {
      id: 14,
      name: 'Silver II',
      mmr: 2491,
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/silver_2.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/0PLZUFs3fqKBTLh1gYyY8/7cabc5ba4522f725583faac165ff5130/R6S_RANK_500x500_Silver_02.png'
    },
    maxRank: {
      id: 16,
      name: 'Gold V',
      mmr: 2716,
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/gold_5.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/QWDG4I2KaxDN8s2nbaAIY/f1df73e40fe9172a209982dc85862a5b/RANK_L_Gold_05.png'
    },
    lastMatch: {
      resultCode: 1,
      resultText: 'won',
      mmrChange: 103,
      skillMeanChange: 1.0389761567,
      skillStdevChange: -0.0666760118
    },
    pastSeasons: {
      wins: 0,
      losses: 0,
      wl: 0,
      winRate: '0%',
      matches: 0,
      abandons: 0
    },
    previousMmr: 2400,
    nextMmr: 2500,
    topRankPosition: 0,
    kills: 99,
    deaths: 127,
    kd: 0.78,
    wins: 10,
    losses: 16,
    wl: 0.63,
    winRate: '38%',
    matches: 26,
    abandons: 0,
    skillMean: 24.9143546546,
    skillStdev: 5.9461222759,
    updateTime: '2023-02-01T03:32:58.428000+00:00'
  }
]
```

</details>

<!-- GETUSERSEASONAL_OUTPUT:END -->
<!-- prettier-ignore-end-->

---

### getUserSeasonalv2

Get user seasonal v2 (Rank Points)

Required `r6api` client with `ubiAppId: 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40'` option.

#### Options

<!-- prettier-ignore-start -->
<!-- GETUSERSEASONALV2_OPTIONS:START -->

| Parameter         | Type                                  | Required | Default                                                                                                                                                                                          | Description                               |
| ----------------- | ------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| profileIds        | `string[]`                            | ✔        |                                                                                                                                                                                                  | `profileIds`                              |
| platformsFamilies | `PlatformFamily[]`                    | ✖        | `['pc', 'console']`                                                                                                                                                                              | [Platforms Families](#Platforms-Families) |
| spacesIds         | `Record<ServiceAndCrossplay, string>` | ✖        | `{ uplay: '5172a557-50b5-4665-b7db-e3f2e8c5041d', psn: '05bfb3f7-6c21-4c42-be1f-97a33fb5cf66', xbl: '98a601e5-ca91-4440-b1c5-753f601a2c90', crossplay: '0d2ae42d-4c27-4cb7-af6c-2099062302bb' }` |                                           |

<!-- GETUSERSEASONALV2_OPTIONS:END -->
<!-- prettier-ignore-end-->

```ts
await r6api.getUserSeasonalv2({
  platform: 'pc',
  profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a'
});
```

<!-- prettier-ignore-start -->
<!-- GETUSERSEASONALV2_OUTPUT:START -->

<details>
<summary>Output</summary>

```ts
[
  {
    profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    platform: 'pc',
    season: {
      id: 28,
      shorthand: 'Y7S4',
      slug: 'solar_raid',
      name: 'Solar Raid',
      hexColorCode: '#d03314',
      thumbnail: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/seasons/y7s4.jpg',
      thumbnailOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1ZSXgYK6dLal6jI7JRN85T/7aa312f549948b8a19c9afb5fae12776/R6S_Live_Y7S4_SolarRaid_Keyart.jpg',
      releaseDate: '2022-12-06T00:00:00.000Z'
    },
    board: { slug: 'casual', name: 'Casual' },
    rank: {
      rp: 0,
      mmr: 0,
      id: 0,
      slug: 'unranked',
      name: 'Unranked',
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/unranked.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6HQlEdlInHQ2B2ZbHygp2x/cfa4500a6a30419d862a74736416e5fc/R6S_RANK_None_L.png',
      range: [ 0, 999 ]
    },
    maxRank: {
      rp: 0,
      mmr: 0,
      id: 0,
      slug: 'unranked',
      name: 'Unranked',
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/unranked.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6HQlEdlInHQ2B2ZbHygp2x/cfa4500a6a30419d862a74736416e5fc/R6S_RANK_None_L.png',
      range: [ 0, 999 ]
    },
    topRankPosition: 0,
    kills: 113,
    deaths: 60,
    kd: 1.88,
    wins: 6,
    losses: 1,
    wl: 6,
    winRate: '86%',
    abandons: 43,
    matches: 50
  },
  {
    profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    platform: 'pc',
    season: {
      id: 28,
      shorthand: 'Y7S4',
      slug: 'solar_raid',
      name: 'Solar Raid',
      hexColorCode: '#d03314',
      thumbnail: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/seasons/y7s4.jpg',
      thumbnailOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1ZSXgYK6dLal6jI7JRN85T/7aa312f549948b8a19c9afb5fae12776/R6S_Live_Y7S4_SolarRaid_Keyart.jpg',
      releaseDate: '2022-12-06T00:00:00.000Z'
    },
    board: { slug: 'event', name: 'Event' },
    rank: {
      rp: 0,
      mmr: 0,
      id: 0,
      slug: 'unranked',
      name: 'Unranked',
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/unranked.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6HQlEdlInHQ2B2ZbHygp2x/cfa4500a6a30419d862a74736416e5fc/R6S_RANK_None_L.png',
      range: [ 0, 999 ]
    },
    maxRank: {
      rp: 0,
      mmr: 0,
      id: 0,
      slug: 'unranked',
      name: 'Unranked',
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/unranked.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6HQlEdlInHQ2B2ZbHygp2x/cfa4500a6a30419d862a74736416e5fc/R6S_RANK_None_L.png',
      range: [ 0, 999 ]
    },
    topRankPosition: 0,
    kills: 0,
    deaths: 0,
    kd: 0,
    wins: 0,
    losses: 0,
    wl: 0,
    winRate: '0%',
    abandons: 0,
    matches: 0
  },
  {
    profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    platform: 'pc',
    season: {
      id: 28,
      shorthand: 'Y7S4',
      slug: 'solar_raid',
      name: 'Solar Raid',
      hexColorCode: '#d03314',
      thumbnail: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/seasons/y7s4.jpg',
      thumbnailOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1ZSXgYK6dLal6jI7JRN85T/7aa312f549948b8a19c9afb5fae12776/R6S_Live_Y7S4_SolarRaid_Keyart.jpg',
      releaseDate: '2022-12-06T00:00:00.000Z'
    },
    board: { slug: 'warmup', name: 'Deathmatch' },
    rank: {
      rp: 0,
      mmr: 0,
      id: 0,
      slug: 'unranked',
      name: 'Unranked',
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/unranked.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6HQlEdlInHQ2B2ZbHygp2x/cfa4500a6a30419d862a74736416e5fc/R6S_RANK_None_L.png',
      range: [ 0, 999 ]
    },
    maxRank: {
      rp: 0,
      mmr: 0,
      id: 0,
      slug: 'unranked',
      name: 'Unranked',
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/unranked.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6HQlEdlInHQ2B2ZbHygp2x/cfa4500a6a30419d862a74736416e5fc/R6S_RANK_None_L.png',
      range: [ 0, 999 ]
    },
    topRankPosition: 0,
    kills: 35,
    deaths: 35,
    kd: 1,
    wins: 2,
    losses: 0,
    wl: 2,
    winRate: '100%',
    abandons: 3,
    matches: 5
  },
  {
    profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    platform: 'pc',
    season: {
      id: 28,
      shorthand: 'Y7S4',
      slug: 'solar_raid',
      name: 'Solar Raid',
      hexColorCode: '#d03314',
      thumbnail: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/seasons/y7s4.jpg',
      thumbnailOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1ZSXgYK6dLal6jI7JRN85T/7aa312f549948b8a19c9afb5fae12776/R6S_Live_Y7S4_SolarRaid_Keyart.jpg',
      releaseDate: '2022-12-06T00:00:00.000Z'
    },
    board: { slug: 'ranked', name: 'Ranked' },
    rank: {
      rp: 56,
      mmr: 1656,
      id: 7,
      slug: 'bronze_4',
      name: 'Bronze IV',
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/bronze_4.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3fi46SbCqO8EfoR6Jij27d/c5f44a5e33e7b8091684e08da032d1df/R6S_RANK_500x500_Bronze_04.png',
      range: [ 1600, 1699 ]
    },
    maxRank: {
      rp: 56,
      mmr: 1656,
      id: 7,
      slug: 'bronze_4',
      name: 'Bronze IV',
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/bronze_4.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3fi46SbCqO8EfoR6Jij27d/c5f44a5e33e7b8091684e08da032d1df/R6S_RANK_500x500_Bronze_04.png',
      range: [ 1600, 1699 ]
    },
    topRankPosition: 0,
    kills: 99,
    deaths: 127,
    kd: 0.78,
    wins: 10,
    losses: 16,
    wl: 0.63,
    winRate: '38%',
    abandons: 0,
    matches: 26
  },
  {
    profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    platform: 'console',
    season: {
      id: 28,
      shorthand: 'Y7S4',
      slug: 'solar_raid',
      name: 'Solar Raid',
      hexColorCode: '#d03314',
      thumbnail: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/seasons/y7s4.jpg',
      thumbnailOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1ZSXgYK6dLal6jI7JRN85T/7aa312f549948b8a19c9afb5fae12776/R6S_Live_Y7S4_SolarRaid_Keyart.jpg',
      releaseDate: '2022-12-06T00:00:00.000Z'
    },
    board: { slug: 'casual', name: 'Casual' },
    rank: {
      rp: 0,
      mmr: 0,
      id: 0,
      slug: 'unranked',
      name: 'Unranked',
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/unranked.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6HQlEdlInHQ2B2ZbHygp2x/cfa4500a6a30419d862a74736416e5fc/R6S_RANK_None_L.png',
      range: [ 0, 999 ]
    },
    maxRank: {
      rp: 0,
      mmr: 0,
      id: 0,
      slug: 'unranked',
      name: 'Unranked',
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/unranked.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6HQlEdlInHQ2B2ZbHygp2x/cfa4500a6a30419d862a74736416e5fc/R6S_RANK_None_L.png',
      range: [ 0, 999 ]
    },
    topRankPosition: 0,
    kills: 0,
    deaths: 0,
    kd: 0,
    wins: 0,
    losses: 0,
    wl: 0,
    winRate: '0%',
    abandons: 0,
    matches: 0
  },
  {
    profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    platform: 'console',
    season: {
      id: 28,
      shorthand: 'Y7S4',
      slug: 'solar_raid',
      name: 'Solar Raid',
      hexColorCode: '#d03314',
      thumbnail: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/seasons/y7s4.jpg',
      thumbnailOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1ZSXgYK6dLal6jI7JRN85T/7aa312f549948b8a19c9afb5fae12776/R6S_Live_Y7S4_SolarRaid_Keyart.jpg',
      releaseDate: '2022-12-06T00:00:00.000Z'
    },
    board: { slug: 'event', name: 'Event' },
    rank: {
      rp: 0,
      mmr: 0,
      id: 0,
      slug: 'unranked',
      name: 'Unranked',
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/unranked.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6HQlEdlInHQ2B2ZbHygp2x/cfa4500a6a30419d862a74736416e5fc/R6S_RANK_None_L.png',
      range: [ 0, 999 ]
    },
    maxRank: {
      rp: 0,
      mmr: 0,
      id: 0,
      slug: 'unranked',
      name: 'Unranked',
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/unranked.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6HQlEdlInHQ2B2ZbHygp2x/cfa4500a6a30419d862a74736416e5fc/R6S_RANK_None_L.png',
      range: [ 0, 999 ]
    },
    topRankPosition: 0,
    kills: 0,
    deaths: 0,
    kd: 0,
    wins: 0,
    losses: 0,
    wl: 0,
    winRate: '0%',
    abandons: 0,
    matches: 0
  },
  {
    profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    platform: 'console',
    season: {
      id: 28,
      shorthand: 'Y7S4',
      slug: 'solar_raid',
      name: 'Solar Raid',
      hexColorCode: '#d03314',
      thumbnail: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/seasons/y7s4.jpg',
      thumbnailOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1ZSXgYK6dLal6jI7JRN85T/7aa312f549948b8a19c9afb5fae12776/R6S_Live_Y7S4_SolarRaid_Keyart.jpg',
      releaseDate: '2022-12-06T00:00:00.000Z'
    },
    board: { slug: 'warmup', name: 'Deathmatch' },
    rank: {
      rp: 0,
      mmr: 0,
      id: 0,
      slug: 'unranked',
      name: 'Unranked',
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/unranked.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6HQlEdlInHQ2B2ZbHygp2x/cfa4500a6a30419d862a74736416e5fc/R6S_RANK_None_L.png',
      range: [ 0, 999 ]
    },
    maxRank: {
      rp: 0,
      mmr: 0,
      id: 0,
      slug: 'unranked',
      name: 'Unranked',
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/unranked.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6HQlEdlInHQ2B2ZbHygp2x/cfa4500a6a30419d862a74736416e5fc/R6S_RANK_None_L.png',
      range: [ 0, 999 ]
    },
    topRankPosition: 0,
    kills: 0,
    deaths: 0,
    kd: 0,
    wins: 0,
    losses: 0,
    wl: 0,
    winRate: '0%',
    abandons: 0,
    matches: 0
  },
  {
    profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    platform: 'console',
    season: {
      id: 28,
      shorthand: 'Y7S4',
      slug: 'solar_raid',
      name: 'Solar Raid',
      hexColorCode: '#d03314',
      thumbnail: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/seasons/y7s4.jpg',
      thumbnailOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/1ZSXgYK6dLal6jI7JRN85T/7aa312f549948b8a19c9afb5fae12776/R6S_Live_Y7S4_SolarRaid_Keyart.jpg',
      releaseDate: '2022-12-06T00:00:00.000Z'
    },
    board: { slug: 'ranked', name: 'Ranked' },
    rank: {
      rp: 1000,
      mmr: 1000,
      id: 0,
      slug: 'unranked',
      name: 'Unranked',
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/unranked.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6HQlEdlInHQ2B2ZbHygp2x/cfa4500a6a30419d862a74736416e5fc/R6S_RANK_None_L.png',
      range: [ 0, 999 ]
    },
    maxRank: {
      rp: 1000,
      mmr: 1000,
      id: 0,
      slug: 'unranked',
      name: 'Unranked',
      icon: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/ranks/v3/pngs/unranked.png',
      iconOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6HQlEdlInHQ2B2ZbHygp2x/cfa4500a6a30419d862a74736416e5fc/R6S_RANK_None_L.png',
      range: [ 0, 999 ]
    },
    topRankPosition: 0,
    kills: 0,
    deaths: 0,
    kd: 0,
    wins: 0,
    losses: 0,
    wl: 0,
    winRate: '0%',
    abandons: 0,
    matches: 0
  }
]
```

</details>

<!-- GETUSERSEASONALV2_OUTPUT:END -->
<!-- prettier-ignore-end-->

---

### getUserStats

Get user stats

#### Options

<!-- prettier-ignore-start -->
<!-- GETUSERSTATS_OPTIONS:START -->

| Parameter   | Type       | Required | Default     | Description                                                                 |
| ----------- | ---------- | -------- | ----------- | --------------------------------------------------------------------------- |
| platform    | `Platform` | ✔        |             |                                                                             |
| profileId   | `string`   | ✔        |             |                                                                             |
| view        | `string`   | ✔        |             | `'seasonal'` value only valid when `aggregation` is `'summary'`             |
| aggregation | `string`   | ✔        |             |                                                                             |
| gameModes   | `string[]` | ✖        | `undefined` |                                                                             |
| teamRoles   | `string[]` | ✖        | `undefined` |                                                                             |
| seasonsId   | `number[]` | ✖        | `undefined` | Numbers from `0` to `28`. Mutually exclusive with `startDate` and `endDate` |
| startDate   | `string`   | ✖        | `undefined` | Mutually exclusive with `seasonId`                                          |
| startDate   | `string`   | ✖        | `undefined` | Mutually exclusive with `seasonId`                                          |

<!-- GETUSERSTATS_OPTIONS:END -->
<!-- prettier-ignore-end-->

> NOTE: `seasonId` is mutually exclusive with `startDate` and `endDate`

```ts
await r6api.getUserStats({
  platform: 'uplay',
  profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
  view: 'seasonal',
  aggregation: 'summary',
  gameMode: 'ranked',
  teamRole: 'all',
  seasonId: 25
});
```

<!-- prettier-ignore-start -->
<!-- GETUSERSTATS_OUTPUT:START -->

<details>
<summary>Output</summary>

```ts
[
  {
    profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    platform: 'uplay',
    region: 'all',
    gameMode: 'ranked',
    teamRole: 'all',
    view: 'seasonal',
    aggregation: 'summary',
    season: {
      id: 25,
      shorthand: 'Y7S1',
      slug: 'demon_veil',
      name: 'Demon Veil',
      hexColorCode: '#b27400',
      thumbnail: 'https://raw.githubusercontent.com/danielwerg/r6data/master/assets/seasons/y7s1.jpg',
      thumbnailOfficial: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6diil0gexoNXNCKtwpPPQZ/ace6f9e6e1e1578a2255ac0e5cb67b7c/r6s-seasons-y7s1.jpg',
      releaseDate: '2022-03-15T00:00:00.000Z'
    },
    wins: 72,
    losses: 69,
    matches: 141,
    wl: 1.0435,
    winRate: '51%',
    rounds: {
      wins: 429,
      losses: 419,
      played: 848,
      wl: 1.02,
      winRate: '51%',
      withAKill: 0.487,
      withMultiKill: 0.2193,
      withOpeningKill: 0.0896,
      withOpeningDeath: 0.079,
      withKOST: 0.5932,
      withClutch: 0.0071,
      withAnAce: 0.0024,
      survived: 0.2724
    },
    minutesPlayed: 3044,
    kills: 662,
    death: 617,
    assists: 168,
    kd: 1.0729,
    killsPerRound: 0.7807,
    headshots: 238,
    headshotAccuracy: 0.3595,
    meleeKills: 17,
    teamKills: 5,
    openingKills: 76,
    openingDeaths: 67,
    trades: 69,
    openingKillTrades: 6,
    openingDeathTrades: 7,
    revives: 14,
    distanceTravelled: 141404,
    distancePerRound: 166.75,
    timeAlivePerMatch: 587.6596,
    timeDeadPerMatch: 196.5958
  }
]
```

</details>

<!-- GETUSERSTATS_OUTPUT:END -->
<!-- prettier-ignore-end-->

---

### getUserStatus

Get user status.

#### Options

<!-- prettier-ignore-start -->
<!-- GETUSERSTATUS_OPTIONS:START -->

| Parameter         | Type       | Required | Default | Description                 |
| ----------------- | ---------- | -------- | ------- | --------------------------- |
| userIds           | `string[]` | ✔        |         | User ids (50 max)           |
| fetchApplications | `boolean`  | ✖        | `false` | Fetch name for applications |

<!-- GETUSERSTATUS_OPTIONS:END -->
<!-- prettier-ignore-end-->

```ts
await r6api.getUserStatus({
  userIds: ['0b95544b-0228-49a7-b338-6d15cfbc3d6a']
});
```

<!-- prettier-ignore-start -->
<!-- GETUSERSTATUS_OUTPUT:START -->

<details>
<summary>Output</summary>

```ts
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

<!-- GETUSERSTATUS_OUTPUT:END -->
<!-- prettier-ignore-end-->

---

### getUserApplications

Get user owned applications.

#### Options

<!-- prettier-ignore-start -->
<!-- GETUSERAPPLICATIONS_OPTIONS:START -->

| Parameter         | Type       | Required | Default | Description                              |
| ----------------- | ---------- | -------- | ------- | ---------------------------------------- |
| profileIds        | `string[]` | ✔        |         | `profileIds` (100 max)                   |
| fetchApplications | `boolean`  | ✖        | `false` | Fetch name and platform for applications |

<!-- GETUSERAPPLICATIONS_OPTIONS:END -->
<!-- prettier-ignore-end-->

```ts
await r6api.getUserApplications({
  profileId: ['0b95544b-0228-49a7-b338-6d15cfbc3d6a']
});
```

<!-- prettier-ignore-start -->
<!-- GETUSERAPPLICATIONS_OUTPUT:START -->

<details>
<summary>Output</summary>

```ts
[
  {
    profileId: '0b95544b-0228-49a7-b338-6d15cfbc3d6a',
    applications: [
      {
        id: '46f0b36b-b947-4d9c-b9dc-9a34b52ab59a',
        name: null,
        platform: null,
        sessionsPlayed: 10,
        daysPlayed: 7,
        lastPlayedDate: '2020-10-27T17:11:38.771Z',
        firstPlayedDate: '2019-04-19T22:05:01.850Z'
      },
      {
        id: '87843b9b-516d-4a58-824b-f658d1361ad1',
        name: null,
        platform: null,
        sessionsPlayed: 2,
        daysPlayed: 2,
        lastPlayedDate: '2016-03-21T18:28:25.434Z',
        firstPlayedDate: '2016-03-18T16:18:43.603Z'
      },
      {
        id: 'a427a342-56bb-437b-b835-fa695c75893b',
        name: 'Rainbow Six Siege - Test Server',
        platform: 'PC',
        sessionsPlayed: 137,
        daysPlayed: 72,
        lastPlayedDate: '2020-11-16T05:35:45.229Z',
        firstPlayedDate: '2017-06-01T20:10:13.424Z'
      },
      {
        id: 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40',
        name: 'Rainbow Six Siege',
        platform: 'PC',
        sessionsPlayed: 2344,
        daysPlayed: 1221,
        lastPlayedDate: '2021-02-04T12:35:13.173Z',
        firstPlayedDate: '2015-12-01T19:33:41.284Z'
      },
      {
        id: 'f68a4bb5-608a-4ff2-8123-be8ef797e0a6',
        name: 'Ubisoft Connect Client',
        platform: 'PC',
        sessionsPlayed: 2285,
        daysPlayed: 1766,
        lastPlayedDate: '2023-01-29T21:48:51.696Z',
        firstPlayedDate: '2015-12-01T19:31:18.107Z'
      }
    ]
  }
]
```

</details>

<!-- GETUSERAPPLICATIONS_OUTPUT:END -->
<!-- prettier-ignore-end-->

---

### getUserGamesPlayed

Get user played games.

#### Options

<!-- prettier-ignore-start -->
<!-- GETUSERGAMESPLAYED_OPTIONS:START -->

| Parameter         | Type       | Required | Default | Description                 |
| ----------------- | ---------- | -------- | ------- | --------------------------- |
| profileIds        | `string[]` | ✔        |         | `profileIds` (20 max)       |
| fetchApplications | `boolean`  | ✖        | `false` | Fetch name for applications |

<!-- GETUSERGAMESPLAYED_OPTIONS:END -->
<!-- prettier-ignore-end-->

```ts
await r6api.getUserGamesPlayed({
  profileIds: ['0b95544b-0228-49a7-b338-6d15cfbc3d6a']
});
```

<!-- prettier-ignore-start -->
<!-- GETUSERGAMESPLAYED_OUTPUT:START -->

<details>
<summary>Output</summary>

```ts
[
  {
    spaceId: '0d2ae42d-4c27-4cb7-af6c-2099062302bb',
    spacePlatform: 'crossplay',
    firstPlayed: { createdAt: null, countryCode: null },
    lastPlayed: { updatedAt: null, countryCode: null },
    sessionsCount: null,
    applications: [
      {
        id: 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40',
        name: 'Rainbow Six Siege',
        platform: 'PC',
        firstPlayed: { createdAt: null, countryCode: null },
        lastPlayed: { updatedAt: null, countryCode: null },
        sessionsCount: null
      }
    ]
  },
  {
    spaceId: 'e17be87d-2996-4f3b-97c4-19bb2dae2933',
    spacePlatform: 'PC',
    firstPlayed: { createdAt: null, countryCode: null },
    lastPlayed: { updatedAt: null, countryCode: null },
    sessionsCount: null,
    applications: [
      {
        id: 'f68a4bb5-608a-4ff2-8123-be8ef797e0a6',
        name: 'Ubisoft Connect Client',
        platform: 'PC',
        firstPlayed: { createdAt: null, countryCode: null },
        lastPlayed: { updatedAt: null, countryCode: null },
        sessionsCount: null
      }
    ]
  },
  {
    spaceId: '5172a557-50b5-4665-b7db-e3f2e8c5041d',
    spacePlatform: 'PC',
    firstPlayed: { createdAt: null, countryCode: null },
    lastPlayed: { updatedAt: null, countryCode: null },
    sessionsCount: null,
    applications: [
      {
        id: 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40',
        name: 'Rainbow Six Siege',
        platform: 'PC',
        firstPlayed: { createdAt: null, countryCode: null },
        lastPlayed: { updatedAt: null, countryCode: null },
        sessionsCount: null
      }
    ]
  },
  {
    spaceId: '5c22ec5f-d475-4ec1-8c60-0c28ce9affed',
    spacePlatform: 'crossplay',
    firstPlayed: { createdAt: null, countryCode: null },
    lastPlayed: { updatedAt: null, countryCode: null },
    sessionsCount: null,
    applications: [
      {
        id: 'a427a342-56bb-437b-b835-fa695c75893b',
        name: 'Rainbow Six Siege - Test Server',
        platform: 'PC',
        firstPlayed: { createdAt: null, countryCode: null },
        lastPlayed: { updatedAt: null, countryCode: null },
        sessionsCount: null
      }
    ]
  },
  {
    spaceId: '41aebcf5-56eb-4f1e-b154-9eb46718f465',
    spacePlatform: 'PC',
    firstPlayed: { createdAt: null, countryCode: null },
    lastPlayed: { updatedAt: null, countryCode: null },
    sessionsCount: null,
    applications: [
      {
        id: 'a427a342-56bb-437b-b835-fa695c75893b',
        name: 'Rainbow Six Siege - Test Server',
        platform: 'PC',
        firstPlayed: { createdAt: null, countryCode: null },
        lastPlayed: { updatedAt: null, countryCode: null },
        sessionsCount: null
      }
    ]
  },
  {
    spaceId: '029e8254-57fe-4d2a-8a40-bb321f0f660d',
    spacePlatform: 'ANDROID',
    firstPlayed: { createdAt: null, countryCode: null },
    lastPlayed: { updatedAt: null, countryCode: null },
    sessionsCount: null,
    applications: [
      {
        id: '46f0b36b-b947-4d9c-b9dc-9a34b52ab59a',
        name: null,
        platform: 'ANDROID',
        firstPlayed: { createdAt: null, countryCode: null },
        lastPlayed: { updatedAt: null, countryCode: null },
        sessionsCount: null
      }
    ]
  },
  {
    spaceId: '4a1562a4-c4d2-4bc5-a85e-f3db588b0072',
    spacePlatform: 'PC',
    firstPlayed: { createdAt: null, countryCode: null },
    lastPlayed: { updatedAt: null, countryCode: null },
    sessionsCount: null,
    applications: [
      {
        id: 'd71bf270-d6b1-4ae1-9546-338ce292e125',
        name: null,
        platform: 'PC',
        firstPlayed: { createdAt: null, countryCode: null },
        lastPlayed: { updatedAt: null, countryCode: null },
        sessionsCount: null
      }
    ]
  },
  {
    spaceId: '6edd234a-abff-4e90-9aab-b9b9c6e49ff7',
    spacePlatform: 'PC',
    firstPlayed: { createdAt: null, countryCode: null },
    lastPlayed: { updatedAt: null, countryCode: null },
    sessionsCount: null,
    applications: [
      {
        id: '87843b9b-516d-4a58-824b-f658d1361ad1',
        name: null,
        platform: 'PC',
        firstPlayed: { createdAt: null, countryCode: null },
        lastPlayed: { updatedAt: null, countryCode: null },
        sessionsCount: null
      }
    ]
  }
]
```

</details>

<!-- GETUSERGAMESPLAYED_OUTPUT:END -->
<!-- prettier-ignore-end-->

---

### getApplications

Get applications.

#### Options

<!-- prettier-ignore-start -->
<!-- GETAPPLICATIONS_OPTIONS:START -->

| Parameter      | Type       | Required | Default | Description               |
| -------------- | ---------- | -------- | ------- | ------------------------- |
| applicationIds | `string[]` | ✔        |         | Applications ids (50 max) |

<!-- GETAPPLICATIONS_OPTIONS:END -->
<!-- prettier-ignore-end-->

```ts
await r6api.getApplications({
  applicationIds: ['f68a4bb5-608a-4ff2-8123-be8ef797e0a6']
});
```

<!-- prettier-ignore-start -->
<!-- GETAPPLICATIONS_OUTPUT:START -->

<details>
<summary>Output</summary>

```ts
[
  {
    id: 'f68a4bb5-608a-4ff2-8123-be8ef797e0a6',
    name: 'Ubisoft Connect Client',
    platform: 'PC',
    spaceId: 'e17be87d-2996-4f3b-97c4-19bb2dae2933'
  }
]
```

</details>

<!-- GETAPPLICATIONS_OUTPUT:END -->
<!-- prettier-ignore-end-->

---

### getServiceStatus

Get game service status.

```ts
await r6api.getServiceStatus();
```

<!-- prettier-ignore-start -->
<!-- GETSERVICESTATUS_OUTPUT:START -->

<details>
<summary>Output</summary>

```ts
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
    appId: '',
    name: 'Rainbow Six Siege - Luna - LIVE',
    spaceId: '',
    mdm: '',
    category: 'Instance',
    platform: 'Luna',
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
    appId: '',
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
    appId: '',
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

<!-- GETSERVICESTATUS_OUTPUT:END -->
<!-- prettier-ignore-end-->

---

### getNews

Get game news.

### Options

<!-- prettier-ignore-start -->
<!-- GETNEWS_OPTIONS:START -->

| Parameter      | Type       | Required | Default                       | Description                                                                       |
| -------------- | ---------- | -------- | ----------------------------- | --------------------------------------------------------------------------------- |
| locale         | `string`   | ✖        | `'en-gb'`                     |                                                                                   |
| fallbackLocale | `string`   | ✖        | `'en-us'`                     |                                                                                   |
| category       | `string`   | ✖        | `'all'`                       | `'all'`, `'game-updates'`, `'patch-notes'`, `'community'`, `'store'`, `'esports'` |
| media          | `string`   | ✖        | `'all'`                       | `'all'`, `'news'`, `'videos'`                                                     |
| placement      | `string`   | ✖        | `''`                          | Ex: `'featured-news-article'`                                                     |
| limit          | `number`   | ✖        | `6`                           |                                                                                   |
| skip           | `number`   | ✖        | `0`                           |                                                                                   |
| startIndex     | `number`   | ✖        | `0`                           |                                                                                   |
| tags           | `string[]` | ✖        | `['BR-rainbow-six GA-siege']` |                                                                                   |

<!-- GETNEWS_OPTIONS:END -->
<!-- prettier-ignore-end-->

```ts
await r6api.getNews({ limit: 1 });
```

<!-- prettier-ignore-start -->
<!-- GETNEWS_OUTPUT:START -->

<details>
<summary>Output</summary>

```ts
{
  total: 774,
  limit: 1,
  categories: 'all',
  media: 'all',
  skip: 0,
  startIndex: 0,
  placement: [],
  tags: [ 'BR-rainbow-six GA-siege' ],
  items: [
    {
      id: '5W4Tn6l3RvzhbnKDYBMDTl',
      title: 'Y7S4.2 Patch Notes',
      abstract: 'See the upcoming changes to Rainbow Six Siege with the release of Y7S4.2',
      thumbnail: {
        url: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6pOZyZoqf6DZ4MPaECBxw4/ea81db29b0498c81941b16aa59cd355c/Y7S4.2_PatchNotes.jpg',
        description: null
      },
      content: 'See the upcoming changes to Rainbow Six Siege with the release of Y7S4.2\n' +
        '\n' +
        '## Y7S4.2 PATCH SIZE\n' +
        '\n' +
        'Find the download sizes for each platform below.\n' +
        '\n' +
        '- Ubisoft Connect: 1.21 GB\n' +
        '- Steam: 476.25 MB\n' +
        '- Xbox One: 1.10 GB\n' +
        '- Xbox Series X: 1.10 GB\n' +
        '- PS4: 1.65 GB\n' +
        '- PS5: 1.09 GB\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '## OPERATOR BALANCING\n' +
        '\n' +
        '### TWITCH\n' +
        '\n' +
        '-   Increased regular drones to 2 (from 1)\n' +
        '-   Removed Vertical Grip from F2\n' +
        '\n' +
        '### GRIM\n' +
        '\n' +
        '-   Added 1.5x and 2.0x sights to Commando 552\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '## WEAPON BALANCING\n' +
        '\n' +
        '### EXTENDED BARREL\n' +
        '\n' +
        '-   (New) Damage bonus: increases weapon damage by 15%\n' +
        '\n' +
        '### PARA-308 (CAPITÃO)\n' +
        '\n' +
        '-   Damage: reduced to 47 (from 48)\n' +
        '\n' +
        '### SUPERNOVA (ECHO, HIBANA, AMARU)\n' +
        '\n' +
        '-   Damage: increased to 55 (from 48)\n' +
        '\n' +
        '### 9MM C1 (FROST)\n' +
        '\n' +
        '-   Damage: reduced to 36 (from 45)\n' +
        '\n' +
        '### AR-15.50 & M4 (MAVERICK)\n' +
        '\n' +
        '-   Damage: increased to 67 (from 62)\n' +
        '-   Added 2.0x sights to M4\n' +
        '\n' +
        '### UZK50GI (THORN)\n' +
        '\n' +
        '-   Damage: reduced to 36 (from 44)\n' +
        '\n' +
        '### AUG A2 (WAMAI, IQ)\n' +
        '\n' +
        '-   Vertical recoil: increased upward speed.\n' +
        '-   Horizontal recoil: Long bursts now have an increased spread and tend to pull left.\n' +
        '\n' +
        '### COMMANDO 552 (GRIM, IQ)\n' +
        '\n' +
        '-   Damage: reduced to 47 (from 48)\n' +
        '\n' +
        '### HIP FIRE PRECISION\n' +
        '\n' +
        '*WEAPONS AFFECTED*\n' +
        '\n' +
        '-   Spread increased:  AK12, ARX 200, SC3000K, LMG-E, 6P41, T-95, 417, AR-15.50, CAMRS, MK14\n' +
        '-   Spread reduced: P10-C\n' +
        '-   Burst growth increased: AUG A2, AUG A3, POF 9, LMG-E, 6P41, T-95, 417, AR-15.50, MK14\n' +
        '-   Burst growth reduced: CAMRS \n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '## TWEAKS AND IMPROVEMENTS\n' +
        '\n' +
        '### PLAYER COMFORT\n' +
        '\n' +
        '__Advanced controller options__\n' +
        '\n' +
        "-   Players on PC and consoles can customize their controllers' aim controls with Advanced Controller Options.\n" +
        '-   These options can be found in the Controller section of the Controls option menu.  \n' +
        "-   We'll be listening to player feedback to further improve this feature and offer new options as needed\n" +
        '\n' +
        '<br>\n' +
        '\n' +
        '## Bug Fixes\n' +
        '\n' +
        '### GAMEPLAY\n' +
        '\n' +
        'FIXED - Most played Operators are not being chosen when inactive on the Random Operator selection screen.\n' +
        '\n' +
        "FIXED - POF-9 recoil pattern isn't displayed in Weapon Loadout screen and Shooting Range records.\n" +
        '\n' +
        'FIXED - Button to access chat is not functional when Covert Voice to Text option is on during gameplay sessions.\n' +
        '\n' +
        "FIXED - Match loadout when round begins sometimes does not match player's loadout during character select stage.\n" +
        '\n' +
        '### LEVEL DESIGN\n' +
        '\n' +
        'FIXED - Players can peek above the reinforcement at EXT Garage Balcony on Outback Map.\n' +
        '\n' +
        `FIXED - Echo's Yokai drone and Valkyrie's Black Eye camera are able to scan the attackers at the "EXT Park" location immediately after they spawn when positioned on the ceiling of the 1F Lobby location on Nighthaven Labs.\n` +
        '\n' +
        'FIXED - Multiple LOD issues on various maps.\n' +
        '\n' +
        '### OPERATORS\n' +
        '\n' +
        "FIXED - Solis can't shoot if SPEC-IO gets deactivated at the same time that Solis activates it.\n" +
        '\n' +
        "FIXED - Caveira's hair clips into her face in the Home section.\n" +
        '\n' +
        "FIXED - Doc's Stim Pistol is missing the keyword action reminder.\n" +
        '\n' +
        "FIXED - While SPEC-IO is active, Solis' arms and phone clip through the AR HUD when entering Observation Tool view.\n" +
        '\n' +
        '### USER EXPERIENCE\n' +
        '\n' +
        'FIXED - Icon previews for loadouts do not load properly during the operator selection phase.\n' +
        '\n' +
        'FIXED - No offers are displayed in the Gift to Friends section in Ubisoft Connect.\n' +
        '\n' +
        'FIXED - Players can duplicate their account by unlinking an account and relinking to a new account.\n' +
        '\n' +
        'FIXED - Players experience an infinite loading when attempting to convert any pack while also switching to a different one at the same time.\n' +
        '\n' +
        'FIXED - Prompt to Apply Changes appears in Options menu despite no changes being made.\n' +
        '\n' +
        'FIXED - Various UI issues.\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '---\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        'Follow us and share your feedback on [Twitter](https://twitter.com/Rainbow6Game), [Reddit](https://www.reddit.com/r/Rainbow6/), [Facebook](https://www.facebook.com/Rainbow6/) and on our [forums](https://discussions.ubisoft.com/category/609/rainbow-six-siege?lang=en-US).',
      description: undefined,
      categories: null,
      tag: 'BR-rainbow-six GA-siege',
      readTime: 4,
      url: 'https://ubisoft.com/en-gb/game/rainbow-six/siege/news-updates/5W4Tn6l3RvzhbnKDYBMDTl/y7s42-patch-notes',
      date: '2023-01-24T12:00:00.000Z'
    }
  ]
}
```

</details>

<!-- GETNEWS_OUTPUT:END -->
<!-- prettier-ignore-end-->

---

### getNewsById

Get game news by id.

#### Options

<!-- prettier-ignore-start -->
<!-- GETNEWSBYID_OPTIONS:START -->

| Parameter      | Type       | Required | Default                       | Description |
| -------------- | ---------- | -------- | ----------------------------- | ----------- |
| id             | `string`   | ✔        |                               | News id     |
| locale         | `string`   | ✖        | `'en-gb'`                     |             |
| fallbackLocale | `string`   | ✖        | `'en-us'`                     |             |
| tags           | `string[]` | ✖        | `['BR-rainbow-six GA-siege']` |             |

<!-- GETNEWSBYID_OPTIONS:END -->
<!-- prettier-ignore-end-->

```ts
await r6api.getNewsById({ id: '26Ar2mQAv7zwB6MN61HVPt' });
```

<!-- prettier-ignore-start -->
<!-- GETNEWSBYID_OUTPUT:START -->

<details>
<summary>Output</summary>

```ts
{
  total: 774,
  tags: [ 'BR-rainbow-six GA-siege' ],
  items: [
    {
      id: '26Ar2mQAv7zwB6MN61HVPt',
      title: 'Demon Veil Reddit AMA Wrap-Up',
      abstract: 'Miss our recent Reddit AMA on Maps & Ops? We’ve collected our answers here for easy reading – and keep an eye out on our channels for future AMAs!',
      thumbnail: {
        url: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/HumVNrTEeDEbkA3ibpHiU/c214adb4a29d6aeab90f73dd74467fad/DevTeamAMARecap_ArticleHeader.png',
        description: ''
      },
      content: 'Coming hot off the recent release of Emerald Plains, our dev team were excited to answer your burning questions about Maps and Operators - past, present, and future. Over the course of the AMA, they answered a variety of topics, including night maps, the design process of Emerald Plains, and their approach to keeping Siege fresh each season. [You can review the full AMA here!](https://www.reddit.com/r/Rainbow6/comments/uep42q/ama_we_are_the_rainbow_six_siege_dev_team_ask_us/)\n' +
        '\n' +
        "We're planning more focused AMAs like this in the future to cover a range of different topics, so keep an eye out for future Q&As!\n" +
        '\n' +
        '---\n' +
        '\n' +
        '__MAPS__\n' +
        '\n' +
        '__Q:__ *What are your plans to combat players banning future new maps/reworks instead of giving them an honest chance?*\n' +
        '\n' +
        '__A:__ Good question! We have plans to change up the existing map ban system later this year and will be sharing more soon but suffice to say, this new system should lead to a wider range of maps seeing more active play in Ranked!  - Alexander\n' +
        '\n' +
        '([Full Post Here](https://www.reddit.com/r/Rainbow6/comments/uep42q/comment/i6owdok/?utm_source=reddit&utm_medium=web2x&context=3))\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '__Q:__ *Curious about Emerald Plains design and what other maps it incorporates from. With the map design process, do you look at other maps and try to incorporate similar structure? Or is it from the ground up?* \n' +
        '\n' +
        "__A:__ The comparisons to Bartlett make sense - Emerald Plains DID begin its life as a Bartlett rework. As we proceeded to change more and more of the map during the reworking phase, we quickly found that it was becoming its own map and didn't fit our definition of a rework, so we decided to shift gears and lean into the newness, theme and all. While there are hints and nods to its old self like the foyer and two front towers, its moment-to-moment gameplay flow is entirely different from its humble beginnings as a Bartlett rework.  - Frédéric and Yann\n" +
        '\n' +
        '([Full Post Here](https://www.reddit.com/r/Rainbow6/comments/uep42q/comment/i6ot1ea/?utm_source=reddit&utm_medium=web2x&context=3))\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '__Q:__ *Is there a possibility to see night maps return to the game, possibly in Casual mode?*\n' +
        '\n' +
        "__A:__ Whenever we choose to make a night map, we need to ensure that it's well-lit to ensure the most balanced and competitive environment possible. It doesn't matter whether a future map is night or day, but the lighting of the map needs to offer fair play. We don't have plans to turn past maps into night maps, but we aren't closing the door to future maps!  - Alexander\n" +
        '\n' +
        '([Full Post Here](https://www.reddit.com/r/Rainbow6/comments/uep42q/comment/i6ou0w1/?utm_source=reddit&utm_medium=web2x&context=3))\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '__Q:__ *What kind of challenges does bringing in new maps for TDM present to the Level Design team? With the introduction of TDM, is this the start of a more reinforced casual side to Siege?*\n' +
        '\n' +
        "__A:__ The main challenge is that this is largely new to us in the scope of Siege. We're used to thinking about attack and defense aspects of our maps, but for TDM, we need to make sure no one area is too defensible - you should be able to easily navigate, and orient yourself, and easily identify opponents at a glance. Let's just say that after making this, we have a lot of ideas we didn't get a chance to use, so we have those stored away.\n" +
        '\n' +
        "As for the question about Siege's casual side, when we have a community that's as large and diverse as the Siege community, we absolutely want to reinforce our casual playlists just as much as we reinforce the competitive side, so this is something that's always important to us to consider.  - Yann and Alexander\n" +
        '\n' +
        '([Full Post Here](https://www.reddit.com/r/Rainbow6/comments/uep42q/comment/i6ovxg5/?utm_source=reddit&utm_medium=web2x&context=3))\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '__Q:__ *How arduous is the process of finding and fixing exploits, unfair angles, and other cheesy things when creating a new map?*\n' +
        '\n' +
        '__A:__ We wish we played viciously enough to catch everything on the first pass! Our QC team is incredibly instrumental in helping us find these issues given the amount of time they put into these maps ahead of release.\\\n' +
        "At the end of the day, though, the community also plays a huge role in this process, as millions of players tend to help catch things that a singular Map team may not always catch. We appreciate your ability to stretch the game's boundaries to their max, which helps to catch these exploits. It makes for an interesting process of searching, resolving, getting feedback, and continuing to iterate.  - Frédéric and Yann\n" +
        '\n' +
        '([Full Post Here](https://www.reddit.com/r/Rainbow6/comments/uep42q/comment/i6p04nx/?utm_source=reddit&utm_medium=web2x&context=3))\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '__Q:__ *How do you tackle map reworks on maps that are popular?*\n' +
        '\n' +
        '__A:__ Oregon is a great example of this. Before every rework, we look at pick rate and win rate of objectives and seek to try and equalize them. This one in particular was becoming stale prior to the rework and certain objectives were played the same way every time, so we tried to analyze which aspects of the map were strongest and most fun. This is where a workshop with pros came in. We often work with them to identify how to make the game flow more versatile and offer up more ways that plays can approach a map instead of falling into a routine they use every time.  - Yann\n' +
        '\n' +
        '([Full Post Here](https://www.reddit.com/r/Rainbow6/comments/uep42q/comment/i6oumb3/?utm_source=reddit&utm_medium=web2x&context=3))\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '__Q:__ *Emerald Plains only has a single point of entry on the roof of the map. What was the thought process behind this?*\n' +
        '\n' +
        '__A:__ Putting entry points on the roof tends to be a tricky balancing act, as there are often very few ways for Defenders to counteract this - specifically when there are hatches on the roof. Regarding the skylight, it was originally far more powerful in an earlier version, but we found with testing that even if you were more vulnerable while rappelling all the way down, it was way too much of an advantage for Attackers and had to be tweaked.  - Yann\n' +
        '\n' +
        '([Full Post Here](https://www.reddit.com/r/Rainbow6/comments/uep42q/comment/i6p9sa0/?utm_source=reddit&utm_medium=web2x&context=3))\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '__OPERATORS__\n' +
        '\n' +
        '__Q:__ *Will we ever have a unique combination of armor and speed in the future? (ie. 3 armor 2 speed)*\n' +
        '\n' +
        `__A:__ Good question! This is something we've experimented with, but are still looking at how we can "break" this system with it still being fun and balanced. We've also been toying with a 4-speed Operator, but the world's not ready yet (and maybe we'll never be ready for it). - Dominic\n` +
        '\n' +
        '([Full Post Here](https://www.reddit.com/r/Rainbow6/comments/uep42q/comment/i6p1i8p/?utm_source=reddit&utm_medium=web2x&context=3))\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '__Q:__ *One of the complaints from more old-school or traditional players is that the game has lost its more realistic tone and design, especially so in the gadgets. Do you plan on continuing this trend of futuristic and sleek looking gadgets? Or do you plan on mixing in more grounded looking gadgets as well as more futuristic looking ones?*\n' +
        '\n' +
        "__A:__ Since Siege's inception, it's been important to us to ground the concepts behind our gadgets in existing real-life technology with the caveat that fun and balanced gameplay comes first. Sometimes, it's necessary to stretch the bounds of reality and the real life tech we use as inspiration to fit the gameplay. Just look at Thatcher and Pulse: a grenade-sized EMP capable of disabling most electronic gadgets and a handheld heartbeat sensor of this strength take tech people are familiar with and stretch their reality to make them fun in a game concept.\n" +
        '\n' +
        "With your example of Thorn, this is quite close to how we handled Thatcher. The look of gadgets may touch on an Op's lore, but 1:1 translations from real life often don't have the same fun factor, so this is where the ingenuity of our designers comes in.\n" +
        '\n' +
        'Looking to the future, we will strive to strike a balance between real life tech inspiration and near-future innovation, all while prioritizing fun-factor. We still apply the same care and thoughtfulness to our gadgetry that we did with our Operators 7 years ago. - Alexander\n' +
        '\n' +
        '([Full Post Here](https://www.reddit.com/r/Rainbow6/comments/uep42q/comment/i6p2xm9/?utm_source=reddit&utm_medium=web2x&context=3))\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        "__Q:__ *How did you collaborate with the game balance team when introducing Azami and her gadget to make sure it isn't too OP, especially since her ability can modify the entire flow of a room?*\n" +
        '\n' +
        "__A:__ From the prototyping phase, we sit down with Balancing once a week to explain our intentions and get an idea of any concerns they may have. This way, we can look at how best to strike that balance and offer as many possible ways to tweak an Operator in the future. We also take time to consider how they can affect (and be affected) by older legacy maps, which sometimes leads into considering reworks for the future. In that way, making an Operator isn't JUST about talking with Operator designers - it touches so many other teams. - Dominic and Frédéric\n" +
        '\n' +
        '([Full Post Here](https://www.reddit.com/r/Rainbow6/comments/uep42q/comment/i6p25q0/?utm_source=reddit&utm_medium=web2x&context=3))\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '__Q:__ *How do you decide who gets what scope magnification? Is there a reason some guns have a 1x and a 2x, but not a 1.5x?*\n' +
        '\n' +
        '__A:__ This really comes down to balancing the distance that an Op is viable at. Due to the nature of their gadgets and gameplay, this helps to determine where Ops play, so choosing their scope magnifications is an extension of helping to define where and what range they play from. This is also why different Ops might have different scopes available, tying directly into their unique styles of play.    \n' +
        "Also, we ARE investigating adding 1.5x scopes, so that's something we're looking at for the future.  - Dominic\n" +
        '\n' +
        '([Full Post Here](https://www.reddit.com/r/Rainbow6/comments/uep42q/comment/i6okjp4/?utm_source=reddit&utm_medium=web2x&context=3))\n' +
        '\n' +
        '<br>\n' +
        '\n' +
        '__Q:__ *Why the sh'... 599 more characters,
      description: undefined,
      categories: [ 'rainbow-six-siege' ],
      tag: 'BR-rainbow-six GA-siege',
      readTime: 9,
      url: 'https://ubisoft.com/en-gb/game/rainbow-six/siege/news-updates/26Ar2mQAv7zwB6MN61HVPt/demon-veil-reddit-ama-wrapup',
      date: 'Mon May 09 2022 14:00:00 GMT+0000 (Coordinated Universal Time)'
    }
  ]
}
```

</details>

<!-- GETNEWSBYID_OUTPUT:END -->
<!-- prettier-ignore-end-->

## 🔌 Custom methods

`src/fetch.ts` contains `fetch`, `ubiServices` and `dataDev` function which could be used to implement your own custom method.
For example, simple implementation of `https://public-ubiservices.ubi.com/v1/spaces/{SPACE}/sandboxes/{SANDBOX}/playerstats2/statistics` endpoint using `ubiServices`:

<details><summary>Show</summary>

```ts
import 'dotenv/config';

import R6API, { getSpacesAndSandboxes, Platform } from 'r6api.js';

const { email, password } = process.env;
export const r6api = new R6API({ email, password });

export interface Playerstats2Statistics {
  results: Playerstats2StatisticsResults;
}

export type Playerstats2StatisticsResults = Record<
  string,
  Record<string, number>
>;

interface GetLegacyUserStatsOptions {
  platform: Platform;
  profileIds: string[];
  statistics: string[];
}
/** Last time it got updates was Crystal Guard */
const getLegacyUserStats = ({
  platform,
  profileIds,
  statistics
}: GetLegacyUserStatsOptions) =>
  r6api.ubiServices<Playerstats2Statistics>({
    version: 1,
    path: `/${getSpacesAndSandboxes({ platform })}/playerstats2/statistics`,
    params: {
      populations: profileIds,
      statistics
    }
  });

// Using custom method
(async () => {
  await getLegacyUserStats({
    platform: 'uplay',
    profileIds: ['0b95544b-0228-49a7-b338-6d15cfbc3d6a'],
    statistics: ['operatorpvp_kills']
  });
})();
```

</details>

## 💌 Acknowledgments

Operator icons from [r6operators.marcopixel.eu](https://r6operators.marcopixel.eu)
