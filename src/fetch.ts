import axios, {
  type RawAxiosRequestConfig,
  type RawAxiosRequestHeaders
} from 'axios';

import { URLSearchParams } from 'node:url';

import { DEFAULT_UBI_APP_ID } from './constants';

const TIMEOUT_MS = 30_000;

interface BaseFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  params?: Record<string, string | string[]>;
  headers?: RawAxiosRequestHeaders;
  data?: unknown;
  config?: RawAxiosRequestConfig;
}

interface FetchOptions extends BaseFetchOptions {
  baseURL: string;
}
// NOTE: Switch to global fetch Node@18 once https://github.com/DefinitelyTyped/DefinitelyTyped/issues/60924 resolved?
export const fetch = async <T>({
  method = 'GET',
  baseURL,
  path,
  params,
  headers,
  data,
  config
}: FetchOptions) =>
  axios
    .request<T>({
      ...config,
      method,
      baseURL,
      headers,
      url: path,
      params: new URLSearchParams(params),
      data,
      timeout: TIMEOUT_MS
    })
    .then(res => res.data)
    .catch((error: unknown) => {
      interface UbisoftError {
        errorCode?: number;
        errorContext?: string;
        httpCode?: number;
        message?: string;
        moreInfo?: string;
        stackTrace?: string;
        transactionId?: string;
        transactionTime?: string;
        serverUtcTime?: string;
        resource?: string;
      }

      if (axios.isAxiosError(error)) {
        const ubisoftError = error.response?.data as UbisoftError;
        const message = error.message;
        const moreInfo = ubisoftError.moreInfo;
        throw new Error(`${message}${moreInfo ? `\n${moreInfo}` : ''}`, {
          cause: error
        });
      } else {
        throw new Error('Unexpected fetch error', { cause: error });
      }
    });

export interface UbiServicesPassOptions {
  token: string;
  sessionId?: string;
  ubiAppId?: string;
}
export interface UbiServicesOptions extends BaseFetchOptions {
  version: 1 | 2 | 3 | 4;
}
export const ubiServices =
  ({ token, sessionId, ubiAppId }: UbiServicesPassOptions) =>
  async <T>({
    method,
    version,
    path,
    headers,
    config,
    ...rest
  }: UbiServicesOptions) =>
    fetch<T>({
      config,
      ...rest, // NOTE: `params`, `data`, etc.
      method,
      baseURL: 'https://public-ubiservices.ubi.com',
      path: `/v${version}${path}`,
      headers: {
        ...headers,
        'Ubi-AppId': ubiAppId ?? DEFAULT_UBI_APP_ID,
        Authorization: token,
        'Ubi-SessionId': sessionId
      }
    });

export interface DataDevPassOptions {
  token: string;
  sessionId: string;
  expiration: string;
}
export interface DataDevOptions extends BaseFetchOptions {
  version: 1;
  profileId: string;
}
export const dataDev =
  ({ token, sessionId, expiration }: DataDevPassOptions) =>
  async <T>({
    method,
    version,
    path,
    profileId,
    headers,
    config,
    ...rest
  }: DataDevOptions) =>
    fetch<T>({
      config,
      ...rest,
      method,
      baseURL: 'https://prod.datadev.ubisoft.com',
      path: `/v${version}/profiles/${profileId}${path}`,
      headers: {
        ...headers,
        Authorization: token,
        'Ubi-SessionId': sessionId,
        expiration
      }
    });
