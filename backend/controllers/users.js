const router = require('express').Router()

const { User, Fridge } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Fridge,
      as: 'userFridges',
      attributes: { exclude: ['userId'] },
      through: { attributes: ['admin'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

module.exports = router

