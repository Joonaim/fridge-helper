const seedUsers = [
  { username: 'alice@gmail.com', password: 'topsecret' },
  { username: 'bob@gmail.com', password: 'topsecret' }
]

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('users', seedUsers)
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}

