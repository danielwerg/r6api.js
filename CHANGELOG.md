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

### Changed
* `getId` -> `findByUsername`
* `getUsername` -> `findById`
* `getLevel` -> `getProgression`
* `getRank` -> `getRanks`
* `doc/getStats-response.json` -> `docs/methods/getStats.json` along with all other methods
* runkit example was moved to the root
* `ts-utils.ts` was moved from root to `src/utils.ts`
* `uniqueAbility` in `getStats` will now return object with `name`, `icon` and `stats` array instead of just stats array

### Removed
* `response.js` script
* `.npmignore`

[Unreleased]: https://github.com/danielwerg/r6api.js/compare/v1.4.1...typescript