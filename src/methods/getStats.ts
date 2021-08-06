import { getToken } from '../auth';
import fetch from '../fetch';
import {
  Platform, UUID, MPType, WeaponTypeId, WeaponName, OperatorName, StatsCategoryName,
  IOptionsDocs
} from '../typings';
import {
  STATS_CATEGORIES, OPERATORS, WEAPONTYPES, WEAPONS, GITHUB_ASSETS_URL
} from '../constants';
import { getURL, getCDNURL, getKD, getWinRate } from '../utils';

export interface IApiResponse {
  results: {
    [id: string]: {
      [id: string]: number
    }
  }
}

export interface IGeneral {
  bulletsFired: number;
  bulletsConnected: number;
  kills: number;
  deaths: number;
  kd: number;
  assists: number;
  headshots: number;
  meleeKills: number;
  penetrationKills: number;
  blindKills: number;
  revives: number;
  wins: number;
  losses: number;
  winRate: string;
  matches: number;
  playtime: number;
  gadgetsDestroyed: number;
  rappelBreaches: number;
  barricadesDeployed: number;
  reinforcementsDeployed: number;
  suicides: number;
  distanceTravelled: number;
  xp: number;
}
export interface IGeneralpvp extends IGeneral {
  dbno: number;
  dbnoAssists: number;
}

export interface IQueuepvpbase {
  name: string;
  kills: number;
  deaths: number;
  kd: number;
  wins: number;
  losses: number;
  winRate: string;
  matches: number;
  playtime: number;
}
export interface IQueuespvp {
  ranked: IQueuepvpbase;
  casual: IQueuepvpbase;
  custom: {
    name: string;
    playtime: number;
  };
}
export interface IQueuepvebase {
  name: string;
  bestScore: number;
}
export interface IQueuespve {
  local: {
    normal: IQueuepvebase;
    hard: IQueuepvebase;
    realistic: IQueuepvebase;
  };
  coop: {
    normal: IQueuepvebase;
    hard: IQueuepvebase;
    realistic: IQueuepvebase;
  };
}

export interface IModepvpbase {
  name: string;
  wins: number;
  losses: number;
  winRate: string;
  matches: number;
  bestScore: number;
  playtime: number;
}
export interface IModepvpsecurearea extends IModepvpbase {
  secured: number;
  defended: number;
  contested: number;
}
export interface IModepvphostage extends IModepvpbase {
  hostageRescued: number;
  hostageDefended: number;
}
export interface IModespvp {
  bomb: IModepvpbase;
  secureArea: IModepvpsecurearea;
  hostage: IModepvphostage;
}
export interface IModespvebase {
  name: string;
  wins: number;
  losses: number;
  winRate: string;
  matches: number;
  bestScore: number;
}
export interface IModespve {
  disarmBomb: IModespvebase;
  elimination: IModespvebase;
  protectHostage: IModespvebase;
  extractHostage: IModespvebase;
}

export interface IOperatorStats {
  name: string;
  role: string;
  unit: string;
  icon: string;
  kills: number;
  deaths: number;
  kd: number;
  wins: number;
  losses: number;
  winRate: string;
  matches: number;
  headshots: number;
  meleeKills: number;
  xp: number;
  playtime: number;
  uniqueAbility: {
    name: string;
    icon: string;
    stats: {
      name: string;
      value: number;
    }[] | null
  } | null;
}
export interface IOperatorStatspvp extends IOperatorStats {
  dbno: number;
}

export interface IWeaponStats {
  name: string;
  icon: string;
  kills: number;
  deaths: number;
  kd: number;
  headshots: number;
  bulletsFired: number;
  bulletsConnected: number;
  timesChosen: number;
}
export interface IWeaponCategory {
  general: {
    name: string;
    kills: number;
    deaths: number;
    kd: number;
    headshots: number;
    bulletsFired: number;
    bulletsConnected: number;
    timesChosen: number;
  };
  list: Record<WeaponName, IWeaponStats>;
}

export interface IGetStats {
  id: UUID;
  raw?: any;
  pvp: {
    general: IGeneralpvp;
    operators: Record<OperatorName, IOperatorStatspvp>;
    weapons: Record<WeaponTypeId, IWeaponCategory>;
    queues: IQueuespvp;
    modes: IModespvp;
  };
  pve: {
    general: IGeneral;
    operators: Record<OperatorName, IOperatorStats>;
    weapons: Record<WeaponTypeId, IWeaponCategory>;
    queues: IQueuespve;
    modes: IModespve;
  };
}

