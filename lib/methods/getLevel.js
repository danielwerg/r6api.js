const { URLS } = require('../constants.js');
const { getAuthString } = require('../auth');
const { TooManyIdsError } = require('../errors.js');
const fetch = require('../fetch');
const Promise = require('bluebird');

module.exports = (platform, ids) => {

  const query = [].concat(ids);
  if (query.length > 40) return Promise.reject(new TooManyIdsError('you can\'t pass more than 40 ids'));

  return getAuthString()
    .then(fetch(URLS[platform.toUpperCase()].LEVEL + query.join(',')))
    .then(res =>
      [].concat(res.player_profiles).map(user => ({
        id: user.profile_id,
        level: user.level,
        xp: user.xp,
        lootboxProbability: {
          raw: user.lootbox_probability,
          procent: user.lootbox_probability.toString().replace(/\B(?=(\d{2})+(?!\d))/g, '.') + '%'
        }
      }))
    );

}
