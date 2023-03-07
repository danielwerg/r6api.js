import { getSeasonShorthand, MAPS, OPERATORS, SEASONS, WEAPONS } from 'r6data';

import { SPACES_ID } from '../constants';
import type { DataDev, OptionsDocs, Service, Platform } from '../types';
import { capitalize, getServiceOrPlatform, getWinRate, getWL } from '../utils';

export interface PlayerStats {
  profileId: string;
  startDate: number;
  endDate: number;
  region: string;
  statType: string;
  platforms: PlayerStatsPlatforms;
}

export interface PlayerStatsPlatforms {
  PC?: PlayerStatsPlatform;
  XONE?: PlayerStatsPlatform;
  PS4?: PlayerStatsPlatform;
}

export interface PlayerStatsPlatform {
  gameModes: PlayerStatsGameModes;
}

export interface PlayerStatsGameModes {
  all?: PlayerStatsGameMode;
  casual?: PlayerStatsGameMode;
  ranked?: PlayerStatsGameMode;
  unranked?: PlayerStatsGameMode;
}

export interface PlayerStatsGameMode {
  type?: string;
  teamRoles: PlayerStatsTeamRoles;
}

export interface PlayerStatsTeamRoles {
  all?: PlayerStatsTeamRole[] | PlayerStatsWeaponsTeamRole;
  Attacker?: PlayerStatsTeamRole[] | PlayerStatsWeaponsTeamRole;
  Defender?: PlayerStatsTeamRole[] | PlayerStatsWeaponsTeamRole;
}

export interface PlayerStatsTeamRole {
  type: string;
  statsType?: string;
  statsDetail?: string;
  /** `undefined` when `view` is *not* `'seasonal'` */
  seasonYear?: string;
  /** `undefined` when `view` is *not* `'seasonal'` */
  seasonNumber?: string;
  matchesPlayed: number;
  roundsPlayed: number;
  minutesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  roundsWon: number;
  roundsLost: number;
  kills: number;
  assists: number;
  death: number;
  headshots: number;
  meleeKills: number;
  teamKills: number;
  openingKills: number;
  openingDeaths: number;
  trades: number;
  openingKillTrades: number;
  openingDeathTrades: number;
  revives: number;
  distanceTravelled: number;
  winLossRatio: number;
  killDeathRatio: PlayerStatsValuePercent;
  headshotAccuracy: PlayerStatsValuePercent;
  killsPerRound: PlayerStatsValuePercent;
  roundsWithAKill: PlayerStatsValuePercent;
  roundsWithMultiKill: PlayerStatsValuePercent;
  roundsWithOpeningKill: PlayerStatsValuePercent;
  roundsWithOpeningDeath: PlayerStatsValuePercent;
  roundsWithKOST: PlayerStatsValuePercent;
  roundsSurvived: PlayerStatsValuePercent;
  roundsWithAnAce: PlayerStatsValuePercent;
  roundsWithClutch: PlayerStatsValuePercent;
  timeAlivePerMatch: number;
  timeDeadPerMatch: number;
  distancePerRound: number;
}

export interface PlayerStatsValuePercent {
  value: number;
  p: number;
}

export interface PlayerStatsWeaponsTeamRole {
  weaponSlots: PlayerStatsWeaponsWeaponSlots;
}

export interface PlayerStatsWeaponsWeaponSlots {
  secondaryWeapons: PlayerStatsWeaponsWeapons;
  primaryWeapons: PlayerStatsWeaponsWeapons;
}

export interface PlayerStatsWeaponsWeapons {
  weaponTypes: PlayerStatsWeaponsWeaponType[];
}

export interface PlayerStatsWeaponsWeaponType {
  weaponType: string;
  weapons: PlayerStatsWeaponsWeapon[];
}

export interface PlayerStatsWeaponsWeapon {
  weaponName: string;
  roundsPlayed: number;
  roundsWon: number;
  roundsLost: number;
  kills: number;
  headshots: number;
  headshotAccuracy: number;
  roundsWithAKill: number;
  roundsWithMultiKill: number;
}

interface ProcessSharedOptions {
  profileId: string;
  platformKey: keyof PlayerStatsPlatforms;
  region: string;
  gameModeKey: keyof PlayerStatsGameModes;
  teamRoleKey: keyof PlayerStatsTeamRoles;
  rawView: string;
  rawAggregation: string;
}
const processShared = ({
  profileId,
  platformKey,
  region,
  gameModeKey,
  teamRoleKey,
  rawView,
  rawAggregation
}: ProcessSharedOptions) => ({
  profileId,
  platform: getServiceOrPlatform(platformKey.toLowerCase() as Platform).service,
  region,
  gameMode: gameModeKey as GameMode,
  teamRole: teamRoleKey.toLowerCase() as TeamRole,
  view:
    rawView.toLowerCase() === 'generalized'
      ? 'current'
      : (rawView.toLowerCase() as View),
  aggregation: rawAggregation as Aggregation
});

