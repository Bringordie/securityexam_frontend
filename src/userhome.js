import React, { useState, useEffect } from "react";
import { OwnPostsURL, CreatePostURL } from "./settings";

function UserHomePage({ apiFetchFacade }) {
  const [post, setPost] = useState("");
  const [ownPosts, setOwnPosts] = useState("");
  const [code, setCode] = useState();

  useEffect(() => {
    const url = OwnPostsURL();
    async function fetchOwnPosts() {
    await apiFetchFacade()
      .getApiFetch(url)
      .then((data) => {
        setOwnPosts(data);
      }).catch((err) => {
        setCode(err.status);
      })};
      fetchOwnPosts()
      console.log(ownPosts)
  }, []);

  

  function makePost() {
    const body = {
      "post": post
    };
    //event.preventDefault();
    const url = CreatePostURL()
    async function createPosts() {
    await apiFetchFacade()
      .postApiFetchWBody(url, body)
      .then(() => {
        setCode(200);
      })
      .catch(() => {
        alert('Something went wrong, please try again later or try to login again');
      });
    }
    createPosts()
  }

  const handleChange = (event) => {
    event.preventDefault();
    setPost(event.target.value);
  };

  function OwnPostTable() {
    if (ownPosts !== "") {
    return (
      <div className="outerdiv">
        <table>
          <thead>
            <tr>
              <th>Message</th>
              </tr>
          </thead>
          <tbody>
        {ownPosts.slice(0).reverse().map((posts, index) =>
          <DisplayPosts posts={posts} key={index} />
        )}
        </tbody>
        </table>
      </div>
    );
    } else if (ownPosts === "") {
      return <></>
    }
  }

  function DisplayPosts({posts}) {
    return (
      <tr>
        <td>{posts.message}</td>
        {/* This needs to be made into a picture */}
        <td>{posts.postDate}</td>
      </tr>
    );
  }

  return (
    <div>
      <div className="header2">
        <h2>Posts</h2>
      </div>
      <textarea
            className="inputfield"
            onChange={(event) => handleChange(event)}
            type="text"
            name="comment"
            placeholder="How is your day?"
            rows="10"
            cols="70"
          ></textarea>
          <br></br>
            <button onClick={(event) => makePost()}>
              Post
            </button>
            {code === 200 && (
        <>
          <p>Your post have been created</p>
        </>
      )}
      {code === 500 && (
        <>
          <p>Something went wrong, please try again later</p>
        </>
      )}
      {ownPosts !== "" && (
        <>
        <h2>My posts</h2>
        <OwnPostTable/> 
        </>
      )}
      
    </div>
  );
}

export default UserHomePage;
