const express = require("express");
const {
  registerUser,
  loginUser,
  getUserByID,
} = require("../controllers/auth.js");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/user/:id").get(getUserByID);

module.exports = { authRouter: router };
