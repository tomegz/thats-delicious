const mongoose = require("mongoose");
require("./models/Store");
const app = require("./app");

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });
const port = process.env.PORT;
mongoose.Promise = global.Promise;
// import models
require("./models/Store");
// connect to MongoDB
mongoose.connect(process.env.DATABASE);
mongoose.connection.on("error", (err) => {
  console.log(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 -> ${err.message}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));