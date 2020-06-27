import fetch from '../fetch';
import { URLS, getNewsURL } from '../utils';

export interface INewsItem {
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
  index: number;
  prevNode: {
    buttonType: string;
    trackingLocation: string;
    trackingCategoryValue: string;
    trackingValue: string;
    buttonUrl: string;
  };
  nextNode: {
    buttonType: string;
    trackingLocation: string;
    trackingCategoryValue: string;
    trackingValue: string;
    buttonUrl: string;
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
  items?: INewsItem;
}

export interface IOptions {
  raw?: boolean;
  locale?: string;
  fallbackLocale?: string;
}

export default async (id: string, options?: IOptions) => {

  const raw = options && options.raw || false;
  const locale = options && options.locale || 'en-us';
  const fallbackLocale = options && options.fallbackLocale || 'en-us';

  const res = await fetch<IApiResponse>(URLS.NEWSBYID(id, locale, fallbackLocale))();
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
    ...res.items && {
      item: {
        id: res.items.id,
        title: res.items.title,
        abstract: res.items.abstract,
        thumbnail: {
          url: res.items.thumbnail.url, description: res.items.thumbnail.description
        },
        content: res.items.content,
        description: res.items.description,
        categories: res.items.categories,
        tag: res.items.tag,
        placement: res.items.placement,
        type: res.items.type,
        readTime: res.items.readTime,
        url: getNewsURL(locale, res.items.type, res.items.button.buttonUrl),
        date: res.items.date
      }
    }
  });

};
