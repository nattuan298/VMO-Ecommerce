import Sequelize from 'sequelize';
import sequelize from '../utils/database.js';

const OrderItem = sequelize.define('order_item', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'default_image.jpg'
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

export default OrderItem;