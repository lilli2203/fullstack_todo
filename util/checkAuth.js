import { redirect } from "react-router-dom";

export const getAuthToken = () => {
  localStorage.getItem("key");
};

export const tokenLoader = () => {
  return getAuthToken();
};

export const checkAuthLoader = () => {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }
};

export const setAuthToken = (token) => {
  localStorage.setItem("key", token);
};
