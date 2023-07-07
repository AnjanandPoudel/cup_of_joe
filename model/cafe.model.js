const mongoose = require("mongoose");

// Define the order schema
const cafeSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Owner'
  },
  available: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});

// Create the order model
const Cafe = mongoose.model("Cafe", cafeSchema);
module.exports = Cafe;