import jwt from "jsonwebtoken";

function getToken() {
  return window.localStorage.getItem("token");
}

function setToken(token) {
  return window.localStorage.setItem("token", token);
}

function deleteToken() {
  return window.localStorage.removeItem("token");
}

function decodeToken() {
  const token = getToken();
  return token ? jwt.decode(token) : null;
}

export const tokenService = {
  getToken,
  setToken,
  deleteToken,
  decodeToken,
};
