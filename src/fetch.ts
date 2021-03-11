import nodeFetch, { RequestInit, Response } from 'node-fetch';

import { ubiAppId } from './constants';

const promiseTimeout = <T>(promise: Promise<T>, ms: number, reject = true) =>
  Promise.race([promise, new Promise((res, rej) => setTimeout(() => reject ? rej : res, ms))]);

export default <T>(url: string, params: Partial<RequestInit> = {}) =>
  async (token?: string): Promise<T> => {

    const response = await nodeFetch(
      url,
      Object.assign(
        {},
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Ubi-AppId': ubiAppId,
            'Authorization': token
          }
        },
        params || {}
      )
    );

    const handleResponse = async (res: Response) => {
      if (res.ok) return res.json();
      else {
        const body = await res.text();
        let json;
        try {
          json = JSON.parse(body);
        } catch (error) {
          throw new Error(res.statusText);
        }
        throw new Error(`${json.httpCode} ${json.message}${json.moreInfo ? `\n\n${json.moreInfo}` : ''}`);
      }
    };

    return promiseTimeout(handleResponse(response), 10000) as Promise<T>;

  };
