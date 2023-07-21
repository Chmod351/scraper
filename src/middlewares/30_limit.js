import rateLimit from 'express-rate-limit';
import envConfig from '../config/envConfig.js';
const limit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: envConfig.requestLimit,
});

export default limit;
