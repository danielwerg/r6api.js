import { fetch } from '../fetch';
import type { NimbusItems, OptionsDocs, PlacementFilter } from '../types';
import { processNews } from '../utils';

export type CategoryFilter =
  | 'all'
  | 'game-updates'
  | 'patch-notes'
  | 'community'
  | 'store'
  | 'esports';

export type MediaFilter = 'all' | 'news' | 'videos';

export const getNewsOptions: OptionsDocs = [
  ['locale', 'string', false, '\'en-gb\'', ''],
  ['fallbackLocale', 'string', false, '\'en-us\'', ''],
  [
    'category',
    'string',
    false,
    '\'all\'',
    '`\'all\'`, `\'game-updates\'`, `\'patch-notes\'`, `\'community\'`, `\'store\'`, `\'esports\'`'
  ],
  ['media', 'string', false, '\'all\'', '`\'all\'`, `\'news\'`, `\'videos\'`   '],
  ['placement', 'string', false, '\'\'', 'Ex: `\'featured-news-article\'` '],
  ['limit', 'number', false, '6', ''],
  ['skip', 'number', false, '0', ''],
  ['startIndex', 'number', false, '0', ''],
  ['tags', 'string[]', false, '[\'BR-rainbow-six GA-siege\']', '']
];

export interface GetNewsOptions {
  /** Defaults to `'en-gb'` */
  locale?: string;
  /** Defaults to `'en-us'` */
  fallbackLocale?: string;
  /** Defaults to `'all'` */
  category?: CategoryFilter;
  /** Defaults to `'all'` */
  media?: MediaFilter;
  placement?: PlacementFilter;
  /** Defaults to `6` */
  limit?: number;
  /** Defaults to `0` */
  skip?: number;
  /** Defaults to `0` */
  startIndex?: number;
  /** Defaults to `['BR-rainbow-six GA-siege']` */
  tags?: string[];
}
export const getNews = async ({
  locale = 'en-gb',
  fallbackLocale = 'en-us',
  category: categoriesFilter = 'all',
  media: mediaFilter = 'all',
  placement: placementFilter = '',
  limit = 6,
  skip = 0,
  startIndex = 0,
  tags = ['BR-rainbow-six GA-siege']
}: GetNewsOptions = {}) =>
  fetch<NimbusItems>({
    baseURL: 'https://nimbus.ubisoft.com/api',
    path: '/v1/items',
    params: {
      locale,
      fallbackLocale,
      categoriesFilter,
      mediaFilter,
      placementFilter,
      limit: limit.toString(),
      skip: skip.toString(),
      startIndex: startIndex.toString(),
      tags
    },
    headers: {
      Authorization: '3u0FfSBUaTSew-2NVfAOSYWevVQHWtY9q3VM8Xx9Lto'
    }
  }).then(news => processNews({ news, locale }));
