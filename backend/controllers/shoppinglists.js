/* eslint-disable no-unused-vars */
const router = require('express').Router()
const { Op } = require('sequelize')
const sequelize = require('sequelize')

const { ListProduct, BaseListProduct, Product } = require('../models')
const middleware = require('../utils/middleware')

router.post('/products/', middleware.checkUserBelongsToFridge, async (req, res) => {

  if (req.body.fridgeId && req.body.name && req.body.name !== '' && req.body.amount && req.body.amount > 0 ) {

    const userId = req.body.personal ? req.session.user.id : null

    const newListProduct = await ListProduct.create({ name: req.body.name, amount: req.body.amount, fridgeId: req.body.fridgeId, userId: userId })
      .catch((err) => {
        console.log(err)
        return
      })
      .then((result) => {
        return result
      })

    if (newListProduct) {
      console.log(JSON.stringify(newListProduct))
      res.status(201).json(newListProduct).send()
    } else {
      res.status(400).json({ error: 'Bad request' }).send()
    }

  } else {
    res.status(400).json({ error: 'Bad request' }).send()
  }

})

router.delete('/products/', middleware.checkUserBelongsToFridge, async (req, res) => {

  if (req.body.fridgeId && req.body.itemIds?.length > 0) {

    const userId = req.body.personal ? req.session.user.id : null

    ListProduct.destroy({ where: {
      [Op.and]: [
        { id: req.body.itemIds },
        { fridgeId: req.body.fridgeId },
        { userId: userId }
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

router.put('/products/', middleware.checkUserBelongsToFridge, async (req, res) => {

  if (req.body.fridgeId && req.body.name && req.body.name !== '' && req.body.amount && req.body.amount > 0 ) {

    const userId = req.body.personal ? req.session.user.id : null

    ListProduct.update(
      {
        name: req.body.name,
        amount: req.body.amount
      },
      {
        where: {
          [Op.and]: [
            { id: req.body.itemId },
            { fridgeId: req.body.fridgeId },
            { userId: userId }
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

router.post('/products/import', middleware.checkUserBelongsToFridge, middleware.checkFridgeHasBaseList, async (req, res) => {

  const baseListProducts = await BaseListProduct.findAll({
    raw: true,
    attributes: ['name', 'amount'],
    where: {
      [Op.and]: [
        { baseListId: req.body.baseListId }
      ]
    }
  }).catch((err) => {
    console.log(err)
    return
  }).then((result) => {
    return result
  })

  if (baseListProducts?.length > 0) {

    console.log('Got lists..')
    console.log(baseListProducts)

    const userId = req.body.personal ? req.session.user.id : null

    const parsedProducts = baseListProducts.map((prod) => ({ ...prod, fridgeId: req.body.fridgeId, userId: userId  }))

    const addedToList = await ListProduct.bulkCreate(parsedProducts)
      .catch((err) => {
        console.log(err)
        return
      }).then((result) => {
        return result
      })

    if (addedToList) {
      res.status(200).json(addedToList).send()
    } else {
      res.status(400).json({ error: 'Bad request' }).send()
    }

  } else {

    console.log('List length 0, Nothing to add..')
    res.status(200).json().send()

  }

})

module.exports = router