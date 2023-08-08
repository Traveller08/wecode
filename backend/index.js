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

import { initCF } from "./Routes/codeforces.js";

import {
  db,
  createUsers,
  createPostTable,
  createCommentTable,
  createReplyTable,
  createGptTable,
  createPostReactionsTable,
} from "./util/db.js";

app.use("/api/user/", user);
app.use("/api/codeforces/", codeforces);
app.use("/api/post/", post);
app.use("/api/comment/", comment);
app.use("/api/reply/", reply);
app.use("/api/question", question);

const intiDB = async () => {
  try {
    const connection = await mysql2.createConnection(db);
    await connection.promise().query(createUsers());
    connection.commit();

    await connection.promise().query(createPostTable());
    connection.commit();

    await connection.promise().query(createCommentTable());
    connection.commit();

    await connection.promise().query(createReplyTable());
    connection.commit();

    await connection.promise().query(createGptTable());
    connection.commit();

    await connection.promise().query(createPostReactionsTable()); 
    connection.commit();

    console.log("Database Initialised ...");
  } catch (error) {
    console.log("Database Initialization Failed ...");
    console.log(error);
  }
};

app.listen(5001, async () => {
  await intiDB();
  initCF();
  console.log("App listening on port 5001");
});
