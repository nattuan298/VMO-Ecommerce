import * as categoryService from '../../services/category.service.js';

export const listCategory = async (req, res) => {
  const { statusCode, data, message } = await categoryService.createCategoryService(req.body);
  return res.status(statusCode).json({ data, message });
}

export const getCategory = async (req, res) => {
  const { statusCode, data, message } = await categoryService.getCategoryService(req.query);
  return res.status(statusCode).json({ data, message });
}

export const getCategoryById = async (req, res) => {
  const { statusCode, data, message } = await categoryService.getCategoryByIdService(req.params);
  return res.status(statusCode).json({ data, message });
}

export const deleteCategory = async (req, res) => {
  const { statusCode, data, message } = await categoryService.deleteCategoryService(req.params);
  return res.status(statusCode).json({ message });
}

export const updateCategory = async (req, res) => {
  const { statusCode, data, message } = await categoryService.updateCategoryService(req.params, req.body);
  return res.status(statusCode).json({ data, message });
}

//Upload Banner
export const updateBanner = async (req, res) => {
  const { statusCode, data, message } = await categoryService.uploadBannerService(req.params, req.file);
  return res.status(statusCode).json({ data, message });
}

// Add postion 
export const positionBanner = async (req, res) => {
  const { statusCode, data, message } = await categoryService.positionBanner(req.body);
  return res.status(statusCode).json({ data, message });
}
