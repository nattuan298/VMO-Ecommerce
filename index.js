import app from './src/app.js';

const PORT = app.get('port');

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
})