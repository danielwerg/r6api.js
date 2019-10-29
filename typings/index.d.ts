import { seasonNumber, oldRankNumber, operator, rankNumber, weaponName, weaponType } from './autogen'
import * as constants from '../lib/constants'

declare module 'r6api.js' {
  export type Platform = 'uplay' | 'psn' | 'xbl'
  export type Region = 'ncsa' | 'emea' | 'apac'
  export type SeasonNumber = seasonNumber
  export type OldRankNumber = oldRankNumber
  export type Operator = operator
  export type RankNumber = rankNumber
  export type WeaponName = weaponName
  export type WeaponType = weaponType

  export interface Credentials {
    email: string
    password: string
  }

  export interface ServerStatus {
    AppID: string
    Category: string
    Name: string
    Platform: string
    Status: string
    Maintenance: null
  }

  export interface UserInfo {
    id: string
    userId: string
    username: string
    platform: string
  }

  export interface LevelInfo {
    id: string
    level: number
    xp: number
    lootboxProbability: {
      raw: number
      percent: string
    }
  }

  export interface PlaytimeInfo {
    id: string
    general: number
    ranked: number
    casual: number
    discovery: number
  }

  //#region Rank
  export interface RankOptions {
    regions?: Region[]
    seasons?: (SeasonNumber | -1)[] | 'all'
  }

  export interface RankInfo {
    id: string
    seasons: Record<SeasonNumber, RankSeason>
  }

  export interface RankSeason {
    id: SeasonNumber
    name: string
    regions: Record<Region, RankRegion>
  }

  export interface RankRegion {
    region: Region
    skillMean: number
    skillStdev: number
    current: RankStat
    max: RankStat
    lastMatch: {
      mmrChange: number
      result: number
      skillStdevChange: number
    }
    previousMmr: number
    nextMmr: number
    nextRankMatchesNeeded: number
    kills: number
    deaths: number
    wins: number
    losses: number
    matches: number
    abandons: number
    updateTime: string
    topRankPosition: number
  }

  export interface RankStat {
    name: string
    id: number
    mmr: number
    image: string
  }
  //#endregion

  //#region Stats
  export interface Stats {
    id: string
    pvp: PvP
    pve: PvE
  }

  export interface StatsBase {
    weapons: Record<WeaponType, WeaponCategory>
    operators: Record<Operator, OperatorStats>
    general: {
      bulletsFired: number
      bulletsConnected: number
      kills: number
      deaths: number
      assists: number
      headshots: number
      meleeKills: number
      penetrationKills: number
      blindKills: number
      dbno: number
      dbnoAssists: number
      revives: number
      matches: number
      wins: number
      losses: number
      playtime: number
      gadgetsDestroyed: number
      rappelBreaches: number
      barricadesDeployed: number
      reinforcementsDeployed: number
      suicides: number
      distanceTravelled: number
      customGamesPlaytime: number
    }
  }

  //#region Weapons
  interface WeaponCategory {
    general: {
      kills: number
      deaths: number
      headshots: number
      bulletsFired: number
      bulletsConnected: number
      timesChosen: number
    }
    list: WeaponStats[]
  }

  interface WeaponStats {
    name: WeaponName
    kills: number
    deaths: number
    headshots: number
    bulletsFired: number
    bulletsConnected: number
    timesChosen: number
  }
  //#endregion

  //#region Operators
  export interface OperatorStats {
    name: string
    role: string
    badge: string
    kills: number
    deaths: number
    wins: number
    losses: number
    headshots: number
    meleeKills: number
    dbno: number
    xp: number
    playtime: number
    gadget: Gadget[]
  }

  export interface Gadget {
    name: string
    value: number
  }
  //#endregion

  export interface ModeBase {
    wins: number
    losses: number
    matches: number
    bestScore?: number
  }

  //#region PvP
  export interface PvP extends StatsBase {
    queue: Record<string, StatsQueue>
    modes: Record<string, PvPMode>
  }

  export interface StatsQueue {
    name: string
    kills: number
    deaths: number
    wins: number
    losses: number
    matches: number
    playtime: number
  }

