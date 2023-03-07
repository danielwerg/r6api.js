import type {
  BOARDS,
  PLATFORMS,
  PLATFORM_FAMILIES,
  REGIONS,
  SERVICES,
  SERVICES_AND_CROSSPLAY,
  SERVICES_EXTENDED
} from './constants';
import type { dataDev, ubiServices } from './fetch';

export type ArgsType<T> = T extends (args: infer U) => unknown ? U : never;

export type UbiServices = <T>(
  options: Parameters<ReturnType<typeof ubiServices>>[number]
) => Promise<T>;

export type DataDev = <T>(
  options: Parameters<ReturnType<typeof dataDev>>[number]
) => Promise<T>;

export type Service = (typeof SERVICES)[number];
export type ServiceExtended = (typeof SERVICES_EXTENDED)[number];
export type ServiceAndCrossplay = (typeof SERVICES_AND_CROSSPLAY)[number];
export type Platform = (typeof PLATFORMS)[number];
export type PlatformFamily = (typeof PLATFORM_FAMILIES)[number];

export type RegionSlug = (typeof REGIONS)[number]['slug'];

export type BoardSlug = (typeof BOARDS)[number]['slug'];
export type BoardLongSlug = `pvp_${BoardSlug}`;

export interface Profiles {
  profiles: {
    profileId: string;
    userId: string | null;
    idOnPlatform: string;
    platformType: Service;
    nameOnPlatform: string;
  }[];
}

export interface SpacesAndSandboxes {
  spacesIds?: Record<ServiceAndCrossplay, string>;
  sandboxesIds?: Record<ServiceAndCrossplay, string>;
}

export enum MatchResult {
  UNKNOWN,
  WIN,
  LOSS,
  ABANDON
}

export type ItemType = 'news' | 'videos';
export interface URLAndDescription {
  url: string | null;
  description: string | null;
}
export interface ButtonOrNodeBase {
  buttonType: 'internal' | 'youtube-modal';
  buttonUrl: string;
  trackingCategoryValue: string;
  trackingValue: string;
}
export interface Button extends ButtonOrNodeBase {
  commonTranslationId: 'readMore' | 'watchNow';
}
export interface NimbusItemsItemBase {
  id: string;
  type: ItemType;
  tag: string;
  categories: string[] | null;
  placement: string[] | null;
  date: string;
  title: string;
  description?: string;
  abstract?: string | null;
  content: string;
  trackingPageValue: string | null;
  readTime?: number;
  authors?: string[] | null;
  featuredThumbnail?: URLAndDescription;
  thumbnail: URLAndDescription;
  button: Button;
}
export interface NimbusItemsBase {
  total: number;
  tags: string[];
  items: NimbusItemsItemBase[];
}

export interface NimbusItems extends NimbusItemsBase {
  mediaFilter: string;
  categoriesFilter: string;
  placementFilter: PlacementFilter[];
  limit: number;
  startIndex: number;
  skip: number;
  items: NimbusItemsItemBase[];
}
export type PlacementFilter =
  | ''
  | 'featured-news-article'
  | 'featured-news-article-emea'
  | 'featured-news-article-ncsa';

export interface NimbusItemsId extends NimbusItemsBase {
  items: NumbusItemsIdItem[];
}
export interface NumbusItemsIdItem extends NimbusItemsItemBase {
  index: number;
  prevNode: Node;
  nextNode: Node;
}
export interface Node extends ButtonOrNodeBase {
  trackingLocation: string;
}

export type OptionsDocs = [
  Parameter: string,
  Type: string,
  Required: boolean,
  Default: string,
  Description: string
][];
