/* eslint-disable no-unused-vars */
const router = require('express').Router()
const { Op } = require('sequelize')
const sequelize = require('sequelize')

const { BaseList, BaseListProduct, UserFridge, Fridge, User, Product } = require('../models')
const middleware = require('../utils/middleware')

router.post('/products/', middleware.checkUserBelongsToFridge, middleware.checkFridgeHasBaseList, async (req, res) => {

  if (req.body.baseListId && req.body.name && req.body.name !== '' && req.body.amount && req.body.amount > 0) {

    const newBaseListProduct = await BaseListProduct.create({ name: req.body.name, amount: req.body.amount, baseListId: req.body.baseListId })
      .catch((err) => {
        console.log(err)
        return
      })
      .then((result) => {
        return result
      })

    if (newBaseListProduct) {
      console.log(JSON.stringify(newBaseListProduct))
      res.status(201).json(newBaseListProduct).send()
    } else {
      res.status(400).json({ error: 'Bad request' }).send()
    }

  } else {
    res.status(400).json({ error: 'Bad request' }).send()
  }

})

router.delete('/products/', middleware.checkUserBelongsToFridge, middleware.checkFridgeHasBaseList, async (req, res) => {

  if (req.body.baseListId && req.body.itemIds?.length > 0) {

    BaseListProduct.destroy({ where: {
      [Op.and]: [
        { id: req.body.itemIds },
        { baseListId: req.body.baseListId }
      ]
    } })
      .catch((err) => {
        console.log(err)
        return
      }).then((result) => {
        if (result) {
          res.status(200).json({ result: result, deleted: true }).send()
        } else {
          res.status(400).json({ error: 'Bad request' }).send()
        }
      })

  } else {
    res.status(400).json({ error: 'Bad request' }).send()
  }

})

router.put('/products/', middleware.checkUserBelongsToFridge, middleware.checkFridgeHasBaseList, async (req, res) => {

  if (req.body.baseListId && req.body.itemId && req.body.name && req.body.amount) {

    BaseListProduct.update(
      {
        name: req.body.name,
        amount: req.body.amount
      },
      {
        where: {
          [Op.and]: [
            { id: req.body.itemId },
            { baseListId: req.body.baseListId }
          ]
        }
      }
    )
      .catch((err) => {
        console.log(err)
        return
      }).then((result) => {
        if (result) {
          res.status(200).json({ result: result, edited: true }).send()
        } else {
          res.status(400).json({ error: 'Bad request' }).send()
        }
      })

  } else {
    res.status(400).json({ error: 'Bad request' }).send()
  }

})

router.delete('/', middleware.checkUserBelongsToFridge, middleware.checkFridgeHasBaseList, async (req, res) => {

  if (req.body.fridgeId && req.body.baseListId) {

    BaseList.destroy({ where: { id: req.body.baseListId } })
      .catch((err) => {
        console.log(err)
        return
      }).then((result) => {
        if (result) {
          res.status(200).json({ result: result, deleted: true }).send()
        } else {
          res.status(400).json({ error: 'Bad request' }).send()
        }
      })

  }

})

router.post('/:id', middleware.checkUserBelongsToFridge, async (req, res) => {

  if (req.params.id && req.body.name && req.body.name !== '') {

    const newBaseList = await BaseList.create({ name: req.body.name, fridgeId: req.params.id })
      .catch((err) => {
        console.log(err)
        return
      })
      .then((result) => {
        return result
      })

    if (newBaseList) {
      console.log(JSON.stringify(newBaseList))
      res.status(201).json(newBaseList).send()
    } else {
      res.status(400).json({ error: 'Bad request' }).send()
    }

  } else {
    res.status(400).json({ error: 'Bad request' }).send()
  }

})

module.exports = router
