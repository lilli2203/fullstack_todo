export const login = async (
  userObj,
  callback,
  setAuthToken,
  setCurrentUser,
  setLoggedIn,
  setToken,
  setErrorMessage
) => {
  try {
    const response = await fetch(`http://localhost:3000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    const data = await response.json();

    if (response.ok) {
      setToken(data.token);
      setCurrentUser(data.data.user);
      setLoggedIn(true);
      setAuthToken(data.token);
      callback("/home");
    } else {
      setErrorMessage(data.message || "Login failed.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    setErrorMessage("An error occurred during login.");
  }
};

export const signup = async (
  userObj,
  callback,
  setAuthToken,
  setCurrentUser,
  setLoggedIn,
  setToken,
  setErrorMessage
) => {
  try {
    const response = await fetch(`http://localhost:3000/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    const data = await response.json();

    if (response.ok) {
      setToken(data.token);
      setCurrentUser(data.data.user);
      setLoggedIn(true);
      setAuthToken(data.token);
      callback("/home");
    } else {
      setErrorMessage(data.message || "Signup failed.");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    setErrorMessage("An error occurred during signup.");
  }
};

export const logout = (setAuthToken, setCurrentUser, setLoggedIn, setToken, callback) => {
  setAuthToken(null);
  setCurrentUser(null);
  setLoggedIn(false);
  setToken(null);
  localStorage.removeItem("key");
  callback("/login");
};

export const updateUser = async (
  userObj,
  token,
  setCurrentUser,
  setErrorMessage
) => {
  try {
    const response = await fetch(`http://localhost:3000/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(userObj),
    });

    const data = await response.json();

    if (response.ok) {
      setCurrentUser(data.data.user);
    } else {
      setErrorMessage(data.message || "Update failed.");
    }
  } catch (error) {
    console.error("Error during user update:", error);
    setErrorMessage("An error occurred during update.");
  }
};

export const deleteUser = async (token, callback, setErrorMessage) => {
  try {
    const response = await fetch(`http://localhost:3000/user/delete`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      callback("/signup");
    } else {
      const data = await response.json();
      setErrorMessage(data.message || "Delete failed.");
    }
  } catch (error) {
    console.error("Error during user delete:", error);
    setErrorMessage("An error occurred during delete.");
  }
};

(async () => {
  const userObj = { username: "testuser", password: "password123" };
  const callback = (path) => console.log(`Redirecting to ${path}`);
  const setAuthToken = (token) => console.log(`Auth token set: ${token}`);
  const setCurrentUser = (user) => console.log(`Current user set: ${user}`);
  const setLoggedIn = (loggedIn) => console.log(`Logged in: ${loggedIn}`);
  const setToken = (token) => localStorage.setItem("key", token);
  const setErrorMessage = (message) => console.error(`Error: ${message}`);

  await login(userObj, callback, setAuthToken, setCurrentUser, setLoggedIn, setToken, setErrorMessage);
  await signup(userObj, callback, setAuthToken, setCurrentUser, setLoggedIn, setToken, setErrorMessage);
  logout(setAuthToken, setCurrentUser, setLoggedIn, setToken, callback);
})();
