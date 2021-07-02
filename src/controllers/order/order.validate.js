import expressValidator from 'express-validator';

export const createOrder = [
  expressValidator.body('address').notEmpty().withMessage('Address is required'),
  expressValidator.body('orderItems').notEmpty().withMessage('Order item is required'),
];