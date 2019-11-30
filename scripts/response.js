require('dotenv').config();
const fs = require('fs');
const { join } = require('path');

const email = process.env.UBI_EMAIL,
      password = process.env.UBI_PASSWORD;
if (!email || !password) throw new Error('Cannot update file without API credentials');

const R6API = require('../index');
const r6api = new R6API(email, password);

(async () => {

    const username = 'Daniel.Nt',
          platform = 'uplay';
    const id = await r6api.getId(platform, username).then(el => el[0].id);
    const stats = await r6api.getStats(platform, id).then(el => el[0]);

    fs.writeFileSync(join(__dirname, '../doc/stats-response.json'), JSON.stringify(stats, null, 2));

    process.exit(0);

})();
