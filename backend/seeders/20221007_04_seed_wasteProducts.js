const seedWasteProducts = [
  { name: 'Oatmilk', fridge_id: 2, amount: 3, date: '2022-01-15' }, // 1
  { name: 'Cottage Cheese', fridge_id: 3, amount: 1, date: '2022-01-15' },
  { name: 'Apple Juice', fridge_id: 2, amount: 6, date: '2022-01-15' },
  { name: 'Chicken', fridge_id: 1, amount: 1, date: '2022-01-15' },
  { name: 'Eggs', fridge_id: 3, amount: 1, date: '2022-01-15' },
  { name: 'Cabbage', fridge_id: 1, amount: 4, date: '2022-01-15' },
  { name: 'Grapes', fridge_id: 2, amount: 1, date: '2022-01-15' },
  { name: 'Blueberries', fridge_id: 3, amount: 1, date: '2022-01-15' },
  { name: 'Yogurt', fridge_id: 1, amount: 12, date: '2022-01-15' },
  { name: 'Bacon', fridge_id: 3, amount: 1, date: '2022-01-15' },
  { name: 'Bell pepper', fridge_id: 1, amount: 4, date: '2022-01-15' },
  { name: 'Cucumber', fridge_id: 1, amount: 1, date: '2022-01-15' },
  { name: 'Carrot', fridge_id: 2, amount: 3, date: '2022-01-15' },
  { name: 'Tomato', fridge_id: 2, amount: 4, date: '2022-01-15' },
  { name: 'Lime', fridge_id: 2, amount: 2, date: '2022-01-15' },
  { name: 'Lemon', fridge_id: 2, amount: 4, date: '2022-01-15' },
  { name: 'Tofu', fridge_id: 3, amount: 2, date: '2022-01-15' },
  { name: 'Avocado', fridge_id: 3, amount: 1, date: '2022-01-15' },
  { name: 'Spinach', fridge_id: 3, amount: 3, date: '2022-01-15' },
  { name: 'Pork', fridge_id: 3, amount: 2, date: '2022-01-15' },
  { name: 'Orange Juice', fridge_id: 3, amount: 5, date: '2022-01-15' },
  { name: 'Chicken', fridge_id: 1, amount: 4, date: '2022-02-15' }, // 2
  { name: 'Cabbage', fridge_id: 2, amount: 2, date: '2022-02-15' },
  { name: 'Grapes', fridge_id: 3, amount: 5, date: '2022-02-15' },
  { name: 'Yogurt', fridge_id: 1, amount: 12, date: '2022-02-15' },
  { name: 'Chicken', fridge_id: 1, amount: 2, date: '2022-03-15' }, // 3
  { name: 'Butter', fridge_id: 1, amount: 2, date: '2022-03-15' },
  { name: 'Cabbage', fridge_id: 1, amount: 4, date: '2022-03-15' },
  { name: 'Grapes', fridge_id: 3, amount: 5, date: '2022-03-15' },
  { name: 'Yogurt', fridge_id: 1, amount: 11, date: '2022-03-15' },
  { name: 'Chicken', fridge_id: 1, amount: 5, date: '2022-04-15' }, // 4
  { name: 'Eggs', fridge_id: 2, amount: 5, date: '2022-04-15' },
  { name: 'Yogurt', fridge_id: 1, amount: 9, date: '2022-04-15' },
  { name: 'Chicken', fridge_id: 1, amount: 5, date: '2022-05-15' }, // 5
  { name: 'Cabbage', fridge_id: 1, amount: 3, date: '2022-05-15' },
  { name: 'Grapes', fridge_id: 3, amount: 2, date: '2022-05-15' },
  { name: 'Yogurt', fridge_id: 1, amount: 11, date: '2022-05-15' },
  { name: 'Pork', fridge_id: 2, amount: 2, date: '2022-06-15' }, // 6
  { name: 'Chicken', fridge_id: 1, amount: 5, date: '2022-06-15' },
  { name: 'Orange Juice', fridge_id: 1, amount: 2, date: '2022-06-15' },
  { name: 'Bell pepper', fridge_id: 2, amount: 4, date: '2022-06-15' },
  { name: 'Bell pepper', fridge_id: 3, amount: 4, date: '2022-06-15' },
  { name: 'Eggs', fridge_id: 1, amount: 4, date: '2022-07-15' }, // 7
  { name: 'Tomato', fridge_id: 1, amount: 1, date: '2022-07-15' },
  { name: 'Bell pepper', fridge_id: 3, amount: 4, date: '2022-07-15' },
  { name: 'Lime', fridge_id: 2, amount: 5, date: '2022-07-15' },
  { name: 'Chicken', fridge_id: 1, amount: 5, date: '2022-07-15' },
  { name: 'Yogurt', fridge_id: 1, amount: 8, date: '2022-07-15' },
  { name: 'Blueberries', fridge_id: 1, amount: 1, date: '2022-08-15' }, // 8
  { name: 'Yogurt', fridge_id: 1, amount: 12, date: '2022-08-15' },
  { name: 'Chicken', fridge_id: 1, amount: 5, date: '2022-08-15' },
  { name: 'Eggs', fridge_id: 1, amount: 1, date: '2022-09-15' }, // 9
  { name: 'Blueberries', fridge_id: 1, amount: 1, date: '2022-09-15' },
  { name: 'Yogurt', fridge_id: 1, amount: 13, date: '2022-09-15' },
  { name: 'Chicken', fridge_id: 1, amount: 5, date: '2022-09-15' },
  { name: 'Cabbage', fridge_id: 1, amount: 1, date: '2022-09-15' },
  { name: 'Grapes', fridge_id: 1, amount: 1, date: '2022-09-15' },
  { name: 'Apple', fridge_id: 2, amount: 4, date: '2022-09-15' },
  { name: 'Grapes', fridge_id: 2, amount: 2, date: '2022-09-15' },
  { name: 'Lemon', fridge_id: 2, amount: 4, date: '2022-09-15' },
  { name: 'Blueberries', fridge_id: 3, amount: 2, date: '2022-09-15' },
  { name: 'Avocado', fridge_id: 3, amount: 1, date: '2022-09-15' },
  { name: 'Eggs', fridge_id: 3, amount: 3, date: '2022-09-15' },
  { name: 'Blueberries', fridge_id: 1, amount: 1, date: '2022-10-15' }, // 10
  { name: 'Yogurt', fridge_id: 1, amount: 15, date: '2022-10-15' },
  { name: 'Chicken', fridge_id: 1, amount: 5, date: '2022-10-15' },
  { name: 'Cabbage', fridge_id: 1, amount: 1, date: '2022-10-15' },
  { name: 'Carrot', fridge_id: 2, amount: 3, date: '2022-10-15' },
  { name: 'Tomato', fridge_id: 2, amount: 4, date: '2022-10-15' },
  { name: 'Lime', fridge_id: 2, amount: 2, date: '2022-10-15' },
  { name: 'Lemon', fridge_id: 2, amount: 4, date: '2022-10-15' },
  { name: 'Tofu', fridge_id: 3, amount: 2, date: '2022-10-15' },
  { name: 'Avocado', fridge_id: 3, amount: 1, date: '2022-10-15' },
  { name: 'Spinach', fridge_id: 3, amount: 3, date: '2022-10-15' },
  { name: 'Grapes', fridge_id: 1, amount: 1, date: '2022-10-15' },
  { name: 'Eggs', fridge_id: 1, amount: 1, date: '2022-11-15' }, // 11
  { name: 'Chicken', fridge_id: 1, amount: 5, date: '2022-11-15' },
  { name: 'Tomato', fridge_id: 1, amount: 1, date: '2022-11-15' },
  { name: 'Lime', fridge_id: 1, amount: 1, date: '2022-11-15' },
  { name: 'Grapes', fridge_id: 3, amount: 5, date: '2022-11-15' },
  { name: 'Yogurt', fridge_id: 2, amount: 12, date: '2022-11-15' },
  { name: 'Chicken', fridge_id: 2, amount: 2, date: '2022-11-15' }, // 3
  { name: 'Butter', fridge_id: 3, amount: 2, date: '2022-11-15' },
]

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('waste_products', seedWasteProducts)
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('waste_products', null, {})
  }
}
