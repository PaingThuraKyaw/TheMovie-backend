const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.register = async (req, res) => {
  //error result
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(404).json({
      message: result.array(),
    });
  }

  const { username, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    return res.status(200).json({
      message: "Register Success",
      email: user.email,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Email is exist!",
      error: err.message,
    });
  }
};

exports.Login = async (req, res) => {
  //error result
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(404).json({
      message: result.array(),
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "Email is not exist!",
    });
  }

  console.log(user.password, { password: password });

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return res.status(400).json({
      message: "Password is invaild!",
    });
  }

  const token = jwt.sign(
    { email: user.email, userId: user._id },
    process.env.SECRET_KEY,
    {
      expiresIn: "2hr",
    }
  );

  res.status(200).json({
    message: "Login success",
    token,
    username: user.username,
  });
};
