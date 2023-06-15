import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./feed.css";
import apiService from "../../services/apiService";
import Cookies from "js-cookie";
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
export default function Feed() {
  const [posts, setPosts] = useState([{}]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
          const response = await apiService.getPosts();
          console.log("reponse ", response.data);
          setPosts(response.data);
      } catch (error) {
          console.log("Error fetching profile data:", error);
      }
  };
    fetchPosts();
  }, []);
  return (
    <>
      <div>
        {
          console.log("posts in app ", posts)
        }
        {/* {posts.map((post) => {
          return (
            <>
              <Post
                url={post.url}
                username={post.username}
                firstname={post.firstname}
                lastname={post.lastname}
                data={post.data}
                time={post.time}
                postid={post.id}
              />
              
            </>
          );
        })} */}
      </div>
    </>
  );
}
