import User from '../Models/user.model.js'
import jwt from "jsonwebtoken"
import 'dotenv/config'
import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import cryptoRandomString from 'crypto-random-string';
import nodemailer from 'nodemailer';

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
      isAdmin,
      changePasswordDate: Date.now()
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
      where: { username: { [Op.like]: '%' + query.username + '%' } },
      order: [['username', 'ASC']],
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
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin, changePasswordDate: user.changePasswordDate },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
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

export const changePasswordService = async (body, id) => {
  const response = {
    statusCode: 200,
    message: 'Reset password successful',
    data: {}
  }
  const { password, newPassword, confirmPassword } = body;
  const userId = Object.values(id)
  try {
    console.log(userId);
    const user = await User.findOne({ where: { id: userId } });
    if (!bcrypt.compareSync(password, user.password)) {
      return {
        statusCode: 404,
        message: 'Password incorrect!',
        data: {}
      }
    }
    if (newPassword !== confirmPassword) {
      return {
        statusCode: 404,
        message: 'Confirm password does not match the new password!',
        data: {}
      }
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const data = user.update({ password: bcrypt.hashSync(newPassword, salt), changePasswordDate: Date.now() });
    response.data = data;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

export const forgotPasswordService = async (body) => {
  const response = {
    statusCode: 200,
    message: 'Email reset password sent!',
    data: {}
  }
  const email = body;
  try {
    const user = await User.findOne({ where: { email: Object.values(email) } });
    console.log(user);
    const token = cryptoRandomString({ length: 20, type: 'base64' }.length, 20);

    // create reusable tranporter object using the default SMTP tranport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });
    const urlBase = `http://localhost:3000/api/v1/users/reset/`;
    const htmlTemplate = `
    <h1>DO NOT REPLY</h1><br><br>
    <h3>Please click this link to reset your password:
    <a href="${urlBase}${token}">Here</a></h3>
    `;
    //setup email data with unicode symbols
    let mailOptions = {
      from: process.env.EMAIL, //sender
      to: Object.values(email),
      subject: 'Verify Email',
      html: htmlTemplate
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    })

    await user.update({ resetPasswordExpires: Date.now() + 300000, resetPasswordToken: token });
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
}

export const resetPasswordService = async (token, body) => {
  const response = {
    statusCode: 200,
    message: 'Password reset successfully!',
    data: {}
  }
  const { newPassword, confirmPassword } = body;
  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: Object.values(token),
        resetPasswordExpires: { [Op.gte]: Date.now() }
      }
    });
    if (!user) {
      return {
        statusCode: 400,
        message: 'Password reset token is invalid or has expired.',
        data: {}
      }
    }
    if (newPassword !== confirmPassword) {
      return {
        statusCode: 404,
        message: 'Confirm password does not match the new password!',
        data: {}
      }
    }

    //hash password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    const data = user.update({ password: bcrypt.hashSync(newPassword, salt), changePasswordDate: Date.now() });

    response.data = data;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
}