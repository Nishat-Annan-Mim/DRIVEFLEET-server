const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  bookCar,
  getMyBookings,
  cancelBooking,
} = require("../controllers/bookingController");

router.post("/:carId", verifyToken, bookCar);
router.get("/my-bookings", verifyToken, getMyBookings);
router.delete("/:id", verifyToken, cancelBooking);

module.exports = router;
