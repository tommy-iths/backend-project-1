const { Unauthorized } = require('../errors')
const Staff = require('../models/Staff')


module.exports = {
  staff: (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) { throw new Unauthorized() }
    const token = authorization.replace('Bearer ', '')
    const staff = Staff.validateToken(token)
    req.staff = staff
    next()
  }
}
