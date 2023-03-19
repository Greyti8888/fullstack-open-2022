const jwt = require('jsonwebtoken')

const User = require('../models/user')

const getUser = async (username) => {
  const user = await User.findOne({ username: username })
  return user
}

const getToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })
  return token
}

module.exports = {
  getUser,
  getToken
}