const { URLS } = require('../constants.js');
const { getAuthString } = require('../auth');
const { TooManyIdsError, PlayerNotFound } = require('../errors.js');
const fetch = require('../fetch');
const Promise = require('bluebird');

module.exports = (platform, ids) => {

  const query = [].concat(ids);
  if (query.length > 200) return Promise.reject(new TooManyIdsError('you can\'t pass more than 200 ids'));

  return getAuthString()
    .then(fetch(URLS[platform.toUpperCase()].PLAYTIME + query.join(',')))
    .then(res => 
      Object.keys(res.results).map(id => ({
        id: id,
        ranked: res.results[id]['rankedpvp_timeplayed:infinite'],
        casual: res.results[id]['casualpvp_timeplayed:infinite']
      }))
    );

}
