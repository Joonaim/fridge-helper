/* eslint-disable no-unused-vars */
const router = require('express').Router()
const { Op } = require('sequelize')
const sequelize = require('sequelize')

const { WasteProduct } = require('../models')
const middleware = require('../utils/middleware')

router.post('/products/' , async (req, res) => {
  console.log(req.body)

  const newWasteProduct = await WasteProduct.bulkCreate(req.body.products)
    .catch((error) => {
      console.log(error)
    })
    .then((result) => {
      return result
    })
  if (newWasteProduct){
    console.log(JSON.stringify(newWasteProduct))
    res.status(201).json(newWasteProduct).send()
  }
  else {
    res.status(400).json({ error: 'Bad request' }).send()
  }

})

router.get('/:year/:id', middleware.checkUserBelongsToFridge, async (req, res) => {
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
      mostOftenExpiring
    ) {
      const fridgeWasteTot = fridgeWaste[0].total_amount
      const othersWasteTot = numberOfOtherFridges > 0 ? othersWaste[0].total_amount / numberOfOtherFridges : 0

      const mostOftenExpiringParsed = mostOftenExpiring.map((item) => ({ ...item, total_amount: (item.total_amount / 12).toFixed(2) }))
      const fourMostOftenExpiring = mostOftenExpiringParsed.slice(0, 4)

      if (fridgeWasteTot > othersWasteTot) {
        const percent = othersWasteTot > 0 ? ((fridgeWasteTot - othersWasteTot) / othersWasteTot) * 100 : 100
        const percentFormatted = parseInt(
          percent
        )
        res.status(200).json({
          wastePerMonth: wastePerMonth,
          moreThanOthers: true,
          MTOPercent: percentFormatted,
          mostOftenExpiring: fourMostOftenExpiring
        })
      } else {
        const percent = othersWasteTot > 0 ? ((othersWasteTot - fridgeWasteTot) / othersWasteTot) * 100 : 100
        const percentFormatted = parseInt(
          percent
        )
        res.status(200).json({
          wastePerMonth: wastePerMonth,
          moreThanOthers: false,
          MTOPercent: percentFormatted,
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
