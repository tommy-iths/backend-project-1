const { InvalidBody } = require("../errors")
const { FakeUser, FakeUsers } = require('../models/Generate')

module.exports = {
  generateUser(req, res, next) {
    try {
      const fakeuser = { fullName, dob, trait, address, work, image } = new FakeUser()

      if (!fullName || !dob || !trait || !address || !work || !image) {
        throw new InvalidBody(['fullName', 'address', 'work', 'image'])
      }
      res.json({ fakeuser })
    } catch (error) {
      next(error)
    }
  }
}