interface ProcessNonWeaponsOptions
  extends Omit<ProcessSharedOptions, 'rawView'> {
  teamRoleValue: PlayerStatsTeamRole[];
  aggregation: Aggregation;
}
const processNonWeapons = ({
  teamRoleValue,
  profileId,
  platformKey,
  region,
  gameModeKey,
  teamRoleKey,
  rawAggregation,
  aggregation
}: ProcessNonWeaponsOptions) =>
  teamRoleValue.map(stat => ({
    ...processShared({
      profileId,
      platformKey,
      region,
      gameModeKey,
      teamRoleKey,
      rawView: stat.type,
      rawAggregation
    }),
    ...(stat.seasonYear && stat.seasonNumber
      ? {
          season: SEASONS.find(
            ({ shorthand }) =>
              shorthand ===
              `${
                stat.seasonYear === 'Y1' && stat.seasonNumber === 'S0'
                  ? 'Y0'
                  : stat.seasonYear!
              }${stat.seasonNumber!}`
          )
        }
      : {}),
    ...(aggregation === 'maps' && {
      map:
        MAPS.find(map =>
          stat.statsDetail?.toLowerCase().includes(map.slug.replace(/_/g, ' '))
        ) ?? null
    }),
    ...(aggregation === 'operators' && {
      operator:
        OPERATORS.find(operator =>
          stat.statsDetail?.toLowerCase().includes(operator.slug)
        ) ?? null
    }),
    wins: stat.matchesWon,
    losses: stat.matchesLost,
    matches: stat.matchesPlayed,
    wl: stat.winLossRatio,
    winRate: getWinRate({
      wins: stat.matchesWon,
      losses: stat.matchesLost
    }),
    rounds: {
      wins: stat.roundsWon,
      losses: stat.roundsLost,
      played: stat.roundsPlayed,
      wl: getWL({ wins: stat.roundsWon, losses: stat.roundsLost }),
      winRate: getWinRate({
        wins: stat.roundsWon,
        losses: stat.roundsLost
      }),
      withAKill: stat.roundsWithAKill.value,
      withMultiKill: stat.roundsWithMultiKill.value,
      withOpeningKill: stat.roundsWithOpeningKill.value,
      withOpeningDeath: stat.roundsWithOpeningDeath.value,
      withKOST: stat.roundsWithKOST.value,
      withClutch: stat.roundsWithClutch.value,
      withAnAce: stat.roundsWithAnAce.value,
      survived: stat.roundsSurvived.value
    },
    minutesPlayed: stat.minutesPlayed,
    kills: stat.kills,
    death: stat.death,
    assists: stat.assists,
    kd: stat.killDeathRatio.value,
    killsPerRound: stat.killsPerRound.value,
    headshots: stat.headshots,
    headshotAccuracy: stat.headshotAccuracy.value,
    meleeKills: stat.meleeKills,
    teamKills: stat.teamKills,
    openingKills: stat.openingKills,
    openingDeaths: stat.openingDeaths,
    trades: stat.trades,
    openingKillTrades: stat.openingKillTrades,
    openingDeathTrades: stat.openingDeathTrades,
    revives: stat.revives,
    distanceTravelled: stat.distanceTravelled,
    distancePerRound: stat.distancePerRound,
    timeAlivePerMatch: stat.timeAlivePerMatch,
    timeDeadPerMatch: stat.timeDeadPerMatch
  }));

interface ProcessWeaponsOptions extends ProcessSharedOptions {
  teamRoleValue: PlayerStatsWeaponsTeamRole;
}
const processWeapons = ({
  teamRoleValue,
  profileId,
  platformKey,
  region,
  gameModeKey,
  teamRoleKey,
  rawView,
  rawAggregation
}: ProcessWeaponsOptions) =>
  (
    Object.entries(teamRoleValue.weaponSlots) as [
      keyof PlayerStatsWeaponsWeaponSlots,
      PlayerStatsWeaponsWeapons
    ][]
  )
    .map(([, { weaponTypes }]) =>
      weaponTypes.map(({ weapons }) =>
        weapons.map(weapon => ({
          ...processShared({
            profileId,
            platformKey,
            region,
            gameModeKey,
            teamRoleKey,
            rawView,
            rawAggregation
          }),
          weapon: WEAPONS.find(w =>
            weapon.weaponName
              .replace('F0-12', 'FO-12') // NOTE: Ubisoft moment
              .toLowerCase()
              .replace(/ /g, '_')
              .includes(w.slug)
          ),
          kills: weapon.kills,
          headshots: weapon.headshots,
          headshotAccuracy: weapon.headshotAccuracy,
          rounds: {
            wins: weapon.roundsWon,
            losses: weapon.roundsLost,
            played: weapon.roundsPlayed,
            withAKill: weapon.roundsWithAKill,
            withMultiKill: weapon.roundsWithMultiKill
          }
        }))
      )
    )
    .flat(2);

