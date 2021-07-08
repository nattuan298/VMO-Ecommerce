import express, { json, urlencoded } from 'express';
import route from './routes/index.route.js';
import sequelize from './models/index.model.js';
import cors from 'cors';

const app = express();

app.set('port', process.env.PORT);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

route(app);

export default app;