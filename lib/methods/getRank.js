const { URLS, RANKS, SEASONS } = require('../constants.js');
const { getAuthString } = require('../auth');
const { TooManyIdsError, NotAnArray } = require('../errors');
const fetch = require('../fetch');

module.exports = (platform, ids, options = {}) => {

  const query = [].concat(ids);
  if (query.length > 200) return Promise.reject(new TooManyIdsError('you can\'t pass more than 200 ids'));

  if (options.regions && !Array.isArray(options.regions)) Promise.reject(new NotAnArray());
  const regions = options.regions || ['ncsa', 'emea', 'apac'];

  const regionPromises = regions.map(region =>
    getAuthString().then(token => {
      return fetch(URLS[platform.toUpperCase()].RANK +
        `season_id=${options.season || -1}&profile_ids=${query.join(',')}&region_id=${region}`)
      (token);
    })
  );

  return Promise.all(regionPromises)
    .then(res =>
      res.reduce((r, { players }) => {
        for(let [id, { region, season, ...val }] of Object.entries(players)) {
          r[id] = r[id] || { id, season, seasonName: SEASONS[season], 'regions': {} };
          r[id]['regions'][region] = {
            region: region,
            skillMean: val.skill_mean,
            skillStdev: val.skill_stdev,
            current: {
              name: RANKS[val.rank].name,
              id: val.rank,
              mmr: val.mmr,
              image: `https://i.imgur.com/${RANKS[val.rank].badge ?
                RANKS[val.rank].badge : RANKS[val.rank].oldBadge}.png`
            },
            max: {
              name: RANKS[val.max_rank].name,
              id: val.max_rank,
              mmr: val.max_mmr,
              image: `https://i.imgur.com/${RANKS[val.max_rank].badge ?
                RANKS[val.max_rank].badge : RANKS[val.max_rank].oldBadge}.png`
            },
            lastMatch: {
              mmrChange: val.last_match_mmr_change,
              result: val.last_match_result,
              skillStdevChange: val.last_match_skill_stdev_change
            },
            previousMmr: val.previous_rank_mmr,
            nextMmr: val.next_rank_mmr,
            kills: val.kills,
            deaths: val.deaths,
            wins: val.wins,
            losses: val.losses,
            abandons: val.abandons,
            updateTime: val.update_time,
          };
        }
        return r;
      }, {})
    ).then(r => Object.values(r));

}
