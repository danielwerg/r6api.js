// 3587dcbb-7f81-457c-9781-0e3f29f6f56a e3d5ea9e-50bd-43b7-88bf-39794f4e3d40
export const DEFAULT_UBI_APP_ID = '3587dcbb-7f81-457c-9781-0e3f29f6f56a';

export const SERVICES = <const>['uplay', 'xbl', 'psn'];
export const SERVICES_EXTENDED = <const>[
  ...SERVICES,
  'steam',
  'epic',
  'amazon',
  'amazonstream',
  'googlestream',
  'switch',
  'ubimobile',
  'wiiu',
  'apple'
];
export const SERVICES_AND_CROSSPLAY = <const>[...SERVICES, 'crossplay'];
export const PLATFORMS = <const>['pc', 'xone', 'ps4'];
export const PLATFORM_FAMILIES = <const>['pc', 'console'];

type Service = (typeof SERVICES)[number];
export const SPACES_ID: Record<Service | 'crossplay', string> = {
  uplay: '5172a557-50b5-4665-b7db-e3f2e8c5041d',
  psn: '05bfb3f7-6c21-4c42-be1f-97a33fb5cf66',
  xbl: '98a601e5-ca91-4440-b1c5-753f601a2c90',
  crossplay: '0d2ae42d-4c27-4cb7-af6c-2099062302bb'
};
export const SANDBOXES_ID: Record<Service | 'crossplay', string> = {
  uplay: 'OSBOR_PC_LNCH_A',
  psn: 'OSBOR_PS4_LNCH_A',
  xbl: 'OSBOR_XBOXONE_LNCH_A',
  crossplay: 'OSBOR_XPLAY_LNCH_A'
};

export interface Region {
  slug: string;
  name: string;
}
export const REGIONS = [
  { slug: 'global', name: 'Global' },
  { slug: 'emea', name: 'Europe, Middle East and Africa' },
  { slug: 'ncsa', name: 'North, Central and South America' },
  { slug: 'apac', name: 'Asia Pacific' }
] as const satisfies readonly Region[];

export interface Board {
  slug: string;
  name: string;
  seasonsRange: Readonly<[number, number]>;
}
export const BOARDS = [
  { slug: 'ranked', name: 'Ranked', seasonsRange: [6, Infinity] },
  { slug: 'casual', name: 'Casual', seasonsRange: [15, Infinity] },
  { slug: 'warmup', name: 'Deathmatch', seasonsRange: [25, Infinity] },
  { slug: 'event', name: 'Event', seasonsRange: [16, Infinity] },
  { slug: 'newcomer', name: 'Newcomer', seasonsRange: [12, Infinity] }
] as const satisfies readonly Board[];

export const DEFAULT_APPLICATIONS = [
  {
    id: 'e3d5ea9e-50bd-43b7-88bf-39794f4e3d40',
    name: 'Rainbow Six Siege',
    platform: 'PC'
  },
  {
    id: 'a427a342-56bb-437b-b835-fa695c75893b',
    name: 'Rainbow Six Siege - Test Server',
    platform: 'PC'
  },
  {
    id: 'f68a4bb5-608a-4ff2-8123-be8ef797e0a6',
    name: 'Ubisoft Connect Client',
    platform: 'PC'
  },
  {
    id: '83564d31-7cd7-4bc0-a763-6524e78d1a7f',
    name: 'Ubisoft Connect Overlay',
    platform: 'PC'
  }
];
