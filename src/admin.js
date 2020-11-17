import React, { useState } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";

export default function AdminPage({ apiFetchFacade, token, authFacade }) {
  const [loggedIn, setLoggedIn] = useState(
    token !== undefined && token !== null
  );

  const logout = () => {
    authFacade.logout();
    setLoggedIn(false);
  };

  const setLogin = () => {
    setLoggedIn(true);
  };

  //let token = localStorage.getItem("x-access-token");
  return (
    <div className="App">
      <Header
        loggedIn={loggedIn}
        logout={logout}
        token={token}
        setLogin={setLogin}
      />

      {loggedIn && (
        <Switch>
          <Route exact path="/admintest">
            <AdminPageView />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      )}

      {!loggedIn && (
        <>
          <Switch>
            <Route exact path="/admintest">
              <AdminPageView apiFetchFacade={apiFetchFacade} />
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
        <>
          <li>
            <NavLink exact activeClassName="active" to="/admin/users">
              All Users
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" onClick={logout} to="/login">
              Logout
            </NavLink>
          </li>
        </>
        )
      </ul>
    </div>
  );
}

//   return (
//     <div>
//       <h3>TODO</h3>
//     </div>
//   );

function AdminPageView(props) {
  return (
    <div>
      <div>
        <h2>Admin page</h2>
      </div>
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
