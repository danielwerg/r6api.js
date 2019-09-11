const { getAuthString } = require('../auth');
const fetch = require('../fetch');
const { URLS } = require('../constants.js');

module.exports = (platform, query) =>

  getAuthString()
    .then(fetch(URLS('ID')(platform.toLowerCase(), query)))
    .then(res =>
      [].concat(res.profiles).map(user => ({
        id: user.profileId,
        userId: user.userId,
        username: user.nameOnPlatform,
        platform: user.platformType
      }))
    );
