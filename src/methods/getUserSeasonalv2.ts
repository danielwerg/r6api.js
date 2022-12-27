import { getAuth, getToken } from '../auth';
import { RANKS_V6 } from '../constants';
import fetch from '../fetch';
import { UUID, PlatformCrossplay, RankIdV6, SeasonId } from '../typings';
import { getKD, getRankIconFromRankId, getRankNameFromRankId, getURL, getWinRate } from '../utils';

export interface IApiResponse {
  platform_families_full_profiles: ISkillFullProfilesPlatformFamiliesFullProfile[];
}

export interface ISkillFullProfilesPlatformFamiliesFullProfile {
  board_ids_full_profiles: ISkillFullProfilesBoardIdsFullProfile[];
  platform_family: string;
}

export interface ISkillFullProfilesBoardIdsFullProfile {
  board_id: BoardSlug;
  full_profiles: ISkillFullProfilesFullProfile[];
}

export interface ISkillFullProfilesFullProfile {
  profile: ISkillFullProfilesProfile;
  season_statistics: ISkillFullProfilesSeasonStatistics;
}

export interface ISkillFullProfilesSeasonStatistics {
  deaths: number;
  kills: number;
  match_outcomes: ISkillFullProfilesMatchOutcomes;
}

export interface ISkillFullProfilesMatchOutcomes {
  abandons: number;
  losses: number;
  wins: number;
}

export interface ISkillFullProfilesProfile {
  board_id: BoardSlug;
  id: string;
  max_rank: RankIdV6;
  max_rank_points: number;
  platform_family: PlatformCrossplay;
  rank: RankIdV6;
  rank_points: number;
  season_id: SeasonId;
  top_rank_position: number;
}

export type BoardSlug = 'ranked' | 'casual' | 'event' | 'warmup' | 'newcomer';

export interface IGetRp {
  rankId: number;
  mmr: number;
}
export const getRp = ({ rankId, mmr }: IGetRp) =>
  mmr - (RANKS_V6.find(rank => rank.id === rankId)?.range?.[0] ?? 0);

export default (ids: UUID[]) => {

  // RANKS_V6

  return Promise.all([getToken(), getAuth()])
    .then(([token, auth]) => fetch<IApiResponse>(getURL.GETUSERSEASONALV2(ids))(token, auth))
    .then(res => res.platform_families_full_profiles
      .map(profile =>
        profile.board_ids_full_profiles.map(board => board.full_profiles)
      )
      .flat(2)
      .map(({ profile, season_statistics: seasonStatistics }) => {
        return {
          profileId: profile.id,
          platformCrossplay: profile.platform_family,
          seasonId: profile.season_id,
          boardSlug: profile.board_id,
          rank: {
            id: profile.rank,
            name: getRankNameFromRankId(profile.rank, profile.season_id),
            mmr: profile.rank_points,
            icon: getRankIconFromRankId(profile.rank, profile.season_id),
            rp: getRp({
              rankId: profile.rank,
              mmr: profile.rank_points
            })
          },
          maxRank: {
            id: profile.max_rank,
            name: getRankNameFromRankId(profile.max_rank, profile.season_id),
            mmr: profile.max_rank_points,
            icon: getRankIconFromRankId(profile.max_rank, profile.season_id),
            rp: getRp({
              rankId: profile.max_rank,
              mmr: profile.max_rank_points
            })
          },
          topRankPosition: profile.top_rank_position,
          kills: seasonStatistics.kills,
          deaths: seasonStatistics.deaths,
          kd: getKD({
            kills: seasonStatistics.kills,
            deaths: seasonStatistics.deaths
          }),
          wins: seasonStatistics.match_outcomes.wins,
          losses: seasonStatistics.match_outcomes.losses,
          winRate: getWinRate({
            wins: seasonStatistics.match_outcomes.wins,
            losses: seasonStatistics.match_outcomes.losses
          }),
          abandons: seasonStatistics.match_outcomes.abandons,
          matches:
            seasonStatistics.match_outcomes.wins +
            seasonStatistics.match_outcomes.losses +
            seasonStatistics.match_outcomes.abandons
        };
      }));
};
