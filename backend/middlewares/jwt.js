const jwt = require("jsonwebtoken");
require("dotenv").config(); 

// 🛡 Authentication Middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token or invalid format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("decoded user:", decoded)
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please log in again" });
    }
    res.status(403).json({ message: "Invalid token", error: error.message });
  }
};

// 🎭 Role-Based Authorization Middleware
const authorize = (roles = []) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user data" });
  }
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
  }
  next();
};

// Export middlewares
module.exports = { authenticate, authorize };
