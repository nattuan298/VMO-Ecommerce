import Item from '../models/item.model.js';
import DetailImage from '../models/detail-image.js';

export const uploadMultipleImageService = async (id, files) => {
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
    await item.update({ image: files['image'][0].filename })
    if (files['images']) {
      files['images'].map(async (files) => {
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