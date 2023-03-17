const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const minPassword = 3

  if (!password) {
    return res.status(400).json({ error: '`password` is missing' })
  }

  if (password.length < minPassword) {
    return res.status(400).json({ error: `\`password\` length is less than ${minPassword}` })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash
  })

  const result = await newUser.save()
  res.status(201).json(result)
})

module.exports = usersRouter