import {
  setTokenFileLocation as _setTokenFileLocation, setCredentials
} from './auth';
import _findByUsername from './methods/findByUsername';
import _findById from './methods/findById';
import _getProgression from './methods/getProgression';
import _getPlaytime from './methods/getPlaytime';
import _getRanks, { IOptions as IGetRanksOptions } from './methods/getRanks';
import _getStats, { IOptions as IGetStatsOptions } from './methods/getStats';
import _getStatus from './methods/getStatus';
import _custom from './methods/custom';
import _getNews from './methods/getNews';
import _getNewsById from './methods/getNewsById';
import { Platform } from './typings';

export * as typings from './typings';
export * as constants from './constants';
export * as utils from './utils';

const checkArgs = <T extends (...args: any) => any>({
  method, platform, query, options, limit
}: {
  method: T;
  platform: Platform | 'all';
  query: string | string[];
  options?: any;
  limit: number;
}): ReturnType<T> => {
  const queryArray = [].concat(query as any);
  if (queryArray.length > limit)
    return Promise.reject(
      new TypeError(`You can't pass more than ${limit} ids/usernames`)
    ) as ReturnType<T>;
  return method(platform, queryArray, options);
};

export default class R6API {

  constructor(options: { email: string; password: string }) {
    setCredentials(options.email, options.password);
  }

  findByUsername = (platform: Platform, query: string | string[]) =>
    checkArgs({ method: _findByUsername, platform, query, limit: 50 });

  findById = (platform: Platform | 'all', query: string | string[]) =>
    checkArgs({ method: _findById, platform, query, limit: 50 })

  getPlaytime = (platform: Platform, query: string | string[]) =>
    checkArgs({ method: _getPlaytime, platform, query, limit: 200 })

  getProgression = (platform: Platform, query: string | string[]) =>
    checkArgs({ method: _getProgression, platform, query, limit: 200 })

  getRanks = (platform: Platform, query: string | string[], options?: IGetRanksOptions) =>
    checkArgs({ method: _getRanks, platform, query, options, limit: 200 })

  getStats = (platform: Platform, query: string | string[], options?: IGetStatsOptions) =>
    checkArgs({ method: _getStats, platform, query, options, limit: 200 })

  getStatus = _getStatus
  custom = _custom
  getNews = _getNews
  getNewsById = _getNewsById

  setTokenFileLocation = _setTokenFileLocation

}
