import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

import user from "./Routes/user.js";
import post from "./Routes/post.js";
import question from "./Routes/question.js";
import comment from "./Routes/comment.js";
import reply from "./Routes/reply.js";
import codeforces from "./Routes/codeforces.js";
import mysql2 from "mysql2";
// import axios from "axios";

import {initCF} from "./Routes/codeforces.js";

import {
  db,

  createUsers,
  
  // post ==> 
//   createPosts,
//   createPostDetails,
    createPostTable,

  // post comments 
//   createComments,
//   createCommentDetails,
    createCommentTable,

  // post replies 
//   createReplies,
//   createReplyDetails,
    createReplyTable,


  // questions 
  // createQuestions,
  // createQuestionDetails,
  createQuestionTable,

} from "./util/db.js";

app.use("/api/user/", user);
app.use("/api/codeforces/", codeforces);

app.use("/api/post/", post);

// post comment 
app.use("/api/comment/", comment);

// reply comment 
app.use("/api/reply/", reply);


app.use("/api/question" , question) 
// app.use("/api/question/comment/", questionComment);
// app.use("/api/question/reply/", questionReply);


const intiDB = async () => {
    try{

        const connection = await mysql2.createConnection(db);
        await connection.promise().query(createUsers());
        connection.commit();
        
        // await connection.promise().query(createPosts());
        // connection.commit();
        // await connection.promise().query(createPostDetails());
        // connection.commit();
        await connection.promise().query(createPostTable());
        connection.commit();


        // await connection.promise().query(createComments());
        // connection.commit();
        // await connection.promise().query(createCommentDetails());
        // connection.commit();
        await connection.promise().query(createCommentTable()); // Add this line
        connection.commit();
    
    
        // await connection.promise().query(createReplies());
        // connection.commit();
        // await connection.promise().query(createReplyDetails());
        // connection.commit();
        await connection.promise().query(createReplyTable());
        connection.commit();
    

        // Questions -----------------------------------
        // await connection.promise().query(createQuestions());
        // connection.commit();
        // await connection.promise().query(createQuestionDetails());
        // connection.commit();
        await connection.promise().query(createQuestionTable());
        connection.commit();
        
        console.log("db initialised...");

    }
    catch(error){
        console.log("database initialization failed...");
        console.log(error);
    }

};


app.listen(5001, async () => {
    await intiDB();
    initCF();
    console.log("app listening on port 5001");
});


