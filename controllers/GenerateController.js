const { InvalidBody } = require("../errors")
const { FakeUsers } = require('../models/Generate')
const { FakeUser } = require('../models/Generate')

module.exports = {
  async generateUser(req, res, next) {
    try {
      const { name, address, work, image } = new FakeUser()

      if (!name || !address || !work || !image) {
        throw new InvalidBody(['name', 'address', 'work', 'image'])
      }

      await FakeUsers.create({ name, address, work, image })
      res.json({ message: 'One fakeUser was created!' })
    } catch (error) {
      next(error)
    }
  }
}

