import express from "express";
const router = express.Router();
import mysql2 from "mysql2";

import {
  db,
  getCommentsData,
  deleteComment,
} from "../util/db.js";

import { generateId } from "../util/id.js";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

const getCommentUserDetails = async (userid, connection) => {
  try {
    const [userdetails] = await connection
      .promise()
      .query(
        `SELECT username, firstName, lastName, photourl FROM users WHERE id='${userid}'`
      );
    return userdetails[0];
  } catch (error) {
    console.log("Error fetching user details:", error);
    return null;
  }
};

router.post("/create", verifyJwtToken, async (req, res) => {
  const { data, parentid } = req.body;
  const timestamp = Date.now();
  const username = req.user;
  try {
    const connection = await mysql2.createConnection(db);
    try {
      const query = `SELECT id FROM users where username='${username}'`;
      const [rows] = await connection.promise().query(query);

      if (rows.length == 1) {
        const userid = rows[0].id;
        const commentid = generateId();

        const queryInsertIntoCommentTable = `INSERT INTO commentTable
          (commentid, postid, userid, data, createdtime, likes, dislikes, isdeleted) 
          VALUES 
          (?, ?, ?, ?, ?, ?, ?, ?)`;

        await connection
          .promise()
          .query(queryInsertIntoCommentTable, [
            commentid,
            parentid,
            userid,
            data,
            timestamp,
            0,
            0,
            0,
          ]);

        connection.commit();

        const [comment] = await connection
          .promise()
          .query(`SELECT * FROM commentTable WHERE commentid='${commentid}'`);

        const userdetails = await getCommentUserDetails(userid, connection);

        const combinedObj = {
          ...comment[0],
          ...userdetails,
        };

        return res
          .status(200)
          .json({ message: "comment created", data: combinedObj });
      }
      return res.status(500).json({ message: "internal server error" });
    } catch (error) {
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
    const postid = req.query.postid;

    const connection = await mysql2.createConnection(db);

    try {
      const [comments] = await connection
        .promise()
        .query(getCommentsData(postid));

      const commentsWithUsers = await Promise.all(
        comments.map(async (comment) => {
          const userdetails = await getCommentUserDetails(
            comment.userid,
            connection
          );
          return {
            ...comment,
            ...userdetails,
          };
        })
      );

      return res
        .status(200)
        .json({
          message: "comments fetched successfully",
          data: commentsWithUsers,
        });
    } catch (error) {
      return res.status(500).json({ message: "internal server error" });
    } finally {
      connection.close();
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

router.post("/update", verifyJwtToken, async (req, res) => {
  const { commentid, data } = req.body;
  const username = req.user;
  const timestamp = Date.now();

  try {
    const connection = await mysql2.createConnection(db);
    try {
      const queryUpdatecommentTable =
        "UPDATE commenttable SET data=? WHERE commentid=?";
      await connection
        .promise()
        .query(queryUpdatecommentTable, [data, commentid]);
      connection.commit();
      return res.status(200).json({ message: "comment updated successfully" });
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

router.get("/delete", verifyJwtToken, async (req, res) => {
  try {
    const commentid = req.query.commentid;
    const connection = await mysql2.createConnection(db);
    try {
      await connection.promise().query(deleteComment(commentid));
      connection.commit();
      return res.status(200).json({ message: "comment deleted successfully" });
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
