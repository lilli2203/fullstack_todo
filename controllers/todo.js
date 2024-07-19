const Todo = require("../db/Todo");
const catchAsync = require("./../utils/catchAsync.js");


const checkAuth = (req, res, next) => {
  req.id = "partharora"; 
  next();
};

exports.getAllTodos = catchAsync(async (req, res, next) => {
  const userId = req.id;

  const todos = await Todo.find({ userId });

  res.status(200).json({
    status: "success",
    results: todos.length,
    data: {
      todos,
    },
  });
});

exports.createTodo = catchAsync(async (req, res, next) => {
  const userId = req.id;
  const todo = { ...req.body, userId };

  const newTodo = await Todo.create(todo);

  res.status(201).json({
    status: "success",
    message: "Todo created successfully",
    data: {
      todo: newTodo,
    },
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const userId = req.id;
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({
      status: "fail",
      message: "No todo found with that ID",
    });
  }

  if (todo.userId !== userId) {
    return res.status(403).json({
      status: "fail",
      message: "You do not have permission to delete this todo",
    });
  }

  await Todo.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const userId = req.id;
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({
      status: "fail",
      message: "No todo found with that ID",
    });
  }

  if (todo.userId !== userId) {
    return res.status(403).json({
      status: "fail",
      message: "You do not have permission to update this todo",
    });
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { done: !todo.done },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: {
      todo: updatedTodo,
    },
  });
});

exports.getTodoById = catchAsync(async (req, res, next) => {
  const userId = req.id;
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({
      status: "fail",
      message: "No todo found with that ID",
    });
  }

  if (todo.userId !== userId) {
    return res.status(403).json({
      status: "fail",
      message: "You do not have permission to view this todo",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      todo,
    },
  });
});

const validateTodo = (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      status: "fail",
      message: "Title and description are required",
    });
  }
  next();
};

const checkTodoOwnership = catchAsync(async (req, res, next) => {
  const userId = req.id;
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({
      status: "fail",
      message: "No todo found with that ID",
    });
  }

  if (todo.userId !== userId) {
    return res.status(403).json({
      status: "fail",
      message: "You do not have permission to modify this todo",
    });
  }

  next();
});

module.exports = {
  checkAuth,
  validateTodo,
  checkTodoOwnership,
  getAllTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  getTodoById,
};
