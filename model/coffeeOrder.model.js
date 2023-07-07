const mongoose = require("mongoose");
const { extraSugar, typeOfCoffee, orderStatus } = require("../utils/constants");

// Define the order schema
const orderSchema = new mongoose.Schema(
  {
    typeofCoffee: {
      type: String,
      enum: Object.values(typeOfCoffee),
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    extraSugar: {
      type: String,
      enum: Object.values(extraSugar),
      required: false,
    },
    extraRequest: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cafe: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Cafe",
    },
    orderStatus: {
      type: String,
      enum: Object.values(orderStatus),
      default: "pending",
    },
  },
  { timestamps: true }
);

// Create the order model
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
