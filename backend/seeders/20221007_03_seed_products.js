const seedProducts = [
  { name: 'Milk', fridge_id: 1, amount: 3 },
  { name: 'Cheese', fridge_id: 1, amount: 1 },
  { name: 'Chicken', fridge_id: 2, amount: 2 },
  { name: 'Eggs', fridge_id: 3, amount: 5 }
]

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('products', seedProducts)
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('products', null, {})
  }
}

