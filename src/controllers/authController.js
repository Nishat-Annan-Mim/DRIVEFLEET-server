const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { name, email, photo, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res
        .status(409)
        .json({ message: "Email already registered. Please login." });

    const user = new User({ name, email, photo: photo || "", password });
    await user.save();
    res.status(201).json({ success: true, message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, name, photo } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    let userData;

    if (!password) {
      // Google login
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name: name || email.split("@")[0],
          email,
          photo: photo || "",
          password: "google-oauth",
        });
      } else {
        // Update name/photo from Google in case it changed
        user.name = name || user.name;
        user.photo = photo || user.photo;
        await user.save();
      }
      userData = { email: user.email, name: user.name, photo: user.photo };
    } else {
      // Email/password login
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(401)
          .json({ message: "No account found with this email." });
      if (user.password === "google-oauth")
        return res
          .status(401)
          .json({ message: "This account uses Google login." });
      if (user.password !== password)
        return res.status(401).json({ message: "Incorrect password." });

      userData = { email: user.email, name: user.name, photo: user.photo };
    }

    const token = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ success: true, user: userData, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    .json({ success: true, message: "Logged out" });
};

module.exports = { register, login, logout };
