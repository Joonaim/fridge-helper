const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('base_lists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fridge_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'fridges', key: 'id' }
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    })
    await queryInterface.createTable('base_list_products', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
      },
      base_list_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'base_lists', key: 'id' },
        onDelete: 'cascade'
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('base_lists')
    await queryInterface.dropTable('base_list_products')
  }
}

