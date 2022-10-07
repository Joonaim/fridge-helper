const Product = require('./product')
const Fridge = require('./fridge')
const User = require('./user')
const UserFridge = require('./userFridge')
const WasteProduct = require('./wasteProduct')

Fridge.hasMany(Product)
Product.belongsTo(Fridge)

Fridge.hasMany(WasteProduct)
WasteProduct.belongsTo(Fridge)

User.belongsToMany(Fridge, { through: UserFridge, as: 'userFridges' })
Fridge.belongsToMany(User, { through: UserFridge, as: 'fridgeUsers' })

module.exports = {
  Product,
  Fridge,
  User,
  UserFridge,
  WasteProduct
}

