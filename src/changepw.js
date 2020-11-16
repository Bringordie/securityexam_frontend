import React, { useState } from "react";
import { ChangePWURL } from "./settings";
import PASSWORD_PATTERN from "./passwordPolicy"

function PasswordChange({ apiFetchFacade }) {
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [errMsg, setErrMsg] = useState("");
  let blankUser = { username: "", secret: "" };
  const [user, setUser] = useState({ ...blankUser });

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    switch (name) {
      case "newPass":
        setNewPass(event.target.value);
        break;
      case "newPass2":
        setNewPass2(event.target.value);
        break;
      default:
        return;
    }
  };

  function userHandler(event) {
    event.preventDefault();
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  }

  function password_validate(pass) {
    return PASSWORD_PATTERN.test(pass);
}

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPass !== newPass2) {
      setErrMsg("The two password entries do not match.");
      return;
    }

    if (!password_validate(user.password)) {
        setErrMsg("Your password did not meet the requirements");
        return;
    }

    const body = {
      username: user.username,
      secret: user.secret,
      newpassword: newPass,
    };
    const url = ChangePWURL()
    apiFetchFacade()
      .putApiCallWBody(url, body)
      .then((data) => {
        setErrMsg("Password was successfully changed.");
        setNewPass("");
        setNewPass2("");
      })
      .catch((err) => {
        setErrMsg("Something went wrong, please try again later");
        setNewPass("");
        setNewPass2("");
      });
  };

  return (
    <div>
      <h2>Change password.</h2>
      <form>
      Username :&nbsp;&nbsp;
      <input
        type="text"
        value={user.username}
        placeholder="Username"
        id="username"
        onChange={(event) => userHandler(event)}
        required
      ></input>{" "}
      <br></br>
      Secret password :&nbsp;&nbsp;
      <input
        onChange={(event) => userHandler(event)}
        type="password"
        value={user.secret}
        id="secret"
        placeholder="Secret password"
        required
      ></input>{" "}
      <br></br>
      New Password :&nbsp;&nbsp;
      <input
        onChange={handleChange}
        type="password"
        name="newPass"
        value={newPass}
        placeholder="Password"
        required
      ></input>{" "}
      <br></br>
      Repeat New Password :&nbsp;&nbsp;
      <input
        onChange={handleChange}
        type="password"
        name="newPass2"
        value={newPass2}
        placeholder="Password"
        required
      ></input>
      <br></br>
      <br></br>
      <button onClick={handleSubmit}>Change Password</button>
      </form>
      <br></br>
      <p>{errMsg}</p>
    </div>
  );
}

export default PasswordChange;
