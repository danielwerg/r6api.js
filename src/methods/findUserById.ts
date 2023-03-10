import type {
  OptionsDocs,
  ServiceExtended,
  Profiles,
  UbiServices
} from '../types';
import { getAvatars } from '../utils';

export const findUserByIdOptions: OptionsDocs = [
  [
    'platform',
    'ServiceExtended | \'all\'',
    true,
    '',
    '[Services Extended](#Services-Extended)'
  ],
  [
    'ids',
    'string[]',
    true,
    '',
    '`profileIds` or `idOnPlatforms` or `userId` if `isUserId` parameter is true (50 max)'
  ],
  ['isUserIds', 'boolean', false, 'false', 'Whether `ids` are userIds']
];

export interface FindUserByIdOptions {
  platform: ServiceExtended | 'all';
  ids: string[];
  isUserIds?: boolean;
}
export const findUserById =
  ({ ubiServices }: { ubiServices: UbiServices }) =>
  async ({ platform, ids, isUserIds }: FindUserByIdOptions) =>
    ubiServices<Profiles>({
      version: 3,
      path: '/profiles',
      params: {
        [platform === 'all'
          ? isUserIds
            ? 'userIds'
            : 'profileIds'
          : 'idsOnPlatform']: ids,
        ...(platform !== 'all' && { platformType: platform })
      }
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
