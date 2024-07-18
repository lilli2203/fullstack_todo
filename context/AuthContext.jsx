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

  const loginHandler = (userObj, callback) => {
    login(
      userObj,
      callback,
      setAuthToken,
      setCurrentUser,
      setLoggedIn,
      setToken
    );
  };

  const logoutHandler = () => {
    setLoggedIn(false);
    setToken("");
    setCurrentUser({});
    localStorage.removeItem("key");
  };

  const signupHandler = (userObj, callback) => {
    signup(
      userObj,
      callback,
      setAuthToken,
      setCurrentUser,
      setLoggedIn,
      setToken
    );
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn: loggedIn,
        loggedUser: currentUser,
        token: token,
        onLogin: loginHandler,
        onSignup: signupHandler,
        onLogout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

/**
 * Two things that I need to implement
 * 1. Reload and preserve the login state
 * 2. Create date wise task
 * 3. Ensure all routes are working perfectly fine.
 */
