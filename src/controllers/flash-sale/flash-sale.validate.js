import expressValidator from 'express-validator';

export const createFlashSale = [
  expressValidator.body('startTime')
    .notEmpty()
    .bail()
    .withMessage('Start time is required')
  ,
  expressValidator.body('endTime')
    .notEmpty()
    .bail()
    .withMessage('End time is required')
  ,
  expressValidator.body('discountPercent')
    .notEmpty()
    .bail()
    .withMessage('Discount percent is required')
    .isInt({ min: 1, max: 100 })
    .bail()
    .withMessage('Discount percent must be number')
  ,
  expressValidator.body('quantityItem')
    .notEmpty()
    .bail()
    .withMessage('Quantity item is required')
    .isInt()
    .bail()
    .withMessage('Quantity item must be number')
  ,
  expressValidator.body('saleItems').notEmpty().withMessage('Sale items are required'),
];