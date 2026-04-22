const { setConfig } = require("./src/config");
const { connectDB } = require("./src/db");
const logger = require("./src/logger");
const requestMiddleware = require("./src/middleware/requestMiddleware");
const { errorMiddleware, wrap } = require("./src/middleware/errorMiddleware");

function init(options) {
  setConfig(options);
  connectDB();
}

module.exports = {
  init,
  ...logger,
  middleware: requestMiddleware,
  errorMiddleware,
  wrap,
};
