import fetch from '../fetch';
import { UUID } from '../typings';
import { getURL } from '../utils';

const platforms = <const>['PC', 'PS4', 'XBOXONE', 'PS5', 'XBOX SERIES X'];

export interface IApiResponse {
  'AppID ': UUID;
  MDM: string;
  SpaceID: UUID;
  Category: 'Instance';
  Name: string;
  Platform: typeof platforms[number];
  Status: 'Online' | 'Interrupted' | 'Degraded' | 'Maintenance';
  Maintenance: null | boolean;
  ImpactedFeatures: string[];
}

export default () =>
  fetch<IApiResponse[]>(getURL.STATUS())()
    .then(res =>
      res
        .filter(app =>
          app.Name.includes('Rainbow Six Siege') && platforms.includes(app.Platform)
        )
        .map(app => ({
          // appId: app.AppID,
          appId: app['AppID '],
          name: app.Name,
          spaceId: app.SpaceID,
          mdm: app.MDM,
          category: app.Category,
          platform: app.Platform,
          status: app.Status,
          maintenance: app.Maintenance,
          impactedFeatures: app.ImpactedFeatures
        }))
    );
