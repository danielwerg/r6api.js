const { getAuthString } = require('../auth');
const fetch = require('../fetch');
const { URLS } = require('../constants.js');

module.exports = (platform, query) =>

  getAuthString()
    .then(fetch(URLS('PLAYTIME')(platform.toLowerCase(), query)))
    .then(res =>
      Object.keys(res.results).map(id => ({
        id: id,
        general: res.results[id]['generalpvp_timeplayed:infinite'] || 0,
        ranked: res.results[id]['rankedpvp_timeplayed:infinite'] || 0,
        casual: res.results[id]['casualpvp_timeplayed:infinite'] || 0,
        discovery: (res.results[id]['generalpvp_timeplayed:infinite'] || 0) - ((res.results[id]['rankedpvp_timeplayed:infinite'] || 0) + (res.results[id]['casualpvp_timeplayed:infinite'] || 0))
      }))
    );
