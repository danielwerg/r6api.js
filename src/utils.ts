import {
  UUID, Platform, PlatformAll, PlatformAllExtended, RegionId,
  SeasonId, SeasonIdExtended, OldSeasonId, RankId, OldRankId,
  OperatorName, WeaponTypeIndex, WeaponTypeId, WeaponName,
  BoardId, StatsCategoryName
} from './typings';
import {
  UBISERVICES_URL, STATUS_URL, UBI_URL, SPACE_IDS, SANDBOXES,
  AVATARS_URL, CDN_URL,
  PLATFORMS, PLATFORMSALL, REGIONS,
  SEASONS, OLD_SEASONS, RANKS, OLD_RANKS,
  OPERATORS, WEAPONTYPES, WEAPONS,
  STATS_CATEGORIES, GITHUB_ASSETS_URL
} from './constants';

export const getAvatarURL = (id: UUID, size = 256) =>
  `${AVATARS_URL}/${id}/default_${size === 500 ? 'tall' : `${size}_${size}`}.png`;

export const getAvatars = (id: UUID) => ({
  146: getAvatarURL(id, 146), 256: getAvatarURL(id, 256), 500: getAvatarURL(id, 500)
});

export const getCDNURL = (id: UUID, format = 'png') =>
  `${CDN_URL}/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/${id}.${format}`;

export const getNewsURL = (language: string, type: string, id: string) =>
  type === 'news'
    ? `https://www.ubisoft.com/${language}/game/rainbow-six/siege${id}`
    : `https://www.youtube.com/watch?v=${id}`;

export const getKD = ({ kills, deaths }: { kills?: number; deaths?: number }) =>
  Number(((kills || 0) / (deaths || 1)).toFixed(2));

export const getWinRate = ({ wins, losses }: { wins?: number; losses?: number }) =>
  ((wins || 0) / ((wins || 0) + (losses || 0) || 1) * 100).toFixed(2) + '%';

export const getRankNameFromRankId = (rankId: RankId, seasonId: SeasonId) =>
  seasonId < 15 ? OLD_RANKS[rankId as OldRankId] : RANKS[rankId];

export const getRankIconFromRankId = (rankId: RankId, seasonId: SeasonId) =>
  `${GITHUB_ASSETS_URL}/ranks/v${
    seasonId < 14 ? '3' : seasonId < 15
      ? [17, 18, 19, 20].includes(rankId) ? '3.1' : '3'
      : [1, 6, 11, 23].includes(rankId)
        ? '3.2' : [19, 20, 21, 22].includes(rankId) ? '3.1' : '3'
  }/${encodeURIComponent(getRankNameFromRankId(rankId, seasonId))}.png`;

export const getRankIdFromMmr = (mmr: number, matches: number) => {

  const ranksRange = [
    1100, 1200, 1300, 1400, 1500,
    1600, 1700, 1800, 1900, 2000,
    2100, 2200, 2300, 2400, 2500,
    2600, 2800, 3000,
    3200, 3600, 4000,
    4400, 5000
  ];

  const pointInRange = ranksRange.find((prevMmr, i, arr) => {
    const nextMmr = arr[i + 1] || Infinity;
    return (mmr - prevMmr) * (mmr - nextMmr) < 0
      || mmr === prevMmr
      || mmr < arr[0] && prevMmr === arr[0];
  });

  const rankId = ranksRange.findIndex(point => point === pointInRange) + 1;

  // Requirements: ≥10 matches to get a rank, ≥100 matches to get a Champions rank
  return (matches < 10 ? 0 : rankId === 23 && matches < 100 ? 22 : rankId) as RankId;

};

const getUbiServicesURL = (version: 1 | 2 | 3, pathname: string, search?: string) =>
  `${UBISERVICES_URL}/v${version}/${pathname}${search ? `?${search}` : ''}`;
const getUbiServicesPlatformURL = (platform: Platform, pathname: string, search: string) =>
  `${UBISERVICES_URL}/v1/spaces/${SPACE_IDS[platform]}/sandboxes/${SANDBOXES[platform]}` +
  `/${pathname}${search ? `?${search}` : ''}`;