export interface IOptions {
  raw?: boolean;
  categories?: StatsCategoryName[];
}

export const optionsDocs: IOptionsDocs = [
  ['raw', '`boolean`', false, '`false` ', 'Include raw API response'],
  ['categories', '`string[]`', false, 'Requests all', 'Categories to request']
];

const getOperatorIconURL = (name: string) =>
  `${GITHUB_ASSETS_URL}/operators/${name.includes('recruit') ? 'recruit' : name}.png`;

const statGetter = (obj: any, first: string, second: string, type?: MPType): number =>
  obj[`${first}${type || ''}_${second}:infinite`] || 0;

const generalGetter = (obj: any, type: MPType) => ({
  bulletsFired: statGetter(obj, 'general', 'bulletfired', type),
  bulletsConnected: statGetter(obj, 'general', 'bullethit', type),
  kills: statGetter(obj, 'general', 'kills', type),
  deaths: statGetter(obj, 'general', 'death', type),
  kd: getKD({
    kills: statGetter(obj, 'general', 'kills', type),
    deaths: statGetter(obj, 'general', 'death', type)
  }),
  assists: statGetter(obj, 'general', 'killassists', type),
  headshots: statGetter(obj, 'general', 'headshot', type),
  meleeKills: statGetter(obj, 'general', 'meleekills', type),
  penetrationKills: statGetter(obj, 'general', 'penetrationkills', type),
  blindKills: statGetter(obj, 'general', 'blindkills', type),
  ...type === 'pvp' && { dbno: statGetter(obj, 'general', 'dbno', type) },
  ...type === 'pvp' && { dbnoAssists: statGetter(obj, 'general', 'dbnoassists', type) },
  revives: statGetter(obj, 'general', 'revive', type),
  wins: statGetter(obj, 'general', 'matchwon', type),
  losses: statGetter(obj, 'general', 'matchlost', type),
  winRate: getWinRate({
    wins: statGetter(obj, 'general', 'matchwon', type),
    losses: statGetter(obj, 'general', 'matchlost', type)
  }),
  matches: statGetter(obj, 'general', 'matchplayed', type),
  playtime: statGetter(obj, 'general', 'timeplayed', type),
  gadgetsDestroyed: statGetter(obj, 'general', 'gadgetdestroy', type),
  rappelBreaches: statGetter(obj, 'general', 'rappelbreach', type),
  barricadesDeployed: statGetter(obj, 'general', 'barricadedeployed', type),
  reinforcementsDeployed: statGetter(obj, 'general', 'reinforcementdeploy', type),
  suicides: statGetter(obj, 'general', 'suicide', type),
  distanceTravelled: statGetter(obj, 'general', 'distancetravelled', type),
  xp: statGetter(obj, 'general', 'totalxp', type)
});

const operatorsGetter = (obj: any, type: MPType) =>
  Object.entries(OPERATORS).reduce((acc, [codeName, cur]) => {
    (acc as any)[codeName] = {
      name: cur.name,
      role: cur.role,
      unit: cur.unit,
      icon: getOperatorIconURL(codeName),
      kills: statGetter(obj, 'operator', `kills:${cur.id}`, type),
      deaths: statGetter(obj, 'operator', `death:${cur.id}`, type),
      kd: getKD({
        kills: statGetter(obj, 'operator', `kills:${cur.id}`, type),
        deaths: statGetter(obj, 'operator', `death:${cur.id}`, type)
      }),
      wins: statGetter(obj, 'operator', `roundwon:${cur.id}`, type),
      losses: statGetter(obj, 'operator', `roundlost:${cur.id}`, type),
      winRate: getWinRate({
        wins: statGetter(obj, 'operator', `roundwon:${cur.id}`, type),
        losses: statGetter(obj, 'operator', `roundlost:${cur.id}`, type)
      }),
      matches: statGetter(obj, 'operator', `roundwon:${cur.id}`, type) +
        statGetter(obj, 'operator', `roundlost:${cur.id}`, type),
      headshots: statGetter(obj, 'operator', `headshot:${cur.id}`, type),
      meleeKills: statGetter(obj, 'operator', `meleekills:${cur.id}`, type),
      ...type === 'pvp' && { dbno: statGetter(obj, 'operator', `dbno:${cur.id}`, type) },
      xp: statGetter(obj, 'operator', `totalxp:${cur.id}`, type),
      playtime: statGetter(obj, 'operator', `timeplayed:${cur.id}`, type),
      uniqueAbility: cur.uniqueAbility
        ? {
          name: cur.uniqueAbility.name,
          icon: getCDNURL(cur.uniqueAbility.iconId),
          stats: cur.uniqueAbility.stats
            ? cur.uniqueAbility.stats.map(gadget => ({
              name: gadget.name,
              value: statGetter(obj, 'operator', `${gadget.id}:${cur.id}`, type)
            }))
            : null
        }
        : null
    };
    return acc;
  }, {});