  export interface PvPMode extends ModeBase {
    name: string
    playtime: number
    secured?: number
    defended?: number
    contested?: number
    played?: number
    hostageRescued?: number
    hostageDefended?: number
  }
  //#endregion

  //#region PvE
  export interface PvE extends StatsBase {
    types: Record<'local' | 'coop', StatsType>
    modes: Record<string, PvEMode>
  }

  export interface StatsType {
    normal: number
    hard: number
    realistic: number
  }

  export interface PvEMode extends ModeBase {
    bestScore: number
  }
  //#endregion
  //#endregion

  export interface Service {
    APPID: string
    ID: string
    USERNAME: string
    STATS: string
    LEVEL: string
    PLAYTIME: string
    RANK: string
  }

  export interface Weapon {
    name: string
    id: string
    category: WeaponType
  }

  export interface OperatorStructure {
    name: Operator
    readableName: string
    role: string
    ctu: string
    badge: string
    fullIndex: string
    gadget: GadgetGenerator[] | null
  }

  export interface GadgetGenerator {
    id: (type: any) => string
    name: string
  }

  export interface Rank {
    name: string
    badge: string
  }

  export interface OldRank extends Rank {
    oldBadge: string
  }

  export type UrlTypeSwitch = 'LOGIN' | 'STATUS' | 'APPID' | 'ID' | 'USERNAME' | 'LEVEL' | 'PLAYTIME' | 'STATS' | 'RANK'

  export type UrlReturnSwitch<T> =
    T extends 'LOGIN' | 'STATUS' ? string :
    T extends 'APPID' ? (platform: Platform) => string :
    T extends 'ID' | 'USERNAME' | 'LEVEL' | 'PLAYTIME' ? (platform: Platform, query: string[]) => string :
    T extends 'STATS' ? (platform: Platform, query: string[], stats: any[]) => string :
    T extends 'RANK' ? (platform: Platform, query: string[], season: SeasonNumber, region: Region) => string :
    undefined

  export default class {
    constructor(email: string, password: string)

    auth: {
      login(email: string, password: string): Promise<any>
      setCredentials(email: string, password: string): void
      getCredentials(): Credentials
      getAuthString(): Promise<string>
      refreshScheduled(): boolean
      cancelRefresh(): void
      setTokenFileLocation(dir: string): string
      _setAuth(authObj: any): any
      _getAuth(): any
    }

    constants: {
      URLS<T extends UrlTypeSwitch>(type: T): UrlReturnSwitch<T>
      WEAPONTYPES: Record<number | string, WeaponType>
      WEAPONS: Weapon[]
      OPERATORS: OperatorStructure[]
      STATS: {
        general(type: string): string[]
        ranked(): string[]
        casual(): string[]
        mode(): string[]
        weaponTypes(type: string): string[]
        weapons(type: string): string[]
        operators(type: string): string[]
        operatorGadgets(type: string): string[]
        thunt(): string[]
      }
      RANKS: Record<RankNumber, Rank>
      OLD_RANKS: Record<OldRankNumber, OldRank>
      SEASONS: Record<SeasonNumber, string>
    }

    errors: Record<'InvalidCredentialsError' | 'MissingHeaderError' | 'MissingCredentialsError' | 'PlayerNotFound' | 'TooManyRequestsError' | 'UnknownAuthError' | 'NoTokenError' | 'TooManyIdsError' | 'NotAnArray' | 'BadRequestError', (msg: string) => Error>

    getStatus(): Promise<Record<'PC' | 'PSN' | 'XBL', ServerStatus>>

    getId(platform: Platform, username: string | string[]): Promise<UserInfo[]>

    getUsername(platform: Platform, id: string | string[]): Promise<UserInfo[]>

    getLevel(platform: Platform, id: string | string[]): Promise<LevelInfo[]>

    getPlaytime(platform: Platform, id: string | string[]): Promise<PlaytimeInfo[]>

    getRank(platform: Platform, id: string | string[], options?: RankOptions): Promise<RankInfo[]>

    getStats(platform: Platform, id: string | string[], raw?: boolean): Promise<Stats[]>

    custom(url: string): Promise<any>
  }
}
