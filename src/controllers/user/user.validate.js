import expressValidator from 'express-validator';

export const login = [
  expressValidator.body('username')
    .notEmpty()
    .bail()
    .withMessage('Username is required')
    .isAlphanumeric()
    .bail()
    .withMessage('Username can not be special charater')
  ,
  expressValidator.body('password').notEmpty().withMessage('Password is required')
];

export const createUser = [
  expressValidator.body('username')
    .notEmpty()
    .bail()
    .withMessage('Username is required')
    .isAlphanumeric()
    .bail()
    .withMessage('Username can not be special charater')
  ,
  expressValidator.body('password').notEmpty().withMessage('Password is required'),
  expressValidator.body('phone')
    .notEmpty()
    .bail()
    .withMessage('Phone is required')
    .isMobilePhone()
    .bail()
    .withMessage('Phone must be number')
  ,
  expressValidator.body('email')
    .notEmpty()
    .bail()
    .withMessage('Email is require')
    .isEmail()
    .bail()
    .withMessage('Email format is incorrect')
];
