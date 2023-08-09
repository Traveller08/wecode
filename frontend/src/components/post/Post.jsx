import React, { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Comments from "../comments/Comments";
import Cookies from "js-cookie";
import apiService from "../../services/apiService";

const Post = (props) => {
  const [showComments, setShowComments] = useState(false);
  const [postRxn, setPostRxn] = useState(
    props.reaction ? props.reaction : "not reacted"
  );
  const [editmode, setEditmode] = useState(false);
  const [newText, setNewText] = useState("");
  const [likesCount, setLikesCount] = useState(props.likes || 0);
  const [dislikesCount, setDislikesCount] = useState(props.dislikes || 0);
  const [commentsCount, setCommentsCount] = useState(0);
  console.log("post props ", props);

  const postid = props.postid;
  const user = Cookies.get("user");

  const handleLikeDislike = async (reaction) => {
    if (!user) {
      // User is not logged in, redirect to login page or show a login prompt
      return;
    }

    if (postRxn === reaction) {
      // User already reacted in the same way, remove the reaction
      removePostReaction();
    } else {
      // User is reacting for the first time or changing the reaction
      setPostRxn(reaction);
      submitPostReaction(reaction);
    }
  };

  const submitPostReaction = async (reaction) => {
    try {
      await apiService.submitPostReaction(postid, reaction);
      if (reaction === "like") {
        setLikesCount(likesCount + 1);
        if (postRxn === "dislike") {
          setDislikesCount(dislikesCount - 1);
        }
      } else if (reaction === "dislike") {
        setDislikesCount(dislikesCount + 1);
        if (postRxn === "like") {
          setLikesCount(likesCount - 1);
        }
      }
    } catch (error) {
      console.error("Error submitting post reaction:", error);
    }
  };

  const removePostReaction = async () => {
    try {
      await apiService.removePostReaction(postid);
      if (postRxn === "like") {
        setLikesCount(likesCount - 1);
      } else if (postRxn === "dislike") {
        setDislikesCount(dislikesCount - 1);
      }
      setPostRxn("");
    } catch (error) {
      console.error("Error removing post reaction:", error);
    }
  };

  const handleComments = async (e) => {
    if (showComments) {
      setShowComments(false);
    } else {
      setShowComments(true);
    }
  };

  const handleDelete = () => {
    props.handleDelete(postid);
  };

  const handleEdit = () => {
    setEditmode(true);
    setNewText(props.data);
  };

  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };

  const handleSave = async () => {
    await props.handleEdit(props.postid, newText);
    setEditmode(false);
  };

  const getTime = (createdTimeMillis) => {
    const currentTime = Date.now(); // Current time in milliseconds
    const timeDiff = currentTime - createdTimeMillis; // Time difference in milliseconds

    const millisecondsInSecond = 1000;
    const millisecondsInMinute = 60 * millisecondsInSecond;
    const millisecondsInHour = 60 * millisecondsInMinute;
    const millisecondsInDay = 24 * millisecondsInHour;

    if (timeDiff < millisecondsInMinute) {
      const secondsAgo = Math.floor(timeDiff / millisecondsInSecond);
      return `${secondsAgo} sec ago`;
    } else if (timeDiff < millisecondsInHour) {
      const minutesAgo = Math.floor(timeDiff / millisecondsInMinute);
      return `${minutesAgo} min ago`;
    } else if (timeDiff < millisecondsInDay) {
      const hoursAgo = Math.floor(timeDiff / millisecondsInHour);
      return `${hoursAgo} h ago`;
    } else {
      const daysAgo = Math.floor(timeDiff / millisecondsInDay);
      return `${daysAgo} d ago`;
    }
  };

  return (
    <>
      <div className="gedf-card mt-3">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <div className="mr-2">
                  <img
                    className="rounded-circle"
                    width="45"
                    src={
                      props.photourl
                        ? props.photourl
                        // : "https://picsum.photos/50/50"
                        : require("../../images/user.png")
                    }
                    alt="user"
                  />
                </div>

                <div className="ml-2">
                  <div className="h6 m-0"> {props.username} </div>

                  <div className="h7 text-muted" style={{ textAlign: "left" }}>
                    {props.firstName + " " + props.lastName}
                  </div>
                </div>
              </div>
              <div>
                <div>
                {user && user === props.username && (
                  <>
                  <NavDropdown
                    title={<i className="bi bi-three-dots-vertical"></i>}
                    align={{ lg: "end" }}
                    id={`offcanvasNavbarDropdown-expand-lg`}
                  >
                    {user && user === props.username && (
                      <NavDropdown.Item name="delete" onClick={handleDelete}>
                        Delete
                      </NavDropdown.Item>
                    )}
                    {user && user === props.username && (
                      <NavDropdown.Item name="edit" onClick={handleEdit}>
                        Edit
                      </NavDropdown.Item>
                    )}
                    {/* <NavDropdown.Item name="save" onClick={handleSave}>
                      Save
                    </NavDropdown.Item> */}
                  </NavDropdown>
                  </>
                )}

                </div>
              </div>
            </div>
          </div>

          <div className="card-body" style={{ textAlign: "left" }}>
            {editmode ? (
              <>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="post-data"
                    rows="3"
                    onChange={handleTextChange}
                    value={newText}
                  ></textarea>
                </div>
                <div
                  className="comment-footer-link close-write-comment"
                  onClick={handleSave}
                >
                  save changes
                </div>
              </>
            ) : (
              <>
                <pre className="card-text sm-text post-pre">
                  {props.isQuestion && <b>Question: </b>}
                  {props.data}
                </pre>
              </>
            )}

            {props.isQuestion && (
              <>
                <pre
                  className="card-text sm-text code-pre"
                  style={{ textAlign: "left" }}
                >
                  <b>Gpt Response:</b>{" "}
                  <code style={{ whiteSpace: "pre-wrap" }}>
                    {props.gptresponse}
                  </code>
                </pre>
              </>
            )}
          </div>

          <div className="card-footer">
            <div className="card-footer-left">
              <i
                className={
                  postRxn === "like"
                    ? "f-icon bi bi-caret-up-fill text-primary"
                    : "f-icon bi bi-caret-up text-primary"
                }
                style={{ fontSize: "1.1rem" }}
                onClick={() => handleLikeDislike("like")}
              ></i>
              <span className="text-primary ml-1">{likesCount}</span>
              <i
                className={
                  postRxn === "dislike"
                    ? "f-icon bi bi-caret-down-fill text-danger"
                    : "f-icon bi bi-caret-down text-danger"
                }
                style={{ fontSize: "1.1rem" }}
                onClick={() => handleLikeDislike("dislike")}
              ></i>

              <span className="text-danger ml-1">{dislikesCount}</span>

              {!showComments ? (
                <>
                  <i
                    className="f-icon bi bi-chat"
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
                    className="f-icon bi bi-chat-fill"
                    style={{
                      fontSize: "1.1rem",
                      transform: "rotate(360deg) scaleX(-1)",
                    }}
                    onClick={handleComments}
                  ></i>
                </>
              )}

              {/* <i
                className="f-icon bi bi-share"
                style={{ fontSize: "1.1rem" }}
              ></i> */}
            </div>
            <div className="card-footer-right">
              <div className="text-muted h7">
                <i className="bi bi-clock"></i> {getTime(props.createdtime)}
              </div>
            </div>
          </div>
        </div>

        {showComments && <Comments setcnt={setCommentsCount} postid={postid} />}
      </div>
    </>
  );
};

export default Post;
