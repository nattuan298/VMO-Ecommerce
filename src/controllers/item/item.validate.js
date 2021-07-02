import expressValidator from 'express-validator';

export const createItem = [
  expressValidator.body('name')
    .notEmpty()
    .bail()
    .withMessage('Name is required')
    .isAlphanumeric()
    .bail()
    .withMessage('Name can not be special charater')
  ,
  expressValidator.body('barcode').notEmpty().withMessage('Barcode is required'),
  expressValidator.body('importPrice')
    .notEmpty()
    .bail()
    .withMessage('Import price is required')
    .isInt()
    .bail()
    .withMessage('Price must be number')
  ,
  expressValidator.body('sellPrice')
    .notEmpty()
    .bail()
    .withMessage('Sell price is required')
    .isInt()
    .bail()
    .withMessage('Price must be number')
  ,
  expressValidator.body('weight')
    .notEmpty()
    .bail()
    .withMessage('Weight is required')
    .isFloat()
    .bail()
    .withMessage('Weight must be number'),
  expressValidator.body('quantity')
    .notEmpty()
    .bail()
    .withMessage('Quantity item is required')
    .isInt()
    .bail()
    .withMessage('Quantity item must be number')
  ,
  expressValidator.body('description').notEmpty().withMessage('Description is required'),
  expressValidator.body('brand').notEmpty().withMessage('Brand is required'),
];