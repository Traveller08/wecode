import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import "./comments.css";
import Cookies from "js-cookie";
import Reply from "./Reply";
import apiService from "../../services/apiService";
import toast from "react-hot-toast";

const successNotify=(message) => toast.success(message);
const errorNotify = (message) => toast.error(message);

const Comment = (comment) => {
  const [commentRxn, setCommentRxn] = useState("");

  const [replies, setReplies] = useState([]);
  const [replyForm, setReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  // const [commentUser, setCommentUser] = useState({});
  
  const userid = comment.data.userid;
  const commentid = comment.data.commentid;

  // const isDeleted = comment.isDeleted;

  const handleFormClose = (e) => {
    // e.preventDefault();
    setReplyForm(false);
  };

  const handleShowReplies = () =>{
    setShowReplies(true);
  }

  const addReply = async (reply) => {
    try {
      const response = await apiService.createNewReply(
        Cookies.get("token"),
        reply,
        commentid
      );

      setReplies([response.data,...replies])
      successNotify(response.message);
    } 
    catch (error) {
      errorNotify(error.response.data.message);
      console.error("Error message:", error);
    }
  };

  useEffect(() => {
    const fetchReplies = async () => {
      try {
          const response = await apiService.getReplies(commentid);
          setReplies(response.data);
          console.log("comments ", response.data);
      } 
      catch (error) {
          console.log("Error fetching replies:", error);
      }
  };
    fetchReplies();
  }, []);

  // useEffect(() => {
  //   const fetchCommentUser = async () => {
  //     try {  
  //       const response = await apiService.getUserDetails(userid);
  //       setCommentUser(response.data[0]);
  //     } catch (error) {
  //       console.log("Error fetching post user data:", error);
  //     }
  //   };
  //   fetchCommentUser();
  // }, []);
  
  return (
    <>
      <div className="comment-card">
        <div className="comment-card-main">
          <div className="comment-left">
            <div className="comment-avatar">
              <img
                // src={commentUser.url?commentUser.url:"https://picsum.photos/50/50"}
                src={comment.data.url ? comment.data.url:"https://picsum.photos/50/50"}
                className="rounded-circle"
                width="36"
                alt="avatar"
              />
            </div>
          </div>
          {}
          <div className="comment-mid">
            <div className="comment-username text-muted">
              {/* {commentUser.firstName + " " +  commentUser.lastName} */}
              { comment.data.firstName + " " + comment.data.lastName } 

            </div>
            {comment.data.isDeleted ? (
              <>
                <div className="comment-body p-1 text-muted h7 fw-bold" style={{borderRadius:"5px", textAlign:"center",cursor:"pointer"}}>
                  original comment was deleted
                </div>
              </>
            ) : (
              <>
                <div className="comment-body">{comment.data.data}</div>
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

        {replyForm && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={addReply}
            handleClose={handleFormClose}
            commentid={comment.data.id}
          />
        )}
        <div className="comment-replies">
          {
            !showReplies&& <div className="more-replies text-muted" onClick={handleShowReplies}>
            View {` ${replies.length} `} more replies
          </div>
          }
          {
            showReplies && <div className="replies">
            {replies && replies.map((reply) => {
              return <Reply data={reply} />;
            })}
          </div>
          }
          
        </div>
      </div>
    </>
  );
};

export default Comment;
