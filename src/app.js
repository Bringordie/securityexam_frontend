import React, { useState, useEffect } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import UserRegistrationPage from "./userregister";
import UserLoginPage from "./userlogin";
import UserHomePage from "./userhome";
import FriendsPage from "./friends";


function App({ apiFetchFacade, authFacade }) {
  let token = localStorage.getItem("x-access-token");

  const [loggedIn, setLoggedIn] = useState(
    token !== undefined && token !== null
  );

  const history = useHistory();

  const logout = () => {
    authFacade.logout();
    setLoggedIn(false);
  };

  const setLogin = () => {
    setLoggedIn(true);
  };


  return (
    <div className="App">
      <Header loggedIn={loggedIn} logout={logout} token={token} setLogin={setLogin} />

      {loggedIn  && (
        <Switch>
          <Route exact path="/">
            <Frontpage history={history} token={token} />
          </Route>
          <Route exact path="/home">
            <UserHomePage 
            apiFetchFacade={apiFetchFacade}
            />
          </Route>
          <Route exact path="/friends">
            <FriendsPage 
            apiFetchFacade={apiFetchFacade}
            />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      )}

      {!loggedIn && (
        <>
          <Switch>
            <Route exact path="/">
              <Frontpage history={history} token={token} />
            </Route>
            <Route path="/login">
            <UserLoginPage
                apiFetchFacade={apiFetchFacade}
                authFacade={authFacade}
                setLogin={setLogin}
              />
            </Route>
            <Route path="/registration">
              <UserRegistrationPage
                apiFetchFacade={apiFetchFacade}
              />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </>
      )}
    </div>
  );
}


function Header({ loggedIn, logout, token }) {
  return (
    <div>
      <ul className="header">
        {loggedIn && token &&(
          <>
          <li>
          <NavLink exact activeClassName="active" to="/">
            Frontpage
          </NavLink>
        </li>
          <li>
          <NavLink exact activeClassName="active" to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName="active" to="/friends">
            Friends
          </NavLink>
        </li>
          <li>
            <NavLink activeClassName="active" onClick={logout} to="/login">
              Logout
            </NavLink>
          </li>
          </>
        )}
        {!token && (
          <>
            <li>
              <NavLink activeClassName="active" to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/registration">
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h3>No match for that route</h3>
    </div>
  );
}

function Capatialize(prop) {
  return prop.charAt(0).toUpperCase() + prop.slice(1);
}

function Frontpage(props) {
  const token = props.token;
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (token !== null && token !== undefined) {
      var decoded = jwt_decode(token);
      setUsername(Capatialize(decoded.username));
      setRole((decoded.role));
    }
  }, [token]);
  return (
    <div>
      {role && role.includes("admin") && (
        <div>
          <h2>Admin page</h2>
        </div>
      )} 
      {role && role.includes("user") && (
        <div>
          <h2>Welcome {username}</h2>
        </div>
      )}
      {token === null && (
        <div>
          <h2>Welcome. Please log in.</h2>
        </div>
      )}
    </div>
  );
}

export default App;
