import Voucher from "../models/voucher.model.js";

export const createVoucherService = async (body) => {
  const response = {
    statusCode: 200,
    message: 'Voucher Created',
    data: {}
  }
  const { code, quantity, discountMoney, startTime, endTime } = body;

  //Convert string time in body to datetime
  let startTimeBody = Date.parse(startTime, "Body");

  try {
    const existedVoucher = await Voucher.findOne({ where: { code } });
    //Check voucher existed
    if (!!existedVoucher) {
      return {
        statusCode: 201,
        message: `Voucher existed`,
        data: {}
      }
    };
    //Check start time > date now
    if (startTimeBody < Date.now()) {
      return {
        statusCode: 400,
        message: 'Cannot create voucher with start time in the past'
      }
    }

    //Check start time < end time
    if (startTime >= endTime) {
      return {
        statusCode: 400,
        message: 'End time must be greater than start time'
      }
    };
    const voucher = await Voucher.create({ code, quantity, discountMoney, startTime, endTime });

    response.data = voucher;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response
};

export const getVoucherService = async (query) => {
  const response = {
    statusCode: 200,
    message: 'Voucher Listed',
    data: {}
  }
  try {
    let page = parseInt(query.page);
    const limit = 2;
    const offset = page ? (page * limit) : 0;

    const voucher = await Voucher.findAndCountAll({
      limit,
      offset,
      where: { discountMoney: { [Op.like]: '%' + query.discountMoney + '%' } }
    });
    response.data = voucher;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response
}

export const getVoucherByIdService = async (id) => {
  const response = {
    statusCode: 200,
    message: `Voucher get by ID`,
    data: {}
  }
  try {
    const voucher = await Voucher.findOne({ where: id });
    if (voucher === null) {
      return {
        statusCode: 404,
        message: 'Voucher not found',
        data: {}
      }
    };
    response.data = voucher;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response;
};

export const updateVoucherService = async (id, body) => {
  const response = {
    statusCode: 200,
    message: 'Voucher Updated',
    data: {}
  }
  try {
    if (!!body.code) {
      const voucherExisted = await Voucher.findAll({ where: { code: body.code } });
      if (voucherExisted[0]?.code == body.code) {
        return {
          statusCode: 400,
          message: 'Voucher existed',
          data: {}
        }
      }
    }
    const voucher = await Voucher.findOne({ where: id });
    const voucherUpdated = await voucher.update(body, { where: id });
    response.data = voucherUpdated;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response;
}

export const deleteVoucherService = async (id) => {
  const response = {
    statusCode: 200,
    message: 'Voucher Deleted',
    data: {}
  }
  try {
    const voucher = await Voucher.findOne({ where: id });
    await voucher.destroy();
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response;
}