export const getURL = {
  LOGIN: () => getUbiServicesURL(3, 'profiles/sessions'),
  BYUSERNAME: (platform: PlatformAll, usernames: string[]) =>
    getUbiServicesURL(3, 'profiles', `platformType=${platform}&namesOnPlatform=${usernames}`),
  BYUSERID: (ids: UUID[]) =>
    getUbiServicesURL(3, 'profiles', `userIds=${ids.join(',')}`),
  BYPROFILEID: (ids: UUID[]) =>
    getUbiServicesURL(3, 'profiles', `profileIds=${ids.join(',')}`),
  BYIDONPLATFORM: (platform: PlatformAll, ids: UUID[]) => getUbiServicesURL(
    3, 'profiles', `platformType=${platform}&idsOnPlatform=${ids.join(',')}`
  ),
  PLAYTIME: (platform: Platform, ids: UUID[]) => getUbiServicesPlatformURL(
    platform,
    'playerstats2/statistics',
    `populations=${ids.join(',')}&statistics=generalpvp_timeplayed,generalpve_timeplayed` +
    ',rankedpvp_timeplayed,casualpvp_timeplayed,custompvp_timeplayed'
  ),
  PROGRESS: (platform: Platform, ids: UUID[]) => getUbiServicesPlatformURL(
    platform, 'r6playerprofile/playerprofile/progressions', `profile_ids=${ids.join(',')}`
  ),
  RANKS: (
    platform: Platform, ids: UUID[], season: SeasonIdExtended, region: RegionId, board: BoardId
  ) => getUbiServicesPlatformURL(
    platform,
    'r6karma/players',
    `board_id=${board}&profile_ids=${ids}&region_id=${region}&season_id=${season}`
  ),
  STATS: (platform: Platform, ids: UUID[], stats: string) => getUbiServicesPlatformURL(
    platform, 'playerstats2/statistics', `populations=${ids.join(',')}&statistics=${stats}`
  ),
  STATUS: () => `${STATUS_URL}/v1/instances`,
  VALIDATEUSERNAME: (userId: UUID) =>
    getUbiServicesURL(3, `profiles/${userId}/validateUpdate`),
  NEWS: (
    category: string, filter: string,
    locale: string, fallbackLocale: string,
    limit: number, skip: number, startIndex: number | null
  ) =>
    `${UBI_URL}/api/updates/items` +
    `?categoriesFilter=${category}&mediaFilter=${filter}` +
    `&locale=${locale}&fallbackLocale=${fallbackLocale}` +
    `&limit=${limit}&skip=${skip}&startIndex=${startIndex}` +
    '&tags=BR-rainbow-six%20GA-siege',
  NEWSBYID: (
    id: string, locale: string, fallbackLocale: string
  ) =>
    `${UBI_URL}/api/updates/items` +
    `?entryId=${id}&locale=${locale}&fallbackLocale=${fallbackLocale}` +
    '&tags=BR-rainbow-six%20GA-siege'
};

export const isPlatform = (value: string): value is Platform =>
  PLATFORMS.map(platform => platform.toString()).includes(value);

export const isPlatformAll = (value: string): value is PlatformAll =>
  PLATFORMSALL.map(platform => platform.toString()).includes(value);

export const isPlatformAllExtended = (value: string): value is PlatformAllExtended =>
  [...PLATFORMSALL.map(platform => platform.toString()), 'all'].includes(value);

export const isRegionId = (value: string): value is RegionId =>
  Object.keys(REGIONS).includes(value);

export const isSeasonId = (value: number): value is SeasonId =>
  Object.keys(SEASONS).map(season => Number(season)).includes(value);

export const isSeasonIdExtended = (value: number): value is SeasonIdExtended =>
  Object.keys(SEASONS).map(season => Number(season)).includes(value);

export const isOldSeasonId = (value: number): value is OldSeasonId =>
  Object.keys(OLD_SEASONS).map(season => Number(season)).includes(value);

export const isRankId = (value: number): value is RankId =>
  Object.keys(RANKS).map(rank => Number(rank)).includes(value);

export const isOldRankId = (value: number): value is OldRankId =>
  Object.keys(OLD_RANKS).map(rank => Number(rank)).includes(value);

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