type ProcessNonWeaponsReturn = ReturnType<typeof processNonWeapons>;
type ProcessWeaponsReturn = ReturnType<typeof processWeapons>;

export const getUserStatsOptions: OptionsDocs = [
  ['platform', 'Platform', true, '', ''],
  ['profileId', 'string', true, '', ''],
  [
    'view',
    'string',
    true,
    '',
    '`\'seasonal\'` value only valid when `aggregation` is `\'summary\'`'
  ],
  ['aggregation', 'string', true, '', ''],
  ['gameModes', 'string[]', false, 'undefined', ''],
  ['teamRoles', 'string[]', false, 'undefined', ''],
  [
    'seasonsId',
    'number[]',
    false,
    'undefined',
    `Numbers from \`0\` to \`${
      SEASONS.at(-1)?.id ?? 'FIXME'
    }\`. Mutually exclusive with \`startDate\` and \`endDate\``
  ],
  [
    'startDate',
    'string',
    false,
    'undefined',
    'Mutually exclusive with `seasonId`'
  ],
  [
    'startDate',
    'string',
    false,
    'undefined',
    'Mutually exclusive with `seasonId`'
  ]
];

export type View = 'current' | 'seasonal';
export type Aggregation = 'summary' | 'operators' | 'weapons' | 'maps';
export type GameMode = 'all' | 'ranked' | 'casual' | 'unranked';
export type TeamRole = 'all' | 'attacker' | 'defender';

export interface GetUserStatsOptions<T> {
  platform: Service;
  profileId: string;
  view: View;
  aggregation: T;
  gameModes?: GameMode[];
  teamRoles?: TeamRole[];
  /** Mutually exclusive with `startDate` and `endDate` */
  seasonsId?: number[];
  /** Mutually exclusive with `seasonId` */
  startDate?: string;
  /** Mutually exclusive with `seasonId` */
  endDate?: string;
}
export const getUserStats =
  ({ dataDev }: { dataDev: DataDev }) =>
  <T extends Aggregation>({
    profileId,
    platform,
    view,
    aggregation,
    gameModes,
    teamRoles,
    seasonsId,
    startDate,
    endDate
  }: GetUserStatsOptions<T>): T extends 'weapons'
    ? Promise<ProcessWeaponsReturn>
    : Promise<ProcessNonWeaponsReturn> =>
    dataDev<PlayerStats>({
      version: 1,
      path: '/playerstats',
      profileId,
      params: {
        spaceId: SPACES_ID[platform],
        platform: getServiceOrPlatform(platform).platfrom.toUpperCase(),
        view,
        aggregation,
        ...(gameModes ? { gameMode: gameModes } : {}),
        ...(teamRoles
          ? {
              teamRole: teamRoles.map(teamRole =>
                teamRole === 'all' ? teamRole : capitalize(teamRole)
              )
            }
          : {}),
        ...(seasonsId === undefined
          ? {}
          : {
              seasons: seasonsId
                .map(getSeasonShorthand)
                .map(seasonId => seasonId.replace('Y0S0', 'Y1S0'))
            }),
        ...(startDate ? { startDate } : {}),
        ...(endDate ? { endDate } : {})
      }
    }).then(({ platforms, ...res }) =>
      (
        Object.entries(platforms) as [
          keyof PlayerStatsPlatforms,
          PlayerStatsPlatform
        ][]
      )
        .map(([platformKey, { gameModes }]) =>
          (
            Object.entries(gameModes) as [
              keyof PlayerStatsGameModes,
              PlayerStatsGameMode
            ][]
          ).map(([gameModeKey, { teamRoles }]) =>
            (
              Object.entries(teamRoles) as [
                keyof PlayerStatsTeamRoles,
                PlayerStatsTeamRole[] | PlayerStatsWeaponsTeamRole
              ][]
            ).map(([teamRoleKey, teamRoleValue]) =>
              aggregation === 'weapons'
                ? processWeapons({
                    teamRoleValue: teamRoleValue as PlayerStatsWeaponsTeamRole,
                    profileId: res.profileId,
                    platformKey,
                    region: res.region,
                    gameModeKey,
                    teamRoleKey,
                    rawView: view,
                    rawAggregation: res.statType
                  })
                : processNonWeapons({
                    teamRoleValue: teamRoleValue as PlayerStatsTeamRole[],
                    profileId: res.profileId,
                    platformKey,
                    region: res.region,
                    gameModeKey,
                    teamRoleKey,
                    rawAggregation: res.statType,
                    aggregation
                  })
            )
          )
        )
        .flat(3)
    ) as Promise<ProcessNonWeaponsReturn & ProcessWeaponsReturn>;
