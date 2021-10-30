const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const boolParser = require('express-query-boolean')
const usersRouter = require('./routes/api/users')
const contactsRouter = require('./routes/api/contacts')
const { StatusCode } = require('./config/constants')
require('dotenv').config();
const AVATAR_USERS = process.env.AVATAR_USERS;

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(express.static(AVATAR_USERS))
app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(boolParser())

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((_req, res) => {
  res.status(StatusCode.NOT_FOUND).json({ message: 'Not found!' })
})

app.use((err, _req, res, _next) => {
  res.status(StatusCode.SERVER_ERROR).json({ message: err.message })
})

module.exports = app
