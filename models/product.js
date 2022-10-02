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
      type: DataTypes.STRING,
      allowNull: false
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    expiryDate: {
      type: DataTypes.DATE
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
    timestamps: false,
    modelName: 'product'
  }
)

module.exports = Product

