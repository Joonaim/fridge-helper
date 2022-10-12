const router = require('express').Router()

const {
  validateAddUserForm,
  validateSignInForm
} = require('../utils/validation')
const { login, checkLogin, register, logout } = require('../controllers/auth')

router.route('/login').get(checkLogin).post(validateSignInForm, login)

router.post('/register', validateAddUserForm, register)

router.route('/logout').delete(logout)

module.exports = router
