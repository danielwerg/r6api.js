declare module 'r6api.js' {
  export type Platform = 'uplay' | 'psn' | 'xbl'
  export type Region = 'ncsa' | 'emea' | 'apac'
  export type SeasonNumber = 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14
  export type RankNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  export type WeaponType = 'assault' | 'smg' | 'lmg' | 'marksman' | 'pistol' | 'shotgun' | 'mp' | 'launcher' | 'utility'
  export type Operator = 'recruitsas' | 'recruitfbi' | 'recruitgign' | 'recruitspetsnaz' | 'recruitgsg' | 'smoke' | 'mute' | 'sledge' | 'thatcher' | 'castle' | 'pulse' | 'ash' | 'thermite' | 'doc' | 'rook' | 'twitch' | 'montagne' | 'kapkan' | 'tachanka' | 'glaz' | 'fuze' | 'jager' | 'bandit' | 'blitz' | 'iq' | 'frost' | 'buck' | 'valkyrie' | 'blackbeard' | 'caveira' | 'capitao' | 'echo' | 'hibana' | 'mira' | 'jackal' | 'lesion' | 'ying' | 'ela' | 'zofia' | 'vigil' | 'dokkaebi' | 'lion' | 'finka' | 'maestro' | 'alibi' | 'clash' | 'maverick' | 'kaid' | 'nomad' | 'mozzie' | 'gridlock' | 'warden' | 'nokk'

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
    region: Region[]
    season: SeasonNumber | -1
  }

  export interface RankInfo {
    id: string
    season: SeasonNumber
    seasonName: string
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
    abandons: number
    updateTime: string
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
    name: string
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
    mode: Record<string, PvPMode>
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
    type: Record<'local' | 'coop', StatsType>
    mode: Record<string, PvEMode>
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

  export const auth: {
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

  export function getStatus(): Promise<Record<'PC' | 'PSN' | 'XBL', ServerStatus>>

  export function getId(platform: Platform, username: string | string[]): Promise<UserInfo[]>

  export function getUsername(platform: Platform, id: string | string[]): Promise<UserInfo[]>

  export function getLevel(platform: Platform, id: string | string[]): Promise<LevelInfo[]>

  export function getPlaytime(platform: Platform, id: string | string[]): Promise<PlaytimeInfo[]>

  export function getRank(platform: Platform, id: string | string[], options?: RankOptions): Promise<RankInfo[]>

  export function getStats(platform: Platform, id: string | string[], raw?: boolean): Promise<Stats[]>

  export function custom(url: string): Promise<any>

  export const constants: {
    URLS: {
      LOGIN: string
      STATUS: string
      UPLAY: Service
      PSN: Service
      XBL: Service
    }
    WEAPONTYPES: Record<number | string, WeaponType>
    WEAPONS: Weapon[]
    OPERATORS: OperatorStructure[]
    STATS: string[]
    RANKS: Record<RankNumber, Rank>
    SEASONS: Record<SeasonNumber, string>
  }

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
    name: string
    readableName: string
    role: string
    ctu: string
    badge: string
    fullIndex: string
    gadget: GadgetGenerator[]
  }

  export interface GadgetGenerator {
    id: (type: any) => string
    name: string
  }

  export interface Rank {
    name: string
    oldBadge: string
    badge?: string
  }

  export const errors: Record<'InvalidCredentialsError' | 'MissingHeaderError' | 'MissingCredentialsError' | 'PlayerNotFound' | 'TooManyRequestsError' | 'UnknownAuthError' | 'NoTokenError' | 'TooManyIdsError' | 'NotAnArray' | 'BadRequestError', (msg: string) => Error>
}
