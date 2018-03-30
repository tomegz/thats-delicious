const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes/index");

// Express app
const app = express();

// Turn raw request into useful properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Views setup
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug');

// Routes
app.use("/", routes);

module.exports = app;