import React, { useCallback, useState, useEffect, useContext } from "react";
import { OwnPostsURL } from "./settings";
//import apiFetchFacade from "./apiFetchFacade";


function Friends({ apiFetchFacade }) {
  const [friendsPosts, setFriendsPosts] = useState("");
  const [code, setCode] = useState();
  //const [response, setResponse] = useState();

  useEffect(() => {
    const url = OwnPostsURL();
    apiFetchFacade()
      .getApiFetch(url)
      .then((data) => {
        setFriendsPosts({ ...data });
      });
  }, [apiFetchFacade]);

  console.log(friendsPosts);

  const handleChange = (event) => {
    setFriendsPosts(event.target.value);
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
      <Table
        data={friendsPosts.data}
      />
    </div>
  );
}

export default Friends;
