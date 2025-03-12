const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authentication Middleware
const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Authorization Middleware
const authorize = (requiredRole) => (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Missing token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    if (decoded.role !== requiredRole) {
      return res.status(403).json({ message: 'Access denied. Limited permissions.' });
    }

    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
module.exports = { authenticate, authorize };
