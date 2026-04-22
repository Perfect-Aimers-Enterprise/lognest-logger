const { log } = require("../logger");

function errorMiddleware(err, req, res, next) {
  const rawStack = err.stack;

  log(
    "error",
    err.message,
    {
      route: req.originalUrl,
      method: req.method,
      statusCode: 500,
    },
    rawStack,
  );

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    success: false,
    message: err.message,
  });
}

const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { errorMiddleware, wrap };
