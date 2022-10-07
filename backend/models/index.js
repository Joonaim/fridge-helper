const Product = require('./product')
const Fridge = require('./fridge')
const User = require('./user')
const UserFridge = require('./userFridge')

Fridge.hasMany(Product)
Product.belongsTo(Fridge)

User.belongsToMany(Fridge, { through: UserFridge, as: 'userFridges' })
Fridge.belongsToMany(User, { through: UserFridge, as: 'fridgeUsers' })

module.exports = {
  Product,
  Fridge,
  User,
  UserFridge
}

