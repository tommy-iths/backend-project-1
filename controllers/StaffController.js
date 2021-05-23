const { InvalidBodyStaff } = require("../errors")
const Staff = require('../models/Staff')
const credentials = require('../database/credentials')
const { json } = require("express")
const bcrypt = require('bcrypt')


module.exports = {
  staffMembers(req, res, next) {
    credentials.forEach(async credential => {
      try {
        let { email, password, role } = credential
        if (!email || !password) {
          throw new InvalidBodyStaff(['email', 'password'])
        }
        await Staff.create({ email, password, role })
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
  async all(req, res, next) {
    try {
      const staff = await Staff.findAll({ attributes: { exclude: ['password'] } })
      res.json({ staff })
    } catch (error) { next(error) }
  },
  async changePassword(req, res, next) {
    const email = req.body.email
    try {
      const { newPassword } = req.body
      console.log(newPassword)
      if (!email || !newPassword) {
        throw new InvalidBodyStaff()
      } else {
        const newPassHash = bcrypt.hashSync(newPassword, 10)
        const newPass = await Staff.findOne({ where: { email } })
        newPass.password = newPassHash
        await newPass.save()
        res.send({ msg: "Password updated successfully!" })
      }
    } catch (error) { next(error) }
  }
}
