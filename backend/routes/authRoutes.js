const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });
    await user.save();
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

// Middleware for Authentication
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: 'Invalid token' });
  }
}; 

// Middleware for Role-based Authorization
const authorize = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ message: 'Forbidden' });
  next();
};

// Protected Route Example
router.get('/admin', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

module.exports = router;
