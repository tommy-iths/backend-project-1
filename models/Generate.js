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
  dob: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  trait: {
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
  constructor(name, dob, trait, address, work, image,) {
    this.name = faker.name.findName()
    this.dob = faker.date.between('1950-01-01', '2002-01-01').toDateString().split(' '[0]).slice(1).join('-')
    this.trait = "My favorite color is " + faker.commerce.color() + " " + "and I also drive a " + faker.vehicle.vehicle()
    this.address = faker.address.streetAddress()
    this.work = faker.name.jobTitle()
    this.image = faker.image.avatar()
  }
}

module.exports = {
  FakeUsers,
  FakeUser
}