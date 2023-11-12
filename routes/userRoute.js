const express = require("express");
const router = express.Router();

const isAuth = require("../middlewares/auth");

const userController = require("../controllers/authController");

router.post("/signup", userController.register);
router.post("/login", userController.login);
router.get("/get", isAuth, userController.getUsers);

module.exports = router;
