# 🦅 LogNest Logger

A powerful, structured Node.js logger that turns messy stack traces into **clean, clickable VS Code links**. Designed specifically for Express developers who want to stay in the flow.

---

## 🚀 Installation

```bash
npm install lognest-logger
```

---

## ⚙️ Configuration

Initialize LogNest at the very start of your app.

```js
const logger = require("lognest-logger");

logger.init({
  appName: "my-api",
  dbUrl: "mongodb://localhost:27017/logs", // Optional: Saves logs to MongoDB
});
```

---

## 🌐 Express Integration

LogNest provides two types of middleware: one for tracking requests and one for catching errors.

### 1. Request Tracking

Place this at the top of your middleware stack to log every incoming request.

```js
app.use(logger.middleware());
```

### 2. Error Handling (The "Cleaner")

**Important:** Place this at the very bottom of your file, after all routes. This intercepts errors and formats them beautifully.

```js
// After all routes
app.use(logger.errorMiddleware);
```

### 3. Async Wrapper

Use `logger.wrap` to ensure async errors are caught and passed to the logger correctly.

```js
app.get(
  "/users",
  logger.wrap(async (req, res) => {
    const users = await User.find(); // If this fails, LogNest catches it!
    res.json(users);
  }),
);
```

---

## 🖱️ Manual Logging (The `.info`, `.success`, etc.)

You can log manually anywhere in your app. LogNest automatically captures the file and line number where the log was called.

```js
// Simple message
logger.info("Database connected");

// Message with Metadata
logger.warn("High memory usage", { usage: "85%", pid: 1234 });

// Success messages
logger.success("Payment processed", { amount: 500, currency: "USD" });

// Error logging (Manual)
try {
  throw new Error("Disk Full");
} catch (err) {
  logger.error(err.message, { stack: err.stack });
}
```

---

## 🎨 Clean Terminal Output

LogNest transforms standard Node.js output into a structured block:

```text
--------------------------------------------------
ERROR | Connection Timeout | GET • /api/v1/users • 500
at C:\Users\Project\server.js:45:12
--------------------------------------------------
```

_Note: The "at..." line is a **clickable link** in VS Code. Ctrl+Click to jump directly to the error._

---

## 🧱 Log Structure

Every log (stored or printed) follows this schema:

| Field        | Description                                              |
| :----------- | :------------------------------------------------------- |
| `level`      | `error`, `warn`, `info`, or `success`                    |
| `message`    | The primary log message                                  |
| `timestamp`  | ISO 8601 string                                          |
| `appName`    | Your configured app name                                 |
| `meta`       | Object containing route, method, status, and custom data |
| `vscodeLink` | Direct path to the file and line of the event            |

---

## 📂 Project Structure

For version 2.0, LogNest is now modular:

- `utils/stackParser.js`: The engine that cleans up stack traces.
- `middleware/`: Specific handlers for Express requests and errors.
- `logger.js`: The core logging logic.

---

## 📄 License

MIT

## 🔗 Repository

[https://github.com/Perfect-Aimers-Enterprise/lognest-logger.git](https://github.com/Perfect-Aimers-Enterprise/lognest-logger.git)

```

```
