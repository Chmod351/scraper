import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config from './config/envConfig.js';
import dbConfig from './config/serverConfig.js';
import options from './config/swaggerConfig.js';
import scrape from './scrapper/scraperRoutes.js';
import { errorHandler } from './helpers/errorHandler.js';
import importMiddlewares from './config/middlewaresConfig.js';

// CONFIG
const app = express();
const specs = swaggerJsdoc(options);
const middlewares = await importMiddlewares();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const port = config.port;
const server = config.host;

//MIDDLEWARES
middlewares.forEach((middleware) => {
  app.use(middleware);
});

//ROUTES
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assests')));
app.use('/api', scrape);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

//redirect all routes to the public route
app.use((req, res, next) => {
  if (!req.route) {
    res.redirect('/public/html.html');
  } else {
    next();
  }
});

app.use(errorHandler); 


dbConfig.testDbConnection();
app.listen(port, function () {
  console.log(`the aplication is running on ${server}:${port} 
   site is on ${server}:${port}/public/html.html
   swagger ${server}:${port}/api/docs
`);
});


