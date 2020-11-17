import React, { useState } from "react";
import { UserRegistrationURL } from "./settings";
import UserLoginPage from "./userlogin";
import PASSWORD_PATTERN from "./passwordPolicy";

export default function UserRegistrationPage({ apiFetchFacade }) {
  let blankUser = { username: "", password: "", fullname: "", secret: "" };
  const [user, setUser] = useState({ ...blankUser });
  const [selectedFile, setSelectedFile] = useState(null);
  const [response, setResponse] = useState("");
  //const PASSWORD_PATTERN = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");

  function changeHandler(event) {
    const { id, value } = event.target;
    setUser({ ...user, [id]: value });
  }

  function handlePicture(event) {
    setSelectedFile(event.target.files[0]);
  }

  function password_validate(pass) {
    return PASSWORD_PATTERN.test(pass);
  }

  function submitHandler(event) {
    event.preventDefault();
    if (password_validate(user.password)) {
      const url = UserRegistrationURL();
      let formData = new FormData();
      formData.append("fullname", user.fullname);
      formData.append("username", user.username);
      formData.append("password", user.password);
      formData.append("secret", user.secret);
      formData.append("file", selectedFile);
      apiFetchFacade()
        .createUser(url, true, formData)
        .then((data) => {
          UserLoginPage.loginCallback(user.username, user.password);
        })
        .catch((err) => {
          setResponse(err.status);
        });
    } else if (!password_validate(user.password)) {
      setResponse(422);
    }
  }

  return (
    <>
      <h3>Register a new account</h3>
      <div className="Form">
        <form>
          Full Name:{" "}
          <input
            type="text"
            placeholder="Full name"
            id="fullname"
            value={user.fullname}
            required
            onChange={(event) => changeHandler(event)}
          />
          <br></br>
          Username:{" "}
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={user.username}
            required
            onChange={(event) => changeHandler(event)}
          />
          <br></br>
          Password:{" "}
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={user.password}
            required
            onChange={(event) => changeHandler(event)}
          />
          <br></br>
          Secret password:{" "}
          <input
            type="password"
            placeholder="Secret"
            id="secret"
            value={user.secret}
            required
            onChange={(event) => changeHandler(event)}
          />
          <br></br>
          Picture:{" "}
          <input
            name="uploadFile"
            type="file"
            accept=".png"
            required
            onChange={(e) => handlePicture(e)}
          />
        </form>
      </div>
      <button onClick={(event) => submitHandler(event)}>Sign Up</button>
      {response === 200 && (
        <>
          <p>Account has successfully been created</p>
        </>
      )}
      {response === 400 && (
        <>
          <p>Username already exists</p>
        </>
      )}
      {response === 422 && (
        <>
          <p>Your password did not meet the requirements</p>
        </>
      )}
      {response === 500 && (
        <>
          <p>Something went wrong, please try again later</p>
        </>
      )}
    </>
  );
}
