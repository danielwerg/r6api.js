import { inspect } from 'node:util';

import { SANDBOXES_ID, SPACES_ID } from '../constants';
import type {
  OptionsDocs,
  ServiceAndCrossplay,
  SpacesAndSandboxes,
  UbiServices
} from '../types';
import { getSpacesAndSandboxes } from '../utils';

export interface R6playerprofilePlayerprofileProgressions {
  player_profiles: {
    xp: number;
    profile_id: string;
    lootbox_probability: number;
    level: number;
  }[];
}

export const getUserProgressionOptions: OptionsDocs = [
  [
    'platform',
    'ServiceAndCrossplay',
    true,
    '',
    '[Services and Crossplay](#Services-and-Crossplay)'
  ],
  ['profileIds', 'string[]', true, '', '`profileIds` (200 max)'],
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

export type GetUserProgressionOptions = {
  platform: ServiceAndCrossplay;
  profileIds: string[];
} & SpacesAndSandboxes;
export const getUserProgression =
  ({ ubiServices }: { ubiServices: UbiServices }) =>
  async ({
    platform,
    profileIds,
    spacesIds,
    sandboxesIds
  }: GetUserProgressionOptions) =>
    ubiServices<R6playerprofilePlayerprofileProgressions>({
      version: 1,
      path: `/${getSpacesAndSandboxes({
        platform,
        spacesIds,
        sandboxesIds
      })}/r6playerprofile/playerprofile/progressions`,
      params: { profile_ids: profileIds }
    }).then(({ player_profiles: playerProfiles }) =>
      playerProfiles.map(profile => ({
        profileId: profile.profile_id,
        level: profile.level,
        xp: profile.xp,
        lootboxProbability: {
          raw: profile.lootbox_probability,
          percent: `${profile.lootbox_probability
            .toString()
            .replace(/\B(?=(\d{2})+(?!\d))/, '.')}%`
        }
      }))
    );
