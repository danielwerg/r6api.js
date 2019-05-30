const { getAuthString } = require('../auth');
const fetch = require('../fetch');

module.exports = (url) => getAuthString().then(fetch(url));
