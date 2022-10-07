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

router.post('/', async (req, res) => {
  const fridge = await Fridge.create({ ...req.body })
  await UserFridge.create({
    fridgeId: fridge.id,
    userId: 1, //hardcoded id
    admin: true
  })
  res.json(fridge)
})

module.exports = router

