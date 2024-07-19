const express = require("express");
const checkAuth = require("./../middleware/auth.js");
const {
  createTodos,
  getAllTodos,
  deleteTodos,
  updateTodos,
} = require("../controllers/todo");

const router = express.Router();

// we will add middleware in front of every
router.get("/", getAllTodos);
router.post("/", createTodos);
router.delete("/:id", deleteTodos);
router.patch("/:id", updateTodos);

module.exports = router;
