import Sequelize from 'sequelize';
import sequelize from '../utils/database.js';

const User = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  isVerify: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  avatar: {
    type: Sequelize.STRING,
    defaultValue: 'default_avatar.jpg'
  },
  resetPasswordToken: {
    type: Sequelize.STRING,
    allowNull: true
  },
  resetPasswordExpires: {
    type: Sequelize.DATE,
    allowNull: true
  },
  changePasswordDate: {
    type: Sequelize.DATE,
    allowNull: true
  }
});


export default User;
