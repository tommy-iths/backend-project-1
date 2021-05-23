const { Unauthorized } = require('../errors')
const Staff = require('../models/Staff')
const { Forbidden } = require("../errors")

function extractToken(headers) {
  const { authorization } = headers
  if (!authorization) {
    throw new Unauthorized()
  }
  const token = authorization.replace('Bearer ', '')
  return token
}

module.exports = {
  staff: (req, res, next) => {
    const token = extractToken(req.headers)
    const staff = Staff.validateToken(token)
    req.staff = staff
    next()
  },
  admin: (req, res, next) => {
    const token = extractToken(req.headers)
    const staff = Staff.validateToken(token)
    if (staff.role !== 'admin') { throw new Forbidden() }
    req.staff = staff
    next()
  }
}
