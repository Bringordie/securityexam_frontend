import React, { useState } from "react";
import {
  ViewFriendsURL,
  ViewFriendRequestsURL,
  SearchFriendURL,
  AddFriendRequestURL,
  RemoveFriendURL,
  AcceptFriendRequestURL,
  RemoveFriendRequestURL,
} from "./settings";
//import apiFetchFacade from "./apiFetchFacade";

function Friends({ apiFetchFacade }) {
  //const [friendsPosts, setFriendsPosts] = useState("");
  const [viewFriends, setViewFriends] = useState("");
  const [viewFriendReq, setViewFriendReq] = useState("");
  const [viewFriendSearch, setViewFriendSearch] = useState("");
  const [response, setResponse] = useState();
  const [user, setUser] = useState("");

  // useEffect(() => {
  //   const url = OwnPostsURL();
  //   apiFetchFacade()
  //     .getApiFetch(url)
  //     .then((data) => {
  //       setFriendsPosts({ ...data });
  //     });
  // }, [apiFetchFacade]);

  //console.log(friendsPosts);

  function searchHandler(event) {
    const value = event.target.value;
    setUser(value);
    console.log(value);
  }

  function viewFriendsHandler(event) {
    event.preventDefault();
    const url = ViewFriendsURL();
    apiFetchFacade()
      .getApiFetch(url)
      .then((data) => {
        setViewFriends(data);
        setResponse("");
        setViewFriendReq("");
        setViewFriendSearch("");
        console.log(data);
      })
      .catch((err) => {
        if (err.status === 500) {
          setResponse(
            "Something unexpected went wrong, please try again later."
          );
        } else if (err.status === 404) {
          setResponse(
            "You currently do not have any friends, get out there and add some!"
          );
        }
      });
  }

  function viewRequestsHandler(event) {
    event.preventDefault();
    const url = ViewFriendRequestsURL();
    setResponse("");
    setViewFriendSearch("");
    setViewFriends("");

    apiFetchFacade()
      .getApiFetch(url)
      .then((data) => {
        setViewFriendReq(data);

        console.log(data);
      })
      .catch((err) => {
        if (err.status === 500) {
          setResponse(
            "Something unexpected went wrong, please try again later."
          );
        } else if (err.status === 404) {
          setResponse("There are no friend requests at this time.");
        }
      });
  }

  async function searchFriendsHandler(event) {
    event.preventDefault();
    const body = { search_name: user };
    const url = SearchFriendURL();
    setResponse("");
    setViewFriends("");
    setViewFriendReq("");

    await apiFetchFacade()
      .postApiFetchWBody(url, body)
      .then((data) => {
        setViewFriendSearch(data);
        console.log(data);
      })
      .catch((err) => {
        if (err.status === 500) {
          setResponse(
            "Something unexpected went wrong, please try again later."
          );
        } else if (err.status === 404) {
          setResponse("There were no results found with this name.");
        }
      });
  }

  async function addFriendHandler(props) {
    const body = { request_username: props };
    const url = AddFriendRequestURL();
    setResponse("");
    setViewFriends("");
    setViewFriendReq("");

    await apiFetchFacade()
      .postApiFetchWBody(url, body)
      .then((data) => {
        setViewFriendSearch("");
        alert("Friend request has been sent.");
      })
      .catch((err) => {
        if (err.status === 500) {
          setResponse(
            "Something unexpected went wrong, please try again later."
          );
        }
      });
  }

  async function removeFriendHandler(props) {
    const body = { request_userid: props };
    const url = RemoveFriendURL();
    await apiFetchFacade()
      .postApiFetchWBody(url, body)
      .then((data) => {
        setViewFriendSearch("");
        setResponse("");
        setViewFriends("");
        setViewFriendReq("");
        alert("Friend has been removed.");
      })
      .catch((err) => {
        if (err.status === 500) {
          setResponse(
            "Something unexpected went wrong, please try again later."
          );
        }
      });
  }

  async function removeFriendReqHandler(props) {
    const body = { request_userid: props };
    const url = RemoveFriendRequestURL();
    await apiFetchFacade()
      .postApiFetchWBody(url, body)
      .then((data) => {
        setViewFriendSearch("");
        setResponse("");
        setViewFriends("");
        setViewFriendReq("");
        alert("Friend request has been removed.");
      })
      .catch((err) => {
        if (err.status === 500) {
          setResponse(
            "Something unexpected went wrong, please try again later."
          );
        }
      });
  }

  async function acceptFriendReqHandler(props) {
    const body = { request_userid: props };
    const url = AcceptFriendRequestURL();
    await apiFetchFacade()
      .postApiFetchWBody(url, body)
      .then((data) => {
        setViewFriendSearch("");
        setResponse("");
        setViewFriends("");
        setViewFriendReq("");
        alert("Friend request has been accepted.");
      })
      .catch((err) => {
        if (err.status === 500) {
          setResponse(
            "Something unexpected went wrong, please try again later."
          );
        }
      });
  }

  function SearchTable() {
    return (
      <div className="outerdiv">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {viewFriendSearch.map((search, index) => (
              <DisplaySearch search={search} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function DisplaySearch({ search }) {
    return (
      <tr>
        <td>{search.fullName}</td>
        {/* This needs to be made into a picture */}
        <td>{search.profilePicture}</td>
        <td>
          <button onClick={(event) => addFriendHandler(search.userID)}>
            Add to friend
          </button>
        </td>
      </tr>
    );
  }

  function FriendTable() {
    return (
      <div className="outerdiv">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {viewFriends.map((friends, index) => (
              <DisplayFriends friends={friends} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function DisplayFriends({ friends }) {
    return (
      <tr>
        <td>{friends.fullName}</td>
        {/* This needs to be made into a picture */}
        <td>{friends.picture}</td>
        <td>
          <button onClick={(event) => removeFriendHandler(friends.friendID)}>
            Remove friend
          </button>
        </td>
      </tr>
    );
  }

  function FriendRequestTable() {
    return (
      <div className="outerdiv">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {viewFriendReq.map((friendsReq, index) => (
              <DisplayFriendsRequests friendsReq={friendsReq} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function DisplayFriendsRequests({ friendsReq }) {
    return (
      <tr>
        <td>{friendsReq.fullName}</td>
        {/* This needs to be made into a picture */}
        <td>{friendsReq.picture}</td>
        <td>
          <button
            onClick={(event) => acceptFriendReqHandler(friendsReq.friendID)}
          >
            Accept Friend Request
          </button>
        </td>
        <td>
          <button
            onClick={(event) => removeFriendReqHandler(friendsReq.friendID)}
          >
            Remove Friend Request
          </button>
        </td>
      </tr>
    );
  }

  return (
    <div>
      <div className="header2">
        <h2>Friends</h2>
      </div>
      {/* <button onClick={(event) => viewFriendsHandler(event)}>View Friends</button> */}
      <button onClick={viewFriendsHandler}>View Friends</button>
      <button onClick={(event) => viewRequestsHandler(event)}>
        View Friend Requests
      </button>
      <p>
        Search Friend:{" "}
        <input
          type="text"
          placeholder="Name"
          value={user}
          onChange={(event) => searchHandler(event)}
        />
        <button onClick={(event) => searchFriendsHandler(event)}>Search</button>
      </p>
      <div className="error">
        {response !== "" && (
          <>
            <p>{response}</p>
          </>
        )}
        {viewFriendSearch !== "" && (
          <>
            <SearchTable />
          </>
        )}
        {viewFriends !== "" && (
          <>
            <FriendTable />
          </>
        )}
        {viewFriendReq !== "" && (
          <>
            <FriendRequestTable />
          </>
        )}
      </div>
      <div className="data"></div>
    </div>
  );
}

export default Friends;
