import React, { useState, useEffect } from "react";
import { AdminGetUsersURL } from "./settings";

export default function AdminGetUsers({
  apiFetchFacade,
  authFacade,
  setLogin,
  token,
}) {
  const [userData, setUsersData] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const url = AdminGetUsersURL();
    if (token !== "") {
      function fetchUserData() {
        apiFetchFacade()
          //Should be getApiFetchAdmin something is wrong
          .getApiFetchAdmin(url)
          .then((data) => {
            setUsersData(data);
            setResponse("");
          })
          .catch((res) => setResponse(res.status));
      }
      fetchUserData();
    }
  }, []);

  function UserTable() {
    if (userData !== "") {
      return (
        <div className="outerdiv">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((users, index) => (
                <DisplayUsers users={users} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return <></>;
  }

  function DisplayUsers({ users }) {
    return (
      <tr>
        <td>{users.userID}</td>
        <td>{users.fullName}</td>
        {/* This needs to be made into a picture */}
        <td>{users.profilePicture}</td>
      </tr>
    );
  }

  return (
    <div>
      {response === 400 && (
        <>
          <p>Something went wrong, please try again later</p>
        </>
      )}
      {response === 401 && (
        <>
          <p>You do not have access to do this. Try and log out and in again</p>
        </>
      )}
      <UserTable />
    </div>
  );
}
