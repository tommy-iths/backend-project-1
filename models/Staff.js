const db = require('../database/connection')
const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { InvalidCredentials, TokenExpired, Unauthorized } = require('../errors')

const Staff = db.define('StaffMembers', {
  user_ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Email already exists'
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    enum: ['user', 'admin'],
    defaultValue: 'user'
  }
})

Staff.beforeCreate((Staff, options) => {
  Staff.password = bcrypt.hashSync(Staff.password, 10)
})

Staff.authenticate = async (email, password) => {
  const staff = await Staff.findOne({ where: { email } })
  if (!staff) { throw new InvalidCredentials() }

  const passwordMatch = bcrypt.compareSync(password, staff.password)
  if (passwordMatch) {
    const payload = { id: staff.id, email: staff.email, role: staff.role }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1w' })
  } else {
    throw new InvalidCredentials()
  }
}

Staff.validateToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new TokenExpired()
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Unauthorized()
    } else {
      throw error
    }
  }
}
module.exports = Staff