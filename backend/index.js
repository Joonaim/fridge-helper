const express = require('express')
const cors = require('cors')
require('express-async-errors')
const app = express()
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)

const middleware = require('./utils/middleware')
const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')
const logger = require('./utils/logger')
const fridgeRouter = require('./controllers/fridges')
const productRouter = require('./controllers/products')
const userRouter = require('./controllers/users')
const userFridgeRouter = require('./controllers/userfridges')
const userFoodWasteRouter = require('./controllers/foodwaste')
const authRouter = require('./routers/auth_router')
const sequelize = require('sequelize')

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
)
app.use(express.json())
app.use(
  session({
    store: new pgSession({
      pool: sequelize.pool,
      tableName: 'user_sessions',
      createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    credentials: true,
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: 'auto', // !! SHOULD BE 'true' IN PRODUCTION
      httpOnly: true,
      expries: 1000 * 60 * 60 * 24 * 7, // 1000 ms * 60 * 60 * 24 * 7 = 1 week
      sameSite: 'lax' // !! SHOULD BE 'none' IN PRODUCTION
    }
  })
)
app.use(middleware.requestLogger)
app.use(express.static('build'))

app.use('/auth', authRouter)

app.use(middleware.sessionValidator)
app.use('/api/fridges', fridgeRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/userfridges', userFridgeRouter)
app.use('/api/foodwaste', userFoodWasteRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
}

start()
