// const auth = require('./lib/auth.js');
//
// class R6API {
//
//   constructor(email, password) {
//     auth.setCredentials(email, password);
//   }
//
//   auth = auth;
//   getStatus = require('./lib/methods/getStatus.js');
//   getById = require('./lib/methods/getById.js');
//   getByUsername = require('./lib/methods/getByUsername.js');
//   getLevel = require('./lib/methods/getLevel.js');
//   getPlaytime = require('./lib/methods/getPlaytime.js');
//   getRank = require('./lib/methods/getRank.js');
//   getStats = require('./lib/methods/getStats.js');
//   custom = require('./lib/methods/custom.js');
//   constants = require('./lib/constants');
//   errors = require('./lib/errors.js');
//
// }
//
// module.exports = R6API;


// temp solution, too lazy
function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var auth = require('./lib/auth.js');

var R6API = function R6API(email, password) {
  _classCallCheck(this, R6API);

  _defineProperty(this, "auth", auth);

  _defineProperty(this, "getStatus", require('./lib/methods/getStatus.js'));

  _defineProperty(this, "getById", require('./lib/methods/getById.js'));

  _defineProperty(this, "getByUsername", require('./lib/methods/getByUsername.js'));

  _defineProperty(this, "getLevel", require('./lib/methods/getLevel.js'));

  _defineProperty(this, "getPlaytime", require('./lib/methods/getPlaytime.js'));

  _defineProperty(this, "getRank", require('./lib/methods/getRank.js'));

  _defineProperty(this, "getStats", require('./lib/methods/getStats.js'));

  _defineProperty(this, "custom", require('./lib/methods/custom.js'));

  _defineProperty(this, "constants", require('./lib/constants'));

  _defineProperty(this, "errors", require('./lib/errors.js'));

  auth.setCredentials(email, password);
};

module.exports = R6API;
