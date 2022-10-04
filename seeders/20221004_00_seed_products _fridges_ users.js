const seedUsers = [
  { username: 'alice@gmail.com', password: 'topsecret' },
  { username: 'bob@gmail.com', password: 'topsecret' }
]

const seedFridges = [
  { name: 'Dev Fridge 1' },
  { name: 'Dev Fridge 2' },
  { name: 'Dev Fridge 3' }
]

const seedProducts = [
  { name: 'Milk', fridge_id: 1, amount: 3 },
  { name: 'Cheese', fridge_id: 1, amount: 1 },
  { name: 'Chicken', fridge_id: 2, amount: 2 },
  { name: 'Eggs', fridge_id: 3, amount: 5 }
]

const seedUserFridges = [
  { user_id: 1, fridge_id: 1, admin: true },
  { user_id: 1, fridge_id: 2, admin: true },
  { user_id: 1, fridge_id: 3, admin: true },
  { user_id: 2, fridge_id: 1, admin: false },
  { user_id: 2, fridge_id: 2, admin: false }
]

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('users', seedUsers)
    await queryInterface.bulkInsert('fridges', seedFridges)
    await queryInterface.bulkInsert('products', seedProducts)
    await queryInterface.bulkInsert('user_fridges', seedUserFridges)
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('user_fridges', null, {})
    await queryInterface.bulkDelete('products', null, {})
    await queryInterface.bulkDelete('fridges', null, {})
    await queryInterface.bulkDelete('users', null, {})
  }
}

