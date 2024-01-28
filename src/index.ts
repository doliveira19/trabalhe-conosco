import 'dotenv/config';
import app from './app';

const PORT = process.env.APP_PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'dev';

app.listen(PORT, async () => {
  console.log(`App started on PORT ${PORT} ENV [${NODE_ENV}]`);
});
