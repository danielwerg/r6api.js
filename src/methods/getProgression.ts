import { getToken } from '../auth';
import fetch from '../fetch';
import { Platform, UUID } from '../typings';
import { URLS } from '../utils';

interface IProgression {
  profile_id: UUID;
  level: number;
  xp: number;
  lootbox_probability: number;
}
interface IApiResponse {
  player_profiles: IProgression[];
}

export default (platform: Platform, ids: UUID[]) =>
  getToken()
    .then(fetch<IApiResponse>(URLS.PROGRESS(platform, ids)))
    .then(res =>
      res.player_profiles.map(profile => ({
        id: profile.profile_id,
        level: profile.level,
        xp: profile.xp,
        lootboxProbability: {
          raw: profile.lootbox_probability,
          percent: profile.lootbox_probability
            .toString()
            .replace(/\B(?=(\d{2})+(?!\d))/, '.') + '%'
        }
      }))
    );
