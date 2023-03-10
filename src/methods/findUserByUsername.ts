import type {
  OptionsDocs,
  ServiceExtended,
  Profiles,
  UbiServices
} from '../types';
import { getAvatars } from '../utils';

export const findUserByUsernameOptions: OptionsDocs = [
  [
    'platform',
    'ServiceExtended',
    true,
    '',
    '[Services Extended](#Services-Extended)'
  ],
  ['usernames', 'string[]', true, '', 'Usernames (50 max)']
];

export interface FindUserByUsernameOptions {
  platform: ServiceExtended;
  usernames: string[];
}
export const findUserByUsername =
  ({ ubiServices }: { ubiServices: UbiServices }) =>
  async ({ platform, usernames }: FindUserByUsernameOptions) =>
    ubiServices<Profiles>({
      version: 3,
      path: '/profiles',
      params: { platformType: platform, namesOnPlatform: usernames }
    }).then(({ profiles }) =>
      profiles.map(profile => ({
        profileId: profile.profileId,
        userId: profile.userId,
        idOnPlatform: profile.idOnPlatform,
        username: profile.nameOnPlatform,
        platform: profile.platformType,
        avatars: getAvatars({ userId: profile.userId })
      }))
    );
