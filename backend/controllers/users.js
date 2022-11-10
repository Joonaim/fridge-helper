const router = require('express').Router()
const bcrypt = require('bcrypt')

const { User, Fridge, Product } = require('../models')

const userFindById = async (req, res, next) => {
  req.user = await User.findByPk(req.params.id)
  if (!req.user) return res.status(401).json({ error: 'user not found' })
  next()
}

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

router.put('/edit/:id', userFindById, async (req, res) => {
  req.user.username = req.body.username

  if (req.body.password) {
    const hash = await bcrypt.hash(req.body.password, 10)
    req.user.password = hash
  }
  await req.user.save()
  res.status(202).json('User updated successfully')
})

module.exports = router
