import Sequelize from 'sequelize';
import sequelize from '../utils/database.js';

const FlashSale = sequelize.define('flash_sale', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  startTime: {
    type: Sequelize.DATE, // Node schedule modules
    allowNull: false
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false
  },
  quantityItem: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  discountPercent: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

export default FlashSale;