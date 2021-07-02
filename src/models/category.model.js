import Sequelize from 'sequelize';
import sequelize from '../utils/database.js';

const Category = sequelize.define('category', {
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
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  banner: {
    type: Sequelize.STRING,
    defaultValue: 'default_image.jpg'
  },
  position: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

export default Category;