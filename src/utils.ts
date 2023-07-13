import { inRange, RANKS_SEASONS } from 'r6data';

import { SANDBOXES_ID, SPACES_ID } from './constants';
import type {
  BoardLongSlug,
  BoardSlug,
  ItemType,
  MatchResult,
  NimbusItems,
  NimbusItemsId,
  Service,
  Platform,
  ServiceAndCrossplay,
  SpacesAndSandboxes
} from './types';

export interface GetAvatarOptions {
  userId: string | null;
  size: 146 | 256 | 500;
}
export const getAvatar = ({ userId, size }: GetAvatarOptions) =>
  `https://ubisoft-avatars.akamaized.net/${userId ?? 'default'}/default_${
    size === 500 ? 'tall' : `${size}_${size}`
  }.png`;
export const getAvatars = ({ userId }: { userId: string | null }) => ({
  146: getAvatar({ userId, size: 146 }),
  256: getAvatar({ userId, size: 256 }),
  500: getAvatar({ userId, size: 500 })
});

export type GetSpacesAndSandboxesOptions = {
  platform: ServiceAndCrossplay;
} & SpacesAndSandboxes;
/** Returns `spaces/{SPACE}/sandboxes/{SANDBOX}` */
export const getSpacesAndSandboxes = ({
  platform,
  spacesIds,
  sandboxesIds
}: GetSpacesAndSandboxesOptions) =>
  `spaces/${(spacesIds ?? SPACES_ID)[platform]}/sandboxes/${
    (sandboxesIds ?? SANDBOXES_ID)[platform]
  }`;

export const toShortBoardSlug = (boardLongSlug: BoardLongSlug) =>
  boardLongSlug.replace(/pv(p|e)_/, '') as BoardSlug;

export const getMatchResult = (resultCode: MatchResult) =>
  ({ 0: 'unknown', 1: 'won', 2: 'lost', 3: 'abandon' }[resultCode]);

export const getKD = ({ kills, deaths }: { kills: number; deaths: number }) =>
  Number((kills / (deaths || 1)).toFixed(2));

export const getWL = ({ wins, losses }: { wins: number; losses: number }) =>
  Number((wins / (losses || 1)).toFixed(2));

export interface GetWinRate {
  wins: number;
  losses: number;
}
export const getWinRate = ({ wins, losses }: GetWinRate) =>
  `${((wins / (wins + losses || 1)) * 100).toFixed(0)}%`;

export interface GetRankOptions {
  seasonId: number;
  rankId: number;
  mmr: number;
  boardSlug: BoardSlug;
}
export const getRank = ({
  seasonId,
  rankId,
  mmr,
  boardSlug
}: GetRankOptions) => ({
  mmr,
  ...RANKS_SEASONS.find(rank =>
    inRange({ range: rank.seasonsRange, point: seasonId })
  )!.ranks.find(({ id, range }) =>
    boardSlug !== 'ranked' && range
      ? inRange({ range, point: mmr })
      : rankId === id
  )
});

export interface GetRP {
  seasonId: number;
  rankId: number;
  mmr: number;
}
export const getRP = ({ seasonId, rankId, mmr }: GetRP) =>
  mmr -
  (RANKS_SEASONS.find(({ seasonsRange }) =>
    inRange({ range: seasonsRange, point: seasonId })
  )?.ranks.find(rank => rank.id === rankId)?.range?.[0] ?? 0);

export const groupBy = <T, K extends string | number>(
  array: T[],
  getKey: (item: T) => K
) =>
  array.reduce((acc, cur) => {
    const group = getKey(cur);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!acc[group]) acc[group] = [];
    acc[group].push(cur);
    return acc;
  }, {} as Record<K, T[]>);

export const chunk = <T>(arr: T[], size: number) =>
  arr.reduce<T[][]>(
    (acc, cur, i) => (
      i % size ? acc[acc.length - 1]?.push(cur) : acc.push([cur]), acc
    ),
    []
  );

export const getServiceOrPlatform = (platform: Service | Platform) =>
  (
    [
      { service: 'uplay', platfrom: 'pc' },
      { service: 'xbl', platfrom: 'xone' },
      { service: 'psn', platfrom: 'ps4' }
    ] as const
  ).find(
    _platform =>
      _platform.service === platform || _platform.platfrom === platform
  )!;

export const capitalize = ([first, ...rest]: string) =>
  `${(first ?? '').toUpperCase()}${rest.join('')}`;

export interface GetNewsURLOptions {
  type: ItemType;
  path: string;
  locale: string;
}
export const getNewsURL = ({ type, path, locale }: GetNewsURLOptions) =>
  type === 'videos'
    ? `https://youtube.com/watch?v=${path}`
    : `https://ubisoft.com/${locale}/game/rainbow-six/siege/news-updates${path}`;
export const isNimbusItems = (
  news: NimbusItems | NimbusItemsId
): news is NimbusItems => 'limit' in news;
export interface ProcessNewsOptions {
  news: NimbusItems | NimbusItemsId;
  locale: string;
}
export const processNews = ({ news, locale }: ProcessNewsOptions) => ({
  total: news.total,
  ...(isNimbusItems(news) && {
    limit: news.limit,
    categories: news.categoriesFilter,
    media: news.mediaFilter,
    skip: news.skip,
    startIndex: news.startIndex,
    placement: news.placementFilter
  }),
  tags: news.tags,
  items: news.items.map(item => ({
    id: item.id,
    title: item.title.trim(),
    abstract: item.abstract?.trim(),
    thumbnail: item.thumbnail,
    content: item.content,
    description: item.description,
    categories: item.categories,
    tag: item.tag,
    readTime: item.readTime,
    url: getNewsURL({
      type: item.type,
      path: item.button.buttonUrl,
      locale
    }),
    date: item.date
  }))
});
