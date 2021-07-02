import * as userService from '../../services/user.service.js';

export const createUser = async (req, res) => {
  const { statusCode, data, message } = await userService.createUserService(req.body);
  return res.status(statusCode).json({ data, message });
};

export const listUser = async (req, res) => {
  const { statusCode, data, message } = await userService.getUserService(req.query);
  return res.status(statusCode).json({ data, message });
}

export const updateUser = async (req, res) => {
  const { statusCode, data, message } = await userService.updateUserService(req.params, req.body);
  return res.status(statusCode).json({ data, message });
}

export const deleteUser = async (req, res) => {
  const { statusCode, data, message } = await userService.deleteUserService(req.params);
  return res.status(statusCode).json({ message });
}

export const getUserById = async (req, res) => {
  const { statusCode, data, message } = await userService.getUserIdService(req.params);
  return res.status(statusCode).json({ data, message });
}

export const login = async (req, res) => {
  const { statusCode, data, message } = await userService.loginService(req.body);
  return res.status(statusCode).json({ data, message });
}

export const uploadAvatar = async (req, res) => {
  const { statusCode, data, message } = await userService.uploadAvatarService(req.params, req.file);
  return res.status(statusCode).json({ data, message });
}
