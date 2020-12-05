import * as mdtable from 'markdown-table';

import { join } from 'path';

import insertContent from './insertContent';
import { SEASONS, REGIONS } from '../src/constants';
import { optionsDocs as getRanksOptionsDocs } from '../src/methods/getRanks';
import { optionsDocs as getStatsOptionsDocs } from '../src/methods/getStats';
import { optionsDocs as getNewsOptionsDocs } from '../src/methods/getNews';
import { optionsDocs as getNewsByIdOptionsDocs } from '../src/methods/getNewsById';

(async () => {

  const readmePath = join(__dirname, '../readme.md');
  const optionsHeader = ['Param', 'Type', 'Required', 'Default', 'Description'];


  // (getRanks & getStats & getNews & getNewsById) > options
  const optionsDocs = <const>[
    ['GETRANKS', getRanksOptionsDocs],
    ['GETSTATS', getStatsOptionsDocs],
    ['GETNEWS', getNewsOptionsDocs],
    ['GETNEWSBYID', getNewsByIdOptionsDocs]
  ];

  for (const i in optionsDocs) {
    const [name, options] = optionsDocs[i];
    const table = mdtable([optionsHeader, ...options]);
    // console.log(`${name} table:\n${table}`);
    await insertContent(readmePath, `${name}_OPTIONS`, table, { newLine: true })
      .catch(err => console.error(err));
  }


  // getRanks > Seasons reference
  const chunk = <T>(arr: T[][], size: number) => arr
    .slice(0, (arr.length + size - 1) / size | 0)
    .map((_, i) => arr.slice(size * i, size * i + size));

  // const seasonsFormatted = Object.entries(SEASONS).map(([id, { name }], _, array) =>
  //   [`\`${id}\` (\`-${Number(array.slice(-1)[0][0]) - Number(id) + 1}\`)`, name]
  // );
  const seasonsFormatted = Object.entries(SEASONS).map(([id, { name }]) =>
    [`\`${id}\``, name]
  );
  const itemsLength = seasonsFormatted.length;
  const seasonsFormattedChunks = chunk(
    seasonsFormatted, Math.ceil(itemsLength % 3 === 0 ? itemsLength / 3 : itemsLength / 2)
  );

  const seasonsTable = mdtable([
    Array(seasonsFormattedChunks.length)
      .fill(['ID', 'Name'].join(' ')).join(' ● ').split(/ /g),
    ...seasonsFormattedChunks.reduce((acc, cur) =>
      acc.map((v, i) => cur[i] ? [...v, '', ...cur[i]] : v)
    )
  ]);
  // console.log(`seasonsTable:\n${seasonsTable}`);
  await insertContent(
    readmePath, 'SEASONS_TABLE', seasonsTable, { newLine: true }
  ).catch(err => console.error(err));


  // getRanks > Regions reference
  const regionsTable = mdtable([
    ['Shorthand', 'Meaning'],
    ...Object.entries(REGIONS).map(([shorthand, meaning]) => [`\`${shorthand}\``, meaning])
  ]);
  // console.log(`regionsTable:\n${regionsTable}`);
  await insertContent(
    readmePath, 'REGIONS_TABLE', regionsTable, { newLine: true }
  ).catch(err => console.error(err));

})();
