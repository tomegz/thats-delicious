const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')(session);
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const flash = require('connect-flash');
const path = require("path");
const routes = require("./routes/index");
const helpers = require("./helpers");
const errorHandlers = require('./handlers/errorHandlers');

// Express app
const app = express();

// Views setup
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug');

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Turn raw request into useful properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());
app.use(cookieParser());

/*app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));*/

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  //res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// Routes
app.use("/", routes);

app.use(errorHandlers.notFound);

app.use(errorHandlers.flashValidationErrors);

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

module.exports = app;