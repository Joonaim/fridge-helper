const seedFridges = [
  { name: 'Dev Fridge 1' },
  { name: 'Dev Fridge 2' },
  { name: 'Dev Fridge 3' },
  { name: 'Dev Fridge 4' }
]

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('fridges', seedFridges)
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('fridges', null, {})
  }
}

