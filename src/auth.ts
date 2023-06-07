import fs from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { ubiServices } from './fetch';
import type { Service } from './types';
import { DEFAULT_UBI_APP_ID } from './constants';

interface GetAuthFilePathOptions {
  ubiAppId?: string;
  profileId?: string;
  authDirPath?: string;
  authFileName?: string;
  authFilePath?: string;
}
const getAuthFilePath = ({
  ubiAppId,
  profileId,
  authDirPath,
  authFileName,
  authFilePath
}: GetAuthFilePathOptions) =>
  `${
    (authFilePath ??
      join(authDirPath ?? tmpdir(), `${authFileName ?? 'r6api.js-auth'}`)) +
    (ubiAppId ? `-${ubiAppId}` : '') +
    (profileId ? `-${profileId}` : '')
  }.json`;

const TEN_MIN_IN_MS = 10 * 60 * 1000;

const getMsUntilExpiration = (expiration: string) =>
  +new Date(expiration) - +new Date() - TEN_MIN_IN_MS;

const isAuthExpired = (expiration: string) =>
  getMsUntilExpiration(expiration) <= 0;

interface WriteAuthOptions {
  auth: ProfilesSessions;
  loginOptions: LoginOptions;
}
export const writeAuth = async ({ auth, loginOptions }: WriteAuthOptions) =>
  await fs.writeFile(getAuthFilePath(loginOptions), JSON.stringify(auth));

interface ReadAuthOptions {
  loginOptions: LoginOptions;
}
export const readAuth = async ({ loginOptions }: ReadAuthOptions) =>
  await fs
    .readFile(getAuthFilePath(loginOptions), 'utf8')
    .then(auth => JSON.parse(auth) as ProfilesSessions)
    .catch(() => null);

export interface ProfilesSessions {
  platformType: Service;
  ticket: string;
  twoFactorAuthenticationTicket: string | null;
  profileId: string;
  userId: string;
  nameOnPlatform: string;
  environment: string;
  expiration: string;
  spaceId: string;
  clientIp: string;
  clientIpCountry: string;
  serverTime: string;
  sessionId: string;
  sessionKey: string;
  rememberMeTicket: string;
}

export interface LoginOptions {
  email?: string;
  password?: string;
  ubiAppId?: string;
  profileId?: string;
  authDirPath?: string;
  authFileName?: string;
  /** Overrides `authDirPath` and `authFileName` options */
  authFilePath?: string;
}
export const login = async (options: LoginOptions) => {
  if (!options.email || !options.password)
    throw new Error('credentials missing');

  const token = `Basic ${Buffer.from(
    `${options.email}:${options.password}`
  ).toString('base64')}`;

  return await ubiServices({
    token,
    ubiAppId: options.ubiAppId ?? DEFAULT_UBI_APP_ID
  })<ProfilesSessions>({
    method: 'POST',
    version: 3,
    path: '/profiles/sessions',
    data: { rememberMe: true }
  }).then(async auth => {
    if (options.profileId && options.profileId !== auth.profileId)
      throw new Error(
        'profileId from constructor doesn\'t match profileId from login'
      );

    await writeAuth({ loginOptions: options, auth });

    return auth;
  });
};

export const getAuth = async (loginOptions: LoginOptions) => {
  const lastLogin = await readAuth({ loginOptions });

  if (lastLogin && !isAuthExpired(lastLogin.expiration)) return lastLogin;

  return await login(loginOptions);
};
