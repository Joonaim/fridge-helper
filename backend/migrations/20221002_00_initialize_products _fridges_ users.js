const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('products', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      purchase_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      expiry_date: {
        type: DataTypes.DATE
      },
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
      }
    })
    await queryInterface.createTable('fridges', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
    await queryInterface.createTable('user_fridges', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      fridge_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'fridges', key: 'id' }
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true
      }
    })
    await queryInterface.addColumn('products', 'fridge_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'fridges', key: 'id' }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('products')
    await queryInterface.dropTable('user_fridges')
    await queryInterface.dropTable('fridges')
    await queryInterface.dropTable('users')
  }
}
