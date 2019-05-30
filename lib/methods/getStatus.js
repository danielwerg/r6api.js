const { URLS } = require('../constants.js');
const { getAuthString } = require('../auth');
const { BadRequestError } = require('../errors.js');
const fetch = require('../fetch');
const Promise = require('bluebird');

module.exports = () =>

  getAuthString()
    .then(fetch(`${URLS.STATUS}${URLS.UPLAY.APPID},${URLS.PSN.APPID},${URLS.XBL.APPID}`))
    .then(res => {
      if (!res) return Promise.reject(new BadRequestError());
      // console.log(res);
      return {
        PC: res.find(k => k.Platform === 'PC'),
        PS4: res.find(k => k.Platform === 'PS4'),
        XBOX: res.find(k => k.Platform === 'XBOXONE')
      };
    });
