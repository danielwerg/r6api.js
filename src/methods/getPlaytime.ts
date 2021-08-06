import { getToken } from '../auth';
import fetch from '../fetch';
import { Platform, UUID, MPType } from '../typings';
import { getURL } from '../utils';

export interface IApiResponse {
  results: {
    [id: string]: {
      [id: string]: number;
    }
  }
}

const statGetter = (obj: IApiResponse, id: UUID, stat: string, type: MPType) =>
  (obj.results[id] as IApiResponse['results'][string])[`${stat}${type}_timeplayed:infinite`]
  || 0;

export default (platform: Platform, ids: UUID[]) =>
  getToken()
    .then(fetch<IApiResponse>(getURL.PLAYTIME(platform, ids)))
    .then(res =>
      Object.keys(res.results).map(id => ({
        id,
        pvp: {
          general: statGetter(res, id, 'general', 'pvp'),
          ranked: statGetter(res, id, 'ranked', 'pvp'),
          casual: statGetter(res, id, 'casual', 'pvp'),
          custom: statGetter(res, id, 'custom', 'pvp'),
          other: statGetter(res, id, 'general', 'pvp') -
            (
              statGetter(res, id, 'ranked', 'pvp') +
              statGetter(res, id, 'casual', 'pvp') +
              statGetter(res, id, 'custom', 'pvp')
            )
        },
        pve: {
          general: statGetter(res, id, 'general', 'pve')
        }
      }))
    );
