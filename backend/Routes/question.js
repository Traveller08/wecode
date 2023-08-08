import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { generateCodeExplanation } from "../util/test.js";

import mysql2 from "mysql2";

import { db, getQuestionsData } from "../util/db.js";

import { generateId } from "../util/id.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

router.post("/ask", verifyJwtToken, async (req, res) => {
  const { data } = req.body;
  const username = req.user;
  const timestamp = Date.now();
  try {
    const connection = await mysql2.createConnection(db);
    try {
      // query to check if user is valid or not
      const query = `SELECT id FROM users where username='${username}'`;
      const [rows] = await connection.promise().query(query);

      if (rows.length >= 1) {
        // if the user is authorised

        const userid = rows[0].id;
        const questionid = generateId();

        // getting the gpt response

        let gptresponse = await generateCodeExplanation(data);

        // query to insert data into post table
        const queryInsertpostTable =
          "INSERT INTO postTable (postid, userid, data, createdtime, likes, dislikes, type) VALUES (?, ?, ?, ?, ?, ?, ?)";

        await connection
          .promise()
          .query(queryInsertpostTable, [
            questionid,
            userid,
            data,
            timestamp,
            0,
            0,
            "question",
          ]);

        // query to insert gpt response into gpt table
        const insertQuery = `INSERT INTO gptTable (questionid, gptresponse) VALUES (?, ?)`;
        await connection
          .promise()
          .query(insertQuery, [questionid, gptresponse]);

        connection.commit();
        // question created and inserted into database

        // query to fetch the current question from database
        const [question] = await connection
          .promise()
          .query(`SELECT * FROM postTable WHERE postid='${questionid}'`);

        // query to fetch the gpt response
        const [gptrow] = await connection
          .promise()
          .query(`SELECT * FROM gptTable WHERE questionid='${questionid}'`);
        const originalGptResponse = gptrow[0].gptresponse.replace(/\\/g, "");
        try {
          const [userdetails] = await connection
            .promise()
            .query(
              `SELECT username, firstName, lastName, photourl FROM users WHERE id = ${userid}`
            );

          const combinedObj = {
            ...question[0],
            ...userdetails[0],
            gptresponse: originalGptResponse,
            likes: 0,
            dislikes: 0,
            reaction: "",
          };
          return res.status(200).json({
            message: "question created successfully",
            data: combinedObj,
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "internal server error" });
        }
      }
      return res.status(500).json({ message: "internal server error" });
    } catch (error) {
      console.log("error -> ", error);
      return res.status(500).json({ message: "internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    console.log("error -> ", error);
    return res.status(500).json({ message: "internal server error" });
  }
});

const isUserAthenticated = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return { status: false };
  } else {
    const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret_key);
    if (decoded) {
      return { status: true, username: decoded.username };
    } else {
      return { status: false };
    }
  }
};

router.get("/all", async (req, res) => {
  try {
    const connection = await mysql2.createConnection(db);
    try {
      const [questions] = await connection.promise().query(getQuestionsData());
      const sendthis = [];

      if (!questions || questions.length <= 0) {
        return res
          .status(200)
          .json({ message: "posts fetched successfully", data: sendthis });
      }

      const userVerification = isUserAthenticated(req);
      var userId = null;
      if (userVerification.status === true) {
        const query = `SELECT id FROM users WHERE username='${userVerification.username}'`;
        const [userRows] = await connection.promise().query(query);
        userId = userRows[0].id;
      }

      for (let question of questions) {
        try {
          const query = `SELECT username, firstName, lastName, photourl FROM users WHERE id IN (
            SELECT userid FROM postTable WHERE postid='${question.postid}'
          )`;

          const [userdetails] = await connection.promise().query(query);

          const queryGetLikesCount = `SELECT COUNT(*) AS likes FROM postReactions WHERE postid='${question.postid}' AND reaction='like'`;
          const queryGetDislikesCount = `SELECT COUNT(*) AS dislikes FROM postReactions WHERE postid='${question.postid}' AND reaction='dislike'`;

          const [likesResult] = await connection
            .promise()
            .query(queryGetLikesCount);

          const [dislikesResult] = await connection
            .promise()
            .query(queryGetDislikesCount);

          const likesCount = likesResult[0]?.likes || 0;
          const dislikesCount = dislikesResult[0]?.dislikes || 0;

          var reaction = "not reacted";

          if (userId) {
            const reactionQuery = `SELECT * FROM postReactions WHERE postid='${question.postid}' AND userid=${userId}`;
            const [reactionRows] = await connection
              .promise()
              .query(reactionQuery);

            if (reactionRows.length > 0) {
              reaction = reactionRows[0].reaction;
            }
          }

          // gpt response
          const [gptrow] = await connection
            .promise()
            .query(
              `SELECT * FROM gptTable WHERE questionid='${question.postid}'`
            );

          const originalGptResponse = gptrow[0].gptresponse.replace(/\\/g, "");

          const combinedObj = {
            ...question,
            ...userdetails[0],
            gptresponse: originalGptResponse,
            likesCount,
            dislikesCount,
            reaction,
          };

          sendthis.push(combinedObj);
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: "internal server error" });
        }
      }

      return res
        .status(200)
        .json({ message: "posts fetched successfully", data: sendthis });
    } catch (error) {
      console.log("error1 : ", error);
      return res.status(500).json({ message: "internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    console.log("error2 : ", error);
    return res.status(500).json({ message: "internal server error" });
  }
});

export default router;
