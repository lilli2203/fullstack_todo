import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.jsx";
import TodoContextProvider from "./context/TodoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TodoContextProvider>
        <App />
      </TodoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
