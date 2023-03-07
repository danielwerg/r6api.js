import { SEASONS, type Season } from 'r6data';

import { join } from 'node:path';

import {
  camelToTitle,
  insertToFile,
  type InsertToFileOptions,
  markdownTable
} from './utils';
import {
  BOARDS,
  PLATFORMS,
  PLATFORM_FAMILIES,
  REGIONS,
  SERVICES,
  SERVICES_AND_CROSSPLAY,
  SERVICES_EXTENDED
} from '../src/constants';
import { chunk } from '../src/utils';
import { r6APIOptions } from '../src';
import { findUserByUsernameOptions } from '../src/methods/findUserByUsername';
import { findUserByIdOptions } from '../src/methods/findUserById';
import { getUserProgressionOptions } from '../src/methods/getUserProgression';
import { getUserSeasonalOptions } from '../src/methods/getUserSeasonal';
import { getUserSeasonalv2Option } from '../src/methods/getUserSeasonalv2';
import { getUserStatsOptions } from '../src/methods/getUserStats';
import { getUserStatusOptions } from '../src/methods/getUserStatus';
import { getUserApplicationsOptions } from '../src/methods/getUserApplications';
import { getUserGamesPlayedOptions } from '../src/methods/getUserGamesPlayed';
import { getApplicationsOptions } from '../src/methods/getApplications';
import { getNewsOptions } from '../src/methods/getNews';
import { getNewsByIdOptions } from '../src/methods/getNewsById';

(async () => {
  const insertToReadme = async (options: Omit<InsertToFileOptions, 'filePath'>) =>
    insertToFile({
      filePath: join(__dirname, '../readme.md'),
      prefix: '\n\n',
      suffix: '\n\n',
      ...options
    });

  const optionsDocs = [
    { name: 'r6API', options: r6APIOptions },
    { name: 'findUserByUsername', options: findUserByUsernameOptions },
    { name: 'findUserById', options: findUserByIdOptions },
    { name: 'getUserProgression', options: getUserProgressionOptions },
    { name: 'getUserSeasonal', options: getUserSeasonalOptions },
    { name: 'getUserSeasonalv2', options: getUserSeasonalv2Option },
    { name: 'getUserStats', options: getUserStatsOptions },
    { name: 'getUserStatus', options: getUserStatusOptions },
    { name: 'getUserApplications', options: getUserApplicationsOptions },
    { name: 'getUserGamesPlayed', options: getUserGamesPlayedOptions },
    { name: 'getApplications', options: getApplicationsOptions },
    { name: 'getNews', options: getNewsOptions },
    { name: 'getNewsById', options: getNewsByIdOptions }
  ];

  for (const { name, options } of optionsDocs) {
    const table = markdownTable([
      ['Parameter', 'Type', 'Required', 'Default', 'Description'],
      ...options
        .map(([parameter, type, required, _default, description]) => [
          parameter,
          `\`${type}\``,
          required ? '✔' : '✖',
          required ? '' : `\`${_default}\``,
          description
        ])
        .map(cells =>
          cells.map(cell => cell.replace(/\|/g, '\\|').replace(/\*/g, '\\*'))
        )
    ]);

    await insertToReadme({
      sectionName: `${name.toUpperCase()}_OPTIONS`,
      content: table
    });
  }

  interface GetSeasonsTableOptions {
    seasons: Season[];
    headersKeys: ('id' | 'name' | 'releaseDate' | 'duration')[];
  }
  const getSeasonsTable = ({
    seasons,
    headersKeys
  }: GetSeasonsTableOptions) => {
    const _tableCeils = seasons
      .slice(1) // NOTE: Skip "Release"
      .map(({ id, name, releaseDate }, i, array) => {
        const formatedReleaseDate = new Date(releaseDate).toLocaleString(
          'en-US',
          {
            timeZone: 'UTC',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }
        );
        const nextSeason = array[i + 1];
        const durationDays = Math.floor(
          (+new Date(nextSeason?.releaseDate ?? new Date()) -
            +new Date(releaseDate)) /
            (24 * 60 * 60 * 1000)
        );
        const duration = `${durationDays} days`;

        return {
          id: `\`${id}\``,
          name,
          releaseDate: formatedReleaseDate,
          duration
        };
      })
      .map(ceil => headersKeys.map(key => ceil[key]));

    const tableCeilsChunks = chunk(
      _tableCeils,
      headersKeys.length > 2
        ? Math.ceil(_tableCeils.length / 2)
        : Math.ceil(
            _tableCeils.length % 3 === 0
              ? _tableCeils.length / 3
              : _tableCeils.length / 2
          )
    );

    const tableHeaders = Array(tableCeilsChunks.length)
      .fill(
        headersKeys
          .map(key => (key.length <= 2 ? key.toUpperCase() : camelToTitle(key)))
          .join('~')
      )
      .join('~· ~')
      .split('~');

    const tableCeils = tableCeilsChunks.reduce((acc, cur) =>
      acc.map((value, i) =>
        cur[i] ? [...value, '   ', ...(cur[i]!)] : value
      )
    );

    return markdownTable([tableHeaders, ...tableCeils]);
  };

  const commaListArray = (array: readonly string[]) =>
    array.map(item => `\`${item}\``).join(', ');

  await insertToReadme({
    sectionName: 'SERVICES',
    content: commaListArray(SERVICES)
  });
  await insertToReadme({
    sectionName: 'SERVICES_EXTENDED',
    content: commaListArray(SERVICES_EXTENDED)
  });
  await insertToReadme({
    sectionName: 'SERVICES_AND_CROSSPLAY',
    content: commaListArray(SERVICES_AND_CROSSPLAY)
  });
  await insertToReadme({
    sectionName: 'PLATFORMS',
    content: commaListArray(PLATFORMS)
  });
  await insertToReadme({
    sectionName: 'PLATFORM_FAMILIES',
    content: commaListArray(PLATFORM_FAMILIES)
  });

  const shortSeasons = getSeasonsTable({
    seasons: SEASONS,
    headersKeys: ['id', 'name']
  });
  await insertToReadme({ sectionName: 'SEASONS_SHORT', content: shortSeasons });

  const regions = markdownTable([
    ['ID', 'Name'],
    ...REGIONS.map(({ slug, name }) => [`\`${slug}\``, name])
  ]);
  await insertToReadme({ sectionName: 'REGIONS', content: regions });

  const boards = markdownTable([
    ['Board', 'Minimum Season'],
    ...BOARDS.map(({ slug, name, seasonsRange: [startSeasonId] }) => [
      `${name} (\`${slug}\`)`,
      `${
        SEASONS.find(season => season.id === startSeasonId)?.name ?? 'FIXME'
      } (\`${startSeasonId}\`)`
    ])
  ]);
  await insertToReadme({ sectionName: 'BOARDS', content: boards });
})();
