const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  taskname: String,
  status: String,
  tag: String,
  userId: String,
});

module.exports = todoModel = mongoose.model("todo", todoSchema);
