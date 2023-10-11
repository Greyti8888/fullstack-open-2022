const jwt = require('jsonwebtoken')

const { info, error } = require('./logger')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
  info('Method:', req.method)
  info('Path:  ', req.path)
  info('Body:  ', req.body)
  info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  error(err.message)

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  else if (err.name === 'SyntaxError') {
    return res.status(400).json({ error: err.message })
  }
  else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: err.message })
  }
  else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: err.message })
  }
  else if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(err)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '')
    req.token = token
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }
  req.user = user
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}