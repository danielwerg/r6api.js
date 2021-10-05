# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.0] - 2021-10-05

### Added
* Crystal Guard Season
* Osa operator

### Changed
* Colors for all seasons ([source](https://www.ubisoft.com/en-us/game/rainbow-six/siege/game-info/seasons))
* Status code in fetch error
* `RANKS` and `OLD_RANKS` replaced with `RANKS_V1`, `RANKS_V2`, `RANKS_V3`, `RANKS_V4`, `RANKS_V5` and now has `range` value for mmr range

### Fixed
* Double export of default for es modules

## [2.1.0] - 2021-08-06

### Added
* `getUserStatus` method
* `getProfileApplications` method
* `getApplications` method
* Past seasons stats for `getRanks`
* Unique ability stats for Thunderbird
* Unique ability stat for Frost
* Unique ability stat for Caveira
* DP27 weapon

### Changed
* Unique ability for Tachanka
* Unique ability stat namining for several operators
* Now exporting all interfaces from me methods

### Fixed
* Unique ability stats for Thatcher
* Unique ability name for Frost

## [2.0.2] - 2021-06-25

Forgot to build for v2.0.1

## [2.0.1] - 2021-06-25

### Fixed
* Fix typings for `getStats` weapons list [#60](https://github.com/danielwerg/r6api.js/pull/60)

## [2.0.0] - 2021-06-20

### Added
* `getNews` method
* `getNewsById` method
* `validateUsername` method
* `example`, `insertContent` and `methods` scripts
* ESLint
* EditorConfig

### Changed
* `getId` -> `findByUsername`
* `getUsername` -> `findById`
* `findById` now accepts `all` for `platform` parameter and has `isUserId` option
* `getLevel` -> `getProgression`
* `getRank` -> `getRanks`
* `doc/getStats-response.json` -> `docs/methods/getStats.json` along with all other methods
* `ts-utils.ts` was moved from root to `src/utils.ts`
* `uniqueAbility` in `getStats` will now return object with `name`, `icon` and `stats` array instead of just stats array
* `WEAPONS` in `constants.ts` is now object of objects with `id` and `name`
* Weapons list in `getStats` response is now object of objects
* Now using GitHub instead of Imgur to host operator and rank icons
* `getRanks` response changed by a lot, check docs to see expected response
* `getRanks` now support multiple boards and not only `pvp_ranked`
* Option to set custom `Ubi-AppId` header, `authFileDirPath `, `authFileName` and `authFilePath`

### Removed
* `response.js` script
* `.npmignore`

[Unreleased]: https://github.com/danielwerg/r6api.js/compare/v3.0.0...master
[3.0.0]: https://github.com/danielwerg/r6api.js/compare/v2.1.2...v3.0.0
[2.1.0]: https://github.com/danielwerg/r6api.js/compare/v2.0.2...v2.1.0
[2.0.2]: https://github.com/danielwerg/r6api.js/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/danielwerg/r6api.js/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/danielwerg/r6api.js/compare/v1.7.0...v2.0.0