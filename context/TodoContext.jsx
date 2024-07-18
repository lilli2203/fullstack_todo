
import React, { useState, useEffect } from "react";

export const TodoContext = React.createContext({
  todos: [],
  displayTodos: [],
  activeDay: "",
  onUpdateString: () => {},
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {},
  onToggleComplete: () => {},
});

const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [todoString, setTodoString] = useState(new Date().toDateString());

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const displayTodos = todos.filter(
    (todo) => todo.date.toDateString() === todoString
  );

  const createTodoHandler = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTodoHandler = (updatedTodos) => {
    setTodos(updatedTodos);
  };

  const updateTodoStringHandler = (newDateString) => {
    setTodoString(newDateString);
  };

  const deleteTodoHandler = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const toggleCompleteHandler = (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const clearCompletedTodosHandler = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        activeDay: todoString,
        displayTodos,
        onUpdateString: updateTodoStringHandler,
        onCreate: createTodoHandler,
        onUpdate: updateTodoHandler,
        onDelete: deleteTodoHandler,
        onToggleComplete: toggleCompleteHandler,
        onClearCompleted: clearCompletedTodosHandler,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
