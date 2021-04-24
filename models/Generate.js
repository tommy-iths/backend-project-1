const db = require('../database/connection')
const { DataTypes } = require('sequelize')
const faker = require('faker')

const FakeUsers = db.define('FakeUsers', {
  user_ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  work: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  }
})

class FakeUser {
  constructor(name, address, work, image) {
    this.name = faker.name.findName()
    this.address = faker.address.streetAddress()
    this.work = faker.name.jobTitle()
    this.image = faker.image.avatar()
  }
}

module.exports = {
  FakeUsers,
  FakeUser
}