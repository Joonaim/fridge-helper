/* eslint-disable no-unused-vars */
const router = require('express').Router()
const { Op } = require('sequelize')
const sequelize = require('sequelize')

const { WasteProduct, UserFridge } = require('../models')

const checkUserBelongsToFridge = async (req, res, next) => {
  const user = await UserFridge.findOne({
    where: {
      [Op.and]: [{ fridgeId: req.params.id }, { userId: req.session.user.id }]
    }
  })

  if (!user) {
    return res.status(401).json({ error: 'Operation not permitted' }).send()
  } else {
    next()
  }
}

router.get('/:year/:id', checkUserBelongsToFridge, async (req, res) => {
  if (req.params.id && req.params.year) {
    const wastePerMonth = await WasteProduct.findAll({
      attributes: [
        [sequelize.fn('date_trunc', 'month', sequelize.col('date')), 'month'],
        [sequelize.fn('sum', sequelize.col('amount')), 'total_amount']
      ],
      where: {
        [Op.and]: [
          { fridge_id: { [Op.eq]: req.params.id } },
          sequelize.where(
            sequelize.literal('extract(YEAR FROM "wasteProduct"."date")'),
            req.params.year
          )
        ]
      },
      group: [
        sequelize.fn('date_trunc', 'month', sequelize.col('date')),
        'month'
      ]
    })
      .catch((err) => {
        //console.log(err)
        return
      })
      .then((result) => {
        return result
      })

    const fridgeWaste = await WasteProduct.findAll({
      raw: true,
      attributes: [
        [sequelize.fn('sum', sequelize.col('amount')), 'total_amount']
      ],
      where: {
        [Op.and]: [
          { fridge_id: { [Op.eq]: req.params.id } },
          sequelize.where(
            sequelize.literal('extract(YEAR FROM "wasteProduct"."date")'),
            req.params.year
          )
        ]
      }
    })
      .catch((err) => {
        //console.log(err)
        return
      })
      .then((result) => {
        return result
      })

    const othersWaste = await WasteProduct.findAll({
      raw: true,
      attributes: [
        [sequelize.fn('sum', sequelize.col('amount')), 'total_amount']
      ],
      where: {
        [Op.and]: [
          { fridge_id: { [Op.ne]: req.params.id } },
          sequelize.where(
            sequelize.literal('extract(YEAR FROM "wasteProduct"."date")'),
            req.params.year
          )
        ]
      }
    })
      .catch((err) => {
        //console.log(err)
        return
      })
      .then((result) => {
        return result
      })

    const numberOfOtherFridges = await WasteProduct.count({
      where: {
        fridge_id: { [Op.ne]: req.params.id }
      },
      distinct: true,
      col: 'fridge_id'
    })
      .catch((err) => {
        //console.log(err)
        return
      })
      .then((result) => {
        return result
      })

    const mostOftenExpiring = await WasteProduct.findAll({
      raw: true,
      attributes: [
        'name',
        [sequelize.fn('sum', sequelize.col('amount')), 'total_amount']
      ],
      where: {
        [Op.and]: [
          { fridge_id: { [Op.eq]: req.params.id } },
          sequelize.where(
            sequelize.literal('extract(YEAR FROM "wasteProduct"."date")'),
            req.params.year
          )
        ]
      },
      group: ['name'],
      order: [[sequelize.fn('sum', sequelize.col('amount')), 'DESC']]
    })
      .catch((err) => {
        //console.log(err)
        return
      })
      .then((result) => {
        return result
      })

    if (
      wastePerMonth &&
      fridgeWaste &&
      othersWaste &&
      numberOfOtherFridges &&
      mostOftenExpiring
    ) {
      const fridgeWasteTot = fridgeWaste[0].total_amount
      const othersWasteTot = othersWaste[0].total_amount / numberOfOtherFridges
      const fourMostOftenExpiring = mostOftenExpiring.slice(0, 4)

      if (fridgeWasteTot > othersWasteTot) {
        const percent = parseInt(
          ((fridgeWasteTot - othersWasteTot) / othersWasteTot) * 100
        )
        res.status(200).json({
          wastePerMonth: wastePerMonth,
          moreThanOthers: true,
          MTOPercent: percent,
          mostOftenExpiring: fourMostOftenExpiring
        })
      } else {
        const percent = parseInt(
          ((othersWasteTot - fridgeWasteTot) / othersWasteTot) * 100
        )
        res.status(200).json({
          wastePerMonth: wastePerMonth,
          moreThanOthers: false,
          MTOPercent: percent,
          mostOftenExpiring: fourMostOftenExpiring
        })
      }
    } else {
      res.status(400).json({ error: 'Bad request' }).send()
    }
  } else {
    res.status(400).json({ error: 'Bad request' }).send()
  }
})

module.exports = router
