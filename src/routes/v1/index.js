const express = require("express");
const router = express.Router();

const UserController = require(`${config.path.controller}/v1/userController`);
const AuthController = require(`${config.path.controller}/v1/authController`);

router.get("/", (req, res) => {
  res.json("Welcome to YSC api homepage");
});

router.post("/register", AuthController.register.bind(AuthController));
router.get("/users", UserController.index.bind(UserController));

module.exports = router;
