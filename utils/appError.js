class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message = "Invalid input data") {
    super(message, 400);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access") {
    super(message, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message = "Forbidden access") {
    super(message, 403);
  }
}

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ],
});

router.get("/", async (req, res, next) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error) {
    next(new AppError("Error retrieving todos", 500));
  }
});

router.post("/", validateTodo, async (req, res, next) => {
  try {
    const newTodo = await createTodos(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    next(new AppError("Error creating todo", 500));
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const todo = await getTodoById(req.params.id);
    if (!todo) return next(new NotFoundError("Todo not found"));
    res.json(todo);
  } catch (error) {
    next(new AppError("Error retrieving todo", 500));
  }
});

router.patch("/:id", validateTodo, async (req, res, next) => {
  try {
    const updatedTodo = await updateTodos(req.params.id, req.body);
    if (!updatedTodo) return next(new NotFoundError("Todo not found"));
    res.json(updatedTodo);
  } catch (error) {
    next(new AppError("Error updating todo", 500));
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await deleteTodos(req.params.id);
    if (!result) return next(new NotFoundError("Todo not found"));
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    next(new AppError("Error deleting todo", 500));
  }
});

// Route to mark a todo as complete
router.patch("/:id/complete", async (req, res, next) => {
  try {
    const completedTodo = await completeTodo(req.params.id);
    if (!completedTodo) return next(new NotFoundError("Todo not found"));
    res.json(completedTodo);
  } catch (error) {
    next(new AppError("Error marking todo as complete", 500));
  }
});

router.get("/filter", async (req, res, next) => {
  try {
    const { completed } = req.query;
    const todos = await getFilteredTodos(completed === 'true');
    res.json(todos);
  } catch (error) {
    next(new AppError("Error filtering todos", 500));
  }
});

router.use(notFoundHandler);

router.use(errorHandler);

module.exports = router;


module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
};
