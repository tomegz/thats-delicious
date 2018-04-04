const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes/index");
const helpers = require("./helpers");

// Express app
const app = express();

// Turn raw request into useful properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// Views setup
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug');

// Routes
app.use("/", routes);

module.exports = app;