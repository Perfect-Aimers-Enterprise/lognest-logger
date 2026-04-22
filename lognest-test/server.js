const express = require("express");
const logger = require("lognest-logger");

const app = express();

logger.init({
  appName: "my-api",
});

app.use(logger.middleware());

// logger.info("Manual check");
// SUCCESS (200)
app.get("/successes", (req, res) => {
  res.status(201).send("Success route");
});

// INFO (redirect)
app.get("/info", (req, res) => {
  res.redirect("/success");
});

// WARN (404)
app.get("/warn", (req, res) => {
  res.status(404).send("Not found");
});

// ERROR (500)
app.get("/error", (req, res) => {
  res.status(500).send("Server error");
});

app.get("/errormessage", (req, res) => {
  throw new Error("Boom");
});

app.get(
  "/errorasync",
  logger.wrap(async (req, res) => {
    throw new Error("Async Boom");
  }),
);

// Default
app.get("/", (req, res) => {
  res.send("Home");
});

app.use(logger.errorMiddleware);
app.listen(3000, () => {
  console.log("Server running...");
});
