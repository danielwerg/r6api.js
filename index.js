const auth = require('./lib/auth.js');
const getId = require('./lib/methods/getId.js');
const getLevel = require('./lib/methods/getLevel.js');
const getPlaytime = require('./lib/methods/getPlaytime.js');
const getRank = require('./lib/methods/getRank.js');
const getStats = require('./lib/methods/getStats.js');
const getStatus = require('./lib/methods/getStatus.js');
const getUsername = require('./lib/methods/getUsername.js');
const custom = require('./lib/methods/custom.js');
const constants = require('./lib/constants');
const errors = require('./lib/errors.js');

const Promise = require('bluebird');

const checkArgs = ({ func, platform, query, opts, limit }) => {
  query = [].concat(query);
  if (query.length > limit)
    return Promise.reject(new errors.TooManyIdsError(`you can\'t pass more than ${limit} ids/usernames`));
  return func(platform, query, opts);
}

class R6API {
  constructor(email, password) {
    auth.setCredentials(email, password);
    this.auth = auth;
    this.getId = (platform, query) =>
      checkArgs({ func: getId, platform, query, limit: 50 });
    this.getLevel = (platform, query) =>
      checkArgs({ func: getLevel, platform, query, limit: 200 });
    this.getPlaytime = (platform, query) =>
      checkArgs({ func: getPlaytime, platform, query, limit: 200 });
    this.getRank = (platform, query, opts) =>
      checkArgs({ func: getRank, platform, query, opts, limit: 200 });
    this.getStats = (platform, query, opts) =>
      checkArgs({ func: getStats, platform, query, opts, limit: 200 });
    this.getStatus = getStatus;
    this.getUsername = (platform, query) =>
      checkArgs({ func: getUsername, platform, query, limit: 50 });
    this.custom = custom;
    this.constants = constants;
    this.errors = errors;
  }
}

module.exports = R6API;
