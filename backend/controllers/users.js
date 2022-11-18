const router = require('express').Router()

const { User, Fridge, Product, BaseList, BaseListProduct, ListProduct } = require('../models')

//same as below but for getting all, not used atm
router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Fridge,
        include: [
          {
            model: Product,
            attributes: { exclude: ['fridgeId'] }
          },
          {
            model: BaseList,
            required: false,
            attributes: ['id', 'name'],
            include: [
              {
                model: BaseListProduct,
                attributes: { exclude: ['updatedAt', 'baseListId'] }
              }

            ]
          },
          {
            model: ListProduct,
            required: false,
            as: 'SharedShoppingList',
            where: { userId : null },
            attributes: ['id', 'name', 'amount']
          },
          {
            model: ListProduct,
            required: false,
            as: 'PersonalShoppingList',
            where: { userId : req.session.user.id },
            attributes: ['id', 'name', 'amount']
          }
        ],
        as: 'userFridges',
        attributes: { exclude: ['userId'] },
        through: { attributes: ['admin'] }
      }
    ],
    order: [
      [{ model: Fridge, as: 'userFridges' }, 'name', 'ASC'],
      [{ model: Fridge, as: 'userFridges' }, BaseList, 'name', 'ASC'],
      [{ model: Fridge, as: 'userFridges' }, BaseList, BaseListProduct, 'id', 'ASC'],
      [{ model: Fridge, as: 'userFridges' }, { model: ListProduct, as: 'PersonalShoppingList' }, 'id', 'ASC'],
      [{ model: Fridge, as: 'userFridges' }, { model: ListProduct, as: 'SharedShoppingList' }, 'id', 'ASC']
    ],
    attributes: { exclude: ['username', 'password'] }
  })
  res.json(users)
})

//main method for getting data
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.session.user.id, {
    include: [
      {
        model: Fridge,
        include: [
          {
            model: Product,
            attributes: { exclude: ['fridgeId'] }
          },
          {
            model: BaseList,
            required: false,
            attributes: ['id', 'name'],
            include: [
              {
                model: BaseListProduct,
                attributes: { exclude: ['updatedAt', 'baseListId'] }
              }

            ]
          },
          {
            model: ListProduct,
            required: false,
            as: 'SharedShoppingList',
            where: { userId : null },
            attributes: ['id', 'name', 'amount']
          },
          {
            model: ListProduct,
            required: false,
            as: 'PersonalShoppingList',
            where: { userId : req.session.user.id },
            attributes: ['id', 'name', 'amount']
          }
        ],
        as: 'userFridges',
        attributes: { exclude: ['userId'] },
        through: { attributes: ['admin'] }
      }
    ],
    order: [
      [{ model: Fridge, as: 'userFridges' }, 'name', 'ASC'],
      [{ model: Fridge, as: 'userFridges' }, BaseList, 'name', 'ASC'],
      [{ model: Fridge, as: 'userFridges' }, BaseList, BaseListProduct, 'id', 'ASC'],
      [{ model: Fridge, as: 'userFridges' }, { model: ListProduct, as: 'PersonalShoppingList' }, 'id', 'ASC'],
      [{ model: Fridge, as: 'userFridges' }, { model: ListProduct, as: 'SharedShoppingList' }, 'id', 'ASC']
    ],
    attributes: { exclude: ['username', 'password'] }
  })
  res.json(user)
})

module.exports = router
