const mongoose = require("mongoose");
const express = require("express");
const app = require("./index");
const AppError = require("./utils/appError");
const errorController = require("./controllers/errorController");

mongoose.connect(
  "mongodb+srv://lilli2203:partharora@cluster0.qojfnju.mongodb.net/",
  { dbName: "todoc", useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

mongoose.connection.on("error", (err) => {
  console.log(`Failed to connect to MongoDB: ${err}`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});
const todoSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'A todo must have a title'] },
  completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema);
app.get("/todos", async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      status: "success",
      results: todos.length,
      data: { todos }
    });
  } catch (err) {
    next(err);
  }
});

app.post("/todos", async (req, res, next) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json({
      status: "success",
      data: { todo: newTodo }
    });
  } catch (err) {
    next(err);
  }
});

app.patch("/todos/:id", async (req, res, next) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedTodo) {
      return next(new AppError('No todo found with that ID', 404));
    }
    res.status(200).json({
      status: "success",
      data: { todo: updatedTodo }
    });
  } catch (err) {
    next(err);
  }
});

app.delete("/todos/:id", async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return next(new AppError('No todo found with that ID', 404));
    }
    res.status(204).json({
      status: "success",
      data: null
    });
  } catch (err) {
    next(err);
  }
});
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorController);

app.listen(3000, () => {
  console.log("App started on port 3000");
});

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else if (process.env.NODE_ENV === 'production') {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      console.error('ERROR 💥', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!'
      });
    }
  }
};

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
