import User from '../Models/user.model.js'
import jwt from "jsonwebtoken"
import 'dotenv/config'
import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

export const createUserService = async (body) => {
  const response = {
    statusCode: 200,
    message: 'User created',
    data: {}
  }
  const { username, password, email, phone, isAdmin } = body;
  try {
    const existedUser = await User.findOne({ where: { username } })
    if (!!existedUser) {
      return {
        statusCode: 201,
        message: 'User existed',
        data: {}
      }
    }
    //Hash password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const userItem = {
      username,
      password: bcrypt.hashSync(password, salt),
      email,
      phone,
      isAdmin
    }
    const user = await User.create(userItem);
    response.data = user;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response
};

export const getUserService = async (query) => {
  const response = {
    statusCode: 200,
    message: 'User List',
    data: {}
  }
  try {
    let page = parseInt(query.page);
    const limit = 2;
    const offset = page ? (page * limit) : 0;

    const userData = await User.findAndCountAll({
      limit,
      offset,
      where: { username: { [Op.like]: '%' + query.username + '%' } }
    });
    response.data = userData;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
}

export const getUserIdService = async (id) => {
  const response = {
    statusCode: 200,
    message: 'User By Id',
    data: {}
  }
  try {
    const user = await User.findOne({ where: id });
    response.data = user;
  } catch (error) {
    response.error = 500;
    response.message = error.message
  }
  return response;
};

export const updateUserService = async (id, body) => {
  const response = {
    statusCode: 200,
    message: 'User Updated',
    data: {}
  }
  try {
    if (!!body.password) {
      return {
        statusCode: 400,
        message: 'Can not update password, please change password!',
        data: {}
      }
    }
    if (!!body.username) {
      const userExisted = await User.findAll({ where: { username: body.username } });
      if (userExisted[0]?.username == body.username) {
        return {
          statusCode: 400,
          message: 'User existed',
          data: {}
        }
      }
    }
    const user = await User.findOne({ where: id });
    //Update every thing in body
    await user.update(body, { where: id })
    response.data = user;
  } catch (error) {
    response.error = 500;
    response.message = error.message
  }
  return response;
}

export const deleteUserService = async (id) => {
  const response = {
    statusCode: 200,
    message: 'User Deleted',
    data: {}
  }
  try {
    const user = await User.findOne({ where: id });
    await user.destroy();
  } catch (error) {
    response.error = 500;
    response.message = error.message
  }
  return response;
}

export const loginService = async (body) => {
  const response = {
    statusCode: 200,
    message: 'User Logged in',
    data: {}
  }
  const { username, password } = body
  try {
    const user = await User.findOne({ where: { username } })

    if (!bcrypt.compareSync(password, user.password)) {
      return {
        statusCode: 404,
        message: 'Password incorrect!',
        data: {}
      }
    }
    const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    response.data = token;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response;
};

export const uploadAvatarService = async (id, file) => {
  const response = {
    statusCode: 200,
    message: 'Upload avatar successful',
    data: {}
  }
  try {
    const user = await User.findOne({ where: id });
    const updateImg = await user.update({ avatar: file.filename })
    response.data = updateImg;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};