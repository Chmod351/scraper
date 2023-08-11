import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import envConfig from '../config/envConfig.js';
import express from 'express';

// config
//
const corsConfig = cors({
  origin: '*',
  allowedHeaders: 'Content-Type',
  methods: ['POST'],
});

const limit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: envConfig.requestLimit,
});

const url = express.urlencoded({ extended: true });
const expressJsonMiddleware = express.json();

const compress = compression();

const morganConfig = morgan('dev');

// middlewares
export default function configureMiddlewares(app) {
  app.use(corsConfig);
  app.use(expressJsonMiddleware);
  app.use(url);
  app.use(limit);
  app.use(compress);
  app.use(morganConfig);
}
