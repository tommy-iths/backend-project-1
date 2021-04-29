const faker = require('faker')

class FakeUser {
  constructor(fullName, dob, trait, address, work, image,) {
    this.fullName = faker.name.findName()
    this.dob = faker.date.between('1950-01-01', '2002-01-01').toDateString().split(' '[0]).slice(1).join('-')
    this.trait = "My favorite color is " + faker.commerce.color() + " " + "and I also drive a " + faker.vehicle.vehicle()
    this.address = faker.address.streetAddress()
    this.work = faker.name.jobTitle()
    this.image = faker.image.avatar()
  }
}

module.exports = {
  FakeUser
}