const { getAuthString } = require('../auth');
const fetch = require('../fetch');
const { URLS } = require('../constants.js');

module.exports = (platform, query) =>

  getAuthString()
    .then(fetch(URLS('LEVEL')(platform.toLowerCase(), query)))
    .then(res =>
      [].concat(res.player_profiles).map(user => ({
        id: user.profile_id,
        level: user.level,
        xp: user.xp,
        lootboxProbability: {
          raw: user.lootbox_probability,
          percent: user.lootbox_probability.toString().replace(/\B(?=(\d{2})+(?!\d))/g, '.') + '%'
        }
      }))
    );
