const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  getAllCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar,
  getMyCars,
} = require("../controllers/carController");

router.get("/", getAllCars);
router.get("/my-cars", verifyToken, getMyCars);
router.get("/:id", getCarById);
router.post("/", verifyToken, addCar);
router.put("/:id", verifyToken, updateCar);
router.delete("/:id", verifyToken, deleteCar);

module.exports = router;
