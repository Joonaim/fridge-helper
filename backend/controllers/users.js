const router = require('express').Router()

const { User, Fridge, Product } = require('../models')

//same as below but for getting all, not used atm
router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Fridge,
        include: [
          {
            model: Product,
            attributes: { exclude: ['fridgeId'] }
          }
        ],
        as: 'userFridges',
        attributes: { exclude: ['userId'] },
        through: { attributes: ['admin'] }
      }
    ],
    attributes: { exclude: ['username', 'password'] }
  })
  res.json(users)
})

//main method for getting data
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.session.user.id, {
    include: [
      {
        model: Fridge,
        include: [
          {
            model: Product,
            attributes: { exclude: ['fridgeId'] }
          }
        ],
        as: 'userFridges',
        attributes: { exclude: ['userId'] },
        through: { attributes: ['admin'] }
      }
    ],
    attributes: { exclude: ['username', 'password'] }
  })
  res.json(user)
})

module.exports = router
