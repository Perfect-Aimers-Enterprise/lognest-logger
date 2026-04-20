const express = require("express");
const lognest = require("lognest-logger");

const app = express();

lognest.init({
  appName: "my-api",
});

app.use(lognest.middleware());

// SUCCESS (200)
app.get("/success", (req, res) => {
  res.status(200).send("Success route");
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

// Default
app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(3000, () => {
  console.log("Server running...");
});
