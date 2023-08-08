import React, { useState } from "react";
import { Link } from "react-router-dom";
const CreatePost = (props) => {
  const [postText, setPostText] = useState("");
  const [waiting, setWaiting] = useState(false);

  const handleTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handleResetText = () => {
    setPostText("");
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setWaiting(true);

    if (props.active === "posts") {
      await props.handleSubmitPost(postText);
    } else {
      await props.handleSubmitQuestion(postText);
    }

    setWaiting(false);
    setPostText("");
  };

  return (
    <>
      <div className="card gedf-card mt-3">
        <div className="card-header">
          <ul
            className="nav nav-tabs card-header-tabs"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item">
              <Link
                className={
                  props.active === "posts" ? "nav-link active" : "nav-link"
                }
                id="posts-tab"
                data-toggle="tab"
                href="#posts"
                role="tab"
                aria-controls="posts"
                aria-selected="true"
                onClick={() => {
                  props.setactive("posts");
                }}
              >
                Create a post
              </Link>
            </li>
            {props.user && (
              <li className="nav-item">
                <Link
                  className={
                    props.active === "ask" ? "nav-link active" : "nav-link"
                  }
                  id="posts-tab"
                  data-toggle="tab"
                  href="#ask"
                  role="tab"
                  aria-controls="ask"
                  aria-selected="true"
                  onClick={() => {
                    props.setactive("ask");
                  }}
                >
                  Ask something
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="card-body">
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="posts"
              role="tabpanel"
              aria-labelledby="posts-tab"
            >
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="message"
                  rows="3"
                  onChange={handleTextChange}
                  value={postText}
                  placeholder={
                    props.active === "posts"
                      ? "What are you thinking?"
                      : "Ask your query"
                  }
                ></textarea>
              </div>
            </div>
          </div>
          <div className="btn-toolbar mt-2 justify-content-between">
            <div className="btn-group">
              <button className="btn btn-danger" onClick={handleResetText}>
                reset
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleCreatePost}
              >
                {waiting && (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                {props.active === "ask" && waiting && "posting your query"}
                {props.active === "posts" && waiting && "posting"}
                {!waiting && "post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
