const Product = require('./product')
const Fridge = require('./fridge')
const User = require('./user')
const UserFridge = require('./userFridge')
const WasteProduct = require('./wasteProduct')
const Invite = require('./invite')

const BaseList = require('./baseList')
const BaseListProduct = require('./baseListProduct')
const ListProduct = require('./listProduct')

Fridge.hasMany(Product, { onDelete: 'CASCADE', hooks: true })
Product.belongsTo(Fridge)

Fridge.hasMany(WasteProduct, { onDelete: 'CASCADE', hooks: true })
WasteProduct.belongsTo(Fridge)

User.belongsToMany(Fridge, { through: UserFridge, as: 'userFridges' })
Fridge.belongsToMany(User, { through: UserFridge, as: 'fridgeUsers' })

BaseList.belongsTo(Fridge)
BaseListProduct.belongsTo(BaseList, { onDelete: 'CASCADE' })
ListProduct.belongsTo(Fridge)
ListProduct.belongsTo(User)

UserFridge.hasMany(BaseList, { foreignKey: 'fridgeId', sourceKey: 'fridgeId' })
Fridge.hasMany(BaseList)
Fridge.hasMany(ListProduct, { as: 'PersonalShoppingList' })
Fridge.hasMany(ListProduct, { as: 'SharedShoppingList' })
BaseList.hasMany(BaseListProduct)
Fridge.hasMany(Invite, { onDelete: 'CASCADE', hooks: true })
Invite.belongsTo(Fridge)

module.exports = {
  Product,
  Fridge,
  User,
  UserFridge,
  WasteProduct,
  BaseList,
  BaseListProduct,
  ListProduct,
  Invite
}
