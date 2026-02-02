const rateLimit = require('express-rate-limit');

// Basic IP-based rate limiter: 60 requests per minute per IP by default
const createRateLimiter = (options = {}) => {
  return rateLimit({
    windowMs: options.windowMs || 60 * 1000,
    max: options.max || 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' },
  });
};

module.exports = createRateLimiter;