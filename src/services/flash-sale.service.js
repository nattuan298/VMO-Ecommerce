import FlashSale from "../models/flash-sale.model.js";
import Item from "../models/item.model.js";
import 'dotenv/config';
import nodemailer from 'nodemailer';
import schedule from 'node-schedule';
import Sequelize from "sequelize";
import User from '../models/user.model.js';

const Op = Sequelize.Op;

export const createFlashSaleService = async (body) => {
  const response = {
    statusCode: 200,
    message: 'Flash Sale Created',
    data: {}
  }
  const { startTime, endTime, quantityItem, discountPercent, saleItems } = body;

  //Convert string time in body to datetime
  let startTimeBody = Date.parse(startTime, "Body");
  let endTimeBody = Date.parse(endTime, 'Body');

  try {
    //Check flash sale existed at the time
    const existedFlashSale = await FlashSale.findAll({
      attributes: ['startTime', 'endTime']
    });
    for (let i = 0; i < existedFlashSale.length; i++) {
      // Check start time body < end time database || start time body < date now
      if (startTimeBody < existedFlashSale[i].endTime && startTimeBody >= existedFlashSale[i].startTime) {
        return {
          statusCode: 400,
          message: 'Cannot create flash at start time before existed flash sale ended'
        }
      }
      if (startTimeBody < existedFlashSale[i].startTime) {

        if (endTimeBody > existedFlashSale[i].startTime) {
          return {
            statusCode: 400,
            message: 'End time duplicate an existed flash sale '
          }
        }
      }

      // Flash sale must be create before 15m start
      if (startTimeBody < (Date.now() + 900000)) {
        return {
          statusCode: 400,
          message: 'Flash sales can only be created 15 minutes in advance'
        }
      }
    }
    //Check quantity sale item vs limit quantity
    if (saleItems.length > quantityItem) {
      return {
        statusCode: 400,
        message: 'Sale item quantity over than limit quantity'
      }
    }
    //Check start time < end time
    if (startTime >= endTime) {
      return {
        statusCode: 400,
        message: 'End time must be greater than start time'
      }
    };

    // create flash sale
    const flashSale = await FlashSale.create({
      startTime,
      endTime,
      quantityItem,
      discountPercent
    });

    //Get item price
    for (let i = 0; i < saleItems.length; i++) {
      let id = Object.values(saleItems[i]);
      let item = await Item.findOne({ where: { id } });
      let salePrice = (discountPercent / 100) * item.sellPrice;

      //Update item sale price and time end and flash sale ID
      await Item.update({ salePrice, endSalePrice: endTime, flashSaleId: flashSale.id }, { where: { id } });
    }

    //Send email to every one started here
    const timeSendEmail = startTimeBody - 900000; // Before 15m flash sale start
    var date = new Date(timeSendEmail); // create Date object

    const htmlTemplate = `
    <h1>FLASH SALE</h1><br>
    <h3>Please follow our website to catch the flash sale start ${startTime} to ${endTime}</h3>
    `;

    //Setup transporter to send email
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });
    //find all email to send noti
    const user = await User.findAll({ attributes: ['email'] });
    //Cron job to send email
    schedule.scheduleJob(date, function () {
      console.log('Email sent');
      for (let i = 0; i < user.length; i++) {
        let mailOptions = {
          from: process.env.EMAIL, //sender
          to: user[i].email,
          subject: 'Flash Sale',
          html: htmlTemplate
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
        });
      }
    })
    response.data = flashSale;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
}

export const getFlashSale = async (query) => {
  const response = {
    statusCode: 200,
    message: 'Flash Sale Listed',
    data: {}
  }
  try {
    const { discountPercent, discount } = query;
    let page = parseInt(query.page);
    const limit = 2;
    const offset = page ? (page * limit) : 0;

    const flashSale = await FlashSale.findAndCountAll({
      limit,
      offset,
      where: {
        discountPercent: { [Op.like]: '%' + discountPercent + '%' },
        discountPercent: { [Op.gte]: discount }
      },
      order: [['discountPercent', 'ASC']],
    });
    response.data = flashSale;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
}

export const getFlashSaleByIdService = async (id) => {
  const response = {
    statusCode: 200,
    message: `Flash Sale get by ID`,
    data: {}
  }
  try {
    const flashSale = await FlashSale.findOne({ where: id });
    if (flashSale === null) {
      return {
        statusCode: 404,
        message: 'Item not found',
        data: {}
      }
    };
    response.data = flashSale;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response;
};


export const updateFlashSaleService = async (id, body) => {
  const response = {
    statusCode: 200,
    message: 'Flash Sale Updated',
    data: {}
  }
  const { startTime, endTime, quantityItem, saleItems, discountPercent } = body;
  try {

    if (!!startTime || !!endTime) {
      //Convert string time in body to datetime
      let startTimeBody = Date.parse(startTime, "Body");
      const existedFlashSale = await FlashSale.findAll({
        attributes: ['startTime', 'endTime']
      });
      for (let i = 0; i < existedFlashSale.length; i++) {
        // Check start time body < end time database || start time body < date now
        if (startTimeBody < existedFlashSale[i].endTime || startTimeBody < Date.now()) {
          return {
            statusCode: 400,
            message: 'Cannot update flash at the time'
          }
        }
      }

      //Check start time < end time
      if (startTime >= endTime) {
        return {
          statusCode: 400,
          message: 'End time must be greater than start time'
        }
      };

      if (saleItems.length > 0) {
        for (let i = 0; i < saleItems.length; i++) {
          let id = Object.values(saleItems[i]);
          let item = await Item.findOne({ where: { id } });
          let salePrice = (discountPercent / 100) * item.sellPrice;

          //Update item price and time flash sale end
          await Item.update({ salePrice, endSalePrice: endTime }, { where: { id } });
        }
      }
    }
    //Check quantity sale item vs limit quantity
    if (saleItems.length > quantityItem) {
      return {
        statusCode: 400,
        message: 'Sale item quantity over than limit quantity'
      }
    }
    // Update flash sale
    const flashSale = await FlashSale.findOne({ where: id });
    await flashSale.update(body);

    //Update item if have change
    if (saleItems.length > 0) {
      for (let i = 0; i < saleItems.length; i++) {
        let id = Object.values(saleItems[i]);
        let item = await Item.findOne({ where: { id } });
        let salePrice = (discountPercent / 100) * item.sellPrice;

        //Update item sale price and time end
        await Item.update({ salePrice }, { where: { id } });
      }
    }

    response.data = flashSale;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response;
}

export const deleteFlashSaleService = async (id) => {
  const response = {
    statusCode: 200,
    message: 'Flash Sale Deleted',
    data: {}
  }
  try {
    const flashSale = await FlashSale.findOne({ where: id });
    await flashSale.destroy();
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response;
}