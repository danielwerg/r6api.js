import * as constants from './constants';

export type UUID = string;

export type Platform = 'uplay' | 'psn' | 'xbl';

export type RegionId = 'emea' | 'ncsa' | 'apac';

export type SeasonId = keyof typeof constants.SEASONS;
export type SeasonIdExtended = SeasonId | -1;
export type OldSeasonId = keyof typeof constants.OLD_SEASONS;

export type RankId = keyof typeof constants.RANKS;
export type OldRankId = keyof typeof constants.OLD_RANKS;

export type OperatorName = keyof typeof constants.OPERATORS;

export type WeaponTypeIndex = keyof typeof constants.WEAPONTYPES;
export type WeaponTypeId = typeof constants.WEAPONTYPES[
  keyof typeof constants.WEAPONTYPES
]['id'];
export type WeaponName = keyof typeof constants.WEAPONS;

export type MPType = 'pvp' | 'pve';

export type StatsCategoryName = keyof typeof constants.STATS_CATEGORIES;
