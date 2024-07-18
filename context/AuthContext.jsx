/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { getAuthToken, setAuthToken } from "../util/checkAuth";
import { login, signup } from "../services/authServices";

export const AuthContext = React.createContext({
  loggedIn: false,
  loggedUser: {},
  token: "",
  onLogin: () => {},
  onSignup: () => {},
  onLogout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    // Check localStorage for an existing token and user data
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("currentUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setCurrentUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }
  }, []);

  const loginHandler = (userObj, callback) => {
    login(
      userObj,
      (userData, authToken) => {
        setCurrentUser(userData);
        setToken(authToken);
        setLoggedIn(true);
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        callback();
      },
      setAuthToken
    );
  };

  const logoutHandler = () => {
    setLoggedIn(false);
    setToken("");
    setCurrentUser({});
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
  };


  const signupHandler = (userObj, callback) => {
    signup(
      userObj,
      (userData, authToken) => {
        setCurrentUser(userData);
        setToken(authToken);
        setLoggedIn(true);
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        callback();
      },
      setAuthToken
    );
  };


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
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
