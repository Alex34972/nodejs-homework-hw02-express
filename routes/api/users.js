const express = require('express')
const router = express.Router()
const { validateCreateUser, validateLogin } = require('../../validation/validationUsers')
const { signup, login, logout, current } = require('../../controllers/users')
const guard = require('../../helpers/guard')
const loginLimiter = require('../../helpers/rateLimitLogin')

router.post('/registration', validateCreateUser, signup)
router.post('/login', validateLogin, loginLimiter, login)
router.post('/logout', guard, logout)
router.get('/current', guard, current)
module.exports = router
