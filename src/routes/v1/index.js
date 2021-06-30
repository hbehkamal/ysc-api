const express = require("express");
const router = express.Router();

const UserController = require(`${config.path.controller}/v1/userController`);
const AuthController = require(`${config.path.controller}/v1/authController`);

const auth = require('../../middlewares/auth');

router.get("/", (req, res) => {
  res.json("Welcome to YSC api homepage");
});

router.post('/login' , AuthController.login.bind(AuthController));
router.post("/register", AuthController.register.bind(AuthController));
router.get("/users", auth, UserController.index.bind(UserController));
router.get("/user/:id", auth, UserController.get.bind(UserController));

module.exports = router;
