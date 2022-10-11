const router = require('express').Router()

const { User, Fridge, Product } = require('../models')

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

//this is used for getting user's Fridges and their contest
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Fridge,
        include: [
          {
            model: Product
          }
        ],
        as: 'userFridges',
        attributes: { exclude: ['userId'] },
        through: { attributes: ['admin'] }
      }
    ]
  })
  res.json(user)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

module.exports = router
