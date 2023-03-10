import { getSeasonShorthand, SEASONS } from 'r6data';

import { inspect } from 'node:util';

import { BOARDS, SPACES_ID } from '../constants';
import type {
  BoardSlug,
  OptionsDocs,
  ServiceAndCrossplay,
  PlatformFamily,
  UbiServices
} from '../types';
import { getKD, getRank, getRP, getWinRate, getWL } from '../utils';

export interface SkillFullProfiles {
  platform_families_full_profiles: SkillFullProfilesPlatformFamiliesFullProfile[];
}

export interface SkillFullProfilesPlatformFamiliesFullProfile {
  board_ids_full_profiles: SkillFullProfilesBoardIdsFullProfile[];
  platform_family: string;
}

export interface SkillFullProfilesBoardIdsFullProfile {
  board_id: BoardSlug;
  full_profiles: SkillFullProfilesFullProfile[];
}

export interface SkillFullProfilesFullProfile {
  profile: SkillFullProfilesProfile;
  season_statistics: SkillFullProfilesSeasonStatistics;
}

export interface SkillFullProfilesSeasonStatistics {
  deaths: number;
  kills: number;
  match_outcomes: SkillFullProfilesMatchOutcomes;
}

export interface SkillFullProfilesMatchOutcomes {
  abandons: number;
  losses: number;
  wins: number;
}

export interface SkillFullProfilesProfile {
  board_id: BoardSlug;
  id: string;
  max_rank: number;
  max_rank_points: number;
  platform_family: PlatformFamily;
  rank: number;
  rank_points: number;
  season_id: number;
  top_rank_position: number;
}

export const getUserSeasonalv2Option: OptionsDocs = [
  ['profileIds', 'string[]', true, '', '`profileIds`'],
  [
    'platformsFamilies',
    'PlatformFamily[]',
    false,
    '[\'pc\', \'console\']',
    '[Platforms Families](#Platform-Families)'
  ],
  [
    'spacesIds',
    'Record<ServiceAndCrossplay, string>',
    false,
    inspect(SPACES_ID, { breakLength: Infinity }),
    '[Services and Crossplay](#Services-and-Crossplay)'
  ]
];

export interface GetUserSeasonalv2Options {
  profileIds: string[];
  platformsFamilies?: PlatformFamily[];
  spaceId?: Record<ServiceAndCrossplay, string>;
}
export const getUserSeasonalv2 =
  ({ ubiServices }: { ubiServices: UbiServices }) =>
  async ({
    profileIds,
    platformsFamilies,
    spaceId
  }: GetUserSeasonalv2Options) =>
    ubiServices<SkillFullProfiles>({
      version: 2,
      path: `/spaces/${
        (spaceId ?? SPACES_ID).crossplay
      }/title/r6s/skill/full_profiles`,
      params: {
        platform_families: platformsFamilies ?? ['pc', 'console'],
        profile_ids: profileIds
      }
    }).then(res =>
      res.platform_families_full_profiles
        .map(profile =>
          profile.board_ids_full_profiles.map(board => board.full_profiles)
        )
        .flat(2)
        .map(({ profile, season_statistics: seasonStatistics }) => {
          const rank = getRank({
            seasonId: profile.season_id,
            rankId: profile.rank,
            mmr: profile.rank_points,
            boardSlug: profile.board_id
          });
          const maxRank = getRank({
            seasonId: profile.season_id,
            rankId: profile.max_rank,
            mmr: profile.max_rank_points,
            boardSlug: profile.board_id
          });

          return {
            profileId: profile.id,
            platform: profile.platform_family,
            season: {
              id: profile.season_id,
              shorthand: getSeasonShorthand(profile.season_id),
              ...SEASONS.find(({ id }) => id === profile.season_id)
            },
            board: {
              slug: profile.board_id,
              name: BOARDS.find(board => board.slug === profile.board_id)!.name
            },
            rank: {
              rp: getRP({
                seasonId: profile.season_id,
                rankId: profile.rank,
                mmr: profile.rank_points
              }),
              ...rank
            },
            maxRank: {
              rp: getRP({
                seasonId: profile.season_id,
                rankId: profile.max_rank,
                mmr: profile.max_rank_points
              }),
              ...maxRank
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
            wl: getWL({
              wins: seasonStatistics.match_outcomes.wins,
              losses: seasonStatistics.match_outcomes.losses
            }),
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
        })
    );
