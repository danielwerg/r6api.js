import fetch from '../fetch';
import { UUID } from '../typings';
import { URLS } from '../utils';

interface IApiResponse {
  AppID: UUID;
  MDM: string;
  SpaceID: UUID;
  Category: string;
  Name: string;
  Platform: string;
  Status: string;
  Maintenance: null | boolean;
  ImpactedFeatures: string[];
}

export default () =>
  fetch<IApiResponse[]>(URLS.STATUS())()
    .then(res =>
      res
        .filter(app => app.Name.includes('Rainbow Six Siege'))
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
