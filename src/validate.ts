import {
  BOARDS,
  SERVICES,
  PLATFORMS,
  SERVICES_AND_CROSSPLAY,
  PLATFORM_FAMILIES,
  SERVICES_EXTENDED,
  REGIONS
} from './constants';
import type {
  BoardSlug,
  Service,
  Platform,
  ServiceAndCrossplay,
  PlatformFamily,
  ServiceExtended,
  RegionSlug
} from './types';

export const isService = (value: string): value is Service =>
  SERVICES.map(platform => platform.toString()).includes(value);

export const isServiceExtended = (value: string): value is ServiceExtended =>
  SERVICES_EXTENDED.map(platform => platform.toString()).includes(value);

export const isServiceAndCrossplay = (
  value: string
): value is ServiceAndCrossplay =>
  SERVICES_AND_CROSSPLAY.map(platform => platform.toString()).includes(value);

export const isPlatform = (value: string): value is Platform =>
  PLATFORMS.map(platform => platform.toString()).includes(value);

export const isPlatformFamily = (value: string): value is PlatformFamily =>
  PLATFORM_FAMILIES.map(platform => platform.toString()).includes(value);

export const isRegionSlug = (value: string): value is RegionSlug =>
  REGIONS.map(region => region.slug.toString()).includes(value);

export const isBoardSlug = (value: string): value is BoardSlug =>
  BOARDS.map(region => region.slug.toString()).includes(value);
