import express from "express";
const router = express.Router();
import mysql2 from "mysql2";
import {
  db,
  insertIntoPosts,
  insertIntoPostDetails,
  getPostsData,
  getPostuser,
} from "../util/db.js";
import { generateId } from "../util/id.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

router.post("/create", verifyJwtToken, async (req, res) => {
  console.log("post request body ", req.body);
  const { data } = req.body;
  const username = req.user;
  const usertype = req.usertype;
  const timestamp = Date.now();

  try {
    const connection = await mysql2.createConnection(db);
    try {
      const query = `SELECT id FROM users where username='${username}' and usertype='${usertype}'`;
      const [rows] = await connection.promise().query(query);

      console.log("users with given username and usertype ", rows);

      if (rows.length == 1) {
        const userid = rows[0].id;
        const postid = generateId();

        await connection.promise().query(insertIntoPosts(postid, userid));
        connection.commit();

        await connection
          .promise()
          .query(insertIntoPostDetails(postid, data, timestamp));
        connection.commit();
        const [post] = await connection
          .promise()
          .query(`SELECT * FROM postDetails WHERE postid='${postid}'`);
        return res
          .status(200)
          .json({ message: "post created successfully", data: post[0] });
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
      const [posts] = await connection.promise().query(getPostsData());
      return res
        .status(200)
        .json({ message: "posts fetched successfully", data: posts });
    } catch (error) {
      return res.status(500).json({ message: "internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});
router.get("/user", async (req, res) => {
  console.log("here ");
  try {
    const postid = req.query.postid;
    const connection = await mysql2.createConnection(db);
    try {
      const [posts] = await connection.promise().query(getPostuser(postid));
      console.log("postid ->", postid, "posts ", posts);
      return res
        .status(200)
        .json({ message: "post user fetched successfully", data: posts });
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
