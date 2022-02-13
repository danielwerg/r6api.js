import {
  UUID, Platform, PlatformAll, PlatformAllExtended, RegionId,
  SeasonId, SeasonIdExtended, OldSeasonId, RankIdV1, RankIdV2, RankIdV3, RankIdV4, RankIdV5,
  OperatorName, WeaponTypeIndex, WeaponTypeId, WeaponName,
  BoardId, StatsCategoryName
} from './typings';
import {
  UBISERVICES_URL, STATUS_URL, UBI_URL, SPACE_IDS, SANDBOXES,
  AVATARS_URL, CDN_URL,
  PLATFORMS, PLATFORMSALL, REGIONS, BOARDS,
  SEASONS, OLD_SEASONS, RANKS_V1, RANKS_V2, RANKS_V3, RANKS_V4, RANKS_V5,
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
    ? `https://www.ubisoft.com/${language}/game/rainbow-six/siege/news-updates${id}`
    : `https://www.youtube.com/watch?v=${id}`;

export const getKD = ({ kills, deaths }: { kills?: number; deaths?: number }) =>
  Number(((kills || 0) / (deaths || 1)).toFixed(2));

export const getWinRate = ({ wins, losses }: { wins?: number; losses?: number }) =>
  ((wins || 0) / ((wins || 0) + (losses || 0) || 1) * 100).toFixed(2) + '%';

export const getRankNameFromRankId = (
  rankId: RankIdV3 | RankIdV4 | RankIdV5, seasonId: SeasonId
) =>
  (seasonId >= 23
    ? RANKS_V5[rankId as RankIdV5]
    : seasonId >= 15
      ? RANKS_V4[rankId as RankIdV4]
      : RANKS_V3[rankId as RankIdV3])
    .name;

export const getRankIconFromRankId = (
  rankId: RankIdV3 | RankIdV4 | RankIdV5, seasonId: SeasonId
) =>
  `${GITHUB_ASSETS_URL}/ranks/v${
    seasonId <= 13
      ? '3'
      : seasonId === 14
        ? [17, 18, 19, 20].includes(rankId)
          ? '3.1'
          : '3'
        : seasonId >= 15 && seasonId <= 22
          ? [1, 6, 11, 23].includes(rankId)
            ? '4'
            : [19, 20, 21, 22].includes(rankId)
              ? '3.1'
              : '3'
          : [22, 23, 24].includes(rankId)
            ? '5'
            : [1, 6, 11, 25].includes(rankId)
              ? '4'
              : [19, 20, 21].includes(rankId)
                ? '3.1'
                : '3'
  }/${encodeURIComponent(getRankNameFromRankId(rankId, seasonId))}.png`;

export const getRanksFromSeasonId = (seasonId: SeasonId) =>
  seasonId >= 5 && seasonId <= 14
    ? RANKS_V3
    : seasonId >= 15 && seasonId <= 22
      ? RANKS_V4
      : RANKS_V5;

export const getRankIdFromMmr = (seasonId: SeasonId, mmr: number, matches: number) => {

  const ranks = getRanksFromSeasonId(seasonId);

  const rankId = [...ranks].find(rank => {
    const [min, max] = rank.range;
    if (!min || !max) return 0;
    return min <= mmr && mmr <= max;
  })?.id;

  // Requirements: ≥10 matches to get a rank, ≥100 matches to get a Champions rank
  return (matches > 10
    ? seasonId >= 15 && seasonId <= 22
      ? rankId === 23 && matches < 100 ? ranks.slice(-2)[0]?.id : rankId
      : rankId === 25 && matches < 100 ? ranks.slice(-2)[0]?.id : rankId
    : ranks.slice(0)[0]?.id) as RankIdV3 | RankIdV4 | RankIdV5;

};

export const getBaseMmrFromRankId = (
  seasonId: SeasonId, rankId: RankIdV3 | RankIdV4 | RankIdV5
) => {
  const ranks = getRanksFromSeasonId(seasonId);
  return rankId === 0 ? 0 : [...ranks].find(rank => rank.id === rankId)?.range[0] as number;
};

export const groupBy = <T, K extends keyof T, B extends boolean>(
  array: T[], key: K, removeKey: B
): B extends true ? Record<string, Omit<T, K>[]> : Record<string, T[]> =>
  Object.fromEntries(
    array.reduce((acc, cur) => {
      const groupKey = cur[key];
      const { [key]: _, ...restCur } = cur;
      return acc.set(groupKey, [...(acc.get(groupKey) || []), removeKey ? restCur : cur]);
    }, new Map())
  );

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
  ONLINESTATUS: (ids: UUID[]) =>
    getUbiServicesURL(1, 'users/onlineStatuses', `UserIds=${ids.join(',')}`),
  APPLICATIONS: (applicationIds: UUID[]) =>
    getUbiServicesURL(1, 'applications', `applicationIds=${applicationIds.join(',')}`),
  PROFILEAPPLICATIONS: (ids: UUID[]) =>
    getUbiServicesURL(1, 'profiles/applications', `profileIds=${ids.join(',')}&limit=10000`),
  VALIDATEUSERNAME: (userId: UUID) =>
    getUbiServicesURL(3, `profiles/${userId}/validateUpdate`),
  NEWS: (
    category: string, media: string, placement: string,
    locale: string, fallbackLocale: string,
    limit: number, skip: number, startIndex: number | null
  ) =>
    `${UBI_URL}/api/v1/items` +
    `?categoriesFilter=${category}&mediaFilter=${media}&placementFilter=${placement}` +
    `&locale=${locale}&fallbackLocale=${fallbackLocale}` +
    `&limit=${limit}&skip=${skip}&startIndex=${startIndex}` +
    '&tags=BR-rainbow-six%20GA-siege',
  NEWSBYID: (
    id: string, locale: string, fallbackLocale: string
  ) =>
    `${UBI_URL}/api/v1/items/${id}` +
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

export const isBoardId = (value: string): value is BoardId =>
  Object.keys(BOARDS).includes(value);

export const isSeasonIdExtended = (value: number): value is SeasonIdExtended =>
  Object.keys(SEASONS).map(season => Number(season)).includes(value);

export const isOldSeasonId = (value: number): value is OldSeasonId =>
  Object.keys(OLD_SEASONS).map(season => Number(season)).includes(value);

export const isRankIdV1 = (value: number): value is RankIdV1 =>
  Object.keys(RANKS_V1).map(rank => Number(rank)).includes(value);

export const isRankIdV2 = (value: number): value is RankIdV2 =>
  Object.keys(RANKS_V2).map(rank => Number(rank)).includes(value);

export const isRankIdV3 = (value: number): value is RankIdV3 =>
  Object.keys(RANKS_V3).map(rank => Number(rank)).includes(value);

export const isRankIdV4 = (value: number): value is RankIdV4 =>
  Object.keys(RANKS_V4).map(rank => Number(rank)).includes(value);

export const isRankIdV5 = (value: number): value is RankIdV5 =>
  Object.keys(RANKS_V5).map(rank => Number(rank)).includes(value);

export const isOperatorName = (value: string): value is OperatorName =>
  Object.values(OPERATORS).map(op => op.name).includes(value);

export const isWeaponTypeIndex = (value: string): value is WeaponTypeIndex =>
  Object.keys(WEAPONTYPES).includes(value);

export const isWeaponTypeId = (value: string): value is WeaponTypeId =>
  (Object.values(WEAPONTYPES).map(weapontype => weapontype.id) as string[]).includes(value);

export const isWeaponName = (value: string): value is WeaponName =>
  Object.keys(WEAPONS).includes(value);

export const isStatsCategoryName = (value: string): value is StatsCategoryName =>
  Object.keys(STATS_CATEGORIES).includes(value);
