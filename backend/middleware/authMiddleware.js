const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes (checks if user is logged in)
const authMiddleware = async (req, res, next) => {
  // get authorization header from request
  const authHeader = req.headers.authorization;

  // check if token exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  // extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  try {
    // verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user in database using ID from token
    const user = await User.findById(decoded.id).select("_id role username email");

    // if user no longer exists
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // attach user info to request object
    req.user = {
      id: user._id.toString(),
      role: user.role,
      username: user.username,
      email: user.email
    };

    // continue to next route
    next();
  } catch (error) {
    // token is invalid or expired
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;