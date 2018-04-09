const mongoose = require("mongoose");
const slug = require("slugs");
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

storeSchema.pre("save", function(next) {
  if(!this.isModified) {
    return next();
  }
  // TODO: make the slugs unique
  this.slug = slug(this.name);
  next();
})

module.exports = mongoose.model("Store", storeSchema);