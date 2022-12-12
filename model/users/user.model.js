const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
});

module.exports = userModel = mongoose.model("user", userSchema);
