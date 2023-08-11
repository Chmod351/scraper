import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import config from './config/envConfig.js';
import dbConfig from './config/serverConfig.js';
import scrape from './routes.js';
import { errorHandler } from './helpers/errorHandler.js';
import configureMiddlewares from './middlewares/middlewares.js';

// CONFIG
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const version = 'v1';
const port = config.port;
const server = config.host;

//MIDDLEWARES
configureMiddlewares(app);

//ROUTES
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assests')));
app.use(`/api/${version}`, scrape);

//redirect all routes to the public route
app.use((req, res, next) => {
  if (!req.route) {
    res.redirect('/public/html.html');
  } else {
    next();
  }
});

app.use(errorHandler);

app.listen(port, function () {
  dbConfig();
  console.log(`the api is running on ${server}:${port}/api/${version}
   site is on ${server}:${port}/public/html.html
   swagger ${server}:${port}/api/${version}/docs
`);
});
