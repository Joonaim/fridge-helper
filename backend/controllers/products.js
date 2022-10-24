const router = require('express').Router()
const { Op } = require('sequelize')

const { Product, UserFridge } = require('../models')

const productFindById = async (req, res, next) => {
  req.product = await Product.findByPk(req.params.id)
  if (!req.product) return res.status(401).json({ error: 'product not found' })
  next()
}

const checkUserPermission = async (req, res, next) => {
  const user = await UserFridge.findOne({
    where: {
      [Op.and]: [
        { fridgeId: req.body.fridgeId },
        { userId: req.session.user.id }
      ]
    }
  })
  if (!user) {
    return res.status(401).json({ error: 'operation not permitted' })
  }
  next()
}

router.post('/', checkUserPermission, async (req, res) => {
  const product = await Product.create(req.body)
  res.json(product)
})

router.delete(
  '/:id',
  checkUserPermission,
  productFindById,
  async (req, res) => {
    await req.product.destroy()
    res.status(204).end()
  }
)

module.exports = router
