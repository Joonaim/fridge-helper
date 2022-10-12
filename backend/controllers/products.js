const router = require('express').Router()

const { Product } = require('../models')

router.post('/', async (req, res) => {
  if (req.session && req.session.user) {
    const product = await Product.create({ ...req.body })
    res.json(product)
  } else {
    res.status(401).send()
  }
})

module.exports = router
