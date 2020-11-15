import React, { useCallback, useState, useEffect, useContext } from "react";
import { OwnPostsURL, CreatePostURL } from "./settings";
//import apiFetchFacade from "./apiFetchFacade";


function UserHomePage({ apiFetchFacade }) {
  const [post, setPost] = useState("");
  const [code, setCode] = useState();
  //const [response, setResponse] = useState();

  useEffect(() => {
      //debugger;
    const url = OwnPostsURL();
    apiFetchFacade()
      .getApiFetch(url)
      .then((data) => {
        setPost({ ...data });
      });
  }, [apiFetchFacade]);

  const body = {
    "post": post
  };

  function makePost(event) {
    event.preventDefault();
    apiFetchFacade()
      .getApiFetchWBody(body, CreatePostURL())
      .then((data) => {
        setCode(200);
        //setResponse({ ...data });
      })
      .catch((err) => {
        setCode(404);
      });
  }

  const handleChange = (event) => {
    setPost(event.target.value);
  };

  function Table(props) {
    if (
      props === undefined ||
      props === null ||
      props.data === undefined
    )
      return <></>;
    return (
      <div className="outerdiv">
        {props.data.map((post) =>
          DisplayTest(post)
        )}
      </div>
    );
  }

  function DisplayTest(
    post
  ) {

    return (
      <div className="col-lg-4 col-md-6" key={post.id}>
        <div className="container">
          <div className="post">
            <p>
              Message : {post.message} - Date:&nbsp;{post.postDate}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="header2">
        <h2>Test</h2>
      </div>
      <textarea
            className="inputfield"
            onChange={handleChange}
            type="text"
            name="comment"
            placeholder="How is your day?"
            rows="10"
            cols="70"
          ></textarea>
          <br></br>
            <button onClick={(event) => makePost(event)}>
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
      <Table
        data={post.data}
      />
    </div>
  );
}

export default UserHomePage;
