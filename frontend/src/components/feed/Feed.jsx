import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./feed.css";
import apiService from "../../services/apiService";
import Cookies from "js-cookie";
import Alert from "react-bootstrap/Alert";
import CreatePost from "../post/CreatePost";
import toast from "react-hot-toast";

const successNotify=(message) =>toast.success(message);
const errorNotify = (message) => toast.error(message);

// const postsData = [
//   {
//     url: "https://picsum.photos/50/50",
//     username: "lit2020034@iiitl.ac.in",
//     firstname: "Ankit",
//     lastname: "Kumar",
//     id: "1",
//     data: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam sed praesentium quidem quisquam est maxime necessitatibus tempore illum sint, commodi maiores porro alias accusantium rerum temporibus assumenda voluptatum et eveniet!
//     Animi, iusto voluptatibus enim, ipsum assumenda provident ex dolore earum nostrum asperiores quaerat distinctio eum! Unde ex suscipit aliquam, quod dolore voluptates eius sit a doloremque itaque molestias nostrum fuga!
//     Esse, ex vitae fugit labore excepturi beatae itaque similique facilis voluptas omnis est. Labore natus dolore, recusandae esse voluptate dolor fugit accusantium quis earum reiciendis facilis aperiam saepe iusto sunt?
//     Eum numquam deleniti blanditiis molestiae et deserunt placeat nesciunt odit excepturi illum corrupti quibusdam, quidem aspernatur eaque incidunt tempore explicabo aperiam expedita! Facilis sed corrupti assumenda excepturi consectetur deserunt necessitatibus!
//     Doloribus ex veritatis suscipit porro aliquam dolorem soluta eaque cumque! A magni dolores illum delectus laudantium cumque quas debitis sint dolor. Aspernatur aliquid voluptate quibusdam hic libero debitis perspiciatis nulla!`,
//     time: "15",
//   },
// ];

export default function Feed(props) {
  
  const [posts, setPosts] = useState([{}]);
  const [questions, setQuestions]= useState([{}]);

  // const [fetched, setFetched] = useState(false);
  const [active, setActive] = useState("posts");
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiService.getPosts();
        console.log(response.data)
        setPosts(response.data);

        // console.log("posts in feeed", response.data);
      } 
      catch (error) {
        console.log("Error fetching posts:", error);
      }
    };
    fetchPosts();
    
    const fetchQuestions = async () => {
      try {
        const response = await apiService.getQuestions();
        setQuestions(response.data);
        // console.log("posts in feeed", response.data);
      } catch (error) {
        console.log("Error fetching questions:", error);
      }
    };
    fetchQuestions();
    
    // console.log("Posts" , posts)
    
    // console.log("Posts" , posts)
    // console.log("Questions" , questions)

    // setFetched(true);
  }, []);


  // useEffect(() => {
    // const fetchQuestions = async () => {
    //   try {
    //     const response = await apiService.getQuestions();
    //     setQuestions(response.data);
    //     // console.log("posts in feeed", response.data);
    //   } catch (error) {
    //     console.log("Error fetching posts:", error);
    //   }
    // };
    // fetchQuestions();
  //   setFetched(true);
  // }, []);


  const createPost = async (text) => {
    try {
      const response = await apiService.createNewPost(
        Cookies.get("token"),
        text
      );
    
      successNotify("post created successfully");
      
      // console.log(posts)
      setPosts([response.data,...posts]);
      // console.log(posts)

    } 
    catch (error) {
      errorNotify(error.response.data.message);
      console.error("Error message:", error);
    }

  };

  const askQuestion = async (text) => {
    try {
      const response = await apiService.askNewQuestion(
        Cookies.get("token"),
        text
      );
    
      successNotify("question created successfully");
      setQuestions([response.data,...questions]);
    } 
    catch (error) {
      errorNotify(error.response.data.message);
      console.error("Error message:", error);
    }
  };


  return (
    <>
      <div>
        {props.user && <CreatePost handleSubmitPost={createPost} handleSubmitQuestion = {askQuestion} user={props.user}  active={active} setactive={setActive}/>}

        {active==="posts" && posts.map((post) => {
          return (
            <>
              {/* {post.postid && ( */}
                <Post
                  postid={`${post.postid}`}
                  createdtime={post.createdtime}
                  data={post.data}
                  likes={post.likes}
                  dislikes={post.dislikes}

                  firstName = {post.firstName}
                  lastName = {post.lastName}
                  photourl = {post.photourl}
                  username = {post.username}

                  // onsubmit={createPost}
                />
              {/* )} */}
            </>
          );
        })}



        {active==="ask" && questions.map((question) => {
          return (
            <>
              {/* {question.questionid && ( */}
                {/* <Post
                  postid={`${question.questionid}`}
                  createdtime={question.createdtime}
                  data={question.data}
                  // onsubmit={askQuestion}
                  post={false}
                /> */}
                {/* { console.log(question)} */}

                <Post 
                  postid={`${question.questionid}`}
                  createdtime={question.createdtime}
                  data={question.data}
                  likes={question.likes}
                  dislikes={question.dislikes}

                  firstName = {question.firstName}
                  lastName = {question.lastName}
                  photourl = {question.photourl}
                  username = {question.username}

                  // onsubmit={createPost}
                />
              {/* )} */}
            </>
          );
        })}
      </div>
    </>
  );
}
