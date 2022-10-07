const router = require('express').Router()

const { UserFridge } = require('../models')

router.post('/', async (req, res) => {
  const userFridge = await UserFridge.create(req.body)
  res.json(userFridge)
})

module.exports = router

