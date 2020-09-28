# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
* `getNews` method
* `getNewsById` method
* `example`, `insertContent` and `methods` scripts
* ESLint
* EditorConfig
* `xp` general xp stats
* Full names of each region in `getRanks` response

### Changed
* `getId` -> `findByUsername`
* `getUsername` -> `findById`
* `getLevel` -> `getProgression`
* `getRank` -> `getRanks`
* `doc/getStats-response.json` -> `docs/methods/getStats.json` along with all other methods
* `ts-utils.ts` was moved from root to `src/utils.ts`
* `uniqueAbility` in `getStats` will now return object with `name`, `icon` and `stats` array instead of just stats array
* `WEAPONS` in `constants.ts` is now object of objects with `id` and `name`
* Weapons list in `getStats` response is now object of objects
* Now using GitHub instead of Imgur to host operator and rank icons

### Removed
* `response.js` script
* `.npmignore`
* Id from `getRanks` `seasons` response

[Unreleased]: https://github.com/danielwerg/r6api.js/compare/v1.5.0...typescript