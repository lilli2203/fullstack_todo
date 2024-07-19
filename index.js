const express = require("express");
const AppError = require("./utils/appError");
const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");
const globalErrorHandler = require("./controllers/errors.js");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/todos", todoRouter);

// Handling operational errors
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl} on the server`, 404));
});

// This is the global error middleware
app.use(globalErrorHandler);

module.exports = app;
