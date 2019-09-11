const { getAuthString } = require('../auth');
const fetch = require('../fetch');
const { URLS } = require('../constants.js');
const Promise = require('bluebird');
const { BadRequestError } = require('../errors.js');

module.exports = () =>

  getAuthString()
    .then(fetch(`${URLS('STATUS')}${URLS('APPID')('uplay')},${URLS('APPID')('psn')},${URLS('APPID')('xbl')}`))
    .then(res => {
      if (!res) return Promise.reject(new BadRequestError());
      // console.log(res);
      return {
        PC: res.find(k => k.Platform === 'PC'),
        PS4: res.find(k => k.Platform === 'PS4'),
        XBOX: res.find(k => k.Platform === 'XBOXONE')
      };
    });
