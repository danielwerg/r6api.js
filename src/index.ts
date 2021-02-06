import {
  setTokenFileLocation as _setTokenFileLocation,
  setCredentials as _setCredentials,
  getAuth as _getAuth,
  getToken as _getToken
} from './auth';
import _findByUsername from './methods/findByUsername';
import _findById, { IOptions as IFindByIdOptions} from './methods/findById';
import _getProgression from './methods/getProgression';
import _getPlaytime from './methods/getPlaytime';
import _getRanks, { IOptions as IGetRanksOptions } from './methods/getRanks';
import _getStats, { IOptions as IGetStatsOptions } from './methods/getStats';
import _getStatus from './methods/getStatus';
import _validateUsername from './methods/validateUsername';
import _custom from './methods/custom';
import _getNews from './methods/getNews';
import _getNewsById from './methods/getNewsById';
import { UUID, Platform, PlatformAll, PlatformAllExtended } from './typings';

export * as typings from './typings';
export * as constants from './constants';
export * as utils from './utils';

const checkQueryLimit = <T extends (...args: any) => any>({
  method, platform, query, options, limit
}: {
  method: T;
  platform: PlatformAllExtended;
  query: QueryUUID | QueryString;
  options?: any;
  limit: number;
}): ReturnType<T> => {
  const queryArray = Array.isArray(query) ? query : [query];
  if (queryArray.length > limit)
    return Promise.reject(
      new TypeError(`You can't pass more than ${limit} ids/usernames`)
    ) as ReturnType<T>;
  return method(platform, queryArray, options);
};

type QueryUUID = UUID | UUID[];
type QueryString = string | string[];

export default class R6API {

  constructor(options: { email: string; password: string }) {
    _setCredentials(options.email, options.password);
  }

  findByUsername = (platform: PlatformAll, query: QueryString) =>
    checkQueryLimit({ method: _findByUsername, platform, query, limit: 50 });

  findById = (
    platform: PlatformAllExtended, query: QueryUUID | QueryString, options?: IFindByIdOptions
  ) =>
    checkQueryLimit({ method: _findById, platform, query, options, limit: 50 })

  getPlaytime = (platform: Platform, query: QueryUUID) =>
    checkQueryLimit({ method: _getPlaytime, platform, query, limit: 200 })

  getProgression = (platform: Platform, query: QueryUUID) =>
    checkQueryLimit({ method: _getProgression, platform, query, limit: 200 })

  getRanks = (platform: Platform, query: QueryUUID, options?: IGetRanksOptions) =>
    checkQueryLimit({ method: _getRanks, platform, query, options, limit: 200 })

  getStats = (platform: Platform, query: QueryUUID, options?: IGetStatsOptions) =>
    checkQueryLimit({ method: _getStats, platform, query, options, limit: 200 })

  getStatus = _getStatus
  validateUsername = _validateUsername
  custom = _custom
  getNews = _getNews
  getNewsById = _getNewsById

  getAuth = _getAuth
  getToken = _getToken
  setCredentials = _setCredentials
  setTokenFileLocation = _setTokenFileLocation

}
