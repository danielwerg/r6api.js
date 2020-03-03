const { getAuthString } = require('../auth');
const fetch = require('../fetch');
const { URLS, WEAPONTYPES, WEAPONS, OPERATORS, STATS } = require('../constants.js');
const { flatten } = require('../functions.js');

module.exports = (platform, query, raw = false) => {

  const weaponsGetter = (obj, type) =>
    Object.keys(WEAPONTYPES).reduce((acc, cur) => {
      acc[WEAPONTYPES[cur]] = {
        general: {
          kills: obj[`weapontype${type}_kills:${cur}:infinite`],
          deaths: obj[`weapontype${type}_death:${cur}:infinite`],
          headshots: obj[`weapontype${type}_headshot:${cur}:infinite`],
          bulletsFired: obj[`weapontype${type}_bulletfired:${cur}:infinite`],
          bulletsConnected: obj[`weapontype${type}_bullethit:${cur}:infinite`],
          timesChosen: obj[`weapontype${type}_chosen:${cur}:infinite`]
        }
      };
      acc[WEAPONTYPES[cur]].list = Object.keys(WEAPONS).reduce((a, c) => {
        const val = WEAPONS[c];
        if (WEAPONTYPES[cur] === val.category) a[val.name] = {
          name: val.name,
          kills: obj[`weapon${type}_kills:${val.id}:infinite`],
          deaths: obj[`weapon${type}_death:${val.id}:infinite`],
          headshots: obj[`weapon${type}_headshot:${val.id}:infinite`],
          bulletsFired: obj[`weapon${type}_bulletfired:${val.id}:infinite`],
          bulletsConnected: obj[`weapon${type}_bullethit:${val.id}:infinite`],
          timesChosen: obj[`weapon${type}_chosen:${val.id}:infinite`]
        }
        return Object.values(a);
      }, []);
      return acc;
    }, {});

  const operatorsGetter = (obj, type) =>
    OPERATORS.reduce((acc, cur) => {
      acc[cur.name] = {
        name: cur.readableName,
        role: cur.role,
        badge: `https://i.imgur.com/${cur.badge}.png`,
        ctu: cur.ctu,
        kills: obj[`operator${type}_kills:${cur.fullIndex}:infinite`],
        deaths: obj[`operator${type}_death:${cur.fullIndex}:infinite`],
        wins: obj[`operator${type}_roundwon:${cur.fullIndex}:infinite`],
        losses: obj[`operator${type}_roundlost:${cur.fullIndex}:infinite`],
        headshots: obj[`operator${type}_headshot:${cur.fullIndex}:infinite`],
        meleeKills: obj[`operator${type}_meleekills:${cur.fullIndex}:infinite`],
        dbno: obj[`operator${type}_dbno:${cur.fullIndex}:infinite`],
        xp: obj[`operator${type}_totalxp:${cur.fullIndex}:infinite`],
        playtime: obj[`operator${type}_timeplayed:${cur.fullIndex}:infinite`],
        gadget: cur.gadget ? cur.gadget.map(g => ({
          name: g.name,
          value: obj[`${g.id(type)}:${cur.fullIndex}:infinite`]
        })) : null
      };
      return acc;
    }, {});

  const generalGetter = (obj, type) => ({
    bulletsFired: obj[`general${type}_bulletfired:infinite`],
    bulletsConnected: obj[`general${type}_bullethit:infinite`],
    kills: obj[`general${type}_kills:infinite`],
    deaths: obj[`general${type}_death:infinite`],
    assists: obj[`general${type}_killassists:infinite`],
    headshots: obj[`general${type}_headshot:infinite`],
    meleeKills: obj[`general${type}_meleekills:infinite`],
    penetrationKills: obj[`general${type}_penetrationkills:infinite`],
    blindKills: obj[`general${type}_blindkills:infinite`],
    dbno: obj[`general${type}_dbno:infinite`],
    dbnoAssists: obj[`general${type}_dbnoassists:infinite`],
    revives: obj[`general${type}_revive:infinite`],
    matches: obj[`general${type}_matchplayed:infinite`],
    wins: obj[`general${type}_matchwon:infinite`],
    losses: obj[`general${type}_matchlost:infinite`],
    playtime: obj[`general${type}_timeplayed:infinite`],
    gadgetsDestroyed: obj[`general${type}_gadgetdestroy:infinite`],
    rappelBreaches: obj[`general${type}_rappelbreach:infinite`],
    barricadesDeployed: obj[`general${type}_barricadedeployed:infinite`],
    reinforcementsDeployed: obj[`general${type}_reinforcementdeploy:infinite`],
    suicides: obj[`general${type}_suicide:infinite`],
    distanceTravelled: obj[`general${type}_distancetravelled:infinite`],
    customGamesPlaytime: obj[`custom${type}_timeplayed:infinite`]
  });

  const discoveryStatGetter = (obj, type) =>
    (obj[`generalpvp_${type}:infinite`] || 0) -
      ((obj[`rankedpvp_${type}:infinite`] || 0) +
      (obj[`casualpvp_${type}:infinite`] || 0));

  const limit = 7500 - query.join(',').length;

  const stats = flatten(
    [...new Set(
      ['pvp', 'pve'].map(type => Object.values(STATS).map(f => f(type)))
    )]
  )
    .reduce((acc, curr) => {
      const index = acc.length ? acc.length - 1 : 0;
      const string = acc[index] ? `${acc[index]},${curr}` : curr
      return string.length <= limit
        ? Object.assign(acc, { [index]: string })
        : [...acc, curr];
    }, []);

  return Promise.all(stats.map(chunk =>
    getAuthString()
      .then(fetch(URLS('STATS')(platform.toLowerCase(), query, chunk)))
  ))
    .then(res =>
      Object.entries(
        res
          .map(obj => obj.results)
          .reduce((acc, curr) => {
            Object.keys(curr).map(key =>
              acc[key] = Object.assign(acc[key] || [], curr[key])
            );
            return acc;
          }, {})
      )
        .map(([id, val]) => ({
          id,
          pvp: {
            weapons: weaponsGetter(val, 'pvp'),
            operators: operatorsGetter(val, 'pvp'),
            general: generalGetter(val, 'pvp'),
            modes: {
              bomb: {
                name: 'Bomb',
                wins: val['plantbombpvp_matchwon:infinite'],
                losses: val['plantbombpvp_matchlost:infinite'],
                matches: val['plantbombpvp_matchplayed:infinite'],
                bestScore: val['plantbombpvp_bestscore:infinite'],
                playtime: val['plantbombpvp_timeplayed:infinite']
              },
              secure: {
                name: 'Secure Area',
                wins: val['secureareapvp_matchwon:infinite'],
                losses: val['secureareapvp_matchlost:infinite'],
                matches: val['secureareapvp_matchplayed:infinite'],
                bestScore: val['secureareapvp_bestscore:infinite'],
                playtime: val['secureareapvp_timeplayed:infinite'],
                secured: val['generalpvp_servershacked:infinite'],
                defended: val['generalpvp_serverdefender:infinite'],
                contested: val['generalpvp_serveraggression:infinite']
              },
              hostage: {
                name: 'Hostage',
                wins: val['rescuehostagepvp_matchwon:infinite'],
                losses: val['rescuehostagepvp_matchlost:infinite'],
                matches: val['rescuehostagepvp_matchplayed:infinite'],
                bestScore: val['rescuehostagepvp_bestscore:infinite'],
                playtime: val['rescuehostagepvp_timeplayed:infinite'],
                hostageRescued: val['generalpvp_hostagerescue:infinite'],
                hostageDefended: val['generalpvp_hostagedefense:infinite']
              }
            },
            queue: {
              casual: {
                name: 'Casual',
                kills: val['casualpvp_kills:infinite'],
                deaths: val['casualpvp_death:infinite'],
                wins: val['casualpvp_matchwon:infinite'],
                losses: val['casualpvp_matchlost:infinite'],
                matches: val['casualpvp_matchplayed:infinite'],
                playtime: val['casualpvp_timeplayed:infinite']
              },
              ranked: {
                name: 'Ranked',
                kills: val['rankedpvp_kills:infinite'],
                deaths: val['rankedpvp_death:infinite'],
                wins: val['rankedpvp_matchwon:infinite'],
                losses: val['rankedpvp_matchlost:infinite'],
                matches: val['rankedpvp_matchplayed:infinite'],
                playtime: val['rankedpvp_timeplayed:infinite']
              },
              discovery: {
                name: 'Discovery',
                kills: discoveryStatGetter(val, 'kills'),
                deaths: discoveryStatGetter(val, 'death'),
                wins: discoveryStatGetter(val, 'matchwon'),
                losses: discoveryStatGetter(val, 'matchlost'),
                matches: discoveryStatGetter(val, 'matchplayed'),
                playtime: discoveryStatGetter(val, 'timeplayed'),
              }
            }
          },
          pve: {
            weapons: weaponsGetter(val, 'pve'),
            operators: operatorsGetter(val, 'pve'),
            general: generalGetter(val, 'pve'),
            modes: {
              classic: {
                wins: val['terrohuntclassicpve_matchwon:infinite'],
                losses: val['terrohuntclassicpve_matchlost:infinite'],
                matches: val['terrohuntclassicpve_matchplayed:infinite'],
                bestScore: val['terrohuntclassicpve_bestscore:infinite']
              },
              protection: {
                wins: val['protecthostagepve_matchwon:infinite'],
                losses: val['protecthostagepve_matchlost:infinite'],
                matches: val['protecthostagepve_matchplayed:infinite'],
                bestScore: val['protecthostagepve_bestscore:infinite']
              },
              extraction: {
                wins: val['rescuehostagepve_matchwon:infinite'],
                losses: val['rescuehostagepve_matchlost:infinite'],
                matches: val['rescuehostagepve_matchplayed:infinite'],
                bestScore: val['rescuehostagepve_bestscore:infinite']
              },
              bomb: {
                wins: val['plantbombpve_matchwon:infinite'],
                losses: val['plantbombpve_matchlost:infinite'],
                matches: val['plantbombpve_matchplayed:infinite'],
                bestScore: val['plantbombpve_bestscore:infinite']
              }
            },
            types: {
              local: {
                normal: val['allterrohuntsolo_normal_bestscore:infinite'],
                hard: val['allterrohuntsolo_hard_bestscore:infinite'],
                realistic: val['allterrohuntsolo_realistic_bestscore:infinite']
              },
              coop: {
                normal: val['allterrohuntcoop_normal_bestscore:infinite'],
                hard: val['allterrohuntcoop_hard_bestscore:infinite'],
                realistic: val['allterrohuntcoop_realistic_bestscore:infinite']
              }
            }
          }
        }))
    )
      .then(object => {
        (function x(obj) {
          for (let key in obj) {
            if (obj[key] && typeof obj[key] === 'object') x(obj[key]);
            else obj[key] = !obj[key] ? obj[key] === null ? obj[key] : 0 : obj[key];
          }
        })(object);
        return object;
      });

};
