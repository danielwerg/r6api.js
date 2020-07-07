import { getToken } from '../auth';
import fetch from '../fetch';
import {
  Platform, UUID, SeasonId, SeasonIdExtended,
  RankId, OldRankId, OlderRankId, Region, RegionExtended
} from '../typings';
import { REGIONS, SEASONS, RANKS, OLD_RANKS, OLDER_RANKS } from '../constants';
import { URLS, getImgurURL, getCDNURL, getKD, getWinRate } from '../utils';

interface IRank {
  max_mmr: number;
  skill_mean: number;
  deaths: number;
  profile_id: string;
  next_rank_mmr: number;
  rank: RankId | OldRankId | OlderRankId;
  max_rank: RankId | OldRankId | OlderRankId;
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
  last_match_result: number;
  wins: number;
  region: Region;
  losses: number;
}
export interface IApiResponse {
  players: {
    [id: string]: IRank;
  };
}

interface IRegions {
  [id: string]: {
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
      won: boolean;
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
    name: string;
    color: string;
    image: string;
    regions: IRegions;
  };
}
export interface IGetRanks {
  id: UUID;
  seasons: ISeasons;
}

export interface IOptions {
  seasons?: SeasonIdExtended | SeasonIdExtended[] | 'all';
  regions?: RegionExtended | RegionExtended[];
}

const getRankIcon = (seasonId: SeasonId, rankId: RankId) =>
  seasonId < 15
    ? getImgurURL(
      seasonId < 14
        ? OLDER_RANKS[(rankId as OlderRankId)].icon
        : OLD_RANKS[(rankId as OldRankId)].icon
    )
    : getImgurURL(RANKS[(rankId as RankId)].icon);

const getRankName = (seasonId: SeasonId, rankId: RankId): string =>
  seasonId < 15
    ? OLD_RANKS[(rankId as OldRankId)].name
    : RANKS[(rankId as RankId)].name;

export default (platform: Platform, ids: UUID[], options?: IOptions) => {

  const seasons: SeasonIdExtended[] = options && options.seasons === 'all'
    ? Object.keys(SEASONS).map(season => Number(season) as SeasonId)
    : options && options.seasons && [].concat(options.seasons as any) || [-1];

  const regions = options && options.regions === 'all'
    ? (REGIONS as Region[])
    : options && options.regions && [].concat(options.regions as any) || (REGIONS as Region[]);

  return Promise.all(seasons.map(season =>
    Promise.all(regions.map(region =>
      getToken()
        .then(fetch<IApiResponse>(URLS.RANKS(platform, ids, season, region)))
    ))
  ))
    .then(res =>
      Object.values(
        res
          .flat()
          .reduce((acc, { players }) => {
            Object.entries(players)
              .map(([id, { season: seasonId, region, ...val }]) => {
                acc[id] = acc[id] || { id: id as UUID, seasons: {} };
                acc[id].seasons[seasonId] = acc[id].seasons[seasonId] || {
                  id: seasonId,
                  name: SEASONS[seasonId].name,
                  color: SEASONS[seasonId].color,
                  image: getCDNURL(SEASONS[seasonId].image, 'jpg'),
                  regions: {}
                };
                acc[id].seasons[seasonId].regions[region] = {
                  name: region,
                  skillMean: val.skill_mean,
                  skillStdev: val.skill_stdev,
                  current: {
                    id: val.rank,
                    name: getRankName(seasonId, val.rank),
                    mmr: val.mmr,
                    icon: getRankIcon(seasonId, val.rank)
                  },
                  max: {
                    id: val.max_rank,
                    name: getRankName(seasonId, val.max_rank),
                    mmr: val.max_mmr,
                    icon: getRankIcon(seasonId, val.max_rank)
                  },
                  lastMatch: {
                    won: val.last_match_result === 1 ? true : false,
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
