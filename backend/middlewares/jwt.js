const jwt = require('jsonwebtoken');

// Authentication Middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json({ message: 'Unauthorized' });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log(JSON.stringify(req.user));
      next();
    } catch {
      res.status(403).json({ message: 'Invalid token' });
    }
  };
  
  // Role-Based Authorization Middleware (Supports Multiple Roles)
  const authorize = (roles = []) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: You dont have the permissions to access" });
    }
    next();
  };

  module.exports = { authenticate, authorize };