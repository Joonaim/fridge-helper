const seedWasteProducts = [
  { name: 'Oatmilk', fridge_id: 1, amount: 3 },
  { name: 'Cottage Cheese', fridge_id: 1, amount: 1 },
  { name: 'Pork', fridge_id: 2, amount: 2 },
  { name: 'Orange Juice', fridge_id: 3, amount: 5 }
]

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('waste_products', seedWasteProducts)
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('waste_products', null, {})
  }
}

