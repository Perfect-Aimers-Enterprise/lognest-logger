const { setConfig } = require("./src/config");
const { connectDB } = require("./src/db");
const logger = require("./src/logger");

function init(options) {
  setConfig(options);
  connectDB();
}

module.exports = {
  init,
  ...logger,
};
