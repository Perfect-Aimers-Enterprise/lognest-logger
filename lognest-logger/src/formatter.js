const chalk = require("chalk");

function formatLog(level, message, meta = {}, appName, extra = {}) {
  const timestamp = new Date().toISOString();

  const baseLog = {
    level,
    message,
    timestamp,
    appName,
    meta,
    ...extra,
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

  const metaParts = [];
  if (meta.method) metaParts.push(meta.method);
  if (meta.route) metaParts.push(meta.route);
  if (meta.statusCode) metaParts.push(chalk.white(meta.statusCode));
  if (meta.duration) metaParts.push(chalk.magenta(meta.duration));

  const metaString = metaParts.length > 0 ? `| ${metaParts.join(" • ")}` : "";

  console.log(`
${chalk.gray("--------------------------------------------------")}
${coloredLevel} ${chalk.white(message)} 
Meta: ${metaString}
Time: ${timestamp}
${chalk.gray("At:")} ${chalk.cyan.underline(extra.vscodeLink)}
${chalk.gray("--------------------------------------------------")}`);

  return { level, message, timestamp, appName, meta, ...extra };
}

module.exports = formatLog;
