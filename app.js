const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes/index");
const helpers = require("./helpers");
const errorHandlers = require('./handlers/errorHandlers');

// Express app
const app = express();

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

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Turn raw request into useful properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", routes);

app.use(errorHandlers.notFound);

app.use(errorHandlers.flashValidationErrors);

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

module.exports = app;