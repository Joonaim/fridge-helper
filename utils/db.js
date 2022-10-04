const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(DATABASE_URL)

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js'
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console
}

var seedConfig = {
  storage: new SequelizeStorage({ sequelize, tableName: 'seeds' }),
  migrations: {
    glob: 'seeders/*.js'
  },
  context: sequelize.getQueryInterface(),
  logger: console
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name)
  })
}

const runSeeds = async () => {
  const seeder = new Umzug(seedConfig)
  const seeds = await seeder.up()
  console.log('Seeds set up', {
    files: seeds.map((seed) => seed.name)
  })
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const seeder = new Umzug(seedConfig)
  await seeder.down()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    await runSeeds()
    console.log('database connected')
  } catch (err) {
    console.log('connecting database failed')
    console.log(err)
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize, rollbackMigration }

