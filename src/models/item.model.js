import Sequelize from 'sequelize';
import sequelize from '../utils/database.js';

const Item = sequelize.define('item', {
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
  barcode: {
    type: Sequelize.STRING,
    allowNull: false
  },
  importPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  sellPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  weight: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'default_image.jpg'
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salePrice: {
    type: Sequelize.FLOAT,
    allowNull: true
  }
});

export default Item;