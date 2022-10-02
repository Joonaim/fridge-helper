const express = require('express')
const app = express()

const middleware = require('./utils/middleware')
const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')
const logger = require('./utils/logger')
const fridgeRouter = require('./controllers/fridges')
const productRouter = require('./controllers/products')
const userRouter = require('./controllers/users')
const userFridgeRouter = require('./controllers/userfridges')

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/fridges', fridgeRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/userfridges', userFridgeRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
}

start()

