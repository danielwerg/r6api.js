import fetch from '../fetch';
import { getURL, getNewsURL } from '../utils';
import { IOptionsDocs } from '../typings';

export interface INewsItem {
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
  tags: string[];
  items?: INewsItem[];
  message?: string;
}

export interface IOptions {
  raw?: boolean;
  locale?: string;
  fallbackLocale?: string;
}

export const optionsDocs: IOptionsDocs = [
  ['raw', '`boolean`', false, '`false`', 'Include raw API response'],
  ['locale', '`string`', false, '`\'en-gb\'`', ''],
  ['fallbackLocale', '`string`', false, '`\'en-us\'`', '']
];

export default async (id: string, options?: IOptions) => {

  const raw = options && options.raw || false;
  const locale = options && options.locale || 'en-gb';
  const fallbackLocale = options && options.fallbackLocale || 'en-us';

  const res = await fetch<IApiResponse>(
    getURL.NEWSBYID(id, locale, fallbackLocale),
    { headers: { 'Authorization': '3u0FfSBUaTSew-2NVfAOSYWevVQHWtY9q3VM8Xx9Lto' } }
  )();
  return ({
    ...raw && { raw: res },
    total: res.total,
    tags: res.tags,
    ...res.items && {
      item: res.items.map(item => ({
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
    },
    ...res.message && { message: res.message }
  });

};
