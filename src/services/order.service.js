import Item from '../models/item.model.js';
import Order from '../models/order.model.js';
import OrderItem from '../models/order-item.model.js';
import FlashSale from '../models/flash-sale.model.js';
import Voucher from '../models/voucher.model.js';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

export const createOrderService = async (body, user) => {
  const response = {
    statusCode: 200,
    message: 'Order Created',
    data: {}
  }
  const { address, orderItems, voucherCode } = body;
  try {
    //Check cart existed item
    if (orderItems.length === 0) {
      return {
        statusCode: 400,
        message: 'Cart is empty'
      }
    }
    const order = await Order.create({ email: user.email, address, userId: user.id });

    // Get array item ID
    const itemIds = [];
    let allPrice = [];
    for (let i = 0; i < orderItems.length; i++) {
      itemIds.push(orderItems[i].itemId);
      //Check quantity in body
      let item = await Item.findOne({ where: { id: orderItems[i].itemId } })
      if (orderItems[i].quantity > item.quantity) {
        return {
          statusCode: 400,
          message: `Quantity of ${item.name} not enough!`
        }
      }

      let checkPrice = item.sellPrice;
      //Check if flash sale available
      if (item.flashSaleId !== null) {
        const existedFlashSale = await FlashSale.findOne({ where: { id: item.flashSaleId } });
        //Check if time flash sale available
        if (existedFlashSale.startTime < Date.now() && existedFlashSale.endTime > Date.now()) {
          checkPrice = item.salePrice;
        } else {
          checkPrice = item.sellPrice;
        }
      }

      // Calculate total price of each item
      let priceItem = await orderItems[i].quantity * checkPrice;
      //Push price to array
      allPrice.push(priceItem);

      await OrderItem.create({
        name: item.name,
        quantity: orderItems[i].quantity,
        image: item.image,
        totalPrice: priceItem,
        orderId: order.id,
        itemId: orderItems[i].itemId
      });
      let newQuantity = item.quantity - orderItems[i].quantity;
      await item.update({ quantity: newQuantity })
    }
    // calculate total price item
    const totalPriceHandle = allPrice.reduce((a, b) => a + b);
    let totalPriceRsult = totalPriceHandle;
    // check if voucher body existed
    if (!!voucherCode) {
      const voucher = await Voucher.findOne({ where: { code: voucherCode } });
      if (!voucher) {
        return {
          statusCode: 400,
          message: 'Voucher do not exist or expired!'
        }
      };
      if (Date.now() < voucher.startTime) {
        return {
          statusCode: 400,
          message: 'Voucher do not start!'
        }
      }
      if (Date.now() > voucher.endTime) {
        return {
          statusCode: 400,
          message: 'Voucher expired!'
        }
      }
      totalPriceRsult -= voucher.discountMoney;
      //Update order total price and voucher id
      await order.update({ totalPrice: totalPriceRsult, voucherId: voucher.id });
      let quantityVoucher = voucher.quantity - 1;
      //Update quantity of voucher
      await voucher.update({ quantity: quantityVoucher })

    }
    await order.update({ totalPrice: totalPriceRsult });
    response.data = order
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response
};

export const getOrderService = async (query) => {
  const response = {
    statusCode: 200,
    message: 'Order Listed',
    data: {}
  }
  try {
    let page = parseInt(query.page);
    const limit = 2;
    const offset = page ? (page * limit) : 0;

    const order = await Order.findAndCountAll({
      limit,
      offset,
      where: { email: { [Op.like]: '%' + query.email + '%' } },
      include: { model: OrderItem }
    });

    response.data = order;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response
}

export const getOrderByIdService = async (id) => {
  const response = {
    statusCode: 200,
    message: 'Order getted',
    data: {}
  }

  try {
    const order = await Order.findOne({ where: id });
    if (order === null) {
      return {
        statusCode: 404,
        message: 'Order not found',
        data: {}
      }
    };
    response.data = order;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

export const deleteOrderService = async (id) => {
  const response = {
    statusCode: 200,
    message: 'Order Deleted',
    data: {}
  }
  try {
    const order = await Order.findOne({ where: id });
    if (order === null) {
      return {
        statusCode: 404,
        message: 'Order not found',
        data: {}
      }
    };
    await order.destroy();
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response;
}