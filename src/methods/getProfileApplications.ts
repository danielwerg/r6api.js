import { getToken } from '../auth';
import fetch from '../fetch';
import getApplications from './getApplications';
import { UUID, IOptionsDocs } from '../typings';
import { getURL, groupBy } from '../utils';
import { APPLICATIONS } from '../constants';

export interface IUserApplications {
  profileId: UUID;
  appId: UUID;
  firstDatePlayed: string;
  lastDatePlayed: string;
  daysPlayed: number;
  sessionsPlayed: number;
}
export interface IApiResponse {
  applications: IUserApplications[];
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

export default (ids: UUID[], options?: IOptions) =>
  getToken()
    .then(fetch<IApiResponse>(getURL.PROFILEAPPLICATIONS(ids)))
    .then(res => res.applications)
    .then(async res => {

      const applicationIds = [...new Set(res.map(application => application.appId))];

      const applications = options && options.fetchApplications && applicationIds.length
        ? await getApplications(applicationIds)
        : APPLICATIONS;

      return Object.entries(
        groupBy(
          res.map(application => ({
            id: application.appId,
            name: applications.find(app => app.id === application.appId)?.name || null,
            platform: applications.find(app => app.id === application.appId)?.platform || null,
            profileId: application.profileId,
            sessionsPlayed: application.sessionsPlayed,
            daysPlayed: application.daysPlayed,
            lastPlayedAt: application.lastDatePlayed,
            firstPlayedAt: application.firstDatePlayed
          })), 'profileId', true
        )
      ).map(([id, apps]) => ({ id, applications: apps }));

    });
