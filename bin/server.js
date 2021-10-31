const db = require('../config/db')
const app = require('../app')
require('dotenv').config()
const UPLOAD_DIR = process.env.UPLOAD_DIR
const AVATAR_USERS = process.env.AVATAR_USERS
const mkdirp = require('mkdirp')

const PORT = process.env.PORT || 8000

db.then(() => {
  app.listen(PORT, async() => {
    await mkdirp(UPLOAD_DIR)
    await mkdirp(AVATAR_USERS)

    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((err) => {
  console.log(`Server not run. Error: ${err.message}`)
})
