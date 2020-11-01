import React, { useState } from "react";
import { useHistory } from "react-router-dom";



  export default function LogIn({ apiFetchFacade, authFacade, setLogin }) {
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);
    const history = useHistory();

    const login = (user, pass) => {
        authFacade
          .login(user, pass)
          //This line can probably be removed.
          .then((res) => setLogin)
          .then((res) => {
            history.push("/");
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
          <input placeholder="User Name" id="username" />
          <input placeholder="Password" id="password" />
          <button onClick={performLogin}>Login</button>
        </form>
      </div>
    );
  }