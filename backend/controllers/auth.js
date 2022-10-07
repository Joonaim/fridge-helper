const bcrypt = require('bcrypt')
const { User } = require('../models')

const login = async (req, res) => {

  const email = req.body.email
  const password = req.body.password

  const userInfo = await User.findOne({ where: { username: email } })
    .catch(err => {
      console.log('Error while logging in: ' + err)
    }).then(async query => {
      if (query) {
        return query
      } else {
        return null
      }
    })

  if (userInfo) {

    const isCorrectPassword = await bcrypt.compare(password, userInfo.password)

    if (isCorrectPassword) {
      req.session.user = {
        id: userInfo.id,
        email: userInfo.username,
      }
      res.json({ authenticated: true, email: email })
    } else {
      res.json({ authenticated: false, status: 'Wrong email or password!' })
    }

  } else {
    res.json({ authenticated: false, status: 'Wrong email or password!' })
  }

}

const checkLogin = async (req, res) => {

  if (req.session && req.session.user && req.session.user.email) {
    res.json({ authenticated: true, email: req.session.user.email })
  } else {
    res.json({ authenticated: false })
  }

}

const register = async (req, res) => {

  const email = req.body.email
  const password = req.body.password
  const hash = await bcrypt.hash(password, 10)

  await User.findOrCreate({ where: { username: email }, defaults: { password: hash } })
    .catch(err => {
      console.log('Error while registering a user: ' + err)
      res.json({ authenticated: false, status: 'Error while registering..' }).send()
    }).then(query => {
      const user = query[0]
      const created = query[1]

      if (created) {
        console.log(JSON.stringify(user))
        req.session.user = {
          id: user.id,
          email: user.username,
        }
        res.json({ authenticated: true, email: user.username }).send()
      } else {
        res.json({ authenticated: false, status: 'The email is already reserved.' }).send()
      }
    })

}

const logout = async (req, res) => {

  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        console.log('Error while trying to logout: ' + err)
        res.status(409)
      } else {
        res.clearCookie('sid').json({ authenticated: false })
      }
    })
  } else {
    res.status(400)
  }

}

module.exports = { login, checkLogin, register, logout }