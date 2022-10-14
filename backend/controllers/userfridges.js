const router = require('express').Router()

const { UserFridge } = require('../models')

router.post('/', async (req, res) => {
  if (req.session && req.session.user) {
    const userFridge = await UserFridge.create(req.body)
    res.json(userFridge)
  } else {
    res.status(401).send()
  }
})

module.exports = router
