import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import apiService from '../../services/apiService';
import Cookies from "js-cookie";
const CreatePost = (props) => {
  const [postText, setPostText] = useState("");
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("");
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
    try{
      const response = await apiService.createNewPost(postText, Cookies.get('token'));
      setErrorType("success");
      setError(response.message);
    }catch(error){
      setErrorType("danger");
      setError(error.response.data.message);
      console.error("Error message:", error);
    }finally{
      setWaiting(false);
    }
  }
  return (
    <>
      <div className="card gedf-card">
      {
        error && 
        <Alert variant={errorType} onClose={() => {setError(""); setErrorType("");}} dismissible>
        <Alert.Heading>{errorType==="danger"?"Failed":"Success"}</Alert.Heading>
        <p>
          {error}
        </p>
      </Alert>

      }
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
          <div className="btn-toolbar justify-content-between">
            <div className="btn-group">
              <button  className="btn btn-primary" onClick={handleResetText}>
                reset
              </button>
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-primary" onClick={handleCreatePost}>
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
