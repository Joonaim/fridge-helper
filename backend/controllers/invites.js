const router = require('express').Router()
const { Op, DataTypes } = require('sequelize')

const { User, Fridge, Invite, UserFridge } = require('../models')


router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.session.user.id)
  const invite = await  Invite.findOne({where:{code: req.params.id, expires: {[Op.gt]: new Date()}}})
  if (!invite) return res.status(401).json({ error: 'invite code expired or invalid' })
  const userFridge = await UserFridge.create({userId: user.id, fridgeId: invite.fridgeId, admin: false})
  res.json(userFridge)
})

router.post('/', async (req, res) => {
    const invite = await Invite.create(req.body)
    res.json(invite)
  })

router.delete('/:user/:fridge', async (req, res) => {
    const userId = req.params.user
    const fridgeId = req.params.fridge
    const userFridge = await UserFridge.findOne({where:{userId: userId, fridgeId: fridgeId}})
    if (!userFridge) return res.status(401).json({ error: 'userId or fridgeId invalid' })
    //TODO: Check if req.session.user is admin of the fridgeId before deleting
    await userFridge.destroy()
    res.status(204).end()
  }
)

module.exports = router
