import { getToken } from '../auth';
import fetch from '../fetch';
import {
  Platform, UUID, SeasonId, SeasonIdExtended, RankId, OldRankId, RegionId, BoardId
} from '../typings';
import { REGIONS, SEASONS, RANKS, OLD_RANKS, GITHUB_ASSETS_URL } from '../constants';
import { URLS, getCDNURL, getKD, getWinRate } from '../utils';

interface IRank {
  max_mmr: number;
  skill_mean: number;
  deaths: number;
  profile_id: string;
  next_rank_mmr: number;
  rank: RankId | OldRankId;
  max_rank: RankId | OldRankId;
  board_id: string;
  skill_stdev: number;
  kills: number;
  last_match_skill_stdev_change: number;
  update_time: string;
  last_match_mmr_change: number;
  abandons: number;
  season: SeasonId;
  top_rank_position: number;
  last_match_skill_mean_change: number;
  mmr: number;
  previous_rank_mmr: number;
  last_match_result: 0 | 1 | 2 | 3;
  wins: number;
  region: RegionId;
  losses: number;
}
export interface IApiResponse {
  players: {
    [id: string]: IRank;
  };
}

interface IRegions {
  [id: string]: {
    id: string;
    name: string;
    skillMean: number;
    skillStdev: number;
    current: {
      id: number;
      name: string;
      mmr: number;
      icon: string;
    };
    max: {
      id: number;
      name: string;
      mmr: number;
      icon: string;
    };
    lastMatch: {
      result: string;
      mmrChange: number;
      skillMeanChange: number;
      skillStdevChange: number;
    };
    previousMmr: number;
    nextMmr: number;
    topRankPosition: number;
    kills: number;
    deaths: number;
    kd: number;
    wins: number;
    losses: number;
    winRate: string;
    matches: number;
    abandons: number;
    updateTime: string;
  };
}
interface ISeasons {
  [id: string]: {
    id: number;
    name?: string;
    color?: string;
    image?: string;
    releaseDate?: string;
    regions: IRegions;
  };
}
export interface IGetRanks {
  id: UUID;
  seasons: ISeasons;
}

export interface IOptions {
  seasons?: SeasonIdExtended | SeasonIdExtended[] | 'all';
  regions?: RegionId | RegionId[] | 'all';
  boardId?: BoardId;
}

export const optionsDocs = [
  [
    'seasons', '`number \\| number[] \\| \'all\'`', 'false', '`-1`',
    `Numbers from \`6\` to \`${Object.keys(SEASONS).slice(-1)[0]}\` or \`-1\``
  ],
  [
    'regions', '`string \\| string[]`', 'false', '`[\'emea\', \'ncsa\', \'apac\']`', ''
  ],
  [
    'board', '`\'pvp_ranked\' \\| \'pvp_casual\'`', 'false', '`\'pvp_ranked\'`', ''
  ]
];

const getRankName = (seasonId: SeasonId, rankId: RankId) =>
  seasonId < 15 ? OLD_RANKS[rankId as OldRankId] : RANKS[rankId];

const getRankIconURL = (seasonId: SeasonId, rankId: RankId) =>
  `${GITHUB_ASSETS_URL}/ranks/v${
    seasonId < 14 ? '3' : seasonId < 15
      ? [17, 18, 19, 20].includes(rankId) ? '3.1' : '3'
      : [1, 6, 11, 23].includes(rankId)
        ? '3.2' : [19, 20, 21, 22].includes(rankId) ? '3.1' : '3'
  }/${encodeURIComponent(getRankName(seasonId, rankId))}.png`;

const getMatchResult = (id: IRank['last_match_result']) =>
  ({ 0: 'unknown', 1: 'win', 2: 'loss', 3: 'abandon' }[id]);

const getBoardName = (boardId: BoardId) =>
  ({ 'pvp_ranked': 'Ranked', 'pvp_casual': 'Casual' })[boardId];

export default (platform: Platform, ids: UUID[], options?: IOptions) => {

  const seasons: SeasonIdExtended[] = options && options.seasons === 'all'
    ? Object.keys(SEASONS).map(season => Number(season) as SeasonId)
    : options && options.seasons && [].concat(options.seasons as any) || [-1];

  const regions = options && options.regions === 'all'
    ? (Object.keys(REGIONS) as RegionId[])
    : (options && options.regions && [].concat(options.regions as any))
      || (Object.keys(REGIONS) as RegionId[]);

  const board = options && options.boardId || 'pvp_ranked';

  return Promise.all(seasons.map(season =>
    Promise.all(regions.map(region =>
      getToken()
        .then(fetch<IApiResponse>(URLS.RANKS(platform, ids, season, region, board)))
    ))
  ))
    .then(res =>
      Object.values(
        res
          .flat()
          .reduce((acc, { players }) => {
            Object.entries(players)
              .map(([id, { season: seasonId, region: regionId, ...val }]) => {
                acc[id] = acc[id] || {
                  id: id as UUID,
                  boardId: board,
                  boardName: getBoardName(board),
                  seasons: {}
                };
                acc[id].seasons[seasonId] = acc[id].seasons[seasonId] || {
                  id: seasonId,
                  ...SEASONS[seasonId] && {
                    name: SEASONS[seasonId].name,
                    color: SEASONS[seasonId].color,
                    image: getCDNURL(SEASONS[seasonId].image, 'jpg'),
                    releaseDate: SEASONS[seasonId].releaseDate
                  },
                  regions: {}
                };
                acc[id].seasons[seasonId].regions[regionId] = {
                  id: regionId,
                  name: REGIONS[regionId],
                  skillMean: val.skill_mean,
                  skillStdev: val.skill_stdev,
                  current: {
                    id: val.rank,
                    name: getRankName(seasonId, val.rank),
                    mmr: val.mmr,
                    icon: getRankIconURL(seasonId, val.rank)
                  },
                  max: {
                    id: val.max_rank,
                    name: getRankName(seasonId, val.max_rank),
                    mmr: val.max_mmr,
                    icon: getRankIconURL(seasonId, val.max_rank)
                  },
                  lastMatch: {
                    result: getMatchResult(val.last_match_result),
                    mmrChange: val.last_match_mmr_change,
                    skillMeanChange: val.last_match_skill_mean_change,
                    skillStdevChange: val.last_match_skill_stdev_change
                  },
                  previousMmr: val.previous_rank_mmr,
                  nextMmr: val.next_rank_mmr,
                  topRankPosition: val.top_rank_position,
                  kills: val.kills,
                  deaths: val.deaths,
                  kd: getKD(val),
                  wins: val.wins,
                  losses: val.losses,
                  winRate: getWinRate(val),
                  matches: val.wins + val.losses,
                  abandons: val.abandons,
                  updateTime: val.update_time
                };
              });
            return acc;
          }, {})
      ) as IGetRanks[]
    );

};
