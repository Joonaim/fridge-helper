const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('waste_products', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
      },
      fridge_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'fridges', key: 'id' }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('waste_products')
  }
}
