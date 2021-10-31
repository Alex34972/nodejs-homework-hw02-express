const jwt = require('jsonwebtoken')
const path = require('path')
const mkdirp = require('mkdirp')
const Users = require('../repository/users')
const { StatusCode } = require('../config/constants')
const UploadService = require('../service/file-upload')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY

const signup = async (req, res, next) => {
  const { email } = req.body
  const user = await Users.findByEmail(email)
  if (user) {
    return res.status(StatusCode.CONFLICT).json({
      status: 'Error',
      code: StatusCode.CONFLICT,
      message: 'Email is already exist'
    })
  }
  try {
    const newUser = await Users.create(req.body)
    return res.status(StatusCode.CREATED).json({
      status: 'Success',
      code: StatusCode.CREATED,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatarURL: newUser.avatarURL
      }
    })
  } catch (error) {
    next(error)
  }
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await Users.findByEmail(email)

    const isValidPassword = await user.isValidPassword(password)
    if (!user || !isValidPassword) {
      return res.status(StatusCode.UN_AUTHORIZED).json({
        status: 'Error',
        code: StatusCode.UN_AUTHORIZED,
        message: 'Email or password is wrong',
      })
    }
    const id = user.id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5h' })
    await Users.updateToken(id, token)
    return res.status(StatusCode.OK).json({
      status: 'Success',
      code: StatusCode.OK,
      data: { token },
    })
  } catch (error) {
    return res.status(StatusCode.UN_AUTHORIZED).json({
      status: 'Error',
      code: StatusCode.UN_AUTHORIZED,
      message: 'Invalid credentials'
    })
  }
}

const logout = async (req, res) => {
  const id = req.user._id
  await Users.updateToken(id, null)
  return res.status(StatusCode.NO_CONTENT).json({})
}

const uploadAvatar = async (req, res) => {
  try {
  const id = String(req.user._id)
  const file = req.file
  const AVATAR_USERS = process.env.AVATAR_USERS
  const dest = path.join(AVATAR_USERS, id)
  await mkdirp(dest)
  const uploadService = new UploadService(dest)
    const avatarURL = await uploadService.save(file, id)
    await Users.updateAvatar(id, avatarURL)

    return res.status(StatusCode.OK).json({
      status: 'success',
      code: StatusCode.OK,
      date: {
        avatarURL
      }
    })
  } catch (error) {
    return res.status(StatusCode.UN_AUTHORIZED).json({
      status: 'Error',
      code: StatusCode.UN_AUTHORIZED,
      message: 'Invalid credentials'
    })
  }}




  const current = async (req, res, next) => {
    try {
      const { id, name, email, subscription } = req.user;
      return res.status(StatusCode.OK).json({
        status: 'Success',
        code: StatusCode.OK,
        data: {
          id,
          name,
          email,
          subscription,
        },
      });
    } catch (error) {
      next(error);
    };
  }

  module.exports = { signup, login, logout, uploadAvatar, current }
