const { FuskeluringError } = require('../errors')
const { BaseError } = require('sequelize')

module.exports = {
  errorHandler(error, req, res, next) {
    if (error instanceof FuskeluringError) {
      res
        .status(error.statusCode)
        .json({ error: error.message })
    } else if (error instanceof BaseError) {
      res
        .status(400)
        .json({ error: error.message })
    } else {
      res
        .status(500)
        .json({ error: 'Something went wrong, please contact your system admin' })
    }
  }
}