const express = require("express");
const authMiddleware = require("../middlewares/jwtMiddleware"); // Check if you need this in any routes
const router = express.Router();
const {
  registerUser,
  loginUser
} = require("../controllers/userController");

// Route for user registration
router.post("/register", registerUser);

// Route for user login (choose whether authMiddleware is required)
router.post("/login", loginUser); // Without auth
// or
// router.post("/login", authMiddleware, loginUser); // With auth if required

module.exports = router;
