import express from "express";
const router = express.Router();

import { generateCodeExplanation } from "../util/test.js";

import mysql2 from "mysql2";

import { db, insertIntoGptTable, getQuestionsData } from "../util/db.js";

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
          };
          return res
            .status(200)
            .json({
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
      for (let question of questions) {
        try {
          const query = `SELECT username, firstName, lastName, photourl FROM users WHERE id IN (
            SELECT userid FROM postTable WHERE postid='${question.postid}'
          )`;

          const [userdetails] = await connection.promise().query(query);

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
      return res.status(500).json({ message: "internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

export default router;
