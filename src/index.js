import express from 'express';
import options from './config/swaggerConfig.js';
import scrape from './routes/scraper.js';
import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import importMiddlewares from './config/middlewaresConfig.js';
import { fileURLToPath } from 'url';
import config from './config/envConfig.js';

// CONFIG
const specs = swaggerJsdoc(options);
const app = express();
const middlewares = await importMiddlewares();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = config.port;

//MIDDLEWARES
middlewares.forEach((middleware) => {
  app.use(middleware);
});

//ROUTES
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api', scrape);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, function () {
  console.log(`the aplication is running on http://localhost:${port}`);
});
