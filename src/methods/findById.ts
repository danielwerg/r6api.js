import { getToken } from '../auth';
import fetch from '../fetch';
import { PlatformAllExtended, UUID } from '../typings';
import { URLS, getAvatars } from '../utils';

interface IProfile {
  profileId: UUID;
  userId: UUID;
  idOnPlatform: UUID | string;
  platformType: PlatformAllExtended;
  nameOnPlatform: string;
}
interface IApiResponse {
  profiles: IProfile[];
}

export interface IOptions {
  isUserId?: boolean;
}

export const optionsDocs = [
  [
    'isUserId', '`boolean`', 'false', '`false`', 'Whether `id` is `userId` or not'
  ]
];

export default (platform: PlatformAllExtended, ids: UUID[] | string[], options?: IOptions) => {

  const isUserId = options && options.isUserId;

  return getToken()
    .then(
      platform === 'all'
        ? isUserId
          ? fetch<IApiResponse>(URLS.BYUSERID(ids))
          : fetch<IApiResponse>(URLS.BYPROFILEID(ids))
        : fetch<IApiResponse>(URLS.BYID(platform, ids))
    )
    .then(res =>
      res.profiles
        .map(profile => ({
          id: profile.profileId,
          userId: profile.userId,
          idOnPlatform: profile.idOnPlatform,
          platform: profile.platformType,
          username: profile.nameOnPlatform,
          avatar: getAvatars(profile.userId)
        }))
    );

};
