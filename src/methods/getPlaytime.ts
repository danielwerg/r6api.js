import { getToken } from '../auth';
import fetch from '../fetch';
import { Platform, UUID } from '../typings';
import { URLS } from '../utils';

const statGetter = (obj: any, id: UUID, stat: string): number =>
  obj.results[id][`${stat}pvp_timeplayed:infinite`] || 0;

export default (platform: Platform, ids: UUID[]) =>
  getToken()
    .then(fetch<any>(URLS.PLAYTIME(platform, ids)))
    .then(res =>
      Object.keys(res.results).map(id => ({
        id,
        general: statGetter(res, id, 'general'),
        ranked: statGetter(res, id, 'ranked'),
        casual: statGetter(res, id, 'casual'),
        custom: statGetter(res, id, 'custom'),
        other: statGetter(res, id, 'general') -
          (
            statGetter(res, id, 'ranked') +
            statGetter(res, id, 'casual') +
            statGetter(res, id, 'custom')
          )
      }))
    );
