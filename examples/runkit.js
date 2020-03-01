const R6API = require('r6api.js');
const r6api = new R6API('example@mail.com', 'eatbigbanan');

const username = 'Daniel.Nt',
      platform = 'uplay';

const id = await r6api.getId(platform, username).then(el => el[0].userId);
const stats = await r6api.getStats(platform, id).then(el => el[0]);

console.log(`${username} has played ${stats.pvp.general.matches} matches.`);
