import Item from '../models/item.model.js';
import DetailImage from '../models/detail-image.js';
import OrderItem from '../models/order-item.model.js';
import Sequelize from 'sequelize';
import Category from '../models/category.model.js';

const Op = Sequelize.Op;

export const createItemService = async (body) => {
  const response = {
    statusCode: 200,
    message: 'Item created',
    data: {}
  }
  const { name, barcode, importPrice, sellPrice, weight, quantity, description, brand, categoryId } = body;
  try {
    const existedItem = await Item.findOne({ where: { name } });
    if (!!existedItem) {
      return {
        statusCode: 201,
        message: `Category existed`,
        data: {}
      }
    }
    const item = await Item.create({ name, barcode, importPrice, sellPrice, weight, quantity, description, brand, categoryId });

    response.data = item;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response
};

export const uploadMultipleImageService = async (id, files, file) => {
  const response = {
    statusCode: 200,
    message: 'Upload detail image successful',
    data: {}
  }
  try {
    const item = await Item.findOne({ where: id });
    if (!item) {
      return {
        statusCode: 404,
        message: 'Item not found',
        data: {}
      }
    }
    await item.update({ image: file.filename })
    if (files) {
      files.map(async (files) => {
        const uploadImage = await DetailImage.create({ image: files.filename, itemId: item.id })
        response.data = uploadImage;
      })
    }
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

export const getItemService = async (query) => {
  const response = {
    statusCode: 200,
    message: 'Item Listed',
    data: {}
  }
  try {
    let page = parseInt(query.page);
    let { price, name } = query;
    const limit = 2;
    const offset = page ? (page * limit) : 0;

    const item = await Item.findAndCountAll({
      limit,
      offset,
      where: {
        name: { [Op.like]: '%' + name + '%' },
        sellPrice: { [Op.gte]: price }
      },
      order: [['name', 'ASC']],
      include: { model: Category }
    });

    response.data = item;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response
}

export const getItemByIdService = async (id) => {
  const response = {
    statusCode: 200,
    message: `Item get by ID`,
    data: {}
  }
  try {
    const item = await Item.findOne({ where: id, include: { model: DetailImage } });
    if (item === null) {
      return {
        statusCode: 404,
        message: 'Item not found',
        data: {}
      }
    };
    response.data = item;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response;
};

export const updateItemService = async (id, body) => {
  const response = {
    statusCode: 200,
    message: 'Item Updated',
    data: {}
  }
  try {
    if (!!body.name) {
      const itemExisted = await Item.findAll({ where: { name: body.name } });
      if (itemExisted[0]?.name == body.name) {
        return {
          statusCode: 400,
          message: 'Item existed',
          data: {}
        }
      }
    }
    const item = await Item.findOne({ where: id });
    console.log(id);
    await item.update(body, { where: id });
    response.data = item;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response;
}

export const deleteItemService = async (id) => {
  const response = {
    statusCode: 200,
    message: 'Item Deleted',
    data: {}
  }
  const idValue = Object.values(id);
  try {
    //Check if order created, cannot delete item
    const existedOrderItem = await OrderItem.findOne({ where: { itemId: idValue } });
    if (!!existedOrderItem) {
      return {
        statusCode: 400,
        message: 'Can not delete item when order created!'
      }
    }

    const item = await Item.findOne({ where: { id: idValue } });
    if (item === null) {
      return {
        statusCode: 404,
        message: 'Item not found',
        data: {}
      }
    };
    await item.destroy();
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response;
}