const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, name, photo } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  const token = jwt.sign({ email, name, photo }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({ success: true, message: "Logged in" });
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

module.exports = { login, logout };
