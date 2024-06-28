const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.controller");

//Register / Signup
router.post("/signup", authController.register);

//Signin / Login
router.post("/signin", authController.login);

module.exports = router;