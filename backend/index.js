import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

import user from "./Routes/user.js";
import post from "./Routes/post.js";
import comment from "./Routes/comment.js";
import reply from "./Routes/reply.js";
import codeforces from "./Routes/codeforces.js";
import mysql2 from "mysql2";
import axios from "axios";
import {initCF} from "./Routes/codeforces.js";
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
app.use("/api/codeforces/", codeforces);


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


app.listen(5001, async () => {
    await intiDB();
    initCF();
    console.log("app listening on port 5001");
});


