import nodeFetch, { RequestInit, Response } from 'node-fetch';

import * as Errors from './errors';

interface IErrorResponse {
  httpCode: number;
  errorCode: number;
  message: string;
}

const processError = async (res: Response) => {
  const body = await res.text();
  const json: IErrorResponse = JSON.parse(body);
  switch (json.httpCode) {
    case 429:
      throw new Errors.TooManyRequestsError();
    case 400:
      throw new Errors.BadRequestError(json.message || json.errorCode);
    default: break;
  }
  switch (json.errorCode) {
    case 1:
      throw new Errors.MissingHeaderError();
    case 2:
      throw new Errors.MissingCredentialsError();
    case 3:
      throw new Errors.InvalidCredentialsError();
    case 1101:
      throw new Errors.TooManyRequestsError();
    case 1100:
      throw new Errors.TooManyRequestsError();
    default:
      throw new Errors.UnknownAuthorizationError(json.message || json.errorCode);
  }
};

const promiseTimeout = (promise: Promise<any>, ms: number, reject = true) =>
  Promise.race([promise, new Promise((res, rej) => setTimeout(() => reject ? rej : res, ms))]);

export default <T>(url: string, params: Partial<RequestInit> = {}) =>
  async (token?: string): Promise<T> =>
    promiseTimeout(
      nodeFetch(
        url, Object.assign(
          {},
          {
            method: 'GET',
            headers: {
              'Ubi-AppId': '39baebad-39e5-4552-8c25-2c9b919064e2',
              'Content-Type': 'application/json; charset=UTF-8',
              'Authorization': token
            }
          },
          params || {}
        )
      )
        .then(res => res.status === 200 ? res.json() : processError(res)),
      10000
    ) as Promise<T>;
