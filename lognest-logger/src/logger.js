const formatLog = require("./formatter");
const { getConfig } = require("./config");
const { saveLog } = require("./db");

function log(level, message, meta) {
  const { appName } = getConfig();

  const logData = formatLog(level, message, meta, appName);

  saveLog(logData);
}

function middleware() {
  return (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
      const duration = Date.now() - start;
      const status = res.statusCode;

      let level = "info";

      if (status >= 500) level = "error";
      else if (status >= 400) level = "warn";
      else if (status >= 200 && status < 300) level = "success";

      log(level, `${req.method} ${req.url}`, {
        statusCode: status,
        duration: `${duration}ms`,
      });
    });

    next();
  };
}

module.exports = {
  error: (msg, meta) => log("error", msg, meta),
  warn: (msg, meta) => log("warn", msg, meta),
  info: (msg, meta) => log("info", msg, meta),
  success: (msg, meta) => log("success", msg, meta),
};

module.exports.middleware = middleware;
