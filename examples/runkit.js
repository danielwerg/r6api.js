require('dotenv').config();
const R6API = require('r6api.js').default;

// // Or ES6 way
// import * as dotenv from 'dotenv';
// dotenv.config();
// import R6API from 'r6api.js';

const r6api = new R6API({
  email: process.env.UBI_EMAIL,
  password: process.env.UBI_PASSWORD
});

// export default async () => { // ES6
exports.default = async () => {

  const username = 'Daniel.Nt';
  const platform = 'uplay';

  const { 0: { id } } = await r6api.findByUsername(platform, username);
  const { 0: { pvp: { general } } } = await r6api.getStats(platform, id);

  return `${username} has played ${general.matches} matches.`;

};
