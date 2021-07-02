import * as flashSaleService from '../../services/flash-sale.service.js';


export const createFlashSale = async (req, res) => {
  const { statusCode, data, message } = await flashSaleService.createFlashSaleService(req.body);
  return res.status(statusCode).json({ data, message });
}

export const getFlashSale = async (req, res) => {
  const { statusCode, data, message } = await flashSaleService.getFlashSale(req.query);
  return res.status(statusCode).json({ data, message });
}

export const getFlashSaleById = async (req, res) => {
  const { statusCode, data, message } = await flashSaleService.getFlashSaleByIdService(req.params, req.body);
  return res.status(statusCode).json({ data, message });
}

export const updateFlashSale = async (req, res) => {
  const { statusCode, data, message } = await flashSaleService.updateFlashSaleService(req.params, req.body);
  return res.status(statusCode).json({ data, message });
}

export const deleteFlashSale = async (req, res) => {
  const { statusCode, data, message } = await flashSaleService.deleteFlashSaleService(req.params);
  return res.status(statusCode).json({ data, message });
}