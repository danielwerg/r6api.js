require('dotenv').config();
const stringifyObject = require('stringify-object');

const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const insertContent = require('./insertContent.js'); // eslint-disable-line import/order

const email = process.env.UBI_EMAIL;
const password = process.env.UBI_PASSWORD;

let secretsError = '';
if (!email) {
  secretsError += `Invalid email secret: ${email === ''
    ? 'empty string' : typeof email}\n`;
}
if (!password) {
  secretsError += `Invalid password secret: ${password === ''
    ? 'empty string' : typeof password}\n`;
}
if (secretsError) throw new Error(secretsError.trim());

const R6API = require('../lib').default;
const r6api = new R6API({ email, password });

const structureChange = (obj1, obj2) => {
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

(async () => {

  const username = 'Daniel.Nt';
  const platform = 'uplay';

  const findByUsername = await r6api.findByUsername(platform, username);
  const id = findByUsername[0].id;
  const findById = await r6api.findById(platform, id);
  const getProgression = await r6api.getProgression(platform, id);
  const getPlaytime = await r6api.getPlaytime(platform, id);
  const getRanks = await r6api.getRanks(platform, id, { regions: 'emea' });
  const getStats = await r6api.getStats(platform, id);
  const getStatus = await r6api.getStatus(platform, id);
  const getNews = await r6api.getNews({ limit: 1 });
  const getNewsById = await r6api.getNewsById('4QAhnXnPk7Ffse8scw3k0Z');
  const custom = await r6api.custom(
    r6api.utils.URLS.STATS(platform, [id], 'operatorpvp_clash_sloweddown')
  );

  const getDataFilePath = (name) => join(__dirname, `../docs/responses/${name}.json`);
  const getDataFile = (name) => readFileSync(getDataFilePath(name), 'utf8');

  const undefToNull = (obj) => {
    for (let key in obj) {
      if (obj[key] === undefined) obj[key] = null;
      else if (typeof obj[key] == 'object' && obj[key] !== null) obj[key] = undefToNull(obj[key]);
    }
    return obj;
  };

  [
    { name: 'findByUsername', response: findByUsername },
    { name: 'findById', response: findById },
    { name: 'getProgression', response: getProgression },
    { name: 'getPlaytime', response: getPlaytime },
    { name: 'getRanks', response: getRanks },
    { name: 'getStats', response: getStats },
    { name: 'getStatus', response: getStatus },
    { name: 'getNews', response: getNews },
    { name: 'getNewsById', response: getNewsById },
    { name: 'custom', response: custom }
  ]
    .map(item =>
      structureChange(JSON.parse(getDataFile(item.name)), item.response)
        || process.argv[2] === '--force'
        ? (
          process.argv[2] === '--force'
            ? console.log(`Running with force: ${item.name}`)
            : console.log(`Structual change detected: ${item.name}`),
          writeFileSync(getDataFilePath(item.name), JSON.stringify(undefToNull(item.response), null, 2).replace(/\n/gm, '\r\n')),
          item.name !== 'getStats'
            ? insertContent(item.name, stringifyObject(item.response, { indent: '  ' }))
            : ''
        )
        : console.log(`No structual change detected: ${item.name}`)
    );

  process.exit();

})();
