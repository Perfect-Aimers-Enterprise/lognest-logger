const formatLog = require("./formatter");
const { getConfig } = require("./config");
const { saveLog } = require("./db");
const { parseStack, getCurrentStackTrace } = require("./utils/stackParser");

function log(level, message, meta, traceOverride = null) {
  const { appName } = getConfig();

  const stackToParse = meta.stack || traceOverride || getCurrentStackTrace();
  const trace = parseStack(stackToParse);

  const vscodeLink = trace.full && trace.full.includes(":") ? `at ${trace.full}` : trace.full;

  const logData = formatLog(level, message, meta, appName, {
    file: trace.file || "unknown",
    line: trace.line || "?",
    vscodeLink: vscodeLink,
  });

  saveLog(logData);
}

module.exports = {
  log,
  error: (msg, meta) => log("error", msg, meta),
  warn: (msg, meta) => log("warn", msg, meta),
  info: (msg, meta) => log("info", msg, meta),
  success: (msg, meta) => log("success", msg, meta),
};
