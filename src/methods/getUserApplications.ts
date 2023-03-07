import { DEFAULT_APPLICATIONS } from '../constants';
import type { OptionsDocs, UbiServices } from '../types';
import { chunk, groupBy } from '../utils';
import { getApplications } from './getApplications';

export interface ProfilesApplications {
  applications: {
    profileId: string;
    appId: string;
    firstDatePlayed: string;
    lastDatePlayed: string;
    daysPlayed: number;
    sessionsPlayed: number;
  }[];
}

export const getUserApplicationsOptions: OptionsDocs = [
  ['profileIds', 'string[]', true, '', '`profileIds` (100 max)'],
  [
    'fetchApplications',
    'boolean',
    false,
    'false',
    'Fetch name and platform for applications'
  ]
];

export interface GetUserApplicationsOptions {
  profileIds: string[];
  fetchApplications?: boolean;
}
export const getUserApplications =
  ({ ubiServices }: { ubiServices: UbiServices }) =>
  async ({ profileIds, fetchApplications }: GetUserApplicationsOptions) =>
    ubiServices<ProfilesApplications>({
      version: 1,
      path: '/profiles/applications',
      params: { profileIds, limit: '100000' }
    }).then(async ({ applications }) => {
      const applicationIds = [
        ...new Set(applications.map(application => application.appId))
      ];

      const _applications =
        fetchApplications && applicationIds.length
          ? await Promise.all(
              chunk(applicationIds, 50).map(
                async batch =>
                  await getApplications({ ubiServices })({
                    applicationIds: batch
                  })
              )
            ).then(res => res.flat())
          : DEFAULT_APPLICATIONS;

      return Object.entries(
        groupBy(applications, application => application.profileId)
      ).map(([profileId, applications]) => ({
        profileId,
        applications: applications.map(application => ({
          id: application.appId,
          name:
            _applications.find(app => app.id === application.appId)?.name ??
            null,
          platform:
            _applications.find(app => app.id === application.appId)?.platform ??
            null,
          sessionsPlayed: application.sessionsPlayed,
          daysPlayed: application.daysPlayed,
          lastPlayedDate: application.lastDatePlayed,
          firstPlayedDate: application.firstDatePlayed
        }))
      }));
    });
