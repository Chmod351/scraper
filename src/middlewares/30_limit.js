import rateLimit from 'express-rate-limit';

const limit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 15,
});

export default limit;
