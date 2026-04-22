const { log } = require("../logger");
const { getCurrentStackTrace } = require("../utils/stackParser");

function requestMiddleware() {
  return (req, res, next) => {
    const traceAtRequest = getCurrentStackTrace();
    const start = Date.now();

    res.on("finish", () => {
      const duration = Date.now() - start;
      const status = res.statusCode;

      if (status >= 500) return;
      let level = "info";

      if (status >= 500) level = "error";
      else if (status >= 400) level = "warn";
      else if (status >= 200 && status < 300) level = "success";

      log(
        level,
        `${req.method} ${req.url}`,
        {
          route: req.originalUrl,
          method: req.method,
          statusCode: status,
          duration: `${duration}ms`,
        },
        traceAtRequest,
      );
    });

    next();
  };
}

module.exports = requestMiddleware;
