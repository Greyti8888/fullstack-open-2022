const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const app = express()

const { MONGODB_URI } = require('./utils/config')
const { info, error } = require('./utils/logger')
const { errorHandler, requestLogger, unknownEndpoint } = require('./utils/middleware')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

info('connecting to MongoDB')

mongoose.connect(MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch((err) => {
    error('error connecting to MongoDB:', err.message)
  })

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app

