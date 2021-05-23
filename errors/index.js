class FuskeluringError extends Error { }

class InvalidBody extends FuskeluringError {
  constructor(fields) {
    super()
    this.fields = fields
    this.message = `Invalid body, required field: ${this.fields.join(', ')}`
    this.errorCode = 400
  }
}

class InvalidBodyStaff extends FuskeluringError {
  constructor(fields) {
    super()
    this.fields = fields
    this.message = `Invalid body, required field: ${this.fields.join(', ')}`
    this.errorCode = 400
  }
}

class InvalidCredentials extends FuskeluringError {
  constructor() {
    super()
    this.message = 'Invalid Credentials'
    this.errorCode = 403
  }
}

class Unauthorized extends FuskeluringError {
  constructor() {
    super()
    this.message = 'Unauthorized'
    this.errorCode = 401
  }
}

class Forbidden extends FuskeluringError {
  constructor() {
    super()
    this.message = `Forbidden`
    this.errorCode = 403
  }
}

class TokenExpired extends FuskeluringError {
  constructor() {
    super()
    this.message = 'Token is expired'
    this.errorCode = 403
  }
}

module.exports = {
  FuskeluringError,
  InvalidBody,
  InvalidBodyStaff,
  InvalidCredentials,
  Unauthorized,
  TokenExpired,
  Forbidden
}