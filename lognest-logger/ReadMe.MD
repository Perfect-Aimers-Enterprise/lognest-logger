# LogNest Logger

A simple, clean, and powerful logging library for Node.js with optional database support and Express middleware.

---

## 🚀 Installation

```bash
npm install lognest-logger
```

---

## ⚡ Basic Usage

```js
const lognest = require("lognest-logger");

lognest.init({
  appName: "my-api",
});

lognest.info("Server started");
```

---

## 🗄️ Using with Database (Optional)

LogNest supports saving logs to MongoDB if a `dbUrl` is provided.

```js
lognest.init({
  appName: "my-api",
  dbUrl: "mongodb://localhost:27017/logs",
});
```

---

## 🌐 Using with Express (Middleware)

Automatically log requests, responses, and status codes.

```js
const express = require("express");
const lognest = require("lognest-logger");

const app = express();

lognest.init({
  appName: "my-api",
});

app.use(lognest.middleware());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000);
```

---

## 🎨 Log Levels

- `error` → 🔴 Red
- `warn` → 🟡 Yellow
- `info` → 🔵 Blue
- `success` → 🟢 Green

---

## 🧱 Log Structure

Logs follow a consistent structure:

```json
{
  "level": "error",
  "message": "Something failed",
  "timestamp": "ISO string",
  "appName": "my-api",
  "meta": {}
}
```

---

## 🧠 Philosophy

- Simple to use
- Clean terminal output
- Optional persistence
- Developer-friendly

---

## 📌 Future Improvements

- Request ID tracking
- Error stack parsing
- VS Code extension integration

---

## 📄 License

ISC

```

```
