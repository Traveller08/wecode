import React, { useState } from "react";
import { Link } from "react-router-dom";
const CreatePost = (props) => {
  const [postText, setPostText] = useState("");
  const [waiting, setWaiting] = useState(false);

  const handleTextChange = (e) =>{
    setPostText(e.target.value);
  }
  const handleResetText = () =>{
    setPostText("");
  }
  const handleCreatePost = async(e) =>{
    e.preventDefault();
    setWaiting(true);
    await props.handleSubmit(postText);
    setWaiting(false);
    setPostText("");
  }
  return (
    <>
      <div className="card gedf-card">
    
        <div className="card-header">
          <ul
            className="nav nav-tabs card-header-tabs"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item">
              <Link
                className="nav-link active"
                id="posts-tab"
                data-toggle="tab"
                href="#posts"
                role="tab"
                aria-controls="posts"
                aria-selected="true"
              >
                Create a post
              </Link>
            </li>
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
                  placeholder="What are you thinking?"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="btn-toolbar mt-2 justify-content-between">
            <div className="btn-group">
              <button  className="btn btn-danger" onClick={handleResetText}>
                reset
              </button>
            
              <button type="submit" className="btn btn-primary" onClick={handleCreatePost}>
                {
                  waiting &&  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                }
                {
                  waiting?"posting...":"post"
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
