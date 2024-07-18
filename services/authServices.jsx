export const login = async (
  userObj,
  callback,
  setAuthToken,
  setCurrentUser,
  setLoggedIn,
  setToken
) => {
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
  }
};

export const signup = async (
  userObj,
  callback,
  setAuthToken,
  setCurrentUser,
  setLoggedIn,
  setToken
) => {
  const response = await fetch(`http://localhost:3000/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObj),
  });

  const data = await response.json();

  if (response.ok) {
    console.log("signup response is Ok");
    setToken(data.token);
    setCurrentUser(data.data.user);
    setLoggedIn(true);
    setAuthToken(data.token);
    callback("/home");
  }
};
