import fetch from '../fetch';
import { getURL, getNewsURL } from '../utils';
import { IOptionsDocs } from '../typings';

export interface INewsItems {
  id: string;
  tag?: string;
  categories: string[];
  placement?: string[] | null;
  type: string;
  date: string;
  title: string;
  abstract?: string;
  content: string;
  trackingPageValue: string;
  readTime?: string;
  authors?: null;
  featuredThumbnail?: {
    url: string | null;
    description: string | null;
  };
  thumbnail: {
    url: string | null;
    description: string | null;
  };
  description?: string;
  button: {
    commonTranslationId: string;
    buttonType: string;
    buttonUrl: string;
    trackingCategoryValue: string;
    trackingValue: string;
  };
}
export interface IApiResponse {
  total: number;
  tags: string[];
  mediaFilter: string;
  categoriesFilter: string;
  placementFilter: string[] | [];
  limit: number;
  startIndex: number | string;
  skip: number;
  items: INewsItems[];
}

export interface IOptions {
  raw?: boolean;
  category?: 'all' | 'game-updates' | 'patch-notes' | 'community' | 'store' | 'esports';
  media?: 'all' | 'news' | 'videos';
  placement?: string;
  limit?: number;
  skip?: number;
  startIndex?: number;
  locale?: string;
  fallbackLocale?: string;
}

export const optionsDocs: IOptionsDocs = [
  ['raw', '`boolean`', false, '`false`', 'Include raw API response'],
  [
    'category', '`string`', false, '`\'all\'`',
    '`\'all\'`, `\'game-updates\'`, `\'patch-notes\'`, `\'community\'`, `\'store\'`, `\'esports\'`'
  ],
  ['media', '`string`', false, '`\'all\'`', '`\'all\'`, `\'news\'`, `\'videos\'`'],
  ['placement', '`string`', false, '`\'\'`', 'Ex: `\'featured-news-article\'`'],
  ['limit', '`number`', false, '`6`', ''],
  ['skip', '`number`', false, '`0`', ''],
  ['startIndex', '`number`', false, '`0`', ''],
  ['locale', '`string`', false, '`\'en-gb\'`', ''],
  ['fallbackLocale', '`string`', false, '`\'en-us\'`', '']
];

export default async (options?: IOptions) => {

  const raw = options && options.raw || false;
  const category = options && options.category || 'all';
  const media = options && options.media || 'all';
  const placement = options && options.placement || '';
  const limit = options && options.limit || 6;
  const skip = options && options.skip || 0;
  const startIndex = options && options.startIndex || 0;
  const locale = options && options.locale || 'en-gb';
  const fallbackLocale = options && options.fallbackLocale || 'en-us';

  const res = await fetch<IApiResponse>(
    getURL.NEWS(category, media, placement, locale, fallbackLocale, limit, skip, startIndex),
    { headers: { 'Authorization': '3u0FfSBUaTSew-2NVfAOSYWevVQHWtY9q3VM8Xx9Lto' } }
  )();
  return ({
    ...raw && { raw: res },
    total: res.total,
    limit: res.limit,
    categories: res.categoriesFilter,
    media: res.mediaFilter,
    skip: res.skip,
    startIndex: res.startIndex,
    placement: res.placementFilter,
    tags: res.tags,
    items: res.items.map(item => ({
      id: item.id,
      title: item.title,
      abstract: item.abstract,
      thumbnail: {
        url: item.thumbnail.url, description: item.thumbnail.description
      },
      content: item.content,
      description: item.description,
      categories: item.categories,
      tag: item.tag,
      placement: item.placement,
      type: item.type,
      readTime: item.readTime,
      url: getNewsURL(locale, item.type, item.button.buttonUrl),
      date: item.date
    }))
  });

};
