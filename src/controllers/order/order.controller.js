import * as orderService from '../../services/order.service.js';

export const createOrder = async (req, res) => {
  const { statusCode, data, message } = await orderService.createOrderService(req.body, req.user);
  return res.status(statusCode).json({ data, message });
}

export const listOrder = async (req, res) => {
  const { statusCode, data, message } = await orderService.getOrderService(req.query);
  return res.status(statusCode).json({ data, message });
}

export const getOrderById = async (req, res) => {
  const { statusCode, data, message } = await orderService.getOrderByIdService(req.params);
  return res.status(statusCode).json({ data, message });
}

export const deleteOrder = async (req, res) => {
  const { statusCode, data, message } = await orderService.deleteOrderService(req.params);
  return res.status(statusCode).json({ data, message });
}