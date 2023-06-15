import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import "./comments.css";
import apiService from "../../services/apiService";
import Cookies from "js-cookie";
import Alert from "react-bootstrap/Alert";
let data=[
  {
    id: "1",
    body: "First comment and sakdfjnsdf dsfd fd dfg dgd fgd fgd fg dfg df gdf g dfg df g  cvb dsf ffdf gfdgfd ghfghfghgfh",
    name: "Jack",
    username: "lit2020034@iiitl.ac.in",
    parentId: null,
    createdAt: "2021-08-16T23:00:33.010+02:00",
    postId:"",
    url:"https://picsum.photos/50/50",
    isDeleted:true
  },
  {
    id: "2",
    body: "Second comment",
    name: "John",
    username: "lit2020034@iiitl.ac.in",
    parentId: null,
    createdAt: "2021-08-16T23:00:33.010+02:00",
    postId:"",
    url:"https://picsum.photos/50/50",
    isDeleted:true
  },
  {
    id: "3",
    body: "First comment first child",
    name: "John",
    username: "lit2020034@iiitl.ac.in",
    parentId: "1",
    createdAt: "2021-08-16T23:00:33.010+02:00",
    postId:"",
    url:"https://picsum.photos/50/50",
    isDeleted:false
  },
  {
    id: "4",
    body: "Second comment second child",
    name: "John",
    username: "lit2020034@iiitl.ac.in",
    parentId: "2",
    createdAt: "2021-08-16T23:00:33.010+02:00",
    postId:"",
    url:"https://picsum.photos/50/50",
    isDeleted:false
  },
];
const Comments = (props) => {
  
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(()=>{
    setComments(data);
  },[]);

  const handleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };
  const closeForm=()=>{
    setShowCommentForm(false);
  }

  const addComment = async(comment,parentId)=>{
    try {
      const response = await apiService.createNewComment(
        Cookies.get("token"),
        comment,
        parentId
      );
      setErrorType("success");
      setError(response.message);
    } catch (error) {
      setErrorType("danger");
      setError(error.response.data.message);
      console.error("Error message:", error);
    } 
  }

  return (
    <div className="comments">
      <div className="comments-header">
        <div className="comments-left-header">
          Comments {`( ${5} )`}
        </div>
        <div className={`comments-right-header ${showCommentForm?"close-write-comment":"open-write-comment"}`} onClick={handleCommentForm}>
          {showCommentForm ? "Close" : "write comment"}
        </div>
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
      {showCommentForm && (
        <CommentForm 
          submitLabel="Post"  
          handleSubmit={addComment} 
          handleClose={closeForm}
          commentid={null}
        />
      )}
      
      <div className="comments-container">
        {comments.map((rootComment) => (
          <Comment
            data={rootComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
