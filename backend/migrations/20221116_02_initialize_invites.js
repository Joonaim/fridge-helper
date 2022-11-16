const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('invites', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      expires: {
        type: DataTypes.DATE,
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
    await queryInterface.dropTable('invites')
  }
}
