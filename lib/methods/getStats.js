const { getAuthString } = require('../auth');
const fetch = require('../fetch');
const { URLS, WEAPONTYPES, WEAPONS, OPERATORS, STATS } = require('../constants.js');

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

  const stats = [...new Set(
    [].concat(...[].concat(...['pvp', 'pve'].map(type => Object.values(STATS).map(f => f(type)))))
  )];

  return getAuthString()
    .then(fetch(URLS('STATS')(platform.toLowerCase(), query, stats)))
    .then(res => res.results)
    .then(res =>
      Object.keys(res).reduce(
        (acc, cur) =>
          acc.concat({
            id: cur,
            ...raw && { raw: res[cur] },
            pvp: {
              weapons: weaponsGetter(res[cur], 'pvp'),
              operators: operatorsGetter(res[cur], 'pvp'),
              general: generalGetter(res[cur], 'pvp'),
              modes: {
                bomb: {
                  name: 'Bomb',
                  wins: res[cur]['plantbombpvp_matchwon:infinite'],
                  losses: res[cur]['plantbombpvp_matchlost:infinite'],
                  matches: res[cur]['plantbombpvp_matchplayed:infinite'],
                  bestScore: res[cur]['plantbombpvp_bestscore:infinite'],
                  playtime: res[cur]['plantbombpvp_timeplayed:infinite']
                },
                secure: {
                  name: 'Secure Area',
                  wins: res[cur]['secureareapvp_matchwon:infinite'],
                  losses: res[cur]['secureareapvp_matchlost:infinite'],
                  matches: res[cur]['secureareapvp_matchplayed:infinite'],
                  bestScore: res[cur]['secureareapvp_bestscore:infinite'],
                  playtime: res[cur]['secureareapvp_timeplayed:infinite'],
                  secured: res[cur]['generalpvp_servershacked:infinite'],
                  defended: res[cur]['generalpvp_serverdefender:infinite'],
                  contested: res[cur]['generalpvp_serveraggression:infinite']
                },
                hostage: {
                  name: 'Hostage',
                  wins: res[cur]['rescuehostagepvp_matchwon:infinite'],
                  losses: res[cur]['rescuehostagepvp_matchlost:infinite'],
                  played: res[cur]['rescuehostagepvp_matchplayed:infinite'],
                  matches: res[cur]['rescuehostagepvp_bestscore:infinite'],
                  playtime: res[cur]['rescuehostagepvp_timeplayed:infinite'],
                  hostageRescued: res[cur]['generalpvp_hostagerescue:infinite'],
                  hostageDefended: res[cur]['generalpvp_hostagedefense:infinite']
                }
              },
              queue: {
                casual: {
                  name: 'Casual',
                  kills: res[cur]['casualpvp_kills:infinite'],
                  deaths: res[cur]['casualpvp_death:infinite'],
                  wins: res[cur]['casualpvp_matchwon:infinite'],
                  losses: res[cur]['casualpvp_matchlost:infinite'],
                  matches: res[cur]['casualpvp_matchplayed:infinite'],
                  playtime: res[cur]['casualpvp_timeplayed:infinite']
                },
                ranked: {
                  name: 'Ranked',
                  kills: res[cur]['rankedpvp_kills:infinite'],
                  deaths: res[cur]['rankedpvp_death:infinite'],
                  wins: res[cur]['rankedpvp_matchwon:infinite'],
                  losses: res[cur]['rankedpvp_matchlost:infinite'],
                  matches: res[cur]['rankedpvp_matchplayed:infinite'],
                  playtime: res[cur]['rankedpvp_timeplayed:infinite']
                },
                discovery: {
                  name: 'Discovery',
                  kills: (res[cur]['generalpvp_kills:infinite'] || 0) - ((res[cur]['rankedpvp_kills:infinite'] || 0) + (res[cur]['casualpvp_kills:infinite'] || 0)),
                  deaths: (res[cur]['generalpvp_death:infinite'] || 0) - ((res[cur]['rankedpvp_death:infinite'] || 0) + (res[cur]['casualpvp_death:infinite'] || 0)),
                  wins: (res[cur]['generalpvp_matchwon:infinite'] || 0) - ((res[cur]['rankedpvp_matchwon:infinite'] || 0) + (res[cur]['casualpvp_matchwon:infinite'] || 0)),
                  losses: (res[cur]['generalpvp_matchlost:infinite'] || 0) - ((res[cur]['rankedpvp_matchlost:infinite'] || 0) + (res[cur]['casualpvp_matchlost:infinite'] || 0)),
                  matches: (res[cur]['generalpvp_matchplayed:infinite'] || 0) - ((res[cur]['rankedpvp_matchplayed:infinite'] || 0) + (res[cur]['casualpvp_matchplayed:infinite'] || 0)),
                  playtime: (res[cur]['generalpvp_timeplayed:infinite'] || 0) - ((res[cur]['rankedpvp_timeplayed:infinite'] || 0) + (res[cur]['casualpvp_timeplayed:infinite'] || 0))
                }
              }
            },
            pve: {
              weapons: weaponsGetter(res[cur], 'pve'),
              operators: operatorsGetter(res[cur], 'pve'),
              general: generalGetter(res[cur], 'pve'),
              modes: {
                classic: {
                  wins: res[cur]['terrohuntclassicpve_matchwon:infinite'],
                  losses: res[cur]['terrohuntclassicpve_matchlost:infinite'],
                  matches: res[cur]['terrohuntclassicpve_matchplayed:infinite'],
                  bestScore: res[cur]['terrohuntclassicpve_bestscore:infinite']
                },
                protection: {
                  wins: res[cur]['protecthostagepve_matchwon:infinite'],
                  losses: res[cur]['protecthostagepve_matchlost:infinite'],
                  matches: res[cur]['protecthostagepve_matchplayed:infinite'],
                  bestScore: res[cur]['protecthostagepve_bestscore:infinite']
                },
                extraction: {
                  wins: res[cur]['rescuehostagepve_matchwon:infinite'],
                  losses: res[cur]['rescuehostagepve_matchlost:infinite'],
                  matches: res[cur]['rescuehostagepve_matchplayed:infinite'],
                  bestScore: res[cur]['rescuehostagepve_bestscore:infinite']
                },
                bomb: {
                  wins: res[cur]['plantbombpve_matchwon:infinite'],
                  losses: res[cur]['plantbombpve_matchlost:infinite'],
                  matches: res[cur]['plantbombpve_matchplayed:infinite'],
                  bestScore: res[cur]['plantbombpve_bestscore:infinite']
                }
              },
              types: {
                local: {
                  normal: res[cur]['allterrohuntsolo_normal_bestscore:infinite'],
                  hard: res[cur]['allterrohuntsolo_hard_bestscore:infinite'],
                  realistic: res[cur]['allterrohuntsolo_realistic_bestscore:infinite']
                },
                coop: {
                  normal: res[cur]['allterrohuntcoop_normal_bestscore:infinite'],
                  hard: res[cur]['allterrohuntcoop_hard_bestscore:infinite'],
                  realistic: res[cur]['allterrohuntcoop_realistic_bestscore:infinite']
                }
              }
            }
          }),
        []
      )
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

}
