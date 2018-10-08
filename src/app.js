const express = require("express");
const app = express();
const { PORT = 5000, NODE_ENV = "development" } = process.env;
const processErrorMessage = require("./errorHandling/errors");

if (NODE_ENV === "development") {
  require("dotenv").load();
  app.use(require("morgan")("dev"));
}

app.use(require("cors")());
app.use(require("body-parser").json());

// ROUTES
app.use("/api/users", require("./routes/01_users"));
app.use("/api/allergens", require("./routes/02_allergens"));
app.use("/api/users/:userId/allergens", require("./routes/user_allergen"));
app.use("/api/allergens/:allergenId/aliases", require("./routes/aliases"));
app.use("/api/products", require("./routes/products"));
app.use("/api/users/:userId/barcode", require("./routes/lists"));

// DEFAULT ROUTES
app.use((req, res) => {
  const status = 404;
  const message = `Could not ${req.method} ${req.path}`;
  res.status(status).json({ status, message });
});

// ERROR HANDLING
app.use((err, req, res, next) => {
  err = processErrorMessage(err);
  if (process.env.NODE_ENV !== "testing") console.error(err);
  const { status, message } = err;
  res.status(status).json({ status, message });
});

// STARTING SERVER
if (NODE_ENV !== "testing") {
  const listener = () => console.log(`Listening on port ${PORT}!`);
  app.listen(PORT, listener);
}

module.exports = app;
