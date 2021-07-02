import Sequelize from 'sequelize';
import sequelize from '../utils/database.js';

const DetailImage = sequelize.define('detail_image', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'default_image.jpg'
  }
});

export default DetailImage;