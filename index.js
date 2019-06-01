const auth = require('./lib/auth.js');

class R6API {
  constructor(email, password) {
    auth.setCredentials(email, password);
    this.auth = auth;
    this.getStatus = require('./lib/methods/getStatus.js');
    this.getById = require('./lib/methods/getById.js');
    this.getByUsername = require('./lib/methods/getByUsername.js');
    this.getLevel = require('./lib/methods/getLevel.js');
    this.getPlaytime = require('./lib/methods/getPlaytime.js');
    this.this.getRank = require('./lib/methods/getRank.js');
    this.getStats = require('./lib/methods/getStats.js');
    this.custom = require('./lib/methods/custom.js');
    this.constants = require('./lib/constants');
    this.errors = require('./lib/errors.js');
  }
}

module.exports = R6API;
