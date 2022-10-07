const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Fridge extends Model {}

Fridge.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'fridge'
  }
)

module.exports = Fridge

