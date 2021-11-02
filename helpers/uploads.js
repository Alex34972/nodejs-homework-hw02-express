
const multer = require('multer')
require('dotenv').config()
const { StatusCode } = require('../config/constants')
const UPLOAD_DIR = process.env.UPLOAD_DIR

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, UPLOAD_DIR)
  },
  filename: function (_req, file, cb) {
    cb(null, `${Date.now().toString()}_${file.originalname}`)
  },
})
const upload = multer({
  storage: storage,
  limits: { filedSize: 2000000 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.includes('image')) {
      return cb(null, true)
    }
    const err = new Error('not picture')
    err.status = StatusCode.BAD_REQUEST
    cb(err)
  }
})

module.exports = upload
