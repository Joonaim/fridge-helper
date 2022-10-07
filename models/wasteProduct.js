const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class WasteProduct extends Model {}

WasteProduct.init(
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
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
    modelName: 'wasteProduct'
  }
)

module.exports = WasteProduct
