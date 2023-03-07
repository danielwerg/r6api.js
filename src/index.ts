import { findUserByUsername } from './methods/findUserByUsername';
import { findUserById } from './methods/findUserById';
import { getApplications } from './methods/getApplications';
import { getNews } from './methods/getNews';
import { getNewsById } from './methods/getNewsById';
import { getServiceStatus } from './methods/getServiceStatus';
import { getUserApplications } from './methods/getUserApplications';
import { getUserGamesPlayed } from './methods/getUserGamesPlayed';
import { getUserProgression } from './methods/getUserProgression';
import { getUserSeasonal } from './methods/getUserSeasonal';
import { getUserSeasonalv2 } from './methods/getUserSeasonalv2';
import { getUserStats } from './methods/getUserStats';
import { getUserStatus } from './methods/getUserStatus';
import { dataDev, ubiServices } from './fetch';
import { getAuth, type LoginOptions } from './auth';
import type { OptionsDocs } from './types';

export const r6APIOptions: OptionsDocs = [
  ['email', 'string', false, 'undefined', 'Ubisoft account\'s email'],
  ['password', 'string', false, 'undefined', 'Ubisoft account\'s password'],
  [
    'ubiAppId',
    'string',
    false,
    '\'3587dcbb-7f81-457c-9781-0e3f29f6f56a\'',
    '`Ubi-AppId` header for every request'
  ],
  ['profileId', 'string', false, 'undefined', 'Will be used in auth file name'],
  [
    'authDirPath',
    'string',
    false,
    'node:os.tmpdir()',
    'Directory where auth is stored'
  ],
  [
    'authFileName',
    'string',
    false,
    '\'r6api.js-auth\'',
    'Name for auth file without extension, if `profileId` paremeter provided appends `-${profileId}`'
  ],
  [
    'authFilePath',
    'string',
    false,
    'undefined',
    'Overrides `authDirPath` and `authFileName` parameters, if `profileId` paremeter provided appends `-${profileId}`'
  ]
];

export type R6APIOptions = LoginOptions;
export default class R6API {
  options: R6APIOptions;

  constructor(options: R6APIOptions) {
    this.options = options;
  }

  getAuth = async () => getAuth(this.options);

  /** https://public-ubiservices.ubi.com/v${version}${path} */
  ubiServices = async <T>(
    options: Parameters<ReturnType<typeof ubiServices>>[number]
  ) =>
    this.getAuth().then(async ({ ticket, ...auth }) =>
      ubiServices({ token: `Ubi_v1 t=${ticket}`, ...auth, ...this.options })<T>(
        options
      )
    );

  /** https://prod.datadev.ubisoft.com/v${version}/profiles/${profileId}${path} */
  dataDev = async <T>(
    options: Parameters<ReturnType<typeof dataDev>>[number]
  ) =>
    this.getAuth().then(async ({ ticket, ...auth }) =>
      dataDev({ token: `Ubi_v1 t=${ticket}`, ...auth })<T>(options)
    );

  // NOTE: `this` is passing ubiServices or dataDev

  findUserByUsername = findUserByUsername(this);

  findUserById = findUserById(this);

  getApplications = getApplications(this);

  getNews = getNews;

  getNewsById = getNewsById;

  getServiceStatus = getServiceStatus;

  getUserApplications = getUserApplications(this);

  getUserGamesPlayed = getUserGamesPlayed(this);

  getUserProgression = getUserProgression(this);

  getUserSeasonal = getUserSeasonal(this);

  getUserSeasonalv2 = getUserSeasonalv2(this);

  getUserStats = getUserStats(this);

  getUserStatus = getUserStatus(this);
}

export * from './auth';
export * from './constants';
export * from './fetch';
export * from './types';
export * from './utils';
export * from './validate';
