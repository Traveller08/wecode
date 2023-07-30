import { useState, useEffect } from "react";
// import CommentForm from "./CommentForm";
import "./comments.css";
import Cookies from "js-cookie";
// import apiService from "../../services/apiService";

const Reply = (reply) => {

  const [commentRxn, setCommentRxn] = useState("");

  // const [replyUser, setReplyUser] = useState({});

  // const userid = reply.data.userid;
  // const replyid = reply.data.replyid;

  // useEffect(() => {
  //   const fetchReplyUser = async () => {
  //     try {  
  //       const response = await apiService.getUserDetails(userid);
  //       setReplyUser(response.data[0]);
  //     } catch (error) {
  //       console.log("Error fetching post user data:", error);
  //     }
  //   };
  //   fetchReplyUser();
  // }, []);

  return (
    <>
      <div className="reply-card">
        <div className="comment-card-main">
          <div className="comment-left">
            <div className="comment-avatar">
              <img
                // src={replyUser.url?replyUser.url:"https://picsum.photos/50/50"}
                src={reply.data.url ? reply.data.url:"https://picsum.photos/50/50"}
                className="rounded-circle"
                width="36"
                alt="avatar"
              />
            </div>
          </div>
          <div className="comment-mid">
            <div className="comment-username text-muted">
              {reply.data.firstName + " " + reply.data.lastName}</div>
            {!reply.data.isDeleted ? (
              <pre className="comment-body post-pre">{reply.data.data}</pre>
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
                    } 
                    else {
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
