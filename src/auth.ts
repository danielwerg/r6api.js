import { tmpdir } from 'os';
import { join } from 'path';
import { promises as fs } from 'fs';

import fetch from './fetch';
import { Platform, UUID } from './typings';
import { getURL } from './utils';
import { ubiAppId as defaultUbiAppId } from './constants';

export interface IUbiAuth {
  platformType: Platform;
  ticket: string;
  twoFactorAuthenticationTicket: string | null;
  profileId: UUID;
  userId: UUID;
  nameOnPlatform: string;
  environment: string;
  expiration: string;
  spaceId: UUID;
  clientIp: string;
  clientIpCountry: string;
  serverTime: string;
  sessionId: UUID;
  sessionKey: string;
  rememberMeTicket: string;
}

const TEN_MIN_IN_MS = 10 * 60 * 1000;
const credentials = { email: '', password: '' };
let LOGIN_TIMEOUT: any;
export let ubiAppId = defaultUbiAppId;
let authFileDirPath = tmpdir();
let authFileName = 'r6api.js-auth.json';
let authFilePath: null | string = null;

const getExpiration = (auth: IUbiAuth) =>
  +new Date(auth.expiration) - +new Date() - TEN_MIN_IN_MS;

export const login = async () => {

  const lastAuth: IUbiAuth = await fs.readFile(getAuthFilePath(), 'utf8')
    .then((auth) => JSON.parse(auth))
    .catch(() => '');
  if (lastAuth && getExpiration(lastAuth) > 0) {
    setNextLogin(lastAuth);
    return lastAuth;
  }

  const token = 'Basic ' + Buffer
    .from(`${credentials.email}:${credentials.password}`, 'utf8')
    .toString('base64');

  return fetch<IUbiAuth>(getURL.LOGIN(), {
    method: 'POST',
    body: JSON.stringify({ rememberMe: true })
  })(token)
    .then(async res => {
      if (res && res.ticket && res.expiration) {
        await fs.writeFile(getAuthFilePath(), JSON.stringify(res));
        return res;
      } else
        throw new Error(`No response from login: ${JSON.stringify(res)}`);
    })
    .catch(err => {
      clearTimeout(LOGIN_TIMEOUT);
      throw err;
    });
};

const setNextLogin = async (auth: IUbiAuth) => {
  clearTimeout(LOGIN_TIMEOUT);
  LOGIN_TIMEOUT = setTimeout(() => login(), getExpiration(auth));
};

export const getAuth = () => login();
export const getTicket = () => login().then(auth => auth.ticket);
export const getToken = () => login().then(auth => `Ubi_v1 t=${auth.ticket}`);

export const setCredentials = (email: string, password: string) => {
  credentials.email = email;
  credentials.password = password;
};
export const setUbiAppId = (_ubiAppId: string) => { ubiAppId = _ubiAppId; };

export const setAuthFileDirPath = (path: string) => { authFileDirPath = path; };
export const setAuthFileName = (name: string) => { authFileName = `${name}.json`; };
export const setAuthFilePath = (path: string) => { authFilePath = path; };
export const getAuthFilePath = () => authFilePath || join(authFileDirPath, authFileName);
