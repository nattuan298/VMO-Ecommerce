import Sequelize from 'sequelize';
import sequelize from '../utils/database.js';

const Order = sequelize.define('order', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  totalPrice: {
    type: Sequelize.FLOAT,
  }
});

export default Order;