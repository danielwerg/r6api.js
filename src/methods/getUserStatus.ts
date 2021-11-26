import { getToken } from '../auth';
import fetch from '../fetch';
import getApplications from './getApplications';
import { UUID, IOptionsDocs } from '../typings';
import { getURL } from '../utils';
import { APPLICATIONS } from '../constants';

export interface IConnections {
  applicationId: UUID;
  connectionProfileId: UUID;
  createdAt: string;
  lastModifiedAt: string;
  stagingSpaceId: string;
}
export type OnlineStatus = 'online' | 'away' | 'dnd' | 'offline';
export interface IOnlineStatuses {
  connections: IConnections[];
  manuallySet?: boolean;
  onlineStatus: OnlineStatus;
  userId: UUID;
}
export interface IApiResponse {
  onlineStatuses: IOnlineStatuses[];
}

export interface IOptions {
  fetchApplications: boolean;
}

export const optionsDocs: IOptionsDocs = [
  [
    'fetchApplications', '`boolean`', false, '`false`',
    'Make another API request to get additional information about applications'
  ]
];

export default (ids: UUID[] | string[], options: IOptions) => {

  return getToken()
    .then(
      fetch<IApiResponse>(getURL.ONLINESTATUS(ids), { headers: { 'Ubi-LocaleCode': 'x' } })
    )
    .then(res => res.onlineStatuses)
    .then(async res => {

      const applicationIds = [...new Set(
        res
          .map(r => r.connections.map(connection => connection.applicationId))
          .flat()
      )];

      const applications = options && options.fetchApplications && applicationIds.length
        ? await getApplications(applicationIds)
        : APPLICATIONS;

      return res.map(r => ({
        userId: r.userId,
        status: r.onlineStatus,
        applications: r.connections.map(connection => {

          const application = applications
            .find(app => app.id === connection.applicationId);

          return {
            id: connection.applicationId,
            name: application?.name || null,
            platform: application?.platform || null,
            profileId: connection.connectionProfileId,
            createdAt: connection.createdAt,
            lastModifiedAt: connection.lastModifiedAt
          };

        }),
        manuallySet: r.manuallySet || null
      }));

    });

};
