import express from 'express';
import * as verifyEmail from '../controllers/user/verify-email.controller.js'

const router = express.Router();

export default (prefix) => {
  prefix.use('/verify', router);

  router.post('/send', verifyEmail.sendEmail);
  router.post('/:token', verifyEmail.verify);
};