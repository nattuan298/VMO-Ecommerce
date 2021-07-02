import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Ecommerce API',
      version: '1.0.0',
      author: 'N A T'
    }
  },
  apis: ['../routes/index.route.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default (swagger) => {
  swagger.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
}
/**
 * @swagger
 * /users:
 *    get:
 *      description: Get all users
 *        200:
 *          description: Success
 */