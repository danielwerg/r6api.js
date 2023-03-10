import { SEASONS, getSeasonShorthand } from 'r6data';

import { inspect } from 'node:util';

import { BOARDS, REGIONS, SANDBOXES_ID, SPACES_ID } from '../constants';
import type {
  BoardLongSlug,
  MatchResult,
  OptionsDocs,
  ServiceAndCrossplay,
  SpacesAndSandboxes,
  UbiServices
} from '../types';
import {
  getKD,
  getMatchResult,
  getRank,
  getSpacesAndSandboxes,
  getWinRate,
  getWL,
  toShortBoardSlug
} from '../utils';

export interface R6karmaPlayerSkillRecords {
  seasons_player_skill_records: SeasonsPlayerSkillRecord[];
}
export interface SeasonsPlayerSkillRecord {
  season_id: number;
  regions_player_skill_records: RegionsPlayerSkillRecord[];
}
export interface RegionsPlayerSkillRecord {
  region_id: RegionSlug;
  boards_player_skill_records: BoardsPlayerSkillRecord[];
}
export interface BoardsPlayerSkillRecord {
  board_id: BoardLongSlug;
  players_skill_records: PlayersSkillRecord[];
}
export interface PlayersSkillRecord {
  max_mmr: number;
  skill_mean: number;
  deaths: number;
  profile_id: string;
  next_rank_mmr: number;
  rank: number;
  max_rank: number;
  board_id: BoardLongSlug;
  skill_stdev: number;
  kills: number;
  last_match_skill_stdev_change: number;
  past_seasons_wins: number;
  update_time: string;
  last_match_mmr_change: number;
  abandons: number;
  season: number;
  past_seasons_losses: number;
  top_rank_position: number;
  last_match_skill_mean_change: number;
  mmr: number;
  previous_rank_mmr: number;
  last_match_result: MatchResult;
  past_seasons_abandons: number;
  wins: number;
  region: RegionSlugAndGlobal;
  losses: number;
}

export type SeasonsIdsAndAll = number[] | 'all';

export type RegionSlug = 'emea' | 'ncsa' | 'apac';
export type RegionSlugAndGlobal = RegionSlug | 'global';
export type RegionsSlugsAndGlobalAndAll = RegionSlug[] | 'global' | 'all';

export type BoardsLongSlugsAndAll = BoardLongSlug[] | 'all';

export const getUserSeasonalOptions: OptionsDocs = [
  [
    'platform',
    'ServiceAndCrossplay',
    true,
    '',
    '[Services and Crossplay](#Services-and-Crossplay)'
  ],
  ['profileIds', 'string[]', true, '', '`profileIds` (200 max)'],
  [
    'seasonIds',
    'number[]',
    false,
    '[-1]',
    `Numbers from \`1\`*¹ to \`27\` it's crossplay, then from \`28\` to \`${
      SEASONS.at(-1)?.id ?? 'FIXME'
    }\`, \`-1\` or \`'all'\``
  ],
  [
    'regionSlugs',
    'string | string[]',
    false,
    '\'global\'*²',
    '`(\'emea\' | \'ncsa\' | \'apac\')[] | \'global\' | \'all\'`'
  ],
  [
    'boardLongSlugs',
    'string[]',
    false,
    '[\'pvp_ranked\']',
    '`(\'pvp_ranked\' | \'pvp_casual\' | \'pvp_event\' | \'pvp_newcomer\' | \'pvp_warmup\')[] | \'all\'`'
  ],
  [
    'spacesIds',
    'Record<ServiceAndCrossplay, string>',
    false,
    inspect(SPACES_ID, { breakLength: Infinity }),
    ''
  ],
  [
    'sandboxesIds',
    'Record<ServiceAndCrossplay, string>',
    false,
    inspect(SANDBOXES_ID, { breakLength: Infinity }),
    ''
  ]
];

export type GetSeasonalOptions = {
  platform: ServiceAndCrossplay;
  profileIds: string[];
  seasonIds?: SeasonsIdsAndAll;
  regionSlugs?: RegionsSlugsAndGlobalAndAll;
  boardLongSlugs?: BoardsLongSlugsAndAll;
} & SpacesAndSandboxes;
export const getUserSeasonal =
  ({ ubiServices }: { ubiServices: UbiServices }) =>
  async ({
    platform,
    profileIds,
    seasonIds,
    regionSlugs,
    boardLongSlugs,
    spacesIds,
    sandboxesIds
  }: GetSeasonalOptions) => {
    const _seasonIds = (
      seasonIds === 'all' ? SEASONS.map(({ id }) => id) : seasonIds ?? [-1]
    ).map(String);
    const _regionSlugs = regionSlugs
      ? regionSlugs === 'all'
        ? REGIONS.map(region => region.slug)
        : regionSlugs
      : 'global';
    const _boardLongSlugs = boardLongSlugs
      ? boardLongSlugs === 'all'
        ? BOARDS.map(board => board.slug)
        : boardLongSlugs
      : ['pvp_ranked'];

    return await ubiServices<R6karmaPlayerSkillRecords>({
      version: 1,
      path: `/${getSpacesAndSandboxes({
        platform,
        spacesIds,
        sandboxesIds
      })}/r6karma/player_skill_records`,
      params: {
        profile_ids: profileIds,
        season_ids: _seasonIds,
        region_ids: _regionSlugs,
        board_ids: _boardLongSlugs
      }
    }).then(({ seasons_player_skill_records: seasonsRecords }) =>
      seasonsRecords
        .map(({ regions_player_skill_records: regions }) =>
          regions.map(({ boards_player_skill_records: boards }) =>
            boards.map(({ players_skill_records: players }) => players)
          )
        )
        .flat(3)
        .map(player => {
          const rank = getRank({
            seasonId: player.season,
            rankId: player.rank,
            mmr: player.mmr,
            boardSlug: toShortBoardSlug(player.board_id)
          });
          const maxRank = getRank({
            seasonId: player.season,
            rankId: player.max_rank,
            mmr: player.max_mmr,
            boardSlug: toShortBoardSlug(player.board_id)
          });

          return {
            profileId: player.profile_id,
            season: {
              id: player.season,
              shorthand: getSeasonShorthand(player.season),
              ...SEASONS.find(({ id }) => id === player.season)
            },
            region: {
              slug: player.region,
              name: REGIONS.find(region => region.slug === player.region)!.name
            },
            board: {
              slug: player.board_id,
              name: BOARDS.find(
                board => board.slug === toShortBoardSlug(player.board_id)
              )!.name
            },
            rank: {
              id: rank.id,
              name: rank.name,
              mmr: rank.mmr,
              icon: rank.icon,
              iconOfficial: rank.iconOfficial
            },
            maxRank: {
              id: maxRank.id,
              name: maxRank.name,
              mmr: maxRank.mmr,
              icon: maxRank.icon,
              iconOfficial: maxRank.iconOfficial
            },
            lastMatch: {
              resultCode: player.last_match_result,
              resultText: getMatchResult(player.last_match_result),
              mmrChange: player.last_match_mmr_change,
              skillMeanChange: player.last_match_skill_mean_change,
              skillStdevChange: player.last_match_skill_stdev_change
            },
            pastSeasons: {
              wins: player.past_seasons_wins,
              losses: player.past_seasons_losses,
              wl: getWL({
                wins: player.past_seasons_wins,
                losses: player.past_seasons_losses
              }),
              winRate: getWinRate({
                wins: player.past_seasons_wins,
                losses: player.past_seasons_losses
              }),
              matches: player.past_seasons_wins + player.past_seasons_losses,
              abandons: player.past_seasons_abandons
            },
            previousMmr: player.previous_rank_mmr,
            nextMmr: player.next_rank_mmr,
            topRankPosition: player.top_rank_position,
            kills: player.kills,
            deaths: player.deaths,
            kd: getKD(player),
            wins: player.wins,
            losses: player.losses,
            wl: getWL(player),
            winRate: getWinRate(player),
            matches: player.wins + player.losses,
            abandons: player.abandons,
            skillMean: player.skill_mean,
            skillStdev: player.skill_stdev,
            updateTime: player.update_time
          };
        })
    );
  };
