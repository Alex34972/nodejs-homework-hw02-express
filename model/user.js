const { Schema, model } = require('mongoose')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { SALT_FACTOR } = require('../config/constants')

const userSchema = new Schema(
  {

    email: {
      type: String,
      require: ['true', 'Email is required'],
      unique: true,
      validate(value) {
        const reg = /\S+@\S+\.\S+/
        return reg.test(String(value).toLowerCase())
      }
    },
    password: {
      type: String,
      require: ['true', 'Password is required'],
    },
    name: {
      type: String,
      default: 'Guest'
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter'
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function() {
        return gravatar.url(this.email, { s: '250' }, true)
      },
    },
     verify: {
        type: Boolean,
        default: false,
      },
    verifyTokenEmail: {
        type: String,
        required: [true, 'Verify token is required'],
        default: crypto.randomUUID()
      },
    
  },
  {
    versionKey: false,
    timestamps: true,
  },
)
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_FACTOR)
    this.password = await bcrypt.hash(this.password, salt)
  };
  next()
})
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}
const User = model('user', userSchema)

module.exports = User
