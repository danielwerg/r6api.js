import * as dotenv from 'dotenv';
dotenv.config();
import * as minimist from 'minimist';
import * as stringifyObject from 'stringify-object';

import { join } from 'path';
import { promises as fsp } from 'fs';

import R6API, { utils } from '../src';
import { insertContent, isFileExists } from './utils';

(async () => {

  const structureChange = (obj1: any, obj2: any) => {
    if (
      Object.getOwnPropertyNames(obj1).join(' ') !== Object.getOwnPropertyNames(obj2).join(' ')
    ) return true;
    for (const key in obj1) {
      if (
        (
          typeof obj1[key] != typeof obj2[key]
          && [obj1[key], obj2[key]].sort().map(e => e + '').join(' ') !== 'null undefined'
        ) || (
          typeof obj1[key] === 'object'
          && obj1[key] != null
          && obj2[key] != null
          && structureChange(obj1[key], obj2[key])
        )
      ) return true;
    }
    return false;
  };

  const { UBI_EMAIL: email = '', UBI_PASSWORD: password = '' } = process.env;
  const r6api = new R6API({ email, password });
  const username = 'Daniel.Nt';
  const platform = 'uplay';

  const findByUsername = await r6api.findByUsername(platform, username)
    .catch(err => console.error(err));
  const id = findByUsername[0].id;
  const findById = await r6api.findById(platform, id)
    .catch(err => console.error(err));
  const getProgression = await r6api.getProgression(platform, id)
    .catch(err => console.error(err));
  const getPlaytime = await r6api.getPlaytime(platform, id)
    .catch(err => console.error(err));
  const getRanks = await r6api.getRanks(platform, id, { regions: 'emea' })
    .catch(err => console.error(err));
  const getStats = await r6api.getStats(platform, id)
    .catch(err => console.error(err));
  const getStatus = await r6api.getStatus()
    .catch(err => console.error(err));
  const validateUsername = await r6api.validateUsername('gamerflick360')
    .catch(err => console.error(err));
  const getNews = await r6api.getNews({ limit: 1 })
    .catch(err => console.error(err));
  const getNewsById = await r6api.getNewsById('4QAhnXnPk7Ffse8scw3k0Z')
    .catch(err => console.error(err));
  const custom = await r6api.custom(
    utils.URLS.STATS(platform, [id], 'operatorpvp_clash_sloweddown')
  ).catch(err => console.error(err));

  const methods = <const>[
    ['findByUsername', findByUsername],
    ['findById', findById],
    ['getProgression', getProgression],
    ['getPlaytime', getPlaytime],
    ['getRanks', getRanks],
    ['getStats', getStats],
    ['getStatus', getStatus],
    ['validateUsername', validateUsername],
    ['getNews', getNews],
    ['getNewsById', getNewsById],
    ['custom', custom]
  ];

  const argv = minimist(process.argv.slice(2));
  const filters = argv._[0] ? argv._ : methods.map(([name]) => name);
  const filteredMethods = methods.filter(([name, output]) =>
    filters.map(filter => filter.toLowerCase()).includes(name.toLowerCase()) && output
  );

  const readmePath = join(__dirname, '../readme.md');
  const getMethodsDocsPath = (name: string) =>
    join(__dirname, `../docs/methods/${name}.json`);
  const getMethodsDocsFile = async (name: string) => {
    if (!await isFileExists(getMethodsDocsPath(name)))
      await fsp.writeFile(getMethodsDocsPath(name), '[]');
    return await fsp.readFile(getMethodsDocsPath(name), 'utf8');
  };

  for (const [name, output] of filteredMethods) {

    const prevOutput = await getMethodsDocsFile(name);

    if (structureChange(JSON.parse(prevOutput), output) || argv.force) {

      console.log(
        `${argv.force ? 'Running with force' : 'Structual change detected'}: ${name}`
      );

      await fsp.writeFile(
        getMethodsDocsPath(name),
        JSON.stringify(output, (_, val) => val === undefined ? null : val, 2)
      );

      if (name !== 'getStats')
        await insertContent(
          readmePath, `${name.toUpperCase()}_OUTPUT`, stringifyObject(output, { indent: '  ' }),
          {
            style: 'hiddenCodeBlock', codeBlockLang: 'js', hiddenCodeBlockSummary: 'Output',
            newLine: true
          }
        ).catch(err => console.error(err));

    } else console.log(`No structual change detected: ${name}`);

  }

  process.exit();

})();
