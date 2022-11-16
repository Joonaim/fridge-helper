const Product = require('./product')
const Fridge = require('./fridge')
const User = require('./user')
const UserFridge = require('./userFridge')
const WasteProduct = require('./wasteProduct')
const Invite = require('./invite')

Fridge.hasMany(Product, { onDelete: 'CASCADE', hooks: true })
Product.belongsTo(Fridge)

Fridge.hasMany(WasteProduct, { onDelete: 'CASCADE', hooks: true })
WasteProduct.belongsTo(Fridge)

User.belongsToMany(Fridge, { through: UserFridge, as: 'userFridges' })
Fridge.belongsToMany(User, { through: UserFridge, as: 'fridgeUsers' })

Fridge.hasMany(Invite, { onDelete: 'CASCADE', hooks: true })
Invite.belongsTo(Fridge)

module.exports = {
  Product,
  Fridge,
  User,
  UserFridge,
  WasteProduct,
  Invite
}
