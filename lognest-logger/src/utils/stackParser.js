function parseStack(stack) {
  if (!stack || typeof stack !== "string") return { full: "Project Root" };

  const lines = stack.split("\n");

  for (const line of lines) {
    const match = line.match(/((?:[a-zA-Z]:)?[^:()]+\.[a-z]{2,5}):(\d+):(\d+)/);

    if (match) {
      const file = match[1].trim();
      const lineNum = match[2];
      const col = match[3];

      const l = file.toLowerCase();

      if (
        l.includes("node_modules") ||
        l.includes("node:internal") ||
        l.includes("lognest-logger") ||
        l.includes("logger.js")
      )
        continue;

      return {
        file,
        line: lineNum,
        column: col,
        full: `${file}:${lineNum}:${col}`,
      };
    }
  }

  return { full: "Project Root" };
}

function getCurrentStackTrace() {
  const obj = {};
  Error.captureStackTrace(obj);
  return obj.stack;
}

module.exports = { parseStack, getCurrentStackTrace };
