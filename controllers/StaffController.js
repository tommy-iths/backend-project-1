const { InvalidBodyStaff } = require("../errors")
const Staff = require('../models/Staff')
const credentials = require('../database/credentials')
const { json } = require("express")


module.exports = {
  staffMembers(req, res, next) {
    credentials.forEach(async credential => {
      try {
        let { email, password } = credential
        if (!email || !password) {
          throw new InvalidBodyStaff(['email', 'password'])
        }
        await Staff.create({ email, password })
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
  },
}
