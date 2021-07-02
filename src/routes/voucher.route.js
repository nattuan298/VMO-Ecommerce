import express from 'express';
import * as voucherController from '../controllers/voucher/voucher.controller.js';
import verifyToken from '../middlewares/authentication.js';
import { validateRequest } from '../middlewares/validator.js';
import * as voucherValidate from '../controllers/voucher/voucher.validate.js';


const router = express.Router();

export default (prefix) => {
  prefix.use('/vouchers', verifyToken, router);

  router.post('/', voucherValidate.createVoucher, validateRequest, voucherController.createVoucher);
  router.get('/', voucherController.getVoucher);
  router.get('/:id', voucherController.getVoucherById);
  router.put('/:id', voucherController.updateVoucher);
  router.delete('/:id', voucherController.deleteVoucher);
};