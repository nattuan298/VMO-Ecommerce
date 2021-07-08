import express from 'express';
import * as userController from '../controllers/user/user.controller.js';
import verifyToken from '../middlewares/authentication.js';
import { uploadFile } from '../middlewares/upload-image.js';
import verifyPasswordChange from '../middlewares/change-password.js';

const router = express.Router();

export default (prefix) => {
  prefix.use('/users', verifyToken, verifyPasswordChange, router);

  router.get('/', userController.listUser);
  router.get('/:id', userController.getUserById);
  router.delete('/:id', userController.deleteUser);
  router.put('/:id', userController.updateUser);
  router.post('/upload/:id', uploadFile.single('avatar'), userController.uploadAvatar);
  router.put('/change-password/:id', userController.changePassword);
};