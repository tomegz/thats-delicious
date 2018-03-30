const mongoose = require("mongoose");
const app = require("./app");

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });
const port = process.env.PORT;

// connect to MongoDB
mongoose.connect(process.env.DATABASE);
mongoose.connection.on("error", (err) => {
  console.log(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 -> ${err.message}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));