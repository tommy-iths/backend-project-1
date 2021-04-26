const { InvalidBody } = require("../errors")
const { FakeUsers } = require('../models/Generate')
const { FakeUser } = require('../models/Generate')

module.exports = {
  async generateUser(req, res, next) {
    try {
      const { name, dob, trait, address, work, image } = new FakeUser()

      if (!name || !dob || !trait || !address || !work || !image) {
        throw new InvalidBody(['name', 'address', 'work', 'image'])
      }

      await FakeUsers.create({ name, dob, trait, address, work, image })
      res.json({ message: 'One fakeUser was created!' })
    } catch (error) {
      next(error)
    }
  },
  dob() {
    const dob = faker.date.between('1950-01-01', '2002-01-01').toDateString().split(' '[0]).slice(1).join('-')
  }
}

