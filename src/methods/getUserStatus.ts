import { DEFAULT_APPLICATIONS } from '../constants';
import type { OptionsDocs, UbiServices } from '../types';
import { chunk } from '../utils';
import { getApplications } from './getApplications';

export type OnlineStatus = 'online' | 'away' | 'dnd' | 'offline';
export interface UsersOnlineStatuses {
  onlineStatuses: {
    connections: {
      applicationId: string;
      connectionProfileId: string;
      createdAt: string;
      lastModifiedAt: string;
      stagingSpaceId: string;
    }[];
    manuallySet?: boolean;
    onlineStatus: OnlineStatus;
    userId: string;
  }[];
}

export const getUserStatusOptions: OptionsDocs = [
  ['userIds', 'string[]', true, '', 'User ids (50 max)'],
  [
    'fetchApplications',
    'boolean',
    false,
    'false',
    'Fetch name for applications'
  ]
];

export interface GetUserStatusOptions {
  userIds: string[];
  fetchApplications?: boolean;
}
export const getUserStatus =
  ({ ubiServices }: { ubiServices: UbiServices }) =>
  async ({ userIds, fetchApplications }: GetUserStatusOptions) =>
    ubiServices<UsersOnlineStatuses>({
      version: 1,
      path: '/users/onlineStatuses',
      params: { userIds },
      headers: {
        'Ubi-LocaleCode': 'en-US'
      }
    }).then(async ({ onlineStatuses: users }) => {
      const applicationIds = [
        ...new Set(
          users
            .map(user =>
              user.connections.map(connection => connection.applicationId)
            )
            .flat()
        )
      ];

      const applications =
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

      return users.map(user => ({
        userId: user.userId,
        status: user.onlineStatus,
        applications: user.connections.map(connection => {
          const application = applications.find(
            app => app.id === connection.applicationId
          );

          return {
            id: connection.applicationId,
            name: application?.name ?? null,
            platform: application?.platform ?? null,
            profileId: connection.connectionProfileId,
            createdDate: connection.createdAt,
            lastModifiedDate: connection.lastModifiedAt
          };
        }),
        manuallySet: user.manuallySet ?? null
      }));
    });
