const { URLS } = require('../constants.js');
const { getAuthString } = require('../auth');
const { TooManyIdsError } = require('../errors.js');
const fetch = require('../fetch');
const Promise = require('bluebird');

module.exports = (platform, usernames) => {

  const query = [].concat(usernames);
  if (query.length > 50) return Promise.reject(new TooManyIdsError('you can\'t pass more than 50 usernames'));

  return getAuthString()
    .then(fetch(URLS[platform.toUpperCase()].ID + query.join(',')))
    .then(res =>
      [].concat(res.profiles).map(user => ({
        id: user.profileId,
        userId: user.userId,
        username: user.nameOnPlatform,
        platform: user.platformType
      }))
    );

}
