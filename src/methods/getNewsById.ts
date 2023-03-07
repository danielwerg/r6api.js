import { fetch } from '../fetch';
import type { NimbusItemsId, OptionsDocs } from '../types';
import { processNews } from '../utils';

export const getNewsByIdOptions: OptionsDocs = [
  ['id', 'string', true, '', 'News id'],
  ['locale', 'string', false, '\'en-gb\'', ''],
  ['fallbackLocale', 'string', false, '\'en-us\'', ''],
  ['tags', 'string[]', false, '[\'BR-rainbow-six GA-siege\']', '']
];

export interface GetNewsOptions {
  id: string;
  /** Defaults to `'en-gb'` */
  locale?: string;
  /** Defaults to `'en-us'` */
  fallbackLocale?: string;
  /** Defaults to `['BR-rainbow-six GA-siege']` */
  tags?: string[];
}
export const getNewsById = async ({
  id,
  locale = 'en-gb',
  fallbackLocale = 'en-us',
  tags = ['BR-rainbow-six GA-siege']
}: GetNewsOptions) =>
  fetch<NimbusItemsId>({
    baseURL: 'https://nimbus.ubisoft.com/api',
    path: `/v1/items/${id}`,
    params: {
      locale,
      fallbackLocale,
      tags
    },
    headers: {
      Authorization: '3u0FfSBUaTSew-2NVfAOSYWevVQHWtY9q3VM8Xx9Lto'
    }
  }).then(news => processNews({ news, locale }));
