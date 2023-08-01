import express from "express";
const router = express.Router();

import mysql2 from "mysql2";

import {
  db,
  insertIntoPostTable,
  getPostsData,
  deletePost,
} from "../util/db.js";

import { generateId } from "../util/id.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

router.post("/create", verifyJwtToken, async (req, res) => {
  const { data } = req.body;
  const username = req.user;
  const timestamp = Date.now();

  try {
    const connection = await mysql2.createConnection(db);
    try {
      const query = `SELECT id FROM users where username='${username}'`;
      const [rows] = await connection.promise().query(query);

      if (rows.length >= 1) {
        const userid = rows[0].id;
        const postid = generateId();

        // await connection
        //   .promise()
        //   .query(insertIntoPostTable(postid, userid, data, timestamp, "post"));
        // connection.commit();

        const queryInsertpostTable =
          "INSERT INTO postTable (postid, userid, data, createdtime, likes, dislikes, type) VALUES (?, ?, ?, ?, ?, ?, ?)";

        await connection
          .promise()
          .query(queryInsertpostTable, [
            postid,
            userid,
            data,
            timestamp,
            0,
            0,
            "post",
          ]);

        connection.commit();

        const [post] = await connection
          .promise()
          .query(`SELECT * FROM postTable WHERE postid='${postid}'`);

        try {
          const query = `SELECT username, firstName, lastName, photourl FROM users WHERE id IN (
            SELECT userid FROM postTable WHERE postid='${postid}'
          )`;

          const [userdetails] = await connection.promise().query(query);

          const combinedObj = {
            ...post[0],
            ...userdetails[0],
          };

          return res
            .status(200)
            .json({ message: "post created successfully", data: combinedObj });
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

router.post("/update", verifyJwtToken, async (req, res) => {
  const { postid, data } = req.body;
  const username = req.user;
  const timestamp = Date.now();

  try {
    const connection = await mysql2.createConnection(db);
    try {
      const queryUpdatepostTable = "UPDATE posttable SET data=? WHERE postid=?";
      await connection.promise().query(queryUpdatepostTable, [data, postid]);
      connection.commit();
      return res.status(200).json({ message: "post updated successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const connection = await mysql2.createConnection(db);
    try {
      const [posts] = await connection.promise().query(getPostsData());

      const sendthis = [];

      for (let post of posts) {
        try {
          const query = `SELECT username, firstName, lastName, photourl FROM users WHERE id IN (
            SELECT userid FROM postTable WHERE postid='${post.postid}'
          )`;

          const [userdetails] = await connection.promise().query(query);

          const combinedObj = {
            ...post,
            ...userdetails[0],
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

router.get("/delete", verifyJwtToken, async (req, res) => {
  try {
    const postid = req.query.postid;
    const connection = await mysql2.createConnection(db);
    try {
      await connection.promise().query(deletePost(postid));
      connection.commit();
      return res.status(200).json({ message: "post deleted successfully" });
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
