const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class ListProduct extends Model {}

ListProduct.init(
  {
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
      allowNull: false,
      defaultValue: 1
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'shoppingListProducts'
  }
)

module.exports = ListProduct

