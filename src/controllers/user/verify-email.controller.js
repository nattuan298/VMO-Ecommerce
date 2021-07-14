import * as verifyEmail from '../../services/verify-email.service.js'

export const sendEmail = async (req, res) => {
  const { statusCode, data, message } = await verifyEmail.sendEmailService(req.body);
  return res.status(statusCode).json({ data, message });
}

export const verify = async (req, res) => {
  const { statusCode, message } = await verifyEmail.verifyEmailService(req.params, req.body);
  return res.status(statusCode).json({ message });
}