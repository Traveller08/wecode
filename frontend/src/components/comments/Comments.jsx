import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import "./comments.css";
import apiService from "../../services/apiService";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const successNotify = (message) => toast.success(message);
const errorNotify = (message) => toast.error(message);

const Comments = (props) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState([]);

  const postid = props.postid;
  console.log("props of comments", props);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiService.getComments(postid);
        setComments(response.data);

        console.log("comments ", response.data);
      } catch (error) {
        console.log("Error fetching comments:", error);
      } finally {
        props.setcnt(comments.length);
      }
    };

    fetchComments();
  }, []);

  const handleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  const closeForm = () => {
    setShowCommentForm(false);
  };

  const addComment = async (comment, parentId) => {
    try {
      const response = await apiService.createNewComment(comment, props.postid);

      successNotify(response.message);
      setComments([response.data, ...comments]);
    } catch (error) {
      errorNotify("Failed to create comment");
      console.error("Error message:", error);
    }
  };

  const deleteComment = async (commentid) => {
    try {
      const response = await apiService.deleteComment(commentid);

      successNotify(response.message);
      setComments(
        comments.filter((comment) => {
          return comment.commentid !== commentid;
        })
      );
    } catch (error) {
      errorNotify("Failed to delete");
      console.error("Error message:", error);
    }
  };
  const handleCommentEdit = async (commentid, text) => {
    try {
      await apiService.updateComment(commentid, text);

      successNotify("comment updated");

      setComments(
        comments.map((comment) => {
          if (comment.commentid === commentid) {
            return { ...comment, data: text };
          } else {
            return comment;
          }
        })
      );
    } catch (error) {
      errorNotify("Failed to update");
      console.error("Error message:", error);
    }
  };

  return (
    <div className="comments">
      <div className="comments-header">
        <div className="comments-left-header">
          Comments {`( ${comments.length} )`}
          {props.setcnt(comments.length)}
        </div>

        <div
          className={`comments-right-header ${
            showCommentForm ? "close-write-comment" : "open-write-comment"
          }`}
          onClick={handleCommentForm}
        >
          {showCommentForm ? "Close" : "write comment"}
        </div>
      </div>

      {showCommentForm && (
        <CommentForm
          submitLabel="Post"
          handleSubmit={addComment}
          handleClose={closeForm}
          commentid={postid}
        />
      )}

      <div className="comments-container">
        {console.log(comments)}
        {comments &&
          comments.map((rootComment) => (
            <Comment
              data={rootComment}
              handleDelete={deleteComment}
              handleEdit={handleCommentEdit}
            />
          ))}
      </div>
    </div>
  );
};

export default Comments;

