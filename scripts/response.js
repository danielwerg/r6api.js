require('dotenv').config();
const fs = require('fs');
const { join } = require('path');
const filePath = join(__dirname, '../doc/getStats-response.json');

const email = process.env.UBI_EMAIL,
      password = process.env.UBI_PASSWORD;
if (!email || !password) throw new Error('Cannot update file without API credentials');

const R6API = require('../index');
const r6api = new R6API(email, password);

function structureChange(obj1, obj2) {
  if (
    Object.getOwnPropertyNames(obj1).join(' ') != Object.getOwnPropertyNames(obj2).join(' ')
  ) return true;
  for (let key in obj1) {
    if (
      typeof obj1[key] != typeof obj2[key]
      || (typeof obj1[key] == 'object'
        && obj1[key] != null
        && obj2[key] != null
        && structureChange(obj1[key], obj2[key]))
    ) return true;
  }
  return false;
};

(async () => {

  const username = 'Daniel.Nt',
        platform = 'uplay';

  const id = await r6api.getId(platform, username).then(el => el[0].id);
  const stats = await r6api.getStats(platform, id).then(el => el[0]);

  const prev = require(filePath);
  if (structureChange(prev, stats)) {
    fs.writeFileSync(filePath, JSON.stringify(stats, null, 2));
    console.log('Response for getStats has been updated.');
  } else console.log('No structual change has been detected.');

  process.exit(0);

})();
