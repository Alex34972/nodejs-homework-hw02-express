const express = require('express')
const router = express.Router()
const { validateCreateUser, validateLogin } = require('../../validation/validationUsers')
const { signup, login, logout, uploadAvatar, current, verifyUser, repitForVerifyUser } = require('../../controllers/users')
const guard = require('../../helpers/guard')
const loginLimiter = require('../../helpers/rateLimitLogin')
const upload = require('../../helpers/uploads')

router.post('/registration', validateCreateUser, signup)
router.post('/login', validateLogin, loginLimiter, login)
router.post('/logout', guard, logout)
router.get('/current', guard, current)
router.patch('/avatar', guard, upload.single('avatarURL'), uploadAvatar)

router.get('/verify/:token', verifyUser)
router.post('/verify',repitForVerifyUser)

module.exports = router
