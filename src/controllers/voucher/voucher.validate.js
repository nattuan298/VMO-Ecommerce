import expressValidator from 'express-validator';

export const createVoucher = [
  expressValidator.body('code').notEmpty().withMessage('Code is required'),
  expressValidator.body('quantity')
    .notEmpty()
    .bail()
    .withMessage('Quantity is required')
    .isInt()
    .bail()
    .withMessage('Quantity must be number')
  ,
  expressValidator.body('discountMoney')
    .notEmpty()
    .bail()
    .withMessage('Discount money is required')
    .isInt()
    .bail()
    .withMessage('Discount percent must be number')

];