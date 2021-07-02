import * as voucherService from '../../services/voucher.service.js';


export const createVoucher = async (req, res) => {
  const { statusCode, data, message } = await voucherService.createVoucherService(req.body);
  return res.status(statusCode).json({ data, message });
}

export const getVoucher = async (req, res) => {
  const { statusCode, data, message } = await voucherService.getVoucherService(req.query);
  return res.status(statusCode).json({ data, message });
}

export const getVoucherById = async (req, res) => {
  const { statusCode, data, message } = await voucherService.getVoucherByIdService(req.params);
  return res.status(statusCode).json({ data, message });
}

export const updateVoucher = async (req, res) => {
  const { statusCode, data, message } = await voucherService.updateVoucherService(req.params, req.body);
  return res.status(statusCode).json({ data, message });
}

export const deleteVoucher = async (req, res) => {
  const { statusCode, data, message } = await voucherService.deleteVoucherService(req.params);
  return res.status(statusCode).json({ data, message });
}