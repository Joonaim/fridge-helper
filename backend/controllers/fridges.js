const router = require('express').Router()
const { Op } = require('sequelize')

const { Fridge, UserFridge } = require('../models')

router.post('/', async (req, res) => {
  const fridge = await Fridge.create({ ...req.body })
  await UserFridge.create({
    fridgeId: fridge.id,
    userId: req.session.user.id,
    admin: true
  })
  res.json(fridge)
})

const fridgeFindById = async (req, res, next) => {
  req.fridge = await Fridge.findByPk(req.params.id)
  if (!req.fridge) return res.status(401).json({ error: 'fridge not found' })
  next()
}

router.delete('/:id', fridgeFindById, async (req, res) => {
  const fridgeId = req.params.id

  const user = await UserFridge.findOne({
    where: {
      [Op.and]: [{ fridgeId: fridgeId }, { userId: req.session.user.id }]
    }
  })
  if (user.admin) {
    await UserFridge.destroy({
      where: { fridgeId: fridgeId }
    })
    await req.fridge.destroy()
  } else {
    return res.status(401).json({ error: 'operation not permitted' })
  }
})

module.exports = router
