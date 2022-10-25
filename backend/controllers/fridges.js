const router = require('express').Router()
const { Op } = require('sequelize')

const { Fridge, UserFridge } = require('../models')

router.post('/', async (req, res) => {
  const fridge = await Fridge.create(req.body)
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

const checkAdminPermission = async (req, res, next) => {
  const user = await UserFridge.findOne({
    where: {
      [Op.and]: [{ fridgeId: req.params.id }, { userId: req.session.user.id }]
    }
  })
  if (!user || !user.admin) {
    return res.status(401).json({ error: 'operation not permitted' })
  }
  next()
}

router.delete(
  '/:id',
  checkAdminPermission,
  fridgeFindById,
  async (req, res) => {
    await UserFridge.destroy({
      where: { fridgeId: req.params.id }
    })
    await req.fridge.destroy()
    res.status(204).end()
  }
)

router.put('/:id', checkAdminPermission, fridgeFindById, async (req, res) => {
  req.fridge.name = req.body.name
  await req.fridge.save()
  res.status(202).json(req.fridge)
})

module.exports = router
