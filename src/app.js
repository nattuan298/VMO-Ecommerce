import express, { json, urlencoded } from 'express';
import route from './routes/index.route.js';
import sequelize from './models/index.model.js';
import swagger from './swagger/index.swagger.js';


const app = express();

app.set('port', process.env.PORT);

app.use(json());
app.use(urlencoded({ extended: true }));
route(app);
swagger(app);

export default app;