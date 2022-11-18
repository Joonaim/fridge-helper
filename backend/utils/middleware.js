/* eslint-disable no-unused-vars */
const logger = require('./logger')

const { Op } = require('sequelize')
const { UserFridge, BaseList } = require('../models')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

//should be improved probably
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'TypeError') {
    return response.status(400).json({ error: error.message })
  }
  logger.error(error.message)
  next(error)
}

const sessionValidator = async (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).send({ error: 'invalid session' })
  }
  next()
}

const checkUserBelongsToFridgeHelper = async (fridgeId, userId) => {

  return await UserFridge.findOne({
    where: {
      [Op.and]: [{ fridgeId: fridgeId }, { userId: userId }]
    }
  }).catch((err) => {
    console.log('Failed to find fridge that has the user ...')
    return
  }).then((result) => {
    return result
  })

}

const checkUserBelongsToFridge = async (req, res, next) => {

  let user = null

  if(req.body.fridgeId) {
    user = await checkUserBelongsToFridgeHelper(req.body.fridgeId, req.session.user.id)
  } else if (req.params.id) {
    user = await checkUserBelongsToFridgeHelper(req.params.id, req.session.user.id)
  }

  if (!user) {
    return res.status(401).json({ error: 'Operation not permitted' }).send()
  } else {
    next()
  }

}

const checkFridgeHasBaseListHelper = async (fridgeId, baseListId) => {

  return await BaseList.findOne({
    where: {
      [Op.and]: [{ id: baseListId }, { fridgeId: fridgeId }]
    }
  }).catch((err) => {
    console.log('Failed to find fridge that has base list ...')
    return
  }).then((result) => {
    return result
  })

}

const checkFridgeHasBaseList = async (req, res, next) => {

  let baselist = null

  if(req.body.fridgeId && req.body.baseListId) {
    baselist = await checkFridgeHasBaseListHelper(req.body.fridgeId, req.body.baseListId)
  } else if (req.params.id && req.body.baseListId) {
    baselist = await checkFridgeHasBaseListHelper(req.params.id, req.body.baseListId)
  }

  if (!baselist) {
    return res.status(401).json({ error: 'Operation not permitted' }).send()
  } else {
    next()
  }

}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  sessionValidator,
  checkUserBelongsToFridge,
  checkFridgeHasBaseList
}
