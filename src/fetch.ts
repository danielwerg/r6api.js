import nodeFetch, { RequestInit, Response } from 'node-fetch';

import { IUbiAuth, ubiAppId } from './auth';

const promiseTimeout = <T>(promise: Promise<T>, ms: number, reject = true) =>
  Promise.race([promise, new Promise((res, rej) => setTimeout(() => reject ? rej : res, ms))]);

export default <T>(url: string, options: Partial<RequestInit> = {}) =>
  async (token?: string, auth?: IUbiAuth): Promise<T> => {

    const { headers, ...optionsRest } = options;

    const response = await nodeFetch(
      url,
      {
        ...{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Ubi-AppId': ubiAppId,
            ...token && { 'Authorization': token },
            ...headers && { ...headers },
            ...auth && {
              'Ubi-SessionId': auth.sessionId
            }
          }
        },
        ...optionsRest && { ...optionsRest }
      }
    );

    const handleResponse = async (res: Response) => {
      if (res.ok) return res.json();
      else {
        const body = await res.text();
        let json;
        try {
          json = JSON.parse(body);
        } catch (error) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
        throw new Error(
          json.httpCode || json.message
            ? `${json.httpCode} ${json.message}${json.moreInfo ? `\n\n${json.moreInfo}` : ''}`
            : JSON.stringify(json)
        );
      }
    };

    return promiseTimeout(handleResponse(response), 10000) as Promise<T>;

  };
