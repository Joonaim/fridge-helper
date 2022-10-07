const router = require('express').Router()

const { Product } = require('../models')

router.post('/', async (req, res) => {
  const product = await Product.create({ ...req.body, fridgeId: 1 }) //hardcoded id
  res.json(product)
})

module.exports = router

