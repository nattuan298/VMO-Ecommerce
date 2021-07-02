import expressValidator from 'express-validator';
import User from '../models/user.model.js';

export const validateRequest = (req, res, next) => {
  const errors = expressValidator.validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).send({
      statusCode: 400,
      message: errors.array()[0].msg,
      data: {},
    });
  }

  return next();
};

export const validateRole = async (req, res, next) => {
  if (req.user.isAdmin === false) {
    return res.status(403).send({
      statusCode: 403,
      message: 'Access denied, You are not administrator!',
      data: {}
    })
  }
  next();
}
export const validateEmail = async (req, res, next) => {
  const userResult = await User.findOne({ where: { username: req.body.username } });
  if (!userResult) {
    return res.status(400).send({
      statusCode: 403,
      message: 'Username incorrect!',
      data: {}
    })
  }
  if (userResult.isVerify === false) {
    return res.status(403).send({
      statusCode: 403,
      message: 'Please verify your email and login again!',
      data: {}
    })
  }
  next();
}
