const router = require('express').Router()

const { Product } = require('../models')

const productFindById = async (req, res, next) => {
  req.product = await Product.findByPk(req.params.id)
  if (!req.product) return res.status(401).json({ error: 'product not found' })
  next()
}

router.post('/', async (req, res) => {
  const product = await Product.create({ ...req.body })
  res.json(product)
})

router.delete('/:id', productFindById, async (req, res) => {
  await req.product.destroy()
  res.status(204).end()
})

module.exports = router
