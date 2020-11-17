import React, { useState, useEffect } from "react";
import { AdminGetPostsURL } from "./settings";

export default function AdminGetPosts({ apiFetchFacade, token }) {
  const [postData, setPostData] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    const url = AdminGetPostsURL();
    if (token !== "") {
      async function fetchUserData() {
        await apiFetchFacade()
          //Should be getApiFetchAdmin something is wrong
          .getApiFetchAdmin(url)
          .then((data) => {
            setPostData(data);
            setResponse("");
          })
          .catch((res) => setResponse(res.status));
      }
      fetchUserData();
    }
  }, []);

  function PostTable() {
    if (postData !== "") {
      return (
        <div className="outerdiv">
          <table>
            <thead>
              <tr>
                <th>Message</th>
                <th>Post Date</th>
              </tr>
            </thead>
            <tbody>
              {postData.map((posts, index) => (
                <DisplayPosts posts={posts} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return <></>;
  }

  function DisplayPosts({ posts }) {
    return (
      <tr>
        <td>{posts.message}</td>
        <td>{posts.postDate}</td>
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
      <PostTable />
    </div>
  );
}
