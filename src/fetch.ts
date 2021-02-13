import nodeFetch, { RequestInit, Response } from 'node-fetch';

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
            'Ubi-AppId': '39baebad-39e5-4552-8c25-2c9b919064e2',
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': token
          }
        },
        params || {}
      )
    );

    const handleResponse = async (res: Response) => {
      if (res.ok) return res.json();
      else {
        try {
          const body = await res.text();
          const json = JSON.parse(body);
          throw new Error(json.message + json.moreInfo ? `\n\n${json.moreInfo}` : '');
        } catch (error) {
          throw new Error(res.statusText);
        }
      }
    };

    return promiseTimeout(handleResponse(response), 10000) as Promise<T>;

  };
