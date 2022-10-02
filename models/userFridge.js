const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class UserFridge extends Model {}

UserFridge.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    fridgeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'fridges', key: 'id' }
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'userFridge'
  }
)

module.exports = UserFridge

