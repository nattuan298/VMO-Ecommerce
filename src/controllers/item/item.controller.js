import * as itemService from '../../services/item.service.js';
import * as detailImageService from '../../services/image-item.service.js';

export const createItem = async (req, res) => {
  const { statusCode, data, message } = await itemService.createItemService(req.body);
  return res.status(statusCode).json({ data, message });
}

export const getItem = async (req, res) => {
  const { statusCode, data, message } = await itemService.getItemService(req.query);
  return res.status(statusCode).json({ data, message });
}

export const getItemById = async (req, res) => {
  const { statusCode, data, message } = await itemService.getItemByIdService(req.params);
  return res.status(statusCode).json({ data, message });
}

export const deleteItem = async (req, res) => {
  const { statusCode, data, message } = await itemService.deleteItemService(req.params);
  return res.status(statusCode).json({ message });
}

export const updateItem = async (req, res) => {
  const { statusCode, data, message } = await itemService.updateItemService(req.params, req.body);
  return res.status(statusCode).json({ data, message });
}

// Upload Image
export const uploadMutipleImage = async (req, res) => {
  const { statusCode, data, message } = await detailImageService.uploadMultipleImageService(req.params, req.files);
  return res.status(statusCode).json({ data, message });
}
