import express from 'express';
import * as orderController from '../controllers/order/order.controller.js';
import verifyToken from '../middlewares/authentication.js';
import { validateRequest } from '../middlewares/validator.js';
import * as orderValidate from '../controllers/order/order.validate.js';
import verifyPasswordChange from '../middlewares/change-password.js';

const router = express.Router();

export default (prefix) => {
  prefix.use('/orders', verifyToken, verifyPasswordChange, router);

  router.post('/', orderValidate.createOrder, validateRequest, orderController.createOrder);
  router.get('/', orderController.listOrder);
  router.get('/:id', orderController.getOrderById);
  router.delete('/:id', orderController.deleteOrder);
};