const R6API = require('../index');
const fs = require('fs');
const path = require('path');

const email = process.env.API_EMAIL,
  pass = process.env.API_PASS;
if (!email || !pass) throw new Error("Cannot update file without API credentials");

const r6 = new R6API(email, pass);

(async () => {
  try {
    const username = 'Daniel.Nt';
    const id = await r6.getId('uplay', username).then(el => el[0].id);
    const stats = await r6.getStats('uplay', id).then(el => el[0]);

    fs.writeFileSync(path.join(__dirname, '../doc/stats-response.json'), JSON.stringify(stats));
  } catch (e) {
    throw e;
    process.exit(1);
  }
})();
