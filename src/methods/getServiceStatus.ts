import https from 'node:https';
import constants from 'node:constants';

import { fetch } from '../fetch';

export type Intances = {
  'AppID ': string;
  MDM: string;
  SpaceID: string;
  Category: 'Instance';
  Name: string;
  Platform: (typeof platforms)[number];
  Status: Status;
  Maintenance: null | boolean;
  ImpactedFeatures: ImpactedFeature[];
}[];

export type Status = 'Online' | 'Interrupted' | 'Degraded' | 'Maintenance';

export type ImpactedFeature =
  | 'Authentication'
  | 'Leaderboard'
  | 'Matchmaking'
  | 'Purchase';

const platforms = <const>[
  'PC',
  'PS4',
  'XBOXONE',
  'PS5',
  'XBOX SERIES X',
  'Stadia',
  'Luna'
];

export const getServiceStatus = async () =>
  fetch<Intances>({
    baseURL: 'https://game-status-api.ubisoft.com',
    path: '/v1/instances',
    config: {
      httpsAgent: new https.Agent({
        secureOptions: constants.SSL_OP_LEGACY_SERVER_CONNECT
      })
    }
  }).then(intances =>
    intances
      .filter(
        instance =>
          instance.Name.includes('Rainbow Six Siege') &&
          platforms.includes(instance.Platform)
      )
      .map(instance => ({
        appId: instance['AppID '],
        name: instance.Name,
        spaceId: instance.SpaceID,
        mdm: instance.MDM,
        category: instance.Category,
        platform: instance.Platform,
        status: instance.Status,
        maintenance: instance.Maintenance,
        impactedFeatures: instance.ImpactedFeatures
      }))
  );
