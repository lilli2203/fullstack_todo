/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

export const TodoContext = React.createContext({
  todos: [],
  displayTodos: [],
  activeDay: "",
  onUpdateString: () => {},
  onCreate: () => {},
  onUpdate: () => {},
});

const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const [todoString, setTodoString] = useState(new Date().toDateString());

  // Need to filter the todos to display the todos based on the date change
  // this will be done by attaching a change event using the context when date button is clicked
  // const displayTodos = todos.filter(
  //   (todo) => todo.date.toDateString() === todoString
  // );
  // we can also load all the todos here using the useEffect

  const displayTodos = todos;

  const createTodoHandler = (newTodo) => {
    setTodos((prev) => {
      return [...prev, newTodo];
    });
  };

  const updateTodoHandler = (data) => {
    setTodos(data);
  };

  const updateTodoStringHandler = (string) => {
    setTodoString(string);
  };

  return (
    <TodoContext.Provider
      value={{
        todos: todos,
        activeDay: todoString,
        displayTodos: displayTodos,
        onUpdateString: updateTodoStringHandler,
        onCreate: createTodoHandler,
        onUpdate: updateTodoHandler,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