const weaponsGetter = (obj: any, type: MPType) =>
  Object.entries(WEAPONTYPES).reduce((acc, [weaponTypeIndex, weaponTypeVal]) => {
    (acc as any)[weaponTypeVal.id] = {};
    (acc as any)[weaponTypeVal.id].general = {
      name: weaponTypeVal.name,
      kills: statGetter(obj, 'weapontype', `kills:${weaponTypeIndex}`, type),
      deaths: statGetter(obj, 'weapontype', `death:${weaponTypeIndex}`, type),
      kd: getKD({
        kills: statGetter(obj, 'weapontype', `kills:${weaponTypeIndex}`, type),
        deaths: statGetter(obj, 'weapontype', `death:${weaponTypeIndex}`, type)
      }),
      headshots: statGetter(obj, 'weapontype', `headshot:${weaponTypeIndex}`, type),
      bulletsFired: statGetter(obj, 'weapontype', `bulletfired:${weaponTypeIndex}`, type),
      bulletsConnected: statGetter(obj, 'weapontype', `bullethit:${weaponTypeIndex}`, type),
      timesChosen: statGetter(obj, 'weapontype', `chosen:${weaponTypeIndex}`, type)
    };
    (acc as any)[weaponTypeVal.id].list = Object.entries(WEAPONS)
      .filter(([, weapon]) => weaponTypeVal.id === weapon.category)
      .reduce((acc2, [id, weapon]) => {
        acc2[id] = {
          name: weapon.name,
          icon: getCDNURL(weapon.iconId),
          kills: statGetter(obj, 'weapon', `kills:${weapon.id}`, type),
          deaths: statGetter(obj, 'weapon', `death:${weapon.id}`, type),
          kd: getKD({
            kills: statGetter(obj, 'weapon', `kills:${weapon.id}`, type),
            deaths: statGetter(obj, 'weapon', `death:${weapon.id}`, type)
          }),
          headshots: statGetter(obj, 'weapon', `headshot:${weapon.id}`, type),
          bulletsFired: statGetter(obj, 'weapon', `bulletfired:${weapon.id}`, type),
          bulletsConnected: statGetter(obj, 'weapon', `bullethit:${weapon.id}`, type),
          timesChosen: statGetter(obj, 'weapon', `chosen:${weapon.id}`, type)
        };
        return acc2;
      }, {} as Record<string, any>);
    return acc;
  }, {} as Record<string, any>);

