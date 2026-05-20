const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    carName: { type: String, required: true },
    dailyRentPrice: { type: Number, required: true },
    carType: { type: String, required: true },
    imageURL: { type: String, required: true },
    seatCapacity: { type: Number, required: true },
    pickupLocation: { type: String, required: true },
    description: { type: String, required: true },
    availability: { type: Boolean, default: true },
    bookingCount: { type: Number, default: 0 },
    ownerEmail: { type: String, required: true },
    ownerName: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Car", carSchema);
