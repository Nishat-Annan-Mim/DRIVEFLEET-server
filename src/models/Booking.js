const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    carName: { type: String, required: true },
    carImage: { type: String },
    carType: { type: String },
    dailyRentPrice: { type: Number, required: true },
    pickupLocation: { type: String },
    userEmail: { type: String, required: true },
    userName: { type: String },
    driverNeeded: { type: Boolean, default: false },
    specialNote: { type: String },
    bookingDate: { type: Date, default: Date.now },
    status: { type: String, default: "confirmed" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
