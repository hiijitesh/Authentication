const express = require("express");
const router = express.Router();

const userController = require("../controllers/authController");

router.post("/signup", userController.register);

module.exports = router;
