import { DEFAULT_APPLICATIONS } from '../constants';
import type { OptionsDocs, UbiServices } from '../types';
import { chunk } from '../utils';
import { getApplications } from './getApplications';

export interface ProfilesGamesPlayed {
  gamesPlayed: GamesPlayed[];
}
export interface GamesPlayed {
  spaceId: string;
  spacePlatformType: string;
  firstPlayed: FirstPlayed;
  lastPlayed: LastPlayed;
  profileId: string;
  sessionsCount: number | null;
  applications: Application[];
}
export interface Application {
  applicationId: string;
  applicationPlatformType: string;
  firstPlayed: FirstPlayed;
  lastPlayed: LastPlayed;
  sessionsCount: number | null;
}
export interface FirstPlayed {
  createdAt: string | null;
  countryCode: string | null;
}
export interface LastPlayed {
  updatedAt: string | null;
  countryCode: string | null;
}

export const getUserGamesPlayedOptions: OptionsDocs = [
  ['profileIds', 'string[]', true, '', '`profileIds` (20 max)'],
  [
    'fetchApplications',
    'boolean',
    false,
    'false',
    'Fetch name for applications'
  ]
];

export interface GetUserGamesPlayedOptions {
  profileIds: string[];
  fetchApplications?: boolean;
}
export const getUserGamesPlayed =
  ({ ubiServices }: { ubiServices: UbiServices }) =>
  async ({ profileIds, fetchApplications }: GetUserGamesPlayedOptions) =>
    ubiServices<ProfilesGamesPlayed>({
      version: 1,
      path: '/profiles/gamesplayed',
      params: { profileIds }
    }).then(async ({ gamesPlayed }) => {
      const applicationIds = gamesPlayed
        .map(game =>
          game.applications.map(application => application.applicationId)
        )
        .flat();

      const applications = fetchApplications
        ? await Promise.all(
            chunk(applicationIds, 50).map(
              async batch =>
                await getApplications({ ubiServices })({
                  applicationIds: batch
                })
            )
          ).then(res => res.flat())
        : DEFAULT_APPLICATIONS;

      return gamesPlayed.map(game => ({
        spaceId: game.spaceId,
        spacePlatform: game.spacePlatformType,
        firstPlayed: game.firstPlayed,
        lastPlayed: game.lastPlayed,
        sessionsCount: game.sessionsCount,
        applications: game.applications.map(application => ({
          id: application.applicationId,
          name:
            applications.find(app => app.id === application.applicationId)
              ?.name ?? null,
          platform: application.applicationPlatformType,
          firstPlayed: application.firstPlayed,
          lastPlayed: application.lastPlayed,
          sessionsCount: application.sessionsCount
        }))
      }));
    });
