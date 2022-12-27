# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Solar Raid season
- Solis operator
- `getUserSeasonalv2` methods for Ranked 2.0 stats
- `RANKS_V6` in `constants.ts`

### Changed

- `ubiAppId` in `constants.ts` to `e3d5ea9e-50bd-43b7-88bf-39794f4e3d40`

## [4.4.1] - 2022-09-06

### Fixed

- Build javascript for [4.4.0]

## [4.4.0] - 2022-09-06

### Added

- Brutal Swarm season
- Grim operator
- Grim icon

### Fixed

- Icon for M249 SAW

## [4.3.0] - 2022-06-28

### Added

- [`prepare`](https://docs.npmjs.com/cli/v8/using-npm/scripts#prepare-and-prepublish) script that will check if `dist` dir exists and if not runs `build` script on `npm install` or `yarn install`, only relevant when installing from GitHub

## [4.2.1] - 2022-06-27

### Fixed

- Inconsistency with the `isOperatorName` utility function ([71ea801](https://github.com/danielwerg/r6api.js/commit/71ea80181505d5adaac524e793c255f33f933cb3))

## [4.2.0] - 2022-06-16

### Added

- Vector Glare season
- Sens operator
- Sens upscaled icon

### Changed

- Updated seasons colors

## [4.1.0] - 2022-03-16

### Added

- Demon Veil season
- Azami operator
- Azami icon

## [4.0.1] - 2022-02-14

### Fixed

- `isWeaponName` function now correctly checks for the weapon `id`

## [4.0.0] - 2021-12-04

> Note: `Thorn` is missing `id` (see: [#78](https://github.com/danielwerg/r6api.js/issues/78))

### Added

- High Calibre season and Thorn ([0d771a](https://github.com/danielwerg/r6api.js/commit/0d771a8a0b321db157ab4d1ac20ce651775b232d))
- Thorn icon ([0fcd822](https://github.com/danielwerg/r6api.js/commit/0fcd822a7c7fcce3c66d5d127994555de30b87a0))

### Changed

- All operator icons to new style (translucent border and more simplistic), resolution from 1500x1500 to 1000x1000 ([0fcd822](https://github.com/danielwerg/r6api.js/commit/0fcd822a7c7fcce3c66d5d127994555de30b87a0))
- `[getRanks].[number].seasons`, `[getRanks].[number].seasons[seasonId].regions` and `[getRanks].[number].seasons[seasonId].regions[regionId].boards` using `Record` type now ([fe78b53](https://github.com/danielwerg/r6api.js/commit/fe78b537180401bcfb4adc85ef258d32d20589fa))
- **[BREAKING?]** `[getRanks].[number].seasons[seasonId].seasonColor` type from `string` to `#${string}` ([String Types as Discriminants](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5/#template-string-discriminants)) ([b85b1fd](https://github.com/danielwerg/r6api.js/commit/b85b1fd0a392724c863d5b49691af4c660308c64))

### Fixed

- Types for `[getUserStatus].status` ([f309108](https://github.com/danielwerg/r6api.js/commit/f309108cb48e0493898670754a9dde450c64d735))

## [3.1.0] - 2021-10-22

### Added

- `placement` options for `getNews`

### Changed

- Change default `locale` for `getNews` and `getNewsById` from `en-us` to `en-gb`

### Fixed

- Ubisoft news url and endpoint
- Types for `getNews` and `getNewsById`
- Error message for `fetch.ts` returning `undefined` if `json.httpCode` and/or `json.message` is not present

## [3.0.0] - 2021-10-05

### Added

- Crystal Guard Season
- Osa operator

### Changed

- Colors for all seasons ([source](https://www.ubisoft.com/en-us/game/rainbow-six/siege/game-info/seasons))
- Status code in fetch error
- **[Breaking]** `RANKS` and `OLD_RANKS` replaced with `RANKS_V1`, `RANKS_V2`, `RANKS_V3`, `RANKS_V4`, `RANKS_V5` and now has `range` value for mmr range

### Fixed

- Double export of default for es modules

## [2.1.0] - 2021-08-06

### Added

- `getUserStatus` method
- `getProfileApplications` method
- `getApplications` method
- Past seasons stats for `getRanks`
- Unique ability stats for Thunderbird
- Unique ability stat for Frost
- Unique ability stat for Caveira
- DP27 weapon

### Changed

- Unique ability for Tachanka
- Unique ability stat namining for several operators
- Now exporting all interfaces from me methods

### Fixed

- Unique ability stats for Thatcher
- Unique ability name for Frost

## [2.0.2] - 2021-06-25

Forgot to build for v2.0.1

## [2.0.1] - 2021-06-25

### Fixed

- Fix typings for `getStats` weapons list [#60](https://github.com/danielwerg/r6api.js/pull/60)

## [2.0.0] - 2021-06-20

### Added

- `getNews` method
- `getNewsById` method
- `validateUsername` method
- `example`, `insertContent` and `methods` scripts
- ESLint
- EditorConfig

### Changed

- `getId` -> `findByUsername`
- `getUsername` -> `findById`
- `findById` now accepts `all` for `platform` parameter and has `isUserId` option
- `getLevel` -> `getProgression`
- `getRank` -> `getRanks`
- `doc/getStats-response.json` -> `docs/methods/getStats.json` along with all other methods
- `ts-utils.ts` was moved from root to `src/utils.ts`
- `uniqueAbility` in `getStats` will now return object with `name`, `icon` and `stats` array instead of just stats array
- `WEAPONS` in `constants.ts` is now object of objects with `id` and `name`
- Weapons list in `getStats` response is now object of objects
- Now using GitHub instead of Imgur to host operator and rank icons
- `getRanks` response changed by a lot, check docs to see expected response
- `getRanks` now support multiple boards and not only `pvp_ranked`
- Option to set custom `Ubi-AppId` header, `authFileDirPath `, `authFileName` and `authFilePath`

### Removed

- `response.js` script
- `.npmignore`

[unreleased]: https://github.com/danielwerg/r6api.js/compare/v4.4.1...master
[4.4.1]: https://github.com/danielwerg/r6api.js/compare/v4.4.0...v4.4.1
[4.4.0]: https://github.com/danielwerg/r6api.js/compare/v4.3.0...v4.4.0
[4.3.0]: https://github.com/danielwerg/r6api.js/compare/v4.2.1...v4.3.0
[4.2.1]: https://github.com/danielwerg/r6api.js/compare/v4.2.0...v4.2.1
[4.2.0]: https://github.com/danielwerg/r6api.js/compare/v4.1.0...v4.2.0
[4.1.0]: https://github.com/danielwerg/r6api.js/compare/v4.0.1...v4.1.0
[4.0.1]: https://github.com/danielwerg/r6api.js/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/danielwerg/r6api.js/compare/v3.1.0...v4.0.0
[3.1.0]: https://github.com/danielwerg/r6api.js/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/danielwerg/r6api.js/compare/v2.1.0...v3.0.0
[2.1.0]: https://github.com/danielwerg/r6api.js/compare/v2.0.2...v2.1.0
[2.0.2]: https://github.com/danielwerg/r6api.js/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/danielwerg/r6api.js/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/danielwerg/r6api.js/compare/v1.7.0...v2.0.0
