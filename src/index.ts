import {
  getAuth as _getAuth,
  getTicket as _getTicket,
  getToken as _getToken,
  setCredentials as _setCredentials,
  setUbiAppId as _setUbiAppId,
  setAuthFileDirPath as _setAuthFileDirPath,
  setAuthFileName as _setAuthFileName,
  setAuthFilePath as _setAuthFilePath,
  getAuthFilePath as _getAuthFilePath
} from './auth';
import _findByUsername from './methods/findByUsername';
import _findById, { IOptions as IFindByIdOptions} from './methods/findById';
import _getProgression from './methods/getProgression';
import _getPlaytime from './methods/getPlaytime';
import _getRanks, { IOptions as IGetRanksOptions } from './methods/getRanks';
import _getUserSeasonalv2 from './methods/getUserSeasonalv2';
import _getStats, { IOptions as IGetStatsOptions } from './methods/getStats';
import _getStatus from './methods/getStatus';
import _getUserStatus, { IOptions as IGetUserStatusOptions } from './methods/getUserStatus';
import _getProfileApplications, { IOptions as IGetProfileApplicationsOptions }
  from './methods/getProfileApplications';
import _getApplications from './methods/getApplications';
import _validateUsername from './methods/validateUsername';
import _custom from './methods/custom';
import _getNews from './methods/getNews';
import _getNewsById from './methods/getNewsById';
import { UUID, Platform, PlatformAll, PlatformAllExtended } from './typings';

export { default as fetch } from './fetch';
export * as typings from './typings';
export * as constants from './constants';
export * as utils from './utils';

const checkQueryLimit = <T extends (...args: any) => any>({
  method, platform, query, options, limit
}: {
  method: T;
  platform?: PlatformAllExtended;
  query: QueryUUID | QueryString;
  options?: any;
  limit: number;
}): ReturnType<T> => {
  const queryArray = Array.isArray(query) ? query : [query];
  if (queryArray.length > limit)
    return Promise.reject(
      new TypeError(`You can't pass more than ${limit} ids/usernames`)
    ) as ReturnType<T>;
  return platform ? method(platform, queryArray, options) : method(queryArray, options);
};

type QueryUUID = UUID | UUID[];
type QueryString = string | string[];

export default class R6API {

  constructor(options: {
    email?: string;
    password?: string;
    ubiAppId?: string;
    authFileDirPath?: string;
    authFileName?: string;
    authFilePath?: string;
  }) {
    if (options.email && options.password) _setCredentials(options.email, options.password);
    if (options.ubiAppId) _setUbiAppId(options.ubiAppId);
    if (options.authFileDirPath) _setAuthFileDirPath(options.authFileDirPath);
    if (options.authFileName) _setAuthFileName(options.authFileName);
    if (options.authFilePath) _setAuthFilePath(options.authFilePath);
  }

  /** Find player by their username. */
  findByUsername = (platform: PlatformAll, query: QueryString) =>
    checkQueryLimit({ method: _findByUsername, platform, query, limit: 50 });

  /** Find player by their id. */
  findById = (
    platform: PlatformAllExtended, query: QueryUUID | QueryString, options?: IFindByIdOptions
  ) =>
    checkQueryLimit({ method: _findById, platform, query, options, limit: 50 })

  /** Get playtime of a player. */
  getPlaytime = (platform: Platform, query: QueryUUID) =>
    checkQueryLimit({ method: _getPlaytime, platform, query, limit: 200 })

  /** Get level, xp and alpha pack drop chance of a player. */
  getProgression = (platform: Platform, query: QueryUUID) =>
    checkQueryLimit({ method: _getProgression, platform, query, limit: 200 })

  /** Get seasonal stats of a player. */
  getRanks = (platform: Platform, query: QueryUUID, options?: IGetRanksOptions) =>
    checkQueryLimit({ method: _getRanks, platform, query, options, limit: 200 })

  getUserSeasonalv2 = (query: QueryUUID) =>
    checkQueryLimit({ method: _getUserSeasonalv2, query, limit: 200 })

  /** Get summary stats of a player. */
  getStats = (platform: Platform, query: QueryUUID, options?: IGetStatsOptions) =>
    checkQueryLimit({ method: _getStats, platform, query, options, limit: 200 })

  /** Get Rainbow Six: Siege servers status. */
  getStatus = _getStatus
  /** Get status of a player. */
  getUserStatus = (query: QueryUUID, options?: IGetUserStatusOptions) =>
    checkQueryLimit({ method: _getUserStatus, query, options, limit: 50 })
  /** Get information about applications of a player. */
  getProfileApplications = (query: QueryUUID, options?: IGetProfileApplicationsOptions) =>
    checkQueryLimit({ method: _getProfileApplications, query, options, limit: 100 })
  /** Get information about applications. */
  getApplications = (query: QueryUUID) =>
    checkQueryLimit({ method: _getApplications, query, limit: 50 })
  /** Validate username. */
  validateUsername = _validateUsername
  /** Useful if you're familiar with Rainbow Six Siege's API; this method will make a request to a custom URL you would provide with the token in the header. */
  custom = _custom
  /** Get Rainbow Six: Siege News. */
  getNews = _getNews
  /** Get Rainbow Six: Siege News by ID. */
  getNewsById = _getNewsById

  getAuth = _getAuth
  getTicket = _getTicket
  getToken = _getToken
  setCredentials = _setCredentials
  setUbiAppId = _setUbiAppId
  setAuthFileDirPath = _setAuthFileDirPath
  setAuthFileName = _setAuthFileName
  setAuthFilePath = _setAuthFilePath
  getAuthFilePath = _getAuthFilePath

}
