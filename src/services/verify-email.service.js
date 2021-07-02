import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import 'dotenv/config'
import nodemailer from 'nodemailer';

export const sendEmailService = async (body) => {
  const response = {
    statusCode: 200,
    message: 'Email Verify Sent!',
    data: {}
  }
  const { username } = body;
  try {
    const userResult = await User.findOne({ where: { username } });
    const tokenEmail = jwt.sign(
      { id: userResult.id, email: userResult.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EMAIL_EXPIRES_IN }
    );
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
    const urlBase = `http://localhost:3000/api/v1/users/verify/`;
    const htmlTemplate = `
    <h1>DO NOT REPLY</h1><br>
    <h2>Thank you for using our service</h2><br> 
    <h3>Please click this link to confirm your email:
    <a href="${urlBase}${tokenEmail}">Here</a></h3>
    `;
    //setup email data with unicode symbols
    let mailOptions = {
      from: process.env.EMAIL, //sender
      to: userResult.email,
      subject: 'Verify Email',
      html: htmlTemplate
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    })
    response.data = tokenEmail;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response;
};

export const verifyEmailService = async (token, body) => {
  const response = {
    statusCode: 200,
    message: 'Email have been verified!',
    data: {}
  }
  try {
    const convertToken = Object.values(token).toString();
    const userPayload = jwt.verify(convertToken, process.env.JWT_SECRET);

    //Check email body vs email in payload
    console.log(userPayload.email, "Email");
    if (userPayload.email !== body.email) {
      return {
        statusCode: 400,
        message: 'Incorrect Email'
      }
    }
    const updateVerify = await User.update({ isVerify: true }, { where: { id: userPayload.id } })
    response.data = updateVerify;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response;
}