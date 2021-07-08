import express from 'express';
import * as flashSale from '../controllers/flash-sale/flash-sale.controller.js';
import verifyToken from '../middlewares/authentication.js';
import { validateRequest } from '../middlewares/validator.js';
import * as flashSaleValidate from '../controllers/flash-sale/flash-sale.validate.js';
import verifyPasswordChange from '../middlewares/change-password.js';

const router = express.Router();

export default (prefix) => {
  prefix.use('/flashsale', verifyToken, verifyPasswordChange, router);

  router.post('/', flashSaleValidate.createFlashSale, validateRequest, flashSale.createFlashSale);
  router.get('/', flashSale.getFlashSale);
  router.get('/:id', flashSale.getFlashSaleById);
  router.put('/:id', flashSale.updateFlashSale);
  router.delete('/:id', flashSale.deleteFlashSale);

};