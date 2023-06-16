import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
import user from "./Routes/user.js";
import post from "./Routes/post.js";
import comment from "./Routes/comment.js";
import reply from "./Routes/reply.js";
import mysql2 from "mysql2";
import {
  db,
  createUsers,
  createPosts,
  createComments,
  createReplies,
  createCommentDetails,
  createReplyDetails,
  createPostDetails,
} from "./util/db.js";

app.use("/api/user/", user);

app.use("/api/post/", post);
app.use("/api/comment/", comment);
app.use("/api/reply/", reply);

const intiDB = async () => {
    try{

        const connection = await mysql2.createConnection(db);
        await connection.promise().query(createUsers());
        connection.commit();
    
        await connection.promise().query(createPosts());
        connection.commit();
        await connection.promise().query(createComments());
        connection.commit();
    
        await connection.promise().query(createReplies());
        connection.commit();
        await connection.promise().query(createPostDetails());
        connection.commit();
    
        await connection.promise().query(createCommentDetails());
        connection.commit();
        await connection.promise().query(createReplyDetails());
        connection.commit();
       
        console.log("db initialised...");


    }catch(error){
        console.log("database initialization failed...");
        console.log(error);
    }

};
app.listen(5000, async () => {
    await intiDB();
    console.log("app listening on port 5000");
});
