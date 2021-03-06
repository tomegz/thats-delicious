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
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!'
    }],
    address: {
      type: String,
      required: 'You must supply an address!'
    }
}
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