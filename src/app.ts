import express from 'express';
import swaggerMiddleware from './middlewares/swagger';

import routes from './routes/routes';

const app = express();

app.use(express.json({ limit: '10mb' }) as express.RequestHandler);
app.use(express.urlencoded({ extended: true, limit: '10mb' }) as express.RequestHandler);

swaggerMiddleware.setup(app);

app.use(routes);

export default app;
