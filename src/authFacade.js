import { LoginURLUser } from "./settings";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function authFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/
  const setToken = (token) => {
    localStorage.setItem("x-access-token", token);
  };
  const getToken = () => {
    return localStorage.getItem("x-access-token");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("x-access-token");
  };


  const login = (user, password) => {

    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(LoginURLUser(), options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  const createUserOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        //"Content-Type": "multipart/form-data",
        "Accept": "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = body;
    }
    return opts;
  };
  return {
    makeOptions,
    createUserOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
  };
}
const facade = authFacade();
export default facade;
