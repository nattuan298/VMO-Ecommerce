import express from 'express';
import * as categoryController from '../controllers/category/category.controller.js';
import verifyToken from '../middlewares/authentication.js';
import { validateRequest, validateRole } from '../middlewares/validator.js';
import * as categoryValidate from '../controllers/category/category.validate.js';
import { uploadFile } from '../middlewares/upload-image.js';
import verifyPasswordChange from '../middlewares/change-password.js';

const router = express.Router();

export default (prefix) => {
  prefix.use('/categories', verifyToken, verifyPasswordChange, router);

  router.post('/', validateRole, categoryValidate.createCategory, validateRequest, categoryController.listCategory);
  router.put('/upload/:id', uploadFile.single('banner'), categoryController.updateBanner);

  //Router set position of banner
  router.post('/position-banner', categoryController.positionBanner)
  router.get('/', categoryController.getCategory);
  router.get('/:id', categoryController.getCategoryById);
  router.delete('/:id', categoryController.deleteCategory);
  router.put('/:id', categoryController.updateCategory);
};