import expressValidator from 'express-validator';

export const createCategory = [
  expressValidator.body('name')
    .notEmpty()
    .bail()
    .withMessage('Name is required')
    .isAlphanumeric()
    .bail()
    .withMessage('Name can not content special character')
];