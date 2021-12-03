import { getToken } from '../auth';
import fetch from '../fetch';
import {
  Platform, UUID, SeasonId, SeasonIdExtended, RankIdV3, RankIdV4, RankIdV5, RegionId, BoardId,
  IOptionsDocs
} from '../typings';
import { REGIONS, SEASONS, BOARDS } from '../constants';
import {
  getURL, getCDNURL, getKD, getWinRate,
  getRankNameFromRankId, getRankIconFromRankId, getRankIdFromMmr
} from '../utils';

export interface IRank {
  max_mmr: number;
  skill_mean: number;
  deaths: number;
  profile_id: string;
  next_rank_mmr: number;
  rank: RankIdV3 | RankIdV4 | RankIdV5;
  max_rank: RankIdV3 | RankIdV4 | RankIdV5;
  board_id: BoardId;
  skill_stdev: number;
  kills: number;
  last_match_skill_stdev_change: number;
  past_seasons_wins: number;
  update_time: string;
  last_match_mmr_change: number;
  abandons: number;
  season: SeasonId;
  past_seasons_losses: number;
  top_rank_position: number;
  last_match_skill_mean_change: number;
  mmr: number;
  previous_rank_mmr: number;
  last_match_result: 0 | 1 | 2 | 3;
  past_seasons_abandons: number;
  wins: number;
  region: RegionId;
  losses: number;
}
export interface IApiResponse {
  players: Record<string, IRank>
}

export type IBoards = Record<BoardId, {
  boardId: BoardId;
  boardName: string;
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
  pastSeasons: {
    wins: number;
    losses: number;
    winRate: string;
    matches: number;
    abandons: number;
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
}>
export type IRegions = Record<RegionId, {
  regionId: RegionId;
  regionName: string;
  boards: IBoards;
}>
export type ISeasons = Record<SeasonId, {
  seasonId: SeasonId;
  seasonName?: string;
  seasonColor?: `#${string}`;
  seasonImage?: string;
  seasonReleaseDate?: string;
  regions: IRegions;
}>
export interface IGetRanks {
  id: UUID;
  seasons: ISeasons;
}

export interface IOptions {
  seasonIds?: SeasonIdExtended | SeasonIdExtended[] | 'all';
  regionIds?: RegionId | RegionId[] | 'all';
  boardIds?: BoardId | BoardId[] | 'all';
}

export const optionsDocs: IOptionsDocs = [
  [
    'seasonIds', '`number \\| number[] \\| string`', false,
    '`-1`',
    `Numbers from \`6\` to \`${Object.keys(SEASONS).slice(-1)[0]}\` or \`-1\` or \`'all'\``
  ],
  [
    'regionIds', '`string \\| string[]`', false,
    '`[\'emea\', \'ncsa\', \'apac\']`',
    '`\'emea\'`, `\'ncsa\'`, `\'apac\'` or `\'all\'`'
  ],
  [
    'boardIds', '`string \\| string[]`', false,
    '`[\'pvp_ranked\', \'pvp_casual\', \'pvp_newcomer\', \'pvp_event\']`',
    '`\'pvp_ranked\'`, `\'pvp_casual\'`, `\'pvp_newcomer\'` or `\'pvp_event\'`'
  ]
];

const getMatchResult = (id: IRank['last_match_result']) =>
  ({ 0: 'unknown', 1: 'win', 2: 'loss', 3: 'abandon' }[id]);

export default (platform: Platform, ids: UUID[], options?: IOptions) => {

  const boardIds = options && options.boardIds && options.boardIds !== 'all'
    ? [options.boardIds].flat() : Object.keys(BOARDS) as BoardId[];

  const minSeasonId = Object.entries(BOARDS)
    .reverse().filter(([boardId]) => boardIds.includes(boardId as BoardId))[0]?.[1].seasonId;

  const seasonIds = options && (options.seasonIds === 'all'
    ? Object.keys(SEASONS)
      .slice(
        (minSeasonId as NonNullable<typeof minSeasonId>) - Number(Object.keys(SEASONS)[0])
      )
      .map(season => Number(season) as SeasonId)
    : options.seasonIds && [options.seasonIds].flat()
  ) || [-1];

  const regionIds = options && options.regionIds && options.regionIds !== 'all'
    ? [options.regionIds].flat() : Object.keys(REGIONS) as RegionId[];

  return Promise.all(seasonIds.map(seasonId =>
    Promise.all(regionIds.map(regionId =>
      Promise.all(boardIds.map(boardId =>
        getToken()
          .then(fetch<IApiResponse>(getURL.RANKS(platform, ids, seasonId, regionId, boardId)))
      ))
    ))
  ))
    .then(res =>
      Object.values(
        res
          .flat(2)
          .reduce((acc, { players }) => {
            Object.entries(players)
              .map((
                [id, { season: seasonId, region: regionId, board_id: boardId, ...val }]
              ) => {

                const matches = val.wins + val.losses;
                const currentRankId =
                  boardId !== 'pvp_ranked'
                    ? getRankIdFromMmr(seasonId, val.mmr, matches) : val.rank;

                acc[id] = acc[id] || { id: id as UUID, seasons: {} };
                acc[id].seasons[seasonId] = acc[id].seasons[seasonId] || {
                  seasonId,
                  ...SEASONS[seasonId] && {
                    seasonName: SEASONS[seasonId].name,
                    seasonColor: SEASONS[seasonId].color,
                    seasonImage: getCDNURL(SEASONS[seasonId].imageId, 'jpg'),
                    seasonReleaseDate: SEASONS[seasonId].releaseDate
                  },
                  regions: {}
                };
                acc[id].seasons[seasonId].regions[regionId] =
                  acc[id].seasons[seasonId].regions[regionId] || {
                    regionId,
                    regionName: REGIONS[regionId],
                    boards: {}
                  };
                acc[id].seasons[seasonId].regions[regionId].boards[boardId] = {
                  boardId,
                  boardName: BOARDS[boardId].name,
                  skillMean: val.skill_mean,
                  skillStdev: val.skill_stdev,
                  current: {
                    id: currentRankId,
                    name: getRankNameFromRankId(currentRankId, seasonId),
                    mmr: val.mmr,
                    icon: getRankIconFromRankId(currentRankId, seasonId)
                  },
                  max: {
                    id: val.max_rank,
                    name: getRankNameFromRankId(val.max_rank, seasonId),
                    mmr: val.max_mmr,
                    icon: getRankIconFromRankId(val.max_rank, seasonId)
                  },
                  lastMatch: {
                    result: getMatchResult(val.last_match_result),
                    mmrChange: val.last_match_mmr_change,
                    skillMeanChange: val.last_match_skill_mean_change,
                    skillStdevChange: val.last_match_skill_stdev_change
                  },
                  pastSeasons: {
                    wins: val.past_seasons_wins,
                    losses: val.past_seasons_losses,
                    winRate: getWinRate({
                      wins: val.past_seasons_wins, losses: val.past_seasons_losses
                    }),
                    matches: val.past_seasons_wins + val.past_seasons_losses,
                    abandons: val.past_seasons_abandons
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
                  matches,
                  abandons: val.abandons,
                  updateTime: val.update_time
                };

              });
            return acc;
          }, {} as Record<string, any>)
      ) as IGetRanks[]
    );

};
