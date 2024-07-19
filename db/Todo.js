const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: [true, "A Todo must have a title"] },
  done: { type: Boolean, default: false },
  date: { type: String },
  userId: { type: String, required: [true, "A todo must have a creator"] },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
