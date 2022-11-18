const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class BaseList extends Model {}

BaseList.init(
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
    timestamps: true,
    modelName: 'baseList'
  }
)

module.exports = BaseList

