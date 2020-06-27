import { getToken } from '../auth';
import fetch from '../fetch';
import { Platform, UUID } from '../typings';
import { URLS, getAvatars } from '../utils';

interface IProfile {
  profileId: UUID;
  userId: UUID;
  idOnPlatform: UUID | string;
  platformType: Platform;
  nameOnPlatform: string;
}
interface IApiResponse {
  profiles: IProfile[];
}

export default (platform: Platform, username: string[]) =>
  getToken()
    .then(fetch<IApiResponse>(URLS.BYUSERNAME(platform, username)))
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
