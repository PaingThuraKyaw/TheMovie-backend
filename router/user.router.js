const { body } = require("express-validator");
const { register, Login } = require("../controller/user.controller");

const UserRouter = require("express").Router();
const User = require("../model/user");
UserRouter.post(
  "/register",
  [
    body("username").trim().isString().withMessage("username is required!"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .custom(async (value) => {
        const user = await User.findOne({ value });
        if (user) {
          throw new Error("Email is exist!");
        }
      }),
    body("password")
      .isString()
      .trim()
      .isLength({ min: 4 })
      .withMessage("password must be greater than 4"),
  ],
  register
);

UserRouter.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password")
      .isString()
      .trim()
      .isLength({ min: 4 })
      .withMessage("password must be greater than 4"),
  ],
  Login
);

module.exports = UserRouter;
