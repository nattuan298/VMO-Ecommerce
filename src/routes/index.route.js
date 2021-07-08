import express from 'express';
import userRoute from './user.route.js';
import categoryRoute from './category.route.js';
import orderRoute from './order.route.js';
import itemRoute from './item.route.js';
import flashSaleRoute from './flash-sale.route.js';
import verifyEmailRoute from './verify-email.route.js';
import * as userController from '../controllers/user/user.controller.js'
import { validateRequest, validateEmail } from '../middlewares/validator.js'
import * as userValidate from '../controllers/user/user.validate.js'
import voucherRoute from './voucher.route.js';
import swaggerUI from "swagger-ui-express"
import swaggerJSDoc from 'swagger-jsdoc';

const router = express.Router();

export default (app) => {
  app.use('/api/v1', router);
  router.get('/', (req, res) => res.send('Welcome to book management system...'));

  //Authentication
  router.post('/register', userValidate.createUser, validateRequest, userController.createUser);
  router.post('/login', userValidate.login, validateRequest, validateEmail, userController.login);
  router.post('/forgot', userController.forgotPassword);
  router.post('/reset/:token', userController.resetPassword);

  // routing to /users
  userRoute(router);

  //routing to /categories
  categoryRoute(router);

  //routing to /items
  itemRoute(router);

  //routing to /orders
  orderRoute(router)

  //Routing to verify
  verifyEmailRoute(router)

  //Routing to flash sale
  flashSaleRoute(router)

  //Routing to voucher
  voucherRoute(router)
};