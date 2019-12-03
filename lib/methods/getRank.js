const { getAuthString } = require('../auth');
const fetch = require('../fetch');
const { URLS, OLD_RANKS, RANKS, SEASONS } = require('../constants.js');
const { flatten, getImgurLink } = require('../functions.js');

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
      Object.values(
        flatten(res)
          .reduce((acc, { players }) => {
            Object.entries(players)
              .map(([id, { season, region, ...val }]) => {
                acc[id] = acc[id] || { id, seasons: {} };
                acc[id].seasons[season] = acc[id].seasons[season] || {
                  id: season, name: SEASONS[season], regions: {}
                };
                acc[id].seasons[season].regions[region] = {
                  region,
                  skillMean: val.skill_mean,
                  skillStdev: val.skill_stdev,
                  current: {
                    name: season < 15
                      ? OLD_RANKS[val.rank].name
                      : RANKS[val.rank].name,
                    id: val.rank,
                    mmr: val.mmr,
                    image: season < 15
                      ? getImgurLink(
                          OLD_RANKS[val.rank][season < 14 ? 'oldBadge' : 'badge']
                        )
                      : getImgurLink(RANKS[val.rank].badge)
                  },
                  max: {
                    name: season < 15 ? OLD_RANKS[val.max_rank].name : RANKS[val.max_rank].name,
                    id: val.max_rank,
                    mmr: val.max_mmr,
                    image: season < 15
                      ? getImgurLink(
                          OLD_RANKS[val.max_rank][season < 14 ? 'oldBadge' : 'badge']
                        )
                      : getImgurLink(RANKS[val.max_rank].badge)
                  },
                  lastMatch: {
                    mmrChange: val.last_match_mmr_change,
                    won: val.last_match_result === 1 ? true : false,
                    skillStdevChange: val.last_match_skill_stdev_change
                  },
                  previousMmr: val.previous_rank_mmr,
                  nextMmr: val.next_rank_mmr,
                  nextRankMatchesNeeded: val.next_rank_mmr !== 0 && Math.abs(val.last_match_mmr_change) !== 0
                    ? Number(
                        ((val.next_rank_mmr - val.mmr) / Math.abs(val.last_match_mmr_change)).toFixed(2)
                      )
                    : 0,
                  topRankPosition: val.top_rank_position,
                  kills: val.kills,
                  deaths: val.deaths,
                  wins: val.wins,
                  losses: val.losses,
                  matches: val.wins + val.losses,
                  abandons: val.abandons,
                  updateTime: val.update_time
                };
              });
            return acc;
          }, {})
      )
    );

}
