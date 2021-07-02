import Sequelize from 'sequelize';
import 'dotenv/config'

const sequelize = new Sequelize('test1', 'root', 'root', {
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  logging: false
});

export default sequelize;