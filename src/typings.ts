import * as constants from './constants';

export type UUID = string;

export type Platform = typeof constants.PLATFORMS[number];
export type PlatformAll = typeof constants.PLATFORMSALL[number];
export type PlatformAllExtended = PlatformAll | 'all';

export type RegionId = keyof typeof constants.REGIONS;

export type SeasonId = keyof typeof constants.SEASONS;
export type SeasonIdExtended = SeasonId | -1;
export type OldSeasonId = keyof typeof constants.OLD_SEASONS;

/** ? Dust Line (2) - Skull Rain (3) */
export type RankIdV1 = typeof constants.RANKS_V1[number]['id'];
/** Red Crow (4) */
export type RankIdV2 = typeof constants.RANKS_V2[number]['id'];
/** Velvet Shell (5) - Phantom Sight (14) */
export type RankIdV3 = typeof constants.RANKS_V3[number]['id'];
/** Ember Rise (15) - North Star (22) */
export type RankIdV4 = typeof constants.RANKS_V4[number]['id'];
/** Crystal Guard (23) - latest */
export type RankIdV5 = typeof constants.RANKS_V5[number]['id'];

export type OperatorName = keyof typeof constants.OPERATORS;

export type WeaponTypeIndex = keyof typeof constants.WEAPONTYPES;
export type WeaponTypeId = typeof constants.WEAPONTYPES[WeaponTypeIndex]['id'];
export type WeaponName = keyof typeof constants.WEAPONS;

export type MPType = 'pvp' | 'pve';
export type BoardId = keyof typeof constants.BOARDS;

export type StatsCategoryName = keyof typeof constants.STATS_CATEGORIES;

export type IOptionsDocs =
  [Param: string, Type: string, Required: boolean, Default: string, Description: string][]
