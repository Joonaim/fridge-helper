const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Invite extends Model {}

Invite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'invite'
  }
)

module.exports = Invite

