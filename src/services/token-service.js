function getToken() {
  return window.localStorage.getItem("token");
}

function setToken(token) {
  return window.localStorage.setItem("token", token);
}

function deleteToken() {
  return window.localStorage.removeItem("token");
}

export const tokenService = {
  getToken,
  setToken,
  deleteToken,
};
