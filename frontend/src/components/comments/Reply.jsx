import { useState, useEffect } from "react";
// import CommentForm from "./CommentForm";
import "./comments.css";
import Cookies from "js-cookie";
// import apiService from "../../services/apiService";

const Reply = (reply) => {
  const [commentRxn, setCommentRxn] = useState("");
  const [editmode, setEditmode] = useState(false);
  const [newText, setNewText] = useState("");

  const handleDelete = async () => {
    reply.handleDelete(reply.data.replyid);
  };
  const handleEdit = (e) => {
    setEditmode(true);
    setNewText(reply.data.data);
  };
  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };

  const handleSave = async (e) => {
    await reply.handleEdit(reply.data.replyid, newText);
    setEditmode(false);
  };

  return (
    <>
      <div className="reply-card">
        <div className="comment-card-main">
          <div className="comment-left">
            <div className="comment-avatar">
              <img
                // src={replyUser.url?replyUser.url:"https://picsum.photos/50/50"}
                src={
                  reply.data.url
                    ? reply.data.url
                    // : "https://picsum.photos/50/50"
                    : require("../../images/user.png")
                }
                className="rounded-circle"
                width="36"
                alt="avatar"
              />
            </div>
          </div>
          <div className="comment-mid">
            <div className="comment-username text-muted">
              {reply.data.firstName + " " + reply.data.lastName}
            </div>

            {editmode ? (
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="post-data"
                  rows="3"
                  onChange={handleTextChange}
                  value={newText}
                ></textarea>
              </div>
            ) : (
              <pre className="comment-body post-pre">{reply.data.data}</pre>
            )}

            <div className="comment-footer">
              {Cookies.get("user") &&
                Cookies.get("user") === reply.data.username && (
                  <div
                    className="comment-footer-link close-write-comment"
                    onClick={handleDelete}
                  >
                    delete
                  </div>
                )}

              {Cookies.get("user") &&
                Cookies.get("user") === reply.data.username && (
                  <>
                    {editmode ? (
                      <div
                        className="comment-footer-link close-write-comment"
                        onClick={handleSave}
                      >
                        save changes
                      </div>
                    ) : (
                      <div
                        className="comment-footer-link close-write-comment"
                        onClick={handleEdit}
                      >
                        edit
                      </div>
                    )}
                  </>
                )}
            </div>
          </div>

          {/* <div className="comment-right">
            <div className="comment-reaction">
              <i
                className={
                  commentRxn === "upvote"
                    ? `bi bi-arrow-up-circle-fill`
                    : `bi bi-arrow-up-circle`
                }
                onClick={() => {
                  if (commentRxn === "upvote") {
                    setCommentRxn("");
                  } else {
                    setCommentRxn("upvote");
                  }
                }}
              />
            </div>
            <div className="comment-reaction">
              <i
                className={
                  commentRxn === "downvote"
                    ? `bi bi-arrow-down-circle-fill`
                    : `bi bi-arrow-down-circle`
                }
                onClick={() => {
                  if (commentRxn === "downvote") {
                    setCommentRxn("");
                  } else {
                    setCommentRxn("downvote");
                  }
                }}
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Reply;
