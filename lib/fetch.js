const nodeFetch = require('node-fetch');
const { name, version } = require('../package.json');
const Errors = require('./errors.js');
const Promise = require('bluebird');

module.exports = (url, params) => token =>

  nodeFetch(url, Object.assign(
    {},
    {
      method: 'GET',
      headers: {
        'User-Agent': `R6API.js/${version} (https://github.com/danielwerg/${name})`,
        'Ubi-AppId': '39baebad-39e5-4552-8c25-2c9b919064e2',
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': token
      }
    },
    params || {}
  ))
    .then(res => {
      if (res.status !== 200) {
        return res.json().then(res => {

          switch (res.httpCode) {
            case 429:
              return Promise.reject(new Errors.TooManyRequestsError(res.message));
            case 400:
              return Promise.reject(new Errors.BadRequestError(res.message || res.errorCode));
            default:
              break;
          }

          switch (res.errorCode) {
            case 1:
              return Promise.reject(new Errors.MissingHeaderError(res.message));
            case 2:
              return Promise.reject(new Errors.MissingCredentialsError(res.message));
            case 3:
              return Promise.reject(new Errors.MissingHeaderError(res.message));
            case 3:
              return Promise.reject(new Errors.InvalidCredentialsError(res.message));
            case 1101:
              return Promise.reject(new Errors.TooManyRequestsError(res.message));
            case 1100:
              return Promise.reject(new Errors.TooManyRequestsError(res.message));
            default:
              return Promise.reject(new Errors.UnknownAuthError(res.message || res.errorCode));
          }

        });
      }
      return res.json();
    });
