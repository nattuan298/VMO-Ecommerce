import Sequelize from 'sequelize';
import sequelize from '../utils/database.js';

const Voucher = sequelize.define('voucher', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  discountMoney: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  startTime: {
    type: Sequelize.DATE, // Node schedule modules
    allowNull: false
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false
  },
});

export default Voucher;