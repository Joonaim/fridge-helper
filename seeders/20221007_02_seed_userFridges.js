const seedUserFridges = [
  { user_id: 1, fridge_id: 1, admin: true },
  { user_id: 1, fridge_id: 2, admin: true },
  { user_id: 1, fridge_id: 3, admin: true },
  { user_id: 2, fridge_id: 1, admin: false },
  { user_id: 2, fridge_id: 2, admin: false }
]

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('user_fridges', seedUserFridges)
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('user_fridges', null, {})
  }
}

