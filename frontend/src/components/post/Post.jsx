import React, { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Comments from "../comments/Comments";
import Cookies from "js-cookie";
const Post = (props) => {
  const [showComments, setShowComments] = useState(false);
  const [postRxn, setPostRxn] = useState("");
  const handleComments = async (e) => {
    if (showComments) {
      setShowComments(false);
    } else {
      setShowComments(true);
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="gedf-card">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <div className="mr-2">
                  <img
                    className="rounded-circle"
                    width="45"
                    src={props.url}
                    alt="user"
                  />
                </div>
                <div className="ml-2">
                  <div className="h6 m-0">{props.username}</div>
                  <div className="h7 text-muted" style={{ textAlign: "left" }}>
                    {props.firstname + " " + props.lastname}
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <NavDropdown
                    title={<i class="bi bi-three-dots-vertical"></i>}
                    align={{ lg: "end" }}
                    id={`offcanvasNavbarDropdown-expand-lg`}
                  >
                    <NavDropdown.Item name="blogs">Hide</NavDropdown.Item>
                    <NavDropdown.Item name="tutorials">Save</NavDropdown.Item>
                    <NavDropdown.Item name="tutorials">Report</NavDropdown.Item>
                  </NavDropdown>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <p className="card-text sm-text">{props.data}</p>
          </div>
          <div className="card-footer">
            <div className="card-footer-left">
              <i
                className={
                  postRxn === "thumbsup"
                    ? `f-icon bi bi-hand-thumbs-up-fill`
                    : `f-icon bi bi-hand-thumbs-up`
                }
                style={{ fontSize: "1.1rem" }}
                onClick={() => {
                  if (postRxn === "thumbsup") {
                    setPostRxn("");
                  } else {
                    setPostRxn("thumbsup");
                  }
                } }
              ></i>
              {/* <i class="bi bi-hand-thumbs-up-fill"></i> */}
              {/* <i class="bi bi-hand-thumbs-down-fill"></i> */}
              <i
                className={
                  postRxn === "thumbsdown"
                    ? `f-icon bi bi-hand-thumbs-down-fill`
                    : `f-icon bi bi-hand-thumbs-down`
                }
                style={{ fontSize: "1.1rem" }}
                onClick={() => {
                  if (postRxn === "thumbsdown") {
                    setPostRxn("");
                  } else {
                    setPostRxn("thumbsdown");
                  }
                }}
              ></i>
              {!showComments ? (
                <>
                  <i
                    class="f-icon bi bi-chat"
                    style={{
                      fontSize: "1.1rem",
                      transform: "rotate(360deg) scaleX(-1)",
                    }}
                    onClick={handleComments}
                  ></i>
                </>
              ) : (
                <>
                  <i
                    class="f-icon bi bi-chat-fill"
                    style={{
                      fontSize: "1.1rem",
                      transform: "rotate(360deg) scaleX(-1)",
                    }}
                    onClick={handleComments}
                  ></i>
                </>
              )}

              <i class="f-icon bi bi-share" style={{ fontSize: "1.1rem" }}></i>
            </div>
            <div className="card-footer-right">
              <div className="text-muted h7">
                {" "}
                <i class="bi bi-clock"></i> {props.time} min ago
              </div>
            </div>
          </div>
        </div>
        {showComments ? <Comments postid={props.postid} /> : ""}
      </div>
    </>
  );
};

export default Post;
