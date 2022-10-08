const bcrypt = require('bcrypt')

//for development&test purposes, get rid of/move to .env later
const password = 'topsecret'

const hash = bcrypt.hashSync(password, 10)

const seedUsers = [
  { username: 'alice@test.com', password: hash },
  { username: 'bob@test.com', password: hash }
]

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('users', seedUsers)
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}
