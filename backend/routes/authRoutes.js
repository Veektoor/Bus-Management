const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authenticate, authorize } = require("../middlewares/jwt");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET;

// Generate Access Token (Short-lived)
const generateAccessToken = (user) => {
  return jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, {
    expiresIn: "1d", // Token expires in 15 minutes
  });
};

// 🟢 **Signup Route**
router.post("/signup", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    const accessToken = generateAccessToken(user);
  
    res.json({
      user: { _id: user._id, email: user.email, role: user.role },
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// 🟢 **Login Route**
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);

    res.json({
      user: { _id: user._id, email: user.email, role: user.role },
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});


// 🚪 **Logout Route**
router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// 🔐 **Protected Route Example**
router.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

module.exports = router;
