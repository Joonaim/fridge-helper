const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class BaseListProduct extends Model {}

BaseListProduct.init(
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
    modelName: 'baseListProduct'
  }
)

module.exports = BaseListProduct

