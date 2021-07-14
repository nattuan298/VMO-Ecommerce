import Category from "../models/category.model.js";
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

export const createCategoryService = async (body) => {
  const response = {
    statusCode: 200,
    message: 'Category created',
    data: {}
  }
  const { name, banner } = body;
  try {
    const existedCate = await Category.findOne({ where: { name } });
    if (!!existedCate) {
      return {
        statusCode: 201,
        message: `Category existed`,
        data: {}
      }
    }
    const category = await Category.create({ name, banner });
    response.data = category;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response
};

export const getCategoryService = async (query) => {
  const response = {
    statusCode: 200,
    message: 'Category Listed',
    data: {}
  }
  try {
    let page = parseInt(query.page);
    const limit = 2;
    const offset = page ? (page * limit) : 0;

    const cate = await Category.findAndCountAll({
      limit,
      offset,
      where: { name: { [Op.like]: '%' + query.name + '%' } },
      order: [['name', 'ASC']],
    });
    response.data = cate;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response
}

export const getCategoryByIdService = async (id) => {
  const response = {
    statusCode: 200,
    message: `Category get by ID`,
    data: {}
  }
  try {
    const cate = await Category.findOne({ where: id });
    if (cate === null) {
      return {
        statusCode: 404,
        message: 'Category not found',
        data: {}
      }
    };
    response.data = cate;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response;
};

export const updateCategoryService = async (id, body) => {
  const response = {
    statusCode: 200,
    message: 'Book Updated',
    data: {}
  }
  try {
    if (!!body.name) {
      const cateExisted = await Category.findAll({ where: { name: body.name } });
      if (cateExisted[0]?.name == body.name) {
        return {
          statusCode: 400,
          message: 'Category existed',
          data: {}
        }
      }
    }
    const cate = await Category.findOne({ where: id });
    await cate.update(body, { where: id });
    response.data = cate;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response;
}

export const deleteCategoryService = async (id) => {
  const response = {
    statusCode: 200,
    message: 'Category Deleted',
    data: {}
  }
  try {
    const cate = await Category.findOne({ where: id });
    await cate.destroy();
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message
  }
  return response;
}

// Upload 
export const uploadBannerService = async (id, file) => {
  const response = {
    statusCode: 200,
    message: 'Upload banner successful',
    data: {}
  }
  try {
    const category = await Category.findOne({ where: id });
    const uploadBanner = await category.update({ banner: file.filename })
    response.data = uploadBanner;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
};

//Set position banner
export const positionBanner = async (body) => {
  const response = {
    statusCode: 200,
    message: 'Position Banner Created',
    data: {}
  }
  const { categories } = body;
  try {

    // Get position in body and save it by Id in body.
    const positionMap = categories.map(async (data) => {
      const category = await Category.findOne({ where: { id: data.id } });
      await category.update({ position: data.position });
      return data.position;
    });
    const positionPromise = await Promise.all(positionMap);
    const positionData = positionPromise;

    //sort position increment
    positionData.sort((a, b) => a - b);

    //Get banner by postion
    const bannerMap = positionData.map(async (data) => {
      const getBanner = await Category.findOne({ where: { position: data } });
      return getBanner.banner;
    })

    const bannerPromise = await Promise.all(bannerMap);

    //Create array banner by position increment, so FE will handle this array to show banner.
    const bannerArray = bannerPromise;

    response.data = bannerArray;
  } catch (error) {
    response.statusCode = 500;
    response.message = error.message;
  }
  return response;
}