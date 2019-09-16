const { getAuthString } = require('../auth');
const fetch = require('../fetch');
const { URLS, OLD_RANKS, RANKS, SEASONS } = require('../constants.js');

module.exports = (platform, query, opts = {}) => {

  const seasons = opts.seasons && opts.seasons === 'all'
    ? Object.keys(SEASONS)
    : opts.seasons && [].concat(opts.seasons) || [-1];
  const regions = opts.regions && [].concat(opts.regions) || ['ncsa', 'emea', 'apac'];

  return Promise.all(seasons.map(season =>
    Promise.all(regions.map(region =>
      getAuthString()
        .then(fetch(URLS('RANK')(platform.toLowerCase(), query, season, region)))
    ))
  ))
    .then(res =>
      Object.values([].concat(...res)
        .reduce((r, { players }) => {
          Object.entries(players).forEach(([id, { season, region, ...val }]) => {
            r[id] = r[id] || { id, seasons: {} };
            r[id].seasons[season] = r[id].seasons[season] || {
              id: season, name: SEASONS[season], regions: {}
            };
            r[id].seasons[season].regions[region] = {
              region: region,
              skillMean: val.skill_mean,
              skillStdev: val.skill_stdev,
              current: {
                name: season < 15 ? OLD_RANKS[val.rank].name : RANKS[val.rank].name,
                id: val.rank,
                mmr: val.mmr,
                image: season < 15
                  ? `https://i.imgur.com/${OLD_RANKS[val.rank][season < 14 ? 'oldBadge' : 'badge']}.png`
                  : `https://i.imgur.com/${RANKS[val.rank].badge}.png`
              },
              max: {
                name: season < 15 ? OLD_RANKS[val.max_rank].name : RANKS[val.max_rank].name,
                id: val.max_rank,
                mmr: val.max_mmr,
                image: season < 15
                  ? `https://i.imgur.com/${OLD_RANKS[val.max_rank][season < 14 ? 'oldBadge' : 'badge']}.png`
                  : `https://i.imgur.com/${RANKS[val.max_rank].badge}.png`
              },
              lastMatch: {
                mmrChange: val.last_match_mmr_change,
                won: val.last_match_result === 1 ? true : false,
                skillStdevChange: val.last_match_skill_stdev_change
              },
              previousMmr: val.previous_rank_mmr,
              nextMmr: val.next_rank_mmr,
              ...val.next_rank_mmr !== 0 && Math.abs(val.last_match_mmr_change) !== 0 && {
                nextRankMatchesNeeded: (val.next_rank_mmr - val.mmr) / Math.abs(val.last_match_mmr_change)
              },
              topRankPosition: val.top_rank_position,
              kills: val.kills,
              deaths: val.deaths,
              wins: val.wins,
              losses: val.losses,
              matches: val.wins + val.losses,
              abandons: val.abandons,
              updateTime: val.update_time,
            };
          });
          return r;
        }, {})
      )
    );

}
