const Car = require("../models/Car");

const getAllCars = async (req, res) => {
  try {
    const { search, type } = req.query;
    let filter = {};
    if (search) filter.carName = { $regex: search, $options: "i" };
    if (type) filter.carType = type;
    const cars = await Car.find(filter).sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addCar = async (req, res) => {
  try {
    const car = new Car({
      ...req.body,
      ownerEmail: req.user.email,
      ownerName: req.user.name,
    });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    if (car.ownerEmail !== req.user.email)
      return res.status(403).json({ message: "Forbidden" });
    const updated = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    if (car.ownerEmail !== req.user.email)
      return res.status(403).json({ message: "Forbidden" });
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyCars = async (req, res) => {
  try {
    const cars = await Car.find({ ownerEmail: req.user.email }).sort({
      createdAt: -1,
    });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar,
  getMyCars,
};
