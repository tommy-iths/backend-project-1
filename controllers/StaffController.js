const { InvalidBodyStaff } = require("../errors")
const Staff = require('../models/Staff')
const credentials = require('../database/credentials')


module.exports = {
  staffMembers(req, res, next) {
    credentials.forEach(async credential => {
      try {
        let { email, password, reqTokens } = credential
        if (!email || !password || !reqTokens) {
          throw new InvalidBodyStaff(['email', 'password', 'reqTokens'])
        }
        await Staff.create({ email, password, reqTokens })
        res.end()
      } catch (error) {
        next(error)
      }
    })
  },
  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const token = await Staff.authenticate(email, password)
      res.json({ token, email })
    } catch (error) {
      next(error)
    }
  },
  me(req, res, next) {
    const staff = req.staff
    res.json({ staff })
  }
}