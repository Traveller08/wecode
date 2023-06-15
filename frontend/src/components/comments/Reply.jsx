import { useState } from "react";
import CommentForm from "./CommentForm";
import "./comments.css";
import Cookies from "js-cookie";
const Reply = (reply) => {
  const [commentRxn, setCommentRxn] = useState("");

  return (
    <>
      <div className="reply-card">
        <div className="comment-card-main">
          <div className="comment-left">
            <div className="comment-avatar">
              <img
                src={reply.data.url}
                className="rounded-circle"
                width="36"
                alt="avatar"
              />
            </div>
          </div>
          <div className="comment-mid">
            <div className="comment-username text-muted">{reply.data.name}</div>
            {!reply.data.isDeleted ? (
              <div className="comment-body">{reply.data.body}</div>
            ) : (
              <>
                <div
                  className="comment-body p-1 text-muted h7 fw-bold"
                  style={{
                    borderRadius: "5px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  this reply was deleted
                </div>
              </>
            )}
            {!reply.data.isDeleted && (
              <div className="comment-footer">
                {Cookies.get("user") &&
                  Cookies.get("user") === reply.data.username && (
                    <div className="comment-footer-link close-write-comment">
                      delete
                    </div>
                  )}
              </div>
            )}
          </div>
          {!reply.data.isDeleted && (
            <div className="comment-right">
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Reply;
