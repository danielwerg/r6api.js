const fetch = require('./fetch.js');
const { URLS } = require('./constants.js');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const Errors = require('./errors.js');

const path = require('path');
const os = require('os');
let tokenFile = path.join(os.tmpdir(), 'r6Token.json');

const cred = { email: '', password: '' };
let currentLogin, loginTimeout, currentAuth = null;

const login = async (email, password, secondpass) => {

  if (currentLogin) return currentLogin;
  if (email && password) setCredentials(email, password);

  if (!cred.email || !cred.password) {
    currentLogin = null;
    return Promise.reject(new Errors.MissingCredentialsError());
  }

  try {
    let auth = await fs.readFileAsync(tokenFile, 'utf8').then(auth => JSON.parse(auth));
    const expiration = new Date(auth.expiration) - new Date() - 10 * 60 * 1000;
    if (expiration > 0) {
      loginTimeout = setTimeout(login, expiration);
      currentAuth = auth;
      currentLogin = null;
      return auth;
    }
    // console.log('Old token expired');
  } catch (e) {
    // console.log('No old token');
  }

  const token = 'Basic ' + Buffer.from(`${cred.email}:${cred.password}`, 'utf8').toString('base64');

  try {
    const res = await Promise.resolve(token).then(
      fetch(URLS('LOGIN'), { method: 'POST', body: JSON.stringify({ rememberMe: true }) })
    );
    if (res && res.ticket && res.expiration) {
      currentAuth = res;
      const expiration = new Date(res.expiration) - new Date() - 10 * 60 * 1000;
      currentLogin = false;
      loginTimeout = setTimeout(() => { currentLogin = login() }, expiration);
      await fs.writeFileAsync(tokenFile, JSON.stringify(res));
      return res;
    } else {
      throw new Errors.UnknownAuthError();
    }
  }
  catch (err) {
    clearTimeout(loginTimeout);
    currentLogin = false;
    await Promise.delay(5000);
    return Promise.reject(err);
  }
}

const getAuthToken = () => {
  if (currentAuth && currentAuth.expiration && currentAuth.ticket && new Date(currentAuth.expiration) > new Date()) {
    return Promise.resolve(currentAuth.ticket);
  } else {
    currentLogin = login().then(() => currentAuth.ticket);
    return currentLogin;
  }
}

const setCredentials = (email, password) => {
  cred.email = email;
  cred.password = password;
}
const getCredentials = () => cred;
const getAuthString = () => getAuthToken().then(token => 'Ubi_v1 t=' + token);
const refreshScheduled = () => !!loginTimeout;
const cancelRefresh = () => clearTimeout(loginTimeout);
const setTokenFileLocation = (dir) => tokenFile = path.join(dir, 'r6Token.json');
const _setAuth = (authObj) => currentAuth = authObj;
const _getAuth = () => currentAuth;

module.exports = {
  login,
  setCredentials,
  getCredentials,
  getAuthString,
  getAuthToken,
  refreshScheduled,
  cancelRefresh,
  setTokenFileLocation,
  _setAuth,
  _getAuth
};
