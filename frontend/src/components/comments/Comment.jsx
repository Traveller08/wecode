import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import "./comments.css";
import Cookies from "js-cookie";
import Reply from "./Reply";
import apiService from "../../services/apiService";
import Alert from "react-bootstrap/Alert";

let data = [
  {
    id: "1",
    body: "First comment and sakdfjnsdf dsfd fd dfg dgd fgd fgd fg dfg df gdf g dfg df g  cvb dsf ffdf gfdgfd ghfghfghgfh",
    name: "Jack",
    username: "lit2020034@iiitl.ac.in",
    parentId: null,
    createdAt: "2021-08-16T23:00:33.010+02:00",
    url: "https://picsum.photos/50/50",
    isDeleted:true,
  },
  {
    id: "2",
    body: "Second comment",
    name: "John",
    username: "lit2020034@iiitl.ac.in",
    parentId: null,
    createdAt: "2021-08-16T23:00:33.010+02:00",
    url: "https://picsum.photos/50/50",
    isDeleted:true,
  },
  {
    id: "3",
    body: "First comment first child",
    name: "John",
    username: "lit2020034@iiitl.ac.in",
    parentId: "1",
    createdAt: "2021-08-16T23:00:33.010+02:00",
    url: "https://picsum.photos/50/50",
    isDeleted:false,
  },
  {
    id: "4",
    body: "Second comment second child",
    name: "John",
    username: "lit2020034@iiitl.ac.in",
    parentId: "2",
    createdAt: "2021-08-16T23:00:33.010+02:00",
    url: "https://picsum.photos/50/50",
    isDeleted:false,
  },
];
const Comment = (comment) => {
  const [commentRxn, setCommentRxn] = useState("");
  const [replies, setReplies] = useState([]);
  const [replyForm, setReplyForm] = useState(false);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("");
  // const isDeleted = comment.isDeleted;
  const handleFormClose = (e) => {
    e.preventDefault();
    setReplyForm(false);
  };

  const addReply = async (reply) => {
    try {
      const response = await apiService.createNewReply(
        Cookies.get("token"),
        reply,
        comment.data.id
      );
      setErrorType("success");
      setError(response.message);
    } catch (error) {
      setErrorType("danger");
      setError(error.response.data.message);
      console.error("Error message:", error);
    }
  };
  useEffect(() => {
    setReplies(data);
  }, []);

  return (
    <>
      <div className="comment-card">
        <div className="comment-card-main">
          <div className="comment-left">
            <div className="comment-avatar">
              <img
                src={comment.data.url}
                className="rounded-circle"
                width="36"
                alt="avatar"
              />
            </div>
          </div>
          {}
          <div className="comment-mid">
            <div className="comment-username text-muted">
              {comment.data.name}
            </div>
            {comment.data.isDeleted ? (
              <>
                <div className="comment-body p-1 text-muted h7 fw-bold" style={{borderRadius:"5px", textAlign:"center",cursor:"pointer"}}>
                  original comment was deleted
                </div>
              </>
            ) : (
              <>
                <div className="comment-body">{comment.data.body}</div>
                <div className="comment-footer">
                  {Cookies.get("user") && (
                    <div
                      className="comment-footer-link open-write-comment"
                      onClick={() => {
                        setReplyForm(!replyForm);
                      }}
                    >
                      reply
                    </div>
                  )}
                  {Cookies.get("user") &&
                    Cookies.get("user") === comment.data.username && (
                      <div className="comment-footer-link close-write-comment">
                        delete
                      </div>
                    )}
                </div>
              </>
            )}
          </div>
          {!comment.data.isDeleted && (
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

        {error && (
          <Alert
            variant={errorType}
            onClose={() => {
              setError("");
              setErrorType("");
            }}
            dismissible
          >
            <Alert.Heading>
              {errorType === "danger" ? "Failed" : "Success"}
            </Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}
        {replyForm && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={addReply}
            handleClose={handleFormClose}
            commentid={comment.data.id}
          />
        )}
        <div className="comment-replies">
          <div className="more-replies text-muted">
            View {` ${10} `} more replies
          </div>
          <div className="replies">
            {replies.map((reply) => {
              return <Reply data={reply} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
