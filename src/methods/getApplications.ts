import { getToken } from '../auth';
import fetch from '../fetch';
import { UUID } from '../typings';
import { getURL } from '../utils';
import { APPLICATIONS } from '../constants';

export interface IApplications {
  applicationId: UUID;
  name: string;
  platform: string;
  spaceId: UUID;
  overrideResponse: null;
}
export interface IApiResponse {
  applications: IApplications[];
}

export default (applicationIds: UUID[]) =>
  getToken()
    .then(fetch<IApiResponse>(getURL.APPLICATIONS(applicationIds)))
    .then(res => res.applications)
    .then(res => res.map(application => ({
      id: application.applicationId,
      name: APPLICATIONS
        .find(app => app.id === application.applicationId)?.name || application.name,
      platform: application.platform,
      spaceId: application.spaceId
    })));
