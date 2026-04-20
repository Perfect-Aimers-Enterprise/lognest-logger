const chalk = require("chalk");

function formatLog(level, message, meta = {}, appName) {
  const timestamp = new Date().toISOString();

  const baseLog = {
    level,
    message,
    timestamp,
    appName,
    meta
  };

  let coloredLevel;

  switch (level) {
    case "error":
      coloredLevel = chalk.red("ERROR");
      break;
    case "warn":
      coloredLevel = chalk.yellow("WARN");
      break;
    case "success":
      coloredLevel = chalk.green("SUCCESS");
      break;
    default:
      coloredLevel = chalk.blue("INFO");
  }

  console.log(`
[LOGNEST]
${coloredLevel} | ${message}
Time: ${timestamp}
Meta: ${JSON.stringify(meta)}
`);

  return baseLog;
}

module.exports = formatLog;