import app from './src/app.js';
// import express, { json, urlencoded } from 'express';

// const app = express();

// app.set('port', process.env.PORT);

// app.use(json());
// app.use(urlencoded({ extended: true }));

const PORT = app.get('port');

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
})