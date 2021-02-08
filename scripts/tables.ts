import * as mdtable from 'markdown-table';

import { join } from 'path';

import { insertContent } from './utils';
import { SEASONS, OLD_SEASONS, REGIONS } from '../src/constants';
import { optionsDocs as findByIdOptionsDocs } from '../src/methods/findById';
import { optionsDocs as getRanksOptionsDocs } from '../src/methods/getRanks';
import { optionsDocs as getStatsOptionsDocs } from '../src/methods/getStats';
import { optionsDocs as getNewsOptionsDocs } from '../src/methods/getNews';
import { optionsDocs as getNewsByIdOptionsDocs } from '../src/methods/getNewsById';

(async () => {

  const readmePath = join(__dirname, '../readme.md');
  const optionsHeader = ['Param', 'Type', 'Required', 'Default', 'Description'];
  const extraNewLine = { prefix: '\n', suffix: '\n' };


  // readme > (getRanks & getStats & getNews & getNewsById) > options
  const optionsDocs = <const>[
    ['FINDBYID', findByIdOptionsDocs],
    ['GETRANKS', getRanksOptionsDocs],
    ['GETSTATS', getStatsOptionsDocs],
    ['GETNEWS', getNewsOptionsDocs],
    ['GETNEWSBYID', getNewsByIdOptionsDocs]
  ];

  for (const [name, options] of optionsDocs) {
    const table = mdtable([optionsHeader, ...options]);
    // console.log(`${name} table:\n${table}`);
    await insertContent(
      readmePath, `${name}_OPTIONS`, table, { newLine: true, ...extraNewLine }
    )
      .catch(err => console.error(err));
  }


  // Seasons Table
  const chunk = <T>(arr: T[][], size: number) => arr
    .slice(0, (arr.length + size - 1) / size | 0)
    .map((_, i) => arr.slice(size * i, size * i + size));

  const getSeasonsTable = <T extends { [id: string]: { name: string; releaseDate: string } }>(
    seasons: T,
    options: { headers?: [string, 'id' | 'name' | 'releaseDate' | 'duration'][] } = {}
  ) => {

    const tableHeaders = options.headers || [['ID', 'id'], ['Name', 'name']];

    const seasonsFormatted = Object.entries(seasons)
      .map(([id, obj], i, array) => {
        const nextReleaseDate = array[i + 1] ?
          new Date(array[i + 1][1].releaseDate) : new Date();
        return {
          id: `\`${id}\``, name: obj.name,
          releaseDate: new Date(obj.releaseDate).toLocaleString(
            'en-us', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' }
          ),
          duration: array.slice(-1)[0][1] === obj
            ? '' // Most recent season
            : Math.floor(
              (+nextReleaseDate - +new Date(obj.releaseDate)) / (24 * 60 * 60 * 1000)
            ) + ' Days'
        };
      })
      .map(obj => tableHeaders.map(([, key]) => obj[key]));
    // console.log('seasonsFormatted', seasonsFormatted);
    const itemsLength = seasonsFormatted.length;
    const seasonsFormattedChunks = chunk(
      seasonsFormatted,
      tableHeaders.length > 2
        ? Math.ceil(itemsLength / 2)
        : Math.ceil(itemsLength % 3 === 0 ? itemsLength / 3 : itemsLength / 2)
    );

    return mdtable([
      Array(seasonsFormattedChunks.length)
        .fill(tableHeaders.map(([name]) => name).join('~'))
        .join('~●~').split(/~/g),
      ...seasonsFormattedChunks.reduce((acc, cur) =>
        acc.map((v, i) => cur[i] ? [...v, '', ...cur[i]] : v)
      )
    ]);

  };

  // readme > getRanks > Seasons Reference
  const seasonsTable = getSeasonsTable(SEASONS);
  // console.log(`seasonsTable:\n${seasonsTable}`);
  await insertContent(
    readmePath, 'SEASONS_TABLE', seasonsTable, { newLine: true, ...extraNewLine }
  ).catch(err => console.error(err));

  // Assets > Ranks > readme > Season Reference
  const allSeasonsTable= getSeasonsTable(
    { ...OLD_SEASONS, ...SEASONS },
    { headers: [['ID', 'id'], ['Name', 'name'], ['Release Date', 'releaseDate'], ['Duration', 'duration']] }
  );
  // console.log(`allSeasonsTable:\n${allSeasonsTable}`);
  await insertContent(
    join(__dirname, '../assets/ranks/readme.md'),
    'SEASONS_TABLE', allSeasonsTable, { newLine: true, ...extraNewLine }
  ).catch(err => console.error(err));


  // readme > getRanks > Regions reference
  const regionsTable = mdtable([
    ['Shorthand', 'Meaning'],
    ...Object.entries(REGIONS).map(([shorthand, meaning]) => [`\`${shorthand}\``, meaning])
  ]);
  // console.log(`regionsTable:\n${regionsTable}`);
  await insertContent(
    readmePath, 'REGIONS_TABLE', regionsTable, { newLine: true, ...extraNewLine }
  ).catch(err => console.error(err));

})();
