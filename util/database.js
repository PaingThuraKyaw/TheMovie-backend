const { default: mongoose } = require("mongoose");

require("dotenv").config();

exports.connection = async () =>
  await mongoose.connect(process.env.MONGODB_URL);
