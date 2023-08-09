import React, { useEffect, useState, useRef } from "react";
import Post from "../post/Post";
import "./feed.css";
import apiService from "../../services/apiService";
import Cookies from "js-cookie";
import CreatePost from "../post/CreatePost";
import toast from "react-hot-toast";

const successNotify = (message) => toast.success(message);
const errorNotify = (message) => toast.error(message);

const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [active, setActive] = useState("posts");
  const [isNewPostAdded, setIsNewPostAdded] = useState(false);
  const [isNewQuestionAdded, setIsNewQuestionAdded] = useState(false);

  // Create a ref for the last post element
  const lastPostRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiService.getPosts();
        setPosts(response.data);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };
    fetchPosts();

    const fetchQuestions = async () => {
      try {
        const response = await apiService.getQuestions();
        setQuestions(response.data);
      } catch (error) {
        console.log("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  const createPost = async (text) => {
    try {
      const response = await apiService.createNewPost(text);
      successNotify("post created successfully");
      setPosts((prevPosts) => [response.data, ...prevPosts]);
      setIsNewPostAdded(true); // Set the state to indicate a new post is added
      // scrollToNewPost();
    } catch (error) {
      errorNotify("Failed to create post");
      console.error("Error message:", error);
    }
  };

  // const scrollToNewPost = () => {
  //   if (lastPostRef.current) {
  //     lastPostRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  // ... Rest of the code ...
  const deletePost = async (postid) => {
    try {
      await apiService.deletePost(postid);
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.postid !== postid)
      );
      successNotify("post deleted successfully");
    } 
    catch (error) {
      errorNotify("Failed to delete");
      console.error("Error message:", error);
    }
  };

  const deleteQuestion = async (postid) => {
    try {
      await apiService.deletePost(postid);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.postid !== postid)
      );
      successNotify("question deleted successfully");
    } catch (error) {
      errorNotify("Failed to delete");
      console.error("Error message:", error);
    }
  };

  const savePost = async () => {
    // Implement the save post functionality here if needed
  };

  const askQuestion = async (text) => {
    try {
      const response = await apiService.askNewQuestion(text);
      successNotify("question asked successfully");
      setQuestions((prevQuestions) => [response.data, ...prevQuestions]);
      setIsNewQuestionAdded(true); // Set the state to indicate a new question is added
      // scrollToNewPost();
    } catch (error) {
      errorNotify("Failed to ask");
      console.error("Error message:", error);
    }
  };

  const handlePostEdit = async (postid, text) => {
    try {
      await apiService.updatePost(postid, text);
      successNotify("post updated");
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postid === postid ? { ...post, data: text } : post
        )
      );
    } catch (error) {
      errorNotify("Failed to update");
      console.error("Error message:", error);
    }
  };

  return (
    <>
      <div>
        {props.user && (
          <CreatePost
            handleSubmitPost={createPost}
            handleSubmitQuestion={askQuestion}
            user={props.user}
            active={active}
            setactive={setActive}
          />
        )}

        <div>
          {active === "posts" &&
            posts.map((post, index) => (
              <div
                key={post.postid}
                ref={index === posts.length - 1 ? lastPostRef : null}
                className={`post-container ${
                  isNewPostAdded && index === posts.length - 1 ? "new-post" : ""
                }`}
              >
                {/* 
                likesCount,
              dislikesCount,
              reaction
                */}
                <Post
                  postid={post.postid}
                  // Rest of the props
                  createdtime={post.createdtime}
                  data={post.data}
                  likes={post.likesCount}
                  dislikes={post.dislikesCount}
                  reaction={post.reaction}
                  firstName={post.firstName}
                  lastName={post.lastName}
                  photourl={post.photourl}
                  username={post.username}
                  user={props.user}
                  isQuestion={false}
                  gptresponse={post.gptresponse}
                  handleDelete={deletePost}
                  handleSave={savePost}
                  handleEdit={handlePostEdit}
                />
              </div>
            ))}

          {active === "ask" &&
            questions.map((question, index) => (
              <div key={question.postid} className={`question-container`}>
                <Post
                  postid={question.postid}
                  // Rest of the props
                  createdtime={question.createdtime}
                  data={question.data}
                  likes={question.likesCount}
                  dislikes={question.dislikesCount}
                  reaction={question.reaction}
                  firstName={question.firstName}
                  lastName={question.lastName}
                  photourl={question.photourl}
                  username={question.username}
                  isQuestion={true}
                  gptresponse={question.gptresponse}
                  handleDelete={deleteQuestion}
                  handleSave={savePost}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Feed;
