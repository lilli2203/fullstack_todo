const express = require("express");
const checkAuth = require("./../middleware/auth.js");
const {
  createTodos,
  getAllTodos,
  deleteTodos,
  updateTodos,
  getTodoById,
  completeTodo,
} = require("../controllers/todo");
const { validateTodo } = require("../middleware/validation");
const logger = require("./../middleware/logger");

const router = express.Router();


router.use(logger);


router.use(checkAuth);


router.get("/", async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving todos" });
  }
});


router.post("/", validateTodo, async (req, res) => {
  try {
    const newTodo = await createTodos(req.body);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const todo = await getTodoById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving todo" });
  }
});


router.patch("/:id", validateTodo, async (req, res) => {
  try {
    const updatedTodo = await updateTodos(req.params.id, req.body);
    if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteTodos(req.params.id);
    if (!result) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
});


router.patch("/:id/complete", async (req, res) => {
  try {
    const completedTodo = await completeTodo(req.params.id);
    if (!completedTodo) return res.status(404).json({ message: "Todo not found" });
    res.json(completedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error marking todo as complete" });
  }
});


router.get("/filter", async (req, res) => {
  try {
    const { completed } = req.query;
    const todos = await getFilteredTodos(completed === 'true');
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error filtering todos" });
  }
});


router.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = router;
