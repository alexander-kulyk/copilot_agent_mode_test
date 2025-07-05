/**
 * Logger middleware for logging incoming requests
 */
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`[${timestamp}] ${method} ${url} - ${ip}`);

  // Log request body for POST and PUT requests
  if ((method === 'POST' || method === 'PUT') && req.body) {
    console.log('Request body:', JSON.stringify(req.body, null, 2));
  }

  next();
};

module.exports = logger;
