import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function AdminPage({ apiFetchFacade, authFacade, setLogin }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const history = useHistory();

  const login = (user, pass) => {
    authFacade
      .adminLogin(user, pass)
      //This line can probably be removed.
      .then((res) => setLogin)
      .then(() => {
        history.push("/");
        //A temp fix so the user dosen't need to F5
        history.go(0);
      })
      .catch((res) =>
        alert("Status code : " + res.status + " Wrong username or password.")
      );
  };

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" required />
        <input placeholder="Password" id="password" required />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}
