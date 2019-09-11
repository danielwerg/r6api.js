class InvalidCredentialsError extends Error {
  constructor() {
    super('invalid credentials');
  }
}

class MissingCredentialsError extends Error {
  constructor() {
    super('missing credentials');
  }
}

class PlayerNotFound extends Error {
  constructor(msg) {
    super(msg || 'player not found');
  }
}

class TooManyRequestsError extends Error {
  constructor() {
    super('too many requests');
  }
}
class UnknownAuthError extends Error {
  constructor(msg) {
    super(msg || 'unknown auth error');
  }
}
class NoTokenError extends Error {
  constructor(msg) {
    super(msg || 'no token');
  }
}

class MissingHeaderError extends Error {
  constructor(msg) {
    super(msg || 'missing header');
  }
}

class TooManyIdsError extends Error {
  constructor(msg) {
    super(msg || 'too many ids');
  }
}

class NotAnArray extends Error {
  constructor(msg) {
    super(msg || 'regions parameter should be an array');
  }
}

class BadRequestError extends Error {
  constructor(msg) {
    super(msg || 'bad request');
  }
}

module.exports = {
  InvalidCredentialsError,
  MissingHeaderError,
  MissingCredentialsError,
  PlayerNotFound,
  TooManyRequestsError,
  UnknownAuthError,
  NoTokenError,
  TooManyIdsError,
  NotAnArray,
  BadRequestError
};
