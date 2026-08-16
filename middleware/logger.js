// Custom middleware: logs every incoming request with method, url, and timestamp
const requestLogger = (req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = requestLogger;
