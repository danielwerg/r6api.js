const auth = require('./lib/auth.js');
const getStatus = require('./lib/methods/getStatus.js');
const getId = require('./lib/methods/getId.js');
const getUsername = require('./lib/methods/getUsername.js');
const getLevel = require('./lib/methods/getLevel.js');
const getPlaytime = require('./lib/methods/getPlaytime.js');
const getRank = require('./lib/methods/getRank.js');
const getStats = require('./lib/methods/getStats.js');
const custom = require('./lib/methods/custom.js');
const constants = require('./lib/constants');
const errors = require('./lib/errors.js');

class R6API {
  constructor(email, password) {
    auth.setCredentials(email, password);
    this.auth = auth;
    this.getStatus = getStatus;
    this.getId = getId;
    this.getUsername = getUsername;
    this.getLevel = getLevel;
    this.getPlaytime = getPlaytime;
    this.getRank = getRank;
    this.getStats = getStats;
    this.custom = custom;
    this.constants = constants;
    this.errors = errors;
  }
}

module.exports = R6API;
