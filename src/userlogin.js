import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function LogIn({ apiFetchFacade, authFacade, setLogin }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const history = useHistory();
  const [response, setResponse] = useState();

  const login = (user, pass) => {
    authFacade
      .login(user, pass)
      //This line can probably be removed.
      //.then((res) => setLogin)
      .then(() => {
        history.push("/");
        //A temp fix so the user dosen't need to F5
        history.go(0);
      })
      .catch((res) => {
        if (res.status === 429) {
          alert(
            "You have reached the maximum tries, please wait 10 minutes to try again."
          );
        } else {
          alert("Status code : " + res.status + " Wrong username or password.");
        }
      });
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
        <input placeholder="User Name" id="username" type="text" required />
        <input placeholder="Password" id="password" type="password" required />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}
