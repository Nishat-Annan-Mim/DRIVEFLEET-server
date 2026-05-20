const Booking = require("../models/Booking");
const Car = require("../models/Car");

const bookCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    const booking = new Booking({
      carId: car._id,
      carName: car.carName,
      carImage: car.imageURL,
      carType: car.carType,
      dailyRentPrice: car.dailyRentPrice,
      pickupLocation: car.pickupLocation,
      userEmail: req.user.email,
      userName: req.user.name,
      ...req.body,
    });
    await booking.save();
    await Car.findByIdAndUpdate(car._id, { $inc: { bookingCount: 1 } });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userEmail: req.user.email }).sort({
      createdAt: -1,
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.userEmail !== req.user.email)
      return res.status(403).json({ message: "Forbidden" });
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { bookCar, getMyBookings, cancelBooking };
