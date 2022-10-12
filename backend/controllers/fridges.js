const router = require('express').Router()

const { Fridge, Product, UserFridge } = require('../models')

router.get('/', async (req, res) => {
  const fridges = await Fridge.findAll({
    include: {
      model: Product,
      attributes: { exclude: ['fridgeId'] }
    }
  })
  res.json(fridges)
})

router.get('/:id', async (req, res) => {
  const fridge = await Fridge.findByPk(req.params.id, {
    include: {
      model: Product,
      attributes: { exclude: ['fridgeId'] }
    }
  })
  res.json(fridge)
})

router.post('/', async (req, res) => {
  if (req.session && req.session.user) {
    const fridge = await Fridge.create({ ...req.body })
    await UserFridge.create({
      fridgeId: fridge.id,
      userId: req.session.user.id,
      admin: true
    })
    res.json(fridge)
  } else {
    res.status(401).send()
  }
})

module.exports = router
