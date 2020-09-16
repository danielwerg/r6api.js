import * as dotenv from 'dotenv';
dotenv.config();
import * as stringifyObject from 'stringify-object';

import { promises as fs } from 'fs';
import { join } from 'path';

import R6API, { utils } from '../src';
import insertContent from './insertContent';

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

const undefToNull = (obj: any) => {
  for (const key in obj) {
    if (obj[key] === undefined) obj[key] = null;
    else if (typeof obj[key] == 'object' && obj[key] !== null)
      obj[key] = undefToNull(obj[key]);
  }
  return obj;
};

(async () => {

  const email = process.env.UBI_EMAIL || '';
  const password = process.env.UBI_PASSWORD || '';

  const r6api = new R6API({ email, password });

  const username = 'Daniel.Nt';
  const platform = 'uplay';

  const findByUsername = await r6api.findByUsername(platform, username)
    .catch(err => console.log(err));
  const { 0: { id }} = findByUsername || [{ id: '0' }];
  const findById = await r6api.findById(platform, id)
    .catch(err => console.log(err));
  const getProgression = await r6api.getProgression(platform, id)
    .catch(err => console.log(err));
  const getPlaytime = await r6api.getPlaytime(platform, id)
    .catch(err => console.log(err));
  const getRanks = await r6api.getRanks(platform, id, { regions: 'emea' })
    .catch(err => console.log(err));
  const getStats = await r6api.getStats(platform, id)
    .catch(err => console.log(err));
  const getStatus = await r6api.getStatus()
    .catch(err => console.log(err));
  const getNews = await r6api.getNews({ limit: 1 })
    .catch(err => console.log(err));
  const getNewsById = await r6api.getNewsById('4QAhnXnPk7Ffse8scw3k0Z')
    .catch(err => console.log(err));
  interface ICustomResponse {
    [key: string]: {
      [key: string]: {
        'operatorpvp_clash_sloweddown:3:10:infinite': number;
      }
    }
  }
  const custom = await r6api.custom<ICustomResponse>(
    utils.URLS.STATS(platform, [id], 'operatorpvp_clash_sloweddown')
  ).catch(err => console.log(err));

  const getFilePath = (name: string) => join(__dirname, `../docs/methods/${name}.json`);
  const getFile = async (name: string) => await fs.readFile(getFilePath(name), 'utf8');

  const methods = [
    { name: 'FINDBYUSERNAME', response: findByUsername },
    { name: 'FINDBYID', response: findById },
    { name: 'GETPROGRESSION', response: getProgression },
    { name: 'GETPLAYTIME', response: getPlaytime },
    { name: 'GETRANKS', response: getRanks },
    { name: 'GETSTATS', response: getStats },
    { name: 'GETSTATUS', response: getStatus },
    { name: 'GETNEWS', response: getNews },
    { name: 'GETNEWSBYID', response: getNewsById },
    { name: 'CUSTOM', response: custom }
  ];

  for (const i in methods) {
    const oldMethodResponse = await getFile(methods[i].name);

    if (
      structureChange(JSON.parse(oldMethodResponse), methods[i].response)
      || process.argv[2] === '--force'
    ) {

      console.log(`${process.argv[2] === '--force'
        ? 'Running with force' : 'Structual change detected'
      }: ${methods[i].name}`);

      await fs.writeFile(
        getFilePath(methods[i].name),
        JSON.stringify(undefToNull(methods[i].response), null, 2).replace(/\n/gm, '\r\n')
      );

      if (methods[i].name !== 'getStats')
        await insertContent(
          `${methods[i].name}_OUTPUT`, stringifyObject(methods[i].response, { indent: '  ' })
        ).catch(err => console.log(err));

    } else console.log(`No structual change detected: ${methods[i].name}`);

  }

  process.exit();

})();
