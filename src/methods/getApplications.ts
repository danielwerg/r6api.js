import { DEFAULT_APPLICATIONS } from '../constants';
import type { OptionsDocs, UbiServices } from '../types';

export interface Applications {
  applications: {
    applicationId: string;
    name: string;
    platform: string;
    spaceId: string;
    overrideResponse: null;
  }[];
}

export const getApplicationsOptions: OptionsDocs = [
  ['applicationIds', 'string[]', true, '', 'Applications ids (50 max)']
];

export interface GetApplicationsOptions {
  applicationIds: string[];
}
export const getApplications =
  ({ ubiServices }: { ubiServices: UbiServices }) =>
  async ({ applicationIds }: GetApplicationsOptions) =>
    ubiServices<Applications>({
      version: 1,
      path: '/applications',
      params: { applicationIds, limit: '50' }
    }).then(({ applications }) =>
      applications.map(application => ({
        id: application.applicationId,
        name:
          DEFAULT_APPLICATIONS.find(app => app.id === application.applicationId)
            ?.name ?? application.name,
        platform: application.platform,
        spaceId: application.spaceId
      }))
    );
