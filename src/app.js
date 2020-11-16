import React, { useState, useEffect } from "react";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import UserRegistrationPage from "./userregister";
import { FriendsPostsURL } from "./settings";
import UserLoginPage from "./userlogin";
import UserHomePage from "./userhome";
import FriendsPage from "./friends";
import apiFetchFacade from "./apiFacade";
import PasswordChange from "./changepw";


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
            <Frontpage history={history} token={token} apiFetchFacade={apiFetchFacade} />
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
            <Route path="/changepw">
                <PasswordChange apiFetchFacade={apiFetchFacade} />
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
            <li>
                <NavLink activeClassName="active" to="/changepw">
                  Change Password
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
  const [friendsPosts, setFriendsPosts] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const url = FriendsPostsURL();
    if (token !== "") {
    async function fetchDataPosts() {
    await apiFetchFacade()
      .getApiFetch(url)
      .then((data) => {
        setFriendsPosts(data);
        setResponse("")
      }).catch((res) =>
      setResponse(res.status)
    )};
      fetchDataPosts()
    }
  }, []);

  function FriendPostTable() {
    return (
      <div className="outerdiv">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
              <th>Post</th>
              </tr>
          </thead>
          <tbody>
        {friendsPosts.map((friendPost, index) =>
          <DisplayFriends friendPost={friendPost} key={index} />
        )}
        </tbody>
        </table>
      </div>
    );
  }

  function DisplayFriends({friendPost}) {
    return (
      <tr>
        <td>{friendPost.fullName}</td>
        {/* This needs to be made into a picture */}
        <td>{friendPost.profilePicture}</td>
        {friendPost.posts.map((posts, index) =>
          <DisplayFriendsPosts posts={posts} key={index} />
        )}
      </tr>
    );
  }

  function DisplayFriendsPosts({posts}) {
    return (
      <>
        <td>{posts.message}</td>
        <td>{posts.postDate}</td>
     </>
    );
  }


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
      {friendsPosts !== "" && (
        <>
          <FriendPostTable/>
        </>
      )}
      {role && role.includes("user") && response === 404 && (
        <div>
          <p>None of your friends has posted anything yet</p>
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
