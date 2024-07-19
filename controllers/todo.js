const Todo = require("../db/Todo");
const catchAsync = require("./../utils/catchAsync.js");

exports.getAllTodos = catchAsync(async (req, res, next) => {
  const userId = "partharora";
  // const userId = req.id;
  // this has come like req.id after we pass the function from the checkAuth middleware

  const todos = await Todo.find({ userId });

  res.status(200).json({
    status: "success",
    results: todos.length,
    data: {
      todos,
    },
  });
});

exports.createTodos = catchAsync(async (req, res, next) => {
  const userId = "partharora";
  // this userID will aslo come from req.id after we pass from the checkAuth middleware
  const todo = { ...req.body, userId };

  const newTodo = await Todo.create(todo);

  res
    .status(201)
    .json({ data: { newTodo }, message: "Todo created Successfully" });
});

exports.deleteTodos = catchAsync(async (req, res, next) => {
  // just need to check whether the user is authenticated or not to acceess that routes or not
  await Todo.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.updateTodos = catchAsync(async (req, res, next) => {
  const newTodo = await Todo.findById({ _id: req.params.id });

  await Todo.updateOne(
    { _id: req.params.id },
    { done: !newTodo.done },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: { todo: newTodo },
  });
});