export default (platform: Platform, ids: UUID[], options?: IOptions) => {

  const raw = options && options.raw || false;

  const limit = 7500 - ids.join(',').length;

  const stats: string[] = [...new Set(
    options && options.categories
      ? options.categories.map(category => STATS_CATEGORIES[category]).flat(2)
      : Object.values(STATS_CATEGORIES).flat(2)
  )]
    .reduce((acc: any, cur) => {
      const index = acc.length ? acc.length - 1 : 0;
      const string = acc[index] ? `${acc[index]},${cur}` : cur;
      return string.length <= limit
        ? Object.assign(acc, { [index]: string })
        : [...acc, cur];
    }, []);

  return Promise.all(stats.map(chunk =>
    getToken()
      .then(fetch<IApiResponse>(getURL.STATS(platform, ids, chunk)))
  ))
    .then(res =>
      Object.entries(
        res
          .reduce((acc, { results: cur }) => {
            Object.keys(cur).map(key =>
              acc[key] = Object.assign(acc[key] || {}, cur[key])
            );
            return acc;
          }, {} as Record<string, any>)
      )
        .map(([id, vals]) => ({
          id: id as UUID,
          ...raw && { raw: vals },
          pvp: {
            general: generalGetter(vals, 'pvp'),
            operators: operatorsGetter(vals, 'pvp'),
            weapons: weaponsGetter(vals, 'pvp'),
            queues: {
              ranked: {
                name: 'Ranked',
                kills: statGetter(vals, 'ranked', 'kills', 'pvp'),
                deaths: statGetter(vals, 'ranked', 'death', 'pvp'),
                kd: getKD({
                  kills: statGetter(vals, 'ranked', 'kills', 'pvp'),
                  deaths: statGetter(vals, 'ranked', 'death', 'pvp')
                }),
                wins: statGetter(vals, 'ranked', 'matchwon', 'pvp'),
                losses: statGetter(vals, 'ranked', 'matchlost', 'pvp'),
                winRate: getWinRate({
                  wins: statGetter(vals, 'ranked', 'matchwon', 'pvp'),
                  losses: statGetter(vals, 'ranked', 'matchlost', 'pvp')
                }),
                matches: statGetter(vals, 'ranked', 'matchplayed', 'pvp'),
                playtime: statGetter(vals, 'ranked', 'timeplayed', 'pvp')
              },
              casual: {
                name: 'Casual',
                kills: statGetter(vals, 'casual', 'kills', 'pvp'),
                deaths: statGetter(vals, 'casual', 'death', 'pvp'),
                kd: getKD({
                  kills: statGetter(vals, 'casual', 'kills', 'pvp'),
                  deaths: statGetter(vals, 'casual', 'death', 'pvp')
                }),
                wins: statGetter(vals, 'casual', 'matchwon', 'pvp'),
                losses: statGetter(vals, 'casual', 'matchlost', 'pvp'),
                winRate: getWinRate({
                  wins: statGetter(vals, 'casual', 'matchwon', 'pvp'),
                  losses: statGetter(vals, 'casual', 'matchlost', 'pvp')
                }),
                matches: statGetter(vals, 'casual', 'matchplayed', 'pvp'),
                playtime: statGetter(vals, 'casual', 'timeplayed', 'pvp')
              },
              custom: {
                name: 'Custom',
                playtime: statGetter(vals, 'custom', 'timeplayed', 'pvp')
              }
            },
            modes: {
              bomb: {
                name: 'Bomb',
                wins: statGetter(vals, 'plantbomb', 'matchwon', 'pvp'),
                losses: statGetter(vals, 'plantbomb', 'matchlost', 'pvp'),
                winRate: getWinRate({
                  wins: statGetter(vals, 'plantbomb', 'matchwon', 'pvp'),
                  losses: statGetter(vals, 'plantbomb', 'matchlost', 'pvp')
                }),
                matches: statGetter(vals, 'plantbomb', 'matchplayed', 'pvp'),
                bestScore: statGetter(vals, 'plantbomb', 'bestscore', 'pvp'),
                playtime: statGetter(vals, 'plantbomb', 'timeplayed', 'pvp')
              },
              secureArea: {
                name: 'Secure Area',
                wins: statGetter(vals, 'securearea', 'matchwon', 'pvp'),
                losses: statGetter(vals, 'securearea', 'matchlost', 'pvp'),
                winRate: getWinRate({
                  wins: statGetter(vals, 'securearea', 'matchwon', 'pvp'),
                  losses: statGetter(vals, 'securearea', 'matchlost', 'pvp')
                }),
                matches: statGetter(vals, 'securearea', 'matchplayed', 'pvp'),
                bestScore: statGetter(vals, 'securearea', 'bestscore', 'pvp'),
                playtime: statGetter(vals, 'securearea', 'timeplayed', 'pvp'),
                secured: statGetter(vals, 'general', 'servershacked', 'pvp'),
                defended: statGetter(vals, 'general', 'serverdefender', 'pvp'),
                contested: statGetter(vals, 'general', 'serveraggression', 'pvp')
              },
              hostage: {
                name: 'Hostage',
                wins: statGetter(vals, 'rescuehostage', 'matchwon', 'pvp'),
                losses: statGetter(vals, 'rescuehostage', 'matchlost', 'pvp'),
                winRate: getWinRate({
                  wins: statGetter(vals, 'rescuehostage', 'matchwon', 'pvp'),
                  losses: statGetter(vals, 'rescuehostage', 'matchlost', 'pvp')
                }),
                matches: statGetter(vals, 'rescuehostage', 'matchplayed', 'pvp'),
                bestScore: statGetter(vals, 'rescuehostage', 'bestscore', 'pvp'),
                playtime: statGetter(vals, 'rescuehostage', 'timeplayed', 'pvp'),
                hostageRescued: statGetter(vals, 'general', 'hostagerescue', 'pvp'),
                hostageDefended: statGetter(vals, 'general', 'hostagedefense', 'pvp')
              }
            }
          },
          pve: {
            general: generalGetter(vals, 'pve'),
            operators: operatorsGetter(vals, 'pve'),
            weapons: weaponsGetter(vals, 'pve'),
            queues: {
              local: {
                normal: {
                  name: 'Normal',
                  bestScore: statGetter(vals, 'allterrohuntsolo_normal', 'bestscore')
                },
                hard: {
                  name: 'Hard',
                  bestScore: statGetter(vals, 'allterrohuntsolo_hard', 'bestscore')
                },
                realistic: {
                  name: 'Realistic',
                  bestScore: statGetter(vals, 'allterrohuntsolo_realistic', 'bestscore')
                }
              },
              coop: {
                normal: {
                  name: 'Normal',
                  bestScore: statGetter(vals, 'allterrohuntcoop_normal', 'bestscore')
                },
                hard: {
                  name: 'Hard',
                  bestScore: statGetter(vals, 'allterrohuntcoop_hard', 'bestscore')
                },
                realistic: {
                  name: 'Realistic',
                  bestScore: statGetter(vals, 'allterrohuntcoop_realistic', 'bestscore')
                }
              }
            },
            modes: {
              disarmBomb: {
                name: 'Disarm Bomb',
                wins: statGetter(vals, 'plantbombpve', 'matchwon'),
                losses: statGetter(vals, 'plantbombpve', 'matchlost'),
                winRate: getWinRate({
                  wins: statGetter(vals, 'plantbombpve', 'matchwon'),
                  losses: statGetter(vals, 'plantbombpve', 'matchlost')
                }),
                matches: statGetter(vals, 'plantbombpve', 'matchplayed'),
                bestScore: statGetter(vals, 'plantbombpve', 'bestscore')
              },
              elimination: {
                name: 'Elimination',
                wins: statGetter(vals, 'terrohuntclassicpve', 'matchwon'),
                losses: statGetter(vals, 'terrohuntclassicpve', 'matchlost'),
                winRate: getWinRate({
                  wins: statGetter(vals, 'terrohuntclassicpve', 'matchwon'),
                  losses: statGetter(vals, 'terrohuntclassicpve', 'matchlost')
                }),
                matches: statGetter(vals, 'terrohuntclassicpve', 'matchplayed'),
                bestScore: statGetter(vals, 'terrohuntclassicpve', 'bestscore')
              },
              protectHostage: {
                name: 'Protect Hostage',
                wins: statGetter(vals, 'protecthostagepve', 'matchwon'),
                losses: statGetter(vals, 'protecthostagepve', 'matchlost'),
                winRate: getWinRate({
                  wins: statGetter(vals, 'protecthostagepve', 'matchwon'),
                  losses: statGetter(vals, 'protecthostagepve', 'matchlost')
                }),
                matches: statGetter(vals, 'protecthostagepve', 'matchplayed'),
                bestScore: statGetter(vals, 'protecthostagepve', 'bestscore')
              },
              extractHostage: {
                name: 'Extract Hostage',
                wins: statGetter(vals, 'rescuehostagepve', 'matchwon'),
                losses: statGetter(vals, 'rescuehostagepve', 'matchlost'),
                winRate: getWinRate({
                  wins: statGetter(vals, 'rescuehostagepve', 'matchwon'),
                  losses: statGetter(vals, 'rescuehostagepve', 'matchlost')
                }),
                matches: statGetter(vals, 'rescuehostagepve', 'matchplayed'),
                bestScore: statGetter(vals, 'rescuehostagepve', 'bestscore')
              }
            }
          }
        })) as IGetStats[]
    );

};
