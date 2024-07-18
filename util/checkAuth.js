import { redirect } from "react-router-dom";


export const getAuthToken = () => {
  return localStorage.getItem("key");
};


export const tokenLoader = () => {
  const token = getAuthToken();
  if (!token) {
    console.warn("No token found in localStorage.");
  }
  return token;
};


export const checkAuthLoader = () => {
  const token = getAuthToken();
  if (!token) {
    console.log("Token missing, redirecting to /auth.");
    return redirect("/auth");
  }
  console.log("Token exists, access granted.");
};


export const setAuthToken = (token) => {
  if (!token) {
    console.error("Attempted to set an empty token.");
    return;
  }
  localStorage.setItem("key", token);
  console.log(`Token set: ${token}`);
};


export const removeAuthToken = () => {
  localStorage.removeItem("key");
  console.log("Token removed from localStorage.");
};


export const validateTokenFormat = (token) => {
  const tokenPattern = /^[A-Za-z0-9\-_.]+?\.[A-Za-z0-9\-_.]+?\.[A-Za-z0-9\-_.]+$/;
  return tokenPattern.test(token);
};


export const getTokenExpirationDate = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const { exp } = JSON.parse(jsonPayload);
    return new Date(exp * 1000);
  } catch (e) {
    console.error("Failed to decode token:", e);
    return null;
  }
};

export const isTokenExpired = (token) => {
  const expirationDate = getTokenExpirationDate(token);
  if (!expirationDate) {
    console.warn("Could not determine token expiration.");
    return true;
  }
  const now = new Date();
  return now >= expirationDate;
};

export const validateAndRedirect = () => {
  const token = tokenLoader();
  if (token) {
    if (validateTokenFormat(token) && !isTokenExpired(token)) {
      console.log("Token is valid and not expired.");
      return true;
    } else {
      console.warn("Token is invalid or expired.");
      removeAuthToken();
      return redirect("/auth");
    }
  } else {
    console.warn("No token found.");
    return redirect("/auth");
  }
};
