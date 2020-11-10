import {
  UUID, Platform, RegionId,
  SeasonId, OldSeasonId, RankId, OldRankId,
  OperatorName, WeaponTypeIndex, WeaponTypeId, WeaponName,
  StatsCategoryName
} from './typings';
import {
  BASE_API_URL, ALT_API_URL, STATUS_API_URL,
  API_VERSIONS, SPACE_IDS, SANDBOXES,
  AVATAR_BASE_URL, CDN_BASE_URL,
  PLATFORMS, REGIONS,
  SEASONS, OLD_SEASONS, RANKS, OLD_RANKS,
  OPERATORS, WEAPONTYPES, WEAPONS,
  STATS_CATEGORIES
} from './constants';

export const getAvatarURL = (id: UUID, size = 256) =>
  `${AVATAR_BASE_URL}/${id}/default_${size === 500 ? 'tall' : `${size}_${size}`}.png`;

export const getCDNURL = (id: UUID, format = 'png') =>
  `${CDN_BASE_URL}/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/${id}.${format}`;

export const getAvatars = (id: UUID) => ({
  146: getAvatarURL(id, 146), 256: getAvatarURL(id, 256), 500: getAvatarURL(id, 500)
});

export const getNewsURL = (language: string, type: string, id: string) =>
  type === 'news'
    ? `https://www.ubisoft.com/${language}/game/rainbow-six/siege${id}`
    : `https://www.youtube.com/watch?v=${id}`;

export const getKD = (obj: { kills?: number; deaths?: number }) =>
  Number(((obj.kills || 0) / (obj.deaths || 1)).toFixed(2));

export const getWinRate = (obj: { wins?: number; losses?: number }) =>
  ((obj.wins || 0) / ((obj.wins || 0) + (obj.losses || 0) || 1) * 100)
    .toFixed(2) + '%';

const getBaseVersion = (version: number, base?: string) =>
  `${base ? base : BASE_API_URL}/${API_VERSIONS[`V${version}`]}`;
const getSpacesAndSandboxes = (platform: Platform) =>
  `spaces/${SPACE_IDS[platform]}/sandboxes/${SANDBOXES[platform]}`;
const getStatsBase = (platform: Platform) =>
  `${getBaseVersion(1)}/${getSpacesAndSandboxes(platform)}`;

export const URLS = {
  LOGIN: () => `${getBaseVersion(3)}/profiles/sessions`,
  BYUSERNAME: (platform: Platform, usernames: string[]) =>
    getBaseVersion(2) +
    `/profiles?nameOnPlatform=${usernames.join(',')}&platformType=${platform}`,
  BYID: (platform: Platform, ids: UUID[]) =>
    `${getBaseVersion(2)}/profiles?platformType=${platform}&idOnPlatform=${ids.join(',')}`,
  BYUSERID: (ids: UUID[]) =>
    `${getBaseVersion(2)}/profiles?userId=${ids.join(',')}`,
  PROGRESS: (platform: Platform, ids: UUID[]) =>
    getStatsBase(platform) + '/r6playerprofile/playerprofile/progressions' +
    `?profile_ids=${ids.join(',')}`,
  PLAYTIME: (platform: Platform, ids: UUID[]) =>
    getStatsBase(platform) + `/playerstats2/statistics?populations=${ids.join(',')}` +
    '&statistics=generalpvp_timeplayed,rankedpvp_timeplayed,casualpvp_timeplayed,' +
    'custompvp_timeplayed,generalpve_timeplayed',
  RANKS: (platform: Platform, ids: UUID[], season: number, region: string) =>
    getStatsBase(platform) + '/r6karma/players?board_id=pvp_ranked' +
    `&profile_ids=${ids}&region_id=${region}&season_id=${season}`,
  STATS: (platform: Platform, ids: UUID[], stats: string) =>
    getStatsBase(platform) + '/playerstats2/statistics' +
    `?populations=${ids.join(',')}&statistics=${stats}`,
  STATUS: () =>
    `${STATUS_API_URL}/${API_VERSIONS.V1}/instances`,
  NEWS: (
    category: string, filter: string,
    locale: string, fallbackLocale: string,
    limit: number, skip: number, startIndex: number | null
  ) =>
    `${ALT_API_URL}/api/updates/items` +
    `?categoriesFilter=${category}&mediaFilter=${filter}` +
    `&locale=${locale}&fallbackLocale=${fallbackLocale}` +
    `&limit=${limit}&skip=${skip}&startIndex=${startIndex}` +
    '&tags=BR-rainbow-six%20GA-siege',
  NEWSBYID: (
    id: string, locale: string, fallbackLocale: string
  ) =>
    `${ALT_API_URL}/api/updates/items` +
    `?entryId=${id}&locale=${locale}&fallbackLocale=${fallbackLocale}` +
    '&tags=BR-rainbow-six%20GA-siege'
};

export const isPlatform = (value: string): value is Platform =>
  PLATFORMS.includes(value);

export const isRegionId = (value: string): value is RegionId =>
  Object.keys(REGIONS).includes(value);

export const isSeasonId = (value: number): value is SeasonId =>
  Object.keys(SEASONS).map(season => parseInt(season)).includes(value);

export const isOldSeasonId = (value: number): value is OldSeasonId =>
  Object.keys(OLD_SEASONS).map(season => parseInt(season)).includes(value);

export const isRankId = (value: number): value is RankId =>
  Object.keys(RANKS).map(rank => parseInt(rank)).includes(value);

export const isOldRankId = (value: number): value is OldRankId =>
  Object.keys(OLD_RANKS).map(rank => parseInt(rank)).includes(value);

export const isOperatorName = (value: string): value is OperatorName =>
  Object.values(OPERATORS).map(op => op.name).includes(value);

export const isWeaponTypeIndex = (value: string): value is WeaponTypeIndex =>
  Object.keys(WEAPONTYPES).includes(value);

export const isWeaponTypeId = (value: string): value is WeaponTypeId =>
  (Object.values(WEAPONTYPES).map(weapontype => weapontype.id) as string[]).includes(value);

export const isWeaponName = (value: string): value is WeaponName =>
  (Object.values(WEAPONS).map(wp => wp.name) as string[]).includes(value);

export const isStatsCategoryName = (value: string): value is StatsCategoryName =>
  Object.keys(STATS_CATEGORIES).includes(value);
