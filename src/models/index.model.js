import sequelize from "../utils/database.js";
import Category from './category.model.js';
import Item from './item.model.js';
import Order from './order.model.js';
import OrderItem from './order-item.model.js';
import User from './user.model.js';
import DetailImage from './detail-image.js';
import FlashSale from './flash-sale.model.js';
import Voucher from './voucher.model.js';

// Associate Category - Item
Category.hasMany(Item, { onDelete: 'CASCADE' });
Item.belongsTo(Category);

Item.hasMany(DetailImage, { onDelete: 'CASCADE' });
DetailImage.belongsTo(Item);

FlashSale.hasMany(Item);

// Associate User - Order
User.hasMany(Order, { onDelete: 'CASCADE' });
Order.belongsTo(User);

Voucher.hasMany(Order);

// Associate Order - OrderItem
Order.hasMany(OrderItem, { onDelete: 'CASCADE' });
OrderItem.belongsTo(Order);

// Associate Item - OrderItem
Item.hasMany(OrderItem, { onDelete: 'CASCADE' });
OrderItem.belongsTo(Item);

export default sequelize
  // .sync({ force: true })
  .sync()
  .then(user => {
    console.log('Tables Create successful');
  })
  .catch(err => console.log(err))


