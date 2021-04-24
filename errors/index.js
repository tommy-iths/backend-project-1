class FuskeluringError extends Error { }

class InvalidBody extends FuskeluringError {
  constructor(fields) {
    super()
    this.fields = fields
    this.message = `Invalid body, required field: ${this.fields.join(', ')}`
    this.errorCode = 400
  }
}

module.exports = {
  FuskeluringError,
  InvalidBody
}