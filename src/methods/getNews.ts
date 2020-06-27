import fetch from '../fetch';
import { URLS, getNewsURL } from '../utils';

export interface INewsItems {
  id: string;
  tag?: string;
  categories: string[];
  placement?: string[] | null;
  type: string;
  date: Date;
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
  limit: number;
  tags: string;
  mediaFilter: string;
  categoriesFilter: string;
  placementFilter: string;
  skip: number;
  startIndex: number | string;
  items: INewsItems[];
}

export interface IOptions {
  raw?: boolean;
  category?: 'all' | 'game-updates' | 'esports' | 'community' | 'store';
  media?: 'all' | 'news' | 'videos';
  limit?: number;
  skip?: number;
  startIndex?: number;
  locale?: string;
  fallbackLocale?: string;
}

export default (options?: IOptions) => {

  const raw = options && options.raw || false;
  const category = options && options.category || 'all';
  const media = options && options.media || 'all';
  const limit = options && options.limit || 6;
  const skip = options && options.skip || 0;
  const startIndex = options && options.startIndex || 0;
  const locale = options && options.locale || 'en-us';
  const fallbackLocale = options && options.fallbackLocale || 'en-us';

  return fetch<IApiResponse>(
    URLS.NEWS(category, media, locale, fallbackLocale, limit, skip, startIndex)
  )()
    .then(res => ({
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
    }));

};
