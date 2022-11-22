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

router.delete('/', checkUserPermission, async (req, res) => {

  if (req.body.fridgeId && req.body.itemIds?.length > 0) {

    await Product.destroy({ where: {
      [Op.and]: [
        { id: req.body.itemIds },
        { fridgeId: req.body.fridgeId }
      ]
    } })
      .catch((err) => {
        console.log(err)
        return
      }).then((result) => {
        if (result) {
          res.status(204).end()
        } else {
          console.log('=???==')
          console.log(result)
          res.status(400).json({ error: 'Bad request' }).send()
        }
      })

  } else {
    console.log('=???')
    res.status(400).json({ error: 'Bad request' }).send()
  }

})

router.put('/:id', checkUserPermission, productFindById, async (req, res) => {
  req.product.name = req.body.name
  req.product.purchaseDate = req.body.purchaseDate
  req.product.expiryDate = req.body.expiryDate
  await req.product.save()
  res.status(202).json(req.product)
})

module.exports = router
