import express from 'express';
import * as itemController from '../controllers/item/item.controller.js';
import verifyToken from '../middlewares/authentication.js';
import { validateRequest, validateRole } from '../middlewares/validator.js';
import * as itemValidate from '../controllers/item/item.validate.js'
import { uploadFile } from '../middlewares/upload-image.js';
import multer from 'multer';


const router = express.Router();

export default (prefix) => {
  prefix.use('/items', verifyToken, router);

  router.post('/', itemValidate.createItem, validateRequest, validateRole, itemController.createItem);
  router.post('/upload/:id', uploadFile.fields([{ name: 'image', maxCount: 1 }, { name: 'images', maxCount: 5 }]),
    itemController.uploadMutipleImage);

  router.get('/', itemController.getItem);
  router.get('/:id', itemController.getItemById);
  router.delete('/:id', itemController.deleteItem);
  router.put('/:id', itemController.updateItem);
};