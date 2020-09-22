abstract class BaseError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UnknownAuthorizationError extends BaseError {
  constructor(message: string | number) {
    super(`Unknown Authorization: ${message}`);
  }
}

export class TooManyRequestsError extends BaseError {
  constructor() {
    super('Too many requests');
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string | number) {
    super(`Bad request: ${message}`);
  }
}

export class MissingHeaderError extends BaseError {
  constructor() {
    super('Missing header');
  }
}

export class MissingCredentialsError extends BaseError {
  constructor() {
    super('Missing credentials');
  }
}

export class InvalidCredentialsError extends BaseError {
  constructor() {
    super('Invalid credentials');
  }
}

export class UnknownError extends BaseError {
  constructor(message: string) {
    super(`Unknown Error: ${message}`);
  }
}
