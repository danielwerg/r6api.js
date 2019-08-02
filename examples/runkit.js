const R6API = require('r6api.js');
const r6 = new R6API('example@mail.com', 'eatbigbanan');

const username = 'Daniel.Nt';
const id = await r6.getId('uplay', username).then(el => el[0].id);
const stats = await r6.getStats('uplay', id).then(el => el[0]);

console.log(`${username} has played ${stats.pvp.general.matches} matches`);
