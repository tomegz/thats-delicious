const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please provide Store's name"
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String]
});

module.exports = mongoose.model("Store", storeSchema);