const User = require('../model/user')

const findById = async (id) => {
  return await User.findById({ _id: id })
}

const findByEmail = async (email) => {
  return await User.findOne({ email })
}

const create = async (options) => {
  const user = new User(options)
  return await user.save()
}
const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}
const updateTokenVerify = async (id, verify, verifyTokenEmail) => {
  return await User.updateOne({ _id: id }, { verify, verifyTokenEmail })
}
const findUserByVerifyToken = async (verifyTokenEmail) => {
  return await User.findOne({ verifyTokenEmail })
}
const updateAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL })
}
module.exports = { findById, findByEmail, create, updateToken, updateAvatar, updateTokenVerify, findUserByVerifyToken }
