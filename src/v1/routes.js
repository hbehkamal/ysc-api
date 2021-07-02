const express = require("express");
const router = express.Router();

const userController = require('./user/user.controller');
const userValidation = require('./user/user.validation');
const authController = require('./auth/auth.controller');
const authValidation = require('./auth/auth.validation');

const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');

router.get("/v1", (req, res) => {
  res.json("Welcome to YSC api homepage");
});

// Auth
router.post("/register",  validate(authValidation.register), authController.register);
router.post('/login' ,  validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
router.post('/send-verification-email', auth(), authController.sendVerificationEmail);
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

// User
router
  .route('/')
  .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
  .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

router
  .route('/user/:userId')
  .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
