const auth = require('./lib/auth.js');

class R6API {

  constructor(email, password) {
    auth.setCredentials(email, password);
  }

  auth = auth;
  getStatus = require('./lib/methods/getStatus.js');
  getById = require('./lib/methods/getById.js');
  getByUsername = require('./lib/methods/getByUsername.js');
  getLevel = require('./lib/methods/getLevel.js');
  getPlaytime = require('./lib/methods/getPlaytime.js');
  getRank = require('./lib/methods/getRank.js');
  getStats = require('./lib/methods/getStats.js');
  custom = require('./lib/methods/custom.js');
  constants = require('./lib/constants');
  errors = require('./lib/errors.js');

}

module.exports = R6API;
