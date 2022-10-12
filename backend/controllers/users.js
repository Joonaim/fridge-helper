const router = require('express').Router()

const { User, Fridge, Product } = require('../models')

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

router.get('/:id', async (req, res) => {
  if (req.session && req.session.user) {
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
  } else {
    res.status(401).send()
  }
})

module.exports = router
