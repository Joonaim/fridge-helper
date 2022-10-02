const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now()
    },
    expiryDate: {
      type: DataTypes.DATE
    },
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'product'
  }
)

module.exports = Product

